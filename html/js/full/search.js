// how long before loading messages should be displayed in milliseconds
var LOAD_DELAY = 1000;

// jQuery CSS map determining the style of the area box
var BOX_SELECTED = {
    'background-color': 'transparent',
    'border-color': '#0B8AB3',
    'border-width': '2px',
    'border-style': 'solid',
    'background-image': "url('/images/area-fill-selected.png')",
    'background-repeat': 'repeat'
};

var BOX_DESELECTED = {
    'background-color': 'transparent',
    'border-color': '#CA0000',
    'border-width': '2px',
    'border-style': 'solid',
    'background-image': "url('/images/area-fill.png')",
    'background-repeat': 'repeat'
};

// top level function to initialise the map
function init_map() {
    var extent = new OpenLayers.Bounds(-180, -90, 180, 90);
    var options = {
        restrictedExtent: extent,
        maxExtent: extent,
        maxResolution: 360/512,
        eventListeners: {
            "movestart": stop_box_edit
        },
        controls: []            // we will add our own controls
    }
    
    var map = new OpenLayers.Map('map', options);

    // the layer to contain the area box
    var boxes = new OpenLayers.Layer.Boxes("boxes");
    map.addLayer(boxes);
    
    // the custom control to draw area boxes
    control = new OpenLayers.Control.BoxDraw();
    control.box_layer = boxes;
    map.addControl(control);
    control.activate();

    // default controls
    var nav = new OpenLayers.Control.Navigation();
    map.addControl(nav);
    map.addControl(new OpenLayers.Control.PanZoom());
    map.addControl(new OpenLayers.Control.ArgParser());
    map.addControl(new OpenLayers.Control.Attribution());

    // ensure navigation is deactivated when the CTRL key is pressed
    // or the box is selected, otherwise it interferes with the box
    // drawing.
    $(document).keydown(function(evt) {
        // only deactivate if it's the CTRL key and the nav is active
        if (evt.which == 17 && nav.active) { 
            nav.deactivate();
            $(this).data('deactivated', true);
        }
    }).keyup(function(evt) {
        var self = $(this);
        // only activate if previously deactivated by this code
        if (evt.which == 17 && self.data('deactivated')) {  // it's the CTRL key
            nav.activate();
            self.data('deactivated', false);
        }      
    }).bind('boxselected', function(event) {
        var self = $(this);
        if (nav.active || self.data('deactivated')) {
            nav.deactivate();
            self.data('deactivated', false); // prevent CTRL keyup from re-activating
        }
    }).bind('boxdeselected', function(event) {
        if (!nav.active && !$(this).data('deactivated')) {
            nav.activate();
        }
    });

    return map;
}

// parse GET variable string into an array
// from http://www.webdevelopmentcentral.net/2006/06/parsing-url-variables-with-javascript.html
function parse_GET(str) {
    // strip off the leading '?'
    str = str.substring(1);
    vars = []
    var nvPairs = str.split("&");
    for (i = 0; i < nvPairs.length; i++)
    {
        var nvPair = nvPairs[i].split("=");
        var obj = {name: nvPair[0],
                   value: nvPair[1]};
        vars.push(obj);
    }

    return vars;
}

// compare an array of get variables to see if they are the same
function compare_vars(vars1, vars2) {
    function cmp(a, b) {
        return (b.name < a.name) - (a.name < b.name);
    }

    // get rid of variables with no value
    function compact(array) {
        a = [];
        for (i = 0; i < array.length; i++) {
            if (array[i].value)
                a.push(array[i]);
        }
        return a;
    }

    // compact the arrays
    vars1 = compact(vars1);
    vars2 = compact(vars2);

    // sort the arrays to be equal
    vars1.sort(cmp);
    vars2.sort(cmp);

    // test the equality of the arrays
    if (vars1.length != vars2.length)
        return false;

    for (i = 0; i < vars1.length; i++) {

        if (vars1[i].name !== vars2[i].name)
            return false;

        if (vars1[i].value !== vars2[i].value)
            return false;
    }

    return true;
}

