# Third party modules
import selector                        # for URI based dispatch

# Custom modules
import medin

# Create a WSGI application
application = selector.Selector(consume_path=False)

# provide a choice of templates
application.add('[/]', GET=medin.template)

# the default entry point for the search
application.add('/{template}[/]', GET=medin.search)

# display and navigate through the result set
application.add('/{template}/results', GET=medin.results)

# display the metadata
application.add('/{template}/metadata/{gid:digits}', GET=medin.metadata)