function stop_box_edit(event) {
    map.controls[0].stopEdit();
}

function add_box(extent, selected) {
    map.controls[0].setBox(extent, selected);
}

function clear_box() {
    map.controls[0].removeBox();
    $('#bbox').val(''); // set the form element
}

// remove the bounding box and deselect the area
function clear_area() {
    var select = $('#area')
    select.val('');
    select.change();
}

function zoom_to_area(id) {
    get_bbox(id, function(tbbox) {
        if (!tbbox)
            return false;

        map.zoomToExtent(OpenLayers.Bounds.fromArray(tbbox));
        return true;
    });
}

// Populate the area selection control
function populate_areas() {
    var select = $('#area');

    // ensure a bbox is created when an area is selected
    select.change(function() {
        var id = $(this).attr('value');
        if (!id) {
            clear_box();
            check_query();      // update the query results
        } else {
            get_bbox(id, function(tbbox) {
                if (!tbbox) {
                    clear_box();
                    return;
                } else {
                    var extent = new OpenLayers.Bounds(tbbox[0], tbbox[1], tbbox[2], tbbox[3]);
                    add_box(extent);
                    map.zoomToExtent(extent);   // zoom to the box
                }

                check_query();      // update the query results
            });
        }
    });

    // if there's an existing area, select it
    if (area) {
        select.val(area);
        select.change();
    } else if (bbox) {
        add_box(bbox);
        map.zoomToExtent(bbox);   // zoom to the box
    } else {
        // zoom to the UK as a default

        // The map is hidden to begin with and needs to be initialised
        // when it is first shown
        $(document).bind('fieldsetview', function(event, id) {
            if (id != 'spatial-search')
                return;
            
            map.updateSize();
            zoom_to_area('GB');
            $(this).unbind(event); // we don't need this event any more
        });
    }

    // capture the drawbox and movebox events and act accordingly
    $(document).bind('drawbox movebox', function(event, bounds) {
        select.val('');         // unset any predefined area
        $('#bbox').val(bounds.toBBOX()); // set the form element
        check_query();          // update the query results
    });
}

function init_date(id) {
    var input = $('#'+id);
    var text = $('#'+id+'-text');

    // a function to initialise the date picker
    var init_datepicker = function() {
        input.datepicker({
            onClose: function(new_date, picker) {
                if (!new_date) {
                    input.hide();
                    text.show();
                }
            },
            onSelect: function(date, picker) {
                // trigger the change event, which is used by the
                // query checking code.
                input.change();
            }
        });
    }

    var has_date = input.val();
    // initialise the date picker if a date is present
    if (has_date) {
        init_datepicker();
        text.hide();
        input.show();
    }

    text.one('click', function() {
        $(this).hide();
        input.show();

        // initialise the date picker if there was no initial date
        if (!has_date) {
            init_datepicker();
        }
        
        input.datepicker('show');
        
        // for subsequent clicks
        text.click(function() {
            $(this).hide();
            input.show();
            input.datepicker('show');
        });
    });
}

function toggle(id, show_txt, hide_txt) {
    var ele = $('#'+id);
    if (ele.is(':visible')) {
        $('#'+id+'-link').text(show_txt);
        ele.hide('fast');
    } else {
        $('#'+id+'-link').text(hide_txt);
        ele.show('fast');
    }
}

function toggle_fieldset(id) {
    var fieldset = $('#'+id);

    if (fieldset.hasClass('off')) {
        fieldset.removeClass('off');
        fieldset.children('div').show('fast', function() {
            $(document).trigger('fieldsetview', [id]);
        });
    } else {
        fieldset.children('div').hide('fast', function() {
            fieldset.addClass('off');
        });
    }
}

var query_check = 0;
function check_query() {
    query_check += 1;
    var check_count = query_check;

    var term = $('#criteria-term');
    var date = $('#criteria-date');
    var area = $('#criteria-area');

    // set the timeout for the image load
    function load() {
        term.empty();
        date.empty();
        area.empty();
        term.append('<span><img class="loading" src="/images/loading.gif" width="16" height="16" alt="[loading]"/> Updating search criteria...</span>');
    }
    var timeout = setTimeout(load, LOAD_DELAY);

    var url = script_root+'/full/query.json?'+$('#search-form').serialize();
    $.ajax({url: url,
            success: function(criteria) {
                clearTimeout(timeout);

                // only process if this is the latest check
                if (query_check != check_count)
                    return;
                
                var messages = $('#messages').empty();

                for (var i = 0; i < criteria['errors'].length; i++) {
                    messages.append('<p class="error">'+criteria['errors'][i]+'</p>');
                }

                term.empty();
                date.empty();
                area.empty();
                if (!criteria['terms'].length &&
                    !criteria['dates'].start && !criteria['dates'].end &&
                    !criteria['area'] && !criteria['bbox']) {
                    term.append('<span><strong>everything</strong> in the catalogue.</span>');
                    return;
                } else if (!criteria['terms'].length)
                    term.append('<strong>everything</strong>');
                else
                    term.append('<span>documents containing </span>');

                for (var i = 0; i < criteria['terms'].length; i++) {
                    var tterm = criteria['terms'][i];
                    if (tterm['op'])
                        term.append('<strong> '+tterm['op']+' </strong>');
                    term.append('<kbd>'+tterm['word']+'</kbd>');
                    if (tterm['target'][0] && tterm['target'][1])
                        term.append('<span> (in '+tterm['target'][1]+') </span>');
                    else if (tterm['target'][0] && !tterm['target'][1])
                        term.append('<span> (<span class="error">ignoring unknown target <strong>'+tterm['target'][0]+'</strong></span>) </span>');
                }

                if (criteria['dates'].start && criteria['dates'].end)
                    date.append('<span> between <strong>'+criteria['dates'].start+'</strong> and <strong>'+criteria['dates'].end+'</strong></span>');
                else if (criteria['dates'].start)
                    date.append('<span> since <strong>'+criteria['dates'].start+'</strong></span>');
                else if (criteria['dates'].end)
                    date.append('<span> before <strong>'+criteria['dates'].end+'</strong></span>');

                if (criteria['area'])
                    area.append('<span> in <strong>'+criteria['area']+'</strong></span>');
                else if (criteria['bbox'])
                    area.append('<span> in <strong>your specified area</strong></span>');
            },
            complete: function(req, status) {
                clearTimeout(timeout); // just to be sure!
            },
            dataType: 'json'});

    // if the query has changed we also need to update the result
    // details
    update_results();
}

var update_check = 0;
function update_results() {
    update_check += 1;
    var check_count = update_check;
    var block = $('#result-count');

    // set the timeout for the image load
    function load() {
        block.empty();
        block.append('<span><img class="loading" src="/images/loading.gif" width="16" height="16" alt="[loading]"/> Updating result count...</span>');
    }
    var timeout = setTimeout(load, LOAD_DELAY);
    
    var url = script_root+'/full.json?'+$('#search-form').serialize();
    $.ajax({url: url,
            success: function(results) {
                clearTimeout(timeout);

                // only process if this is the latest check
                if (update_check != check_count)
                    return;

                block.empty();
                block.append('<span><strong>'+results['hits']+'</strong> '+
                             ((results['hits'] != 1) ? 'results' : 'result')
                             +' returned in <strong>'+results['time'].toFixed(2)+'</strong> seconds.</span>');
            },
            error: function(req, status, e) {
                clearTimeout(timeout);

                // only process if this is the latest check
                if (update_check != check_count)
                    return;

                update_check += 1; // so the timeout wont fire
                var msg = null;
                if (req.readyState == 4 && req.status == 500) {
                    msg = 'The server failed to return the result count';
                } else {
                    msg = 'There is a problem obtaining the result count';
                }

                block.empty().append('<span class="error">'+msg+'.</span>');
            },
            complete: function(req, status) {
                clearTimeout(timeout); // just to be sure!
            },
            dataType: 'json'});
}

var _areas = {}                 // for caching bboxes
function get_bbox(id, callback) {
    if (!id) return false;

    // see if the bounding box is cached
    var bbox = _areas[id]
    if (typeof(bbox) != 'undefined') {
        callback(bbox);
        return true;
    }

    var url = script_root+'/spatial/areas/'+id+'/extent.json'
    $.ajax({url: url,
            success: function(bbox) {
                _areas[id] = bbox; // cache the bbox
                callback(bbox);
            },
            dataType: 'json'});

    return true;
}

/* Control for drawing bounding box

 This control manages the bounding box on the map. It is based on examples in:
 - http://dev.openlayers.org/docs/files/OpenLayers/Control-js.html
 - http://dev.openlayers.org/releases/OpenLayers-2.8/lib/OpenLayers/Control/SelectFeature.js

 The box should really be a customised class derived from
 OpenLayers.Marker.Box. This would clean the control code up and
 delegate appropriate functionality to the Box where it belongs. */
OpenLayers.Control.BoxDraw = OpenLayers.Class(OpenLayers.Control, {                
    defaultHandlerOptions: {
        'single': true,
        'double': false,
        'pixelTolerance': 0,
        'stopSingle': false,
        'stopDouble': false
    },

    initialize: function(options) {
        this.handlerOptions = OpenLayers.Util.extend(
            {'keyMask': OpenLayers.Handler.MOD_CTRL},
            this.defaultHandlerOptions
        );

        OpenLayers.Control.prototype.initialize.apply(
            this, arguments
        );

        // this Handler.Box will intercept the shift-mousedown
        // before Control.MouseDefault gets to see it
        this.handler = new OpenLayers.Handler.DrawBox(
            this, {
                'done': this.drawBox
            },
            this.handlerOptions
        );

        // keep track of CTRL keydown position and prevent dragging
        // and resizing of an existing box if the CTRL key is pressed
        // down, as another box may be being drawn.
        this.keydown = false;
        var self = this;
        $(document).keydown(function(evt) {
            if (evt.which == 17) {
                self.keydown = true;
                if (self.box) {
                    var div = $(self.box.div);
                    if (div.data('selected')) {
                        div.resizable( "option", "disabled", true )
                            .draggable( "option", "disabled", true )
                            .data('edit', false);

                        function enable_edit(event) {
                            if (event.which == 17) {
                                div.resizable( "option", "disabled", false )
                                    .draggable( "option", "disabled", false )
                                    .data('edit', true);
                                $(document).unbind('keyup', enable_edit); // we only need to enable the edit once
                            }
                        }

                        // re-enable the editing once the key is released
                        $(document).bind('keyup', enable_edit);
                    }
                }
            }
        }).keyup(function(evt) {
            if (evt.which == 17)
                self.keydown = false;
        });
    }, 

    drawBox: function(position) {
        if (!(position instanceof OpenLayers.Bounds))
            return;

        var min = this.map.getLonLatFromPixel(
            new OpenLayers.Pixel(position.left, position.bottom)
        );
        var max = this.map.getLonLatFromPixel(
            new OpenLayers.Pixel(position.right, position.top)
        );
        var bounds = new OpenLayers.Bounds(
            min.lon, min.lat, max.lon, max.lat
        );

        this.setBox(bounds, true);        

        jQuery(document).trigger('drawbox', [bounds]);
    },

    setBox: function(bounds, selected) {
        // add the box to the map
        var box = new OpenLayers.Marker.Box(bounds);
        
        // add the drag and resize behaviour
        var div = jQuery(box.div);
        var ctrl = this;
        div.draggable({
            containment: '#map-holder',    // don't drag outside of the map
            cursor: 'crosshair',
            distance: 5,
            start: function(event, ui) {
                jQuery(this).data('edit', false); // prevent box being deselected on stop
            },
            stop: function(event, ui) {
                // replace the existing box bounds with the new one
                var self = jQuery(this);
                var minx = ui.position.left;
                var maxy = ui.position.top;
                var maxx = minx + self.width();
                var miny = maxy + self.height();
                
                ctrl.moveBox(minx, miny, maxx, maxy);
            }
        })
        .resizable({
            handles: 'all',
            containment: '#map-holder',    // don't resize outside of the map
            distance: 5,
            start: function(event, ui) {
                jQuery(this).data('edit', false); // prevent box being deselected on stop
            },
            stop: function(event, ui) {
                // replace the existing box bounds with the new one
                var minx = ui.position.left;
                var maxy = ui.position.top;
                var maxx = minx + ui.size.width;
                var miny = maxy + ui.size.height;
                
                ctrl.moveBox(minx, miny, maxx, maxy);
            }
        }).mousedown(function(event) {
            jQuery(this).data('edit', true);
        }).mouseup(function (event) {
            var self = jQuery(this);
            // Should we check the resizing?
            if (!self.data('edit'))
                return;
            
            if (self.resizable( "option", "disabled" )) {
                ctrl.selectBox();
            } else {
                ctrl.deselectBox();
            }
        });
        
        // add the custom handles for the resize
        div.find('.ui-resizable-ne').addClass('ui-custom-icon ui-icon-gripsmall-diagonal-ne');
        div.find('.ui-resizable-sw').addClass('ui-custom-icon ui-icon-gripsmall-diagonal-sw');
        div.find('.ui-resizable-nw').addClass('ui-custom-icon ui-icon-gripsmall-diagonal-nw');
        
        this.box_layer.addMarker(box); // add the box to the layer
        if (this.box)
            this.box_layer.removeMarker(this.box); // remove any previous box
        this.box = box;

        // define the initial state of the box
        if (selected) {
            this.selectBox();
        } else {
            this.deselectBox();
        }        
    },

    selectBox: function() {
        var div = $(this.box.div);

        // set the box to be editable. If the CTRL key is depressed
        // then we need to make disable editing until it is released.
        if (this.keydown) {
            div.resizable( "option", "disabled", true )
                .draggable( "option", "disabled", true )
                .data('edit', false);

            function enable_edit(event) {
                if (event.which == 17) {
                    div.resizable( "option", "disabled", false )
                        .draggable( "option", "disabled", false )
                        .data('edit', true);
                    $(document).unbind('keyup', enable_edit); // we only need to enable the edit once
                }
            }
            
            $(document).bind('keyup', enable_edit);
        } else {
            div.resizable( "option", "disabled", false )
                .draggable( "option", "disabled", false );
        }
        
        div.css(BOX_SELECTED)
            .data('selected', true);

        jQuery(document).trigger('boxselected', []);
    },

    deselectBox: function() {
        // disable resizing
        jQuery(this.box.div).resizable( "option", "disabled", true )
            .draggable( "option", "disabled", true )
            .data('edit', false)
            .css(BOX_DESELECTED)
            .data('selected', false);

        jQuery(document).trigger('boxdeselected', []);
    },

    removeBox: function() {
        if (this.box) {
            this.box_layer.removeMarker(this.box);
            this.box = null;
        }
    },
    
    // move the box based on pixel locations
    moveBox: function (minx, miny, maxx, maxy) {
        if (!this.box) return;

        var min = this.map.getLonLatFromPixel(new OpenLayers.Pixel(minx, miny));
        var max = this.map.getLonLatFromPixel(new OpenLayers.Pixel(maxx, maxy));
        this.box.bounds = new OpenLayers.Bounds(min.lon, min.lat, max.lon, max.lat);

        jQuery(document).trigger('movebox', [this.box.bounds]);
    },
    
    stopEdit: function() {
        if (!this.box) return;

        jQuery(this.box.div).data('edit', false);
    },

    CLASS_NAME: "OpenLayers.Control.BoxDraw"
});


// The box chosen when the user draws a new area
OpenLayers.Handler.DrawBox = OpenLayers.Class(OpenLayers.Handler.Box, {

    // override the startBox so that it displays with the correct style
    startBox: function (xy) {
        OpenLayers.Handler.Box.prototype.startBox.apply(this, arguments);
        $(this.zoomBox).css(BOX_SELECTED);
    },

    CLASS_NAME: "OpenLayers.Handler.DrawBox"
});