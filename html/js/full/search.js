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

var areas = {"GBE": {"bbox": [-6.45,49.86,1.77,55.81], "name": "England"}, "GBS": {"bbox": [-8.65,54.63,-0.73,60.86], "name": "Scotland"}, "GBW": {"bbox": [-5.47,51.37,-2.65,53.43], "name": "Wales"}, "GBI": {"bbox": [-8.17,54.03,-5.43,55.24], "name": "Northern Ireland"}, "BD": {"bbox": [88.028327941894503, 20.743331909179702, 92.673683166503906, 26.6319484710693], "name": "Bangladesh"}, "BE": {"bbox": [2.5469436645507799, 49.493602752685497, 6.4038615226745597, 51.505451202392599], "name": "Belgium"}, "BF": {"bbox": [-5.5189166069030797, 9.4011068344116193, 2.40539526939392, 15.082594871521], "name": "Burkina Faso"}, "BG": {"bbox": [22.371162414550799, 41.242076873779297, 28.612169265747099, 44.217647552490199], "name": "Bulgaria"}, "BA": {"bbox": [15.7189435958862, 42.546104431152301, 19.622226715087901, 45.239200592041001], "name": "Bosnia and Herzegovina"}, "BB": {"bbox": [-59.648929595947301, 13.039842605590801, -59.420372009277301, 13.327258110046399], "name": "Barbados"}, "WF": {"bbox": [-178.20680236816401, -14.3286018371582, -176.12875366210901, -13.2142496109009], "name": "Wallis and Futuna"}, "BL": {"bbox": [-62.8763618469238, 17.883939743041999, -62.792404174804702, 17.932689666748001], "name": "Saint Barth\u00e9lemy"}, "BM": {"bbox": [-64.896064758300795, 32.246631622314503, -64.651985168457003, 32.3790092468262], "name": "Bermuda"}, "BN": {"bbox": [114.07143402099599, 4.0030822753906197, 115.35945892334, 5.0471677780151403], "name": "Brunei"}, "BO": {"bbox": [-69.640769958496094, -22.896135330200199, -57.458091735839801, -9.6805658340454102], "name": "Bolivia"}, "BH": {"bbox": [50.454135894775398, 25.796859741210898, 50.664478302002003, 26.282585144043001], "name": "Bahrain"}, "BI": {"bbox": [28.993057250976602, -4.4657135009765598, 30.847732543945298, -2.3101227283477801], "name": "Burundi"}, "BJ": {"bbox": [0.774574935436249, 6.22574710845947, 3.8517012596130402, 12.418348312377899], "name": "Benin"}, "BT": {"bbox": [88.759712219238295, 26.707637786865199, 92.125205993652301, 28.323780059814499], "name": "Bhutan"}, "JM": {"bbox": [-78.366645812988295, 17.703550338745099, -76.180313110351605, 18.526979446411101], "name": "Jamaica"}, "BV": {"bbox": [3.33549857139587, -54.462387084960902, 3.48797631263733, -54.400318145752003], "name": "Bouvet Island"}, "BW": {"bbox": [19.999532699585, -26.907249450683601, 29.360784530639599, -17.780809402465799], "name": "Botswana"}, "WS": {"bbox": [-172.79861450195301, -14.040940284729, -171.41572570800801, -13.4322052001953], "name": "Samoa"}, "BR": {"bbox": [-73.985549926757798, -33.7507133483887, -32.392993927002003, 5.2648777961731001], "name": "Brazil"}, "BS": {"bbox": [-78.995925903320298, 22.852739334106399, -74.423866271972699, 26.919246673583999], "name": "Bahamas"}, "JE": {"bbox": [-2.2600283622741699, 49.169826507568402, -2.0220825672149698, 49.265064239502003], "name": "Jersey"}, "BY": {"bbox": [23.176885604858398, 51.2564086914062, 32.770809173583999, 56.165813446044901], "name": "Belarus"}, "BZ": {"bbox": [-89.224822998046903, 15.8892984390259, -87.776969909667997, 18.496559143066399], "name": "Belize"}, "RU": {"bbox": [19.25, 41.188858032226598, -169.05000000000001, 81.857376098632798], "name": "Russia"}, "RW": {"bbox": [28.8567905426025, -2.8406794071197501, 30.895961761474599, -1.0534808635711701], "name": "Rwanda"}, "RS": {"bbox": [18.817018508911101, 42.232212066650398, 23.004999160766602, 46.181392669677699], "name": "Serbia"}, "TL": {"bbox": [124.046089172363, -9.4636278152465803, 127.308601379395, -8.1358327865600604], "name": "East Timor"}, "RE": {"bbox": [55.219081878662102, -21.3722133636475, 55.845043182372997, -20.8568515777588], "name": "Reunion"}, "TM": {"bbox": [46.684604644775398, 35.141078948974602, 66.684310913085895, 47.015617370605497], "name": "Turkmenistan"}, "TJ": {"bbox": [67.387123107910199, 36.674129486083999, 75.137229919433594, 41.042259216308601], "name": "Tajikistan"}, "RO": {"bbox": [20.269969940185501, 43.627296447753899, 29.691057205200199, 48.266952514648402], "name": "Romania"}, "TK": {"bbox": [-172.50035095214801, -9.3811120986938494, -171.21141052246099, -8.5536127090454102], "name": "Tokelau"}, "GW": {"bbox": [-16.717536926269499, 10.924263954162599, -13.6365203857422, 12.6807909011841], "name": "Guinea-Bissau"}, "GU": {"bbox": [144.619216918945, 13.2406091690063, 144.95399475097699, 13.6523342132568], "name": "Guam"}, "GT": {"bbox": [-92.236305236816406, 13.737300872802701, -88.223190307617202, 17.815223693847699], "name": "Guatemala"}, "GS": {"bbox": [-38.0211791992188, -59.479263305664098, -26.229322433471701, -53.970462799072301], "name": "South Georgia and the South Sandwich Islands"}, "GR": {"bbox": [19.374443054199201, 34.809635162353501, 28.246391296386701, 41.757423400878899], "name": "Greece"}, "GQ": {"bbox": [9.34686374664307, 0.92085993289947499, 11.3357257843018, 2.3469893932342498], "name": "Equatorial Guinea"}, "GP": {"bbox": [-61.544769287109403, 15.8675632476807, -60.999996185302699, 16.516851425170898], "name": "Guadeloupe"}, "JP": {"bbox": [122.938522338867, 24.249469757080099, 145.82090759277301, 45.523147583007798], "name": "Japan"}, "GY": {"bbox": [-61.384769439697301, 1.1750798225402801, -56.4802436828613, 8.5575685501098597], "name": "Guyana"}, "GG": {"bbox": [-2.6824724674224898, 49.422412872314503, -2.5091106891632098, 49.514698028564503], "name": "Guernsey"}, "GF": {"bbox": [-54.542518615722699, 2.1270935535430899, -51.613945007324197, 5.7764968872070304], "name": "French Guiana"}, "GE": {"bbox": [40.0101318359375, 41.053192138671903, 46.725975036621101, 43.586502075195298], "name": "Georgia"}, "GD": {"bbox": [-61.799980163574197, 11.992372512817401, -61.573825836181598, 12.3193960189819], "name": "Grenada"}, "GB": {"bbox": [-8.6235561370849592, 49.9061889648438, 1.75900018215179, 60.845809936523402], "name": "United Kingdom"}, "GA": {"bbox": [8.6954698562622106, -3.9788062572479199, 14.5023488998413, 2.3226122856140101], "name": "Gabon"}, "SV": {"bbox": [-90.128669738769503, 13.148677825927701, -87.692153930664105, 14.445068359375], "name": "El Salvador"}, "GN": {"bbox": [-14.9266204833984, 7.1935524940490696, -7.6410703659057599, 12.676221847534199], "name": "Guinea"}, "GM": {"bbox": [-16.8250827789307, 13.064250946044901, -13.7977914810181, 13.8265724182129], "name": "Gambia"}, "GL": {"bbox": [-73.042037963867202, 59.777397155761697, -11.3123178482056, 83.627365112304702], "name": "Greenland"}, "GI": {"bbox": [-5.3572506904602104, 36.1124076843262, -5.33963823318481, 36.1598091125488], "name": "Gibraltar"}, "GH": {"bbox": [-3.25542044639587, 4.7367224693298304, 1.1917811632156401, 11.173302650451699], "name": "Ghana"}, "OM": {"bbox": [51.881996154785199, 16.645746231079102, 59.836585998535199, 26.387975692748999], "name": "Oman"}, "TN": {"bbox": [7.5248322486877397, 30.240413665771499, 11.598278999328601, 37.543922424316399], "name": "Tunisia"}, "JO": {"bbox": [34.959991455078097, 29.185884475708001, 39.301174163818402, 33.367671966552699], "name": "Jordan"}, "HR": {"bbox": [13.4932203292847, 42.435882568359403, 19.427391052246101, 46.5387573242188], "name": "Croatia"}, "HT": {"bbox": [-74.478591918945298, 18.0210285186768, -71.613349914550795, 20.087821960449201], "name": "Haiti"}, "HU": {"bbox": [16.1118869781494, 45.743602752685497, 22.906002044677699, 48.5856742858887], "name": "Hungary"}, "HK": {"bbox": [113.83773803710901, 22.153247833251999, 114.434761047363, 22.559780120849599], "name": "Hong Kong"}, "HN": {"bbox": [-89.350807189941406, 12.982409477233899, -83.155387878417997, 16.510259628295898], "name": "Honduras"}, "HM": {"bbox": [72.596527099609403, -53.192005157470703, 73.859153747558594, -52.909408569335902], "name": "Heard Island and McDonald Islands"}, "VE": {"bbox": [-73.354087829589801, 0.62631088495254505, -59.803775787353501, 12.201904296875], "name": "Venezuela"}, "PR": {"bbox": [-67.942733764648395, 17.9264030456543, -65.242729187011705, 18.520168304443398], "name": "Puerto Rico"}, "PS": {"bbox": [34.2166557312012, 31.216539382934599, 35.573299407958999, 32.546390533447301], "name": "Palestinian Territory"}, "PW": {"bbox": [134.12319946289099, 6.8862771987915004, 134.653732299805, 7.7321119308471697], "name": "Palau"}, "PT": {"bbox": [-9.4959449768066406, 36.980659484863303, -6.1826934814453098, 42.145645141601598], "name": "Portugal"}, "SJ": {"bbox": [17.699386596679702, 79.220291137695298, 33.287338256835902, 80.762100219726605], "name": "Svalbard and Jan Mayen"}, "PY": {"bbox": [-62.647083282470703, -27.608741760253899, -54.259349822997997, -19.294038772583001], "name": "Paraguay"}, "IQ": {"bbox": [38.795883178710902, 29.069442749023398, 48.575920104980497, 37.378036499023402], "name": "Iraq"}, "PA": {"bbox": [-83.051452636718807, 7.1979050636291504, -77.174095153808594, 9.6375150680541992], "name": "Panama"}, "PF": {"bbox": [-152.877197265625, -27.6535739898682, -134.92980957031199, -7.9035720825195304], "name": "French Polynesia"}, "PG": {"bbox": [140.842849731445, -11.657862663269, 155.96347045898401, -1.3186388015747099], "name": "Papua New Guinea"}, "PE": {"bbox": [-81.326751708984403, -18.3497314453125, -68.677970886230497, -0.012976998463273], "name": "Peru"}, "PK": {"bbox": [60.878608703613303, 23.786718368530298, 77.840927124023395, 37.097003936767599], "name": "Pakistan"}, "PH": {"bbox": [116.93154907226599, 4.6433053016662598, 126.601531982422, 21.120613098144499], "name": "Philippines"}, "PN": {"bbox": [-128.34646606445301, -24.6725673675537, -124.772834777832, -24.315862655639599], "name": "Pitcairn"}, "PL": {"bbox": [14.122998237609901, 49.006359100341797, 24.150751113891602, 54.839141845703097], "name": "Poland"}, "PM": {"bbox": [-56.420661926269503, 46.786033630371101, -56.252986907958999, 47.146289825439503], "name": "Saint Pierre and Miquelon"}, "ZM": {"bbox": [21.9993686676025, -18.079475402831999, 33.705711364746101, -8.2243585586547905], "name": "Zambia"}, "EH": {"bbox": [-17.103185653686499, 20.774154663085898, -8.6702747344970703, 27.669677734375], "name": "Western Sahara"}, "EE": {"bbox": [21.837581634521499, 57.516185760497997, 28.209974288940401, 59.676231384277301], "name": "Estonia"}, "EG": {"bbox": [24.6981086730957, 21.725385665893601, 35.794868469238303, 31.6673374176025], "name": "Egypt"}, "ZA": {"bbox": [16.4580173492432, -34.839832305908203, 32.8959770202637, -22.126609802246101], "name": "South Africa"}, "EC": {"bbox": [-91.661888122558594, -4.9988236427307102, -75.184577941894503, 1.41893422603607], "name": "Ecuador"}, "IT": {"bbox": [6.6148881912231401, 36.652774810791001, 18.51344871521, 47.095203399658203], "name": "Italy"}, "VN": {"bbox": [102.14821624755901, 8.5596094131469709, 109.464653015137, 23.388837814331101], "name": "Vietnam"}, "SB": {"bbox": [155.50859069824199, -11.8505563735962, 166.980880737305, -6.5896100997924796], "name": "Solomon Islands"}, "ET": {"bbox": [32.999935150146499, 3.4024217128753702, 47.986183166503899, 14.893751144409199], "name": "Ethiopia"}, "SO": {"bbox": [40.986587524414098, -1.6748682260513299, 51.412643432617202, 11.9791669845581], "name": "Somalia"}, "ZW": {"bbox": [25.237024307251001, -22.417741775512699, 33.056312561035199, -15.608833312988301], "name": "Zimbabwe"}, "SA": {"bbox": [34.495685577392599, 15.6142482757568, 55.666587829589801, 32.158340454101598], "name": "Saudi Arabia"}, "ES": {"bbox": [-18.169641494751001, 27.638816833496101, 4.31538963317871, 43.791725158691399], "name": "Spain"}, "ER": {"bbox": [36.438774108886697, 12.3595533370972, 43.134647369384801, 18.003086090087901], "name": "Eritrea"}, "ME": {"bbox": [18.4613037109375, 41.8501586914062, 20.3588352203369, 43.570140838622997], "name": "Montenegro"}, "MD": {"bbox": [26.618940353393601, 45.468879699707003, 30.135448455810501, 48.4901733398438], "name": "Moldova"}, "MG": {"bbox": [43.224868774414098, -25.608955383300799, 50.483787536621101, -11.945431709289601], "name": "Madagascar"}, "MF": {"bbox": [-63.1527709960938, 18.052228927612301, -63.012989044189503, 18.130357742309599], "name": "Saint Martin"}, "MA": {"bbox": [-13.1685876846313, 27.662111282348601, -0.99174988269805897, 35.928031921386697], "name": "Morocco"}, "MC": {"bbox": [7.3863883018493697, 43.727542877197301, 7.4392933845520002, 43.7730522155762], "name": "Monaco"}, "UZ": {"bbox": [55.996631622314503, 37.184436798095703, 73.132286071777301, 45.575008392333999], "name": "Uzbekistan"}, "MM": {"bbox": [92.189270019531193, 9.7845811843872106, 101.176795959473, 28.543251037597699], "name": "Myanmar"}, "ML": {"bbox": [-12.2426156997681, 10.1595115661621, 4.2449688911437997, 25.000005722045898], "name": "Mali"}, "MO": {"bbox": [113.528938293457, 22.180385589599599, 113.565841674805, 22.222337722778299], "name": "Macao"}, "MN": {"bbox": [87.749649047851605, 41.567630767822301, 119.924324035645, 52.154254913330099], "name": "Mongolia"}, "MH": {"bbox": [165.52490234375, 5.5876383781433097, 171.93182373046901, 14.620001792907701], "name": "Marshall Islands"}, "MK": {"bbox": [20.464693069458001, 40.860187530517599, 23.038141250610401, 42.361812591552699], "name": "Macedonia"}, "MU": {"bbox": [56.512710571289098, -20.525720596313501, 63.5001831054688, -10.3192539215088], "name": "Mauritius"}, "MT": {"bbox": [14.1915826797485, 35.810268402099602, 14.577640533447299, 36.08203125], "name": "Malta"}, "MW": {"bbox": [32.673942565917997, -17.125001907348601, 35.916828155517599, -9.3675394058227504], "name": "Malawi"}, "MV": {"bbox": [72.693206787109403, -0.69269406795501698, 73.637290954589801, 7.0983614921569798], "name": "Maldives"}, "MQ": {"bbox": [-61.230125427246101, 14.392260551452599, -60.815505981445298, 14.8788204193115], "name": "Martinique"}, "MP": {"bbox": [145.12680053710901, 14.1073598861694, 145.84942626953099, 18.8050861358643], "name": "Northern Mariana Islands"}, "MS": {"bbox": [-62.242588043212898, 16.671003341674801, -62.146415710449197, 16.8173313140869], "name": "Montserrat"}, "MR": {"bbox": [-17.066524505615199, 14.7155456542969, -4.8276734352111799, 27.2980766296387], "name": "Mauritania"}, "IM": {"bbox": [-4.7987227439880398, 54.055912017822301, -4.3114991188049299, 54.419731140136697], "name": "Isle of Man"}, "UG": {"bbox": [29.573249816894499, -1.4840501546859699, 35.036056518554702, 4.2144279479980504], "name": "Uganda"}, "TZ": {"bbox": [29.327165603637699, -11.7456970214844, 40.443225860595703, -0.99073588848114003], "name": "Tanzania"}, "MY": {"bbox": [99.643440246582003, 0.855221927165985, 119.26751708984401, 7.3634176254272496], "name": "Malaysia"}, "MX": {"bbox": [-118.453964233398, 14.532864570617701, -86.703376770019503, 32.716766357421903], "name": "Mexico"}, "IL": {"bbox": [34.230442047119098, 29.496635437011701, 35.876808166503899, 33.340141296386697], "name": "Israel"}, "FR": {"bbox": [-5.1422228813171396, 41.371574401855497, 9.5615577697753906, 51.092811584472699], "name": "France"}, "IO": {"bbox": [71.259963989257798, -7.4380288124084499, 72.493171691894503, -5.26833248138428], "name": "British Indian Ocean Territory"}, "SH": {"bbox": [-14.421231269836399, -16.019546508789102, -5.6387524604797399, -7.8878145217895499], "name": "Saint Helena"}, "FI": {"bbox": [19.520717620849599, 59.808773040771499, 31.580945968627901, 70.096061706542997], "name": "Finland"}, "FJ": {"bbox": [177.12936401367199, -20.675971984863299, -178.42445373535199, -12.480109214782701], "name": "Fiji"}, "FK": {"bbox": [-61.345199584960902, -52.360519409179702, -57.712478637695298, -51.240642547607401], "name": "Falkland Islands"}, "FM": {"bbox": [138.052810668945, 5.2653322219848597, 163.034912109375, 9.6363620758056605], "name": "Micronesia"}, "FO": {"bbox": [-7.4580006599426296, 61.394935607910199, -6.3995823860168501, 62.400753021240199], "name": "Faroe Islands"}, "NI": {"bbox": [-87.690322875976605, 10.7075414657593, -82.73828125, 15.025910377502401], "name": "Nicaragua"}, "NL": {"bbox": [3.3625557422637899, 50.753913879394503, 7.22794485092163, 53.512203216552699], "name": "Netherlands"}, "NO": {"bbox": [4.6501665115356401, 57.977912902832003, 30.945558547973601, 71.188117980957003], "name": "Norway"}, "NA": {"bbox": [11.715628623962401, -28.971433639526399, 25.2567043304443, -16.9598903656006], "name": "Namibia"}, "VU": {"bbox": [166.52496337890599, -20.248947143554702, 169.90480041503901, -13.073442459106399], "name": "Vanuatu"}, "NC": {"bbox": [163.56465148925801, -22.698003768920898, 168.129150390625, -19.549776077270501], "name": "New Caledonia"}, "NE": {"bbox": [0.166249975562096, 11.696973800659199, 15.995644569396999, 23.525028228759801], "name": "Niger"}, "NF": {"bbox": [167.91638183593801, -29.052726745605501, 167.99998474121099, -28.992387771606399], "name": "Norfolk Island"}, "NG": {"bbox": [2.6684317588806201, 4.2771434783935502, 14.6800746917725, 13.8920087814331], "name": "Nigeria"}, "NZ": {"bbox": [166.71553039550801, -47.2860298156738, -180, -34.389663696289098], "name": "New Zealand"}, "NP": {"bbox": [80.056259155273395, 26.3567199707031, 88.1993408203125, 30.433393478393601], "name": "Nepal"}, "NR": {"bbox": [166.89901733398401, -0.55233311653137196, 166.9453125, -0.50430589914321899], "name": "Nauru"}, "NU": {"bbox": [-169.95307922363301, -19.1455593109131, -169.78138732910199, -18.963331222534201], "name": "Niue"}, "CK": {"bbox": [-161.093673706055, -21.944166183471701, -157.31211853027301, -10.0231122970581], "name": "Cook Islands"}, "XK": {"bbox": [19.9774780273438, 41.856365203857401, 21.8033542633057, 43.268257141113303], "name": "Kosovo"}, "CI": {"bbox": [-8.59930324554443, 4.3570661544799796, -2.4948966503143302, 10.7366437911987], "name": "Ivory Coast"}, "CH": {"bbox": [5.9574713706970197, 45.825687408447301, 10.491473197936999, 47.805335998535199], "name": "Switzerland"}, "CO": {"bbox": [-81.728118896484403, -4.22586965560913, -66.869827270507798, 13.38050365448], "name": "Colombia"}, "CN": {"bbox": [73.557678222656193, 15.775414466857899, 134.77394104003901, 53.560867309570298], "name": "China"}, "CM": {"bbox": [8.4947614669799805, 1.65254783630371, 16.1921195983887, 13.0780572891235], "name": "Cameroon"}, "CL": {"bbox": [-109.45590209960901, -55.916355133056598, -66.417549133300795, -17.5075492858887], "name": "Chile"}, "CC": {"bbox": [96.821266174316406, -12.185417175293001, 96.936096191406193, -12.114803314209], "name": "Cocos Islands"}, "CA": {"bbox": [-141.00001525878901, 41.675975799560497, -52.636283874511697, 83.110633850097699], "name": "Canada"}, "CG": {"bbox": [11.2050075531006, -5.0272235870361301, 18.6498413085938, 3.7030823230743399], "name": "Congo - Brazzaville"}, "CF": {"bbox": [14.4200954437256, 2.2205135822296098, 27.463424682617202, 11.007570266723601], "name": "Central African Republic"}, "CD": {"bbox": [12.2041425704956, -13.455676078796399, 31.305913925170898, 5.3860988616943404], "name": "Congo - Kinshasa"}, "CZ": {"bbox": [12.0937032699585, 48.581375122070298, 18.852220535278299, 51.0536079406738], "name": "Czech Republic"}, "CY": {"bbox": [32.273078918457003, 34.563491821289098, 34.597923278808601, 35.701534271240199], "name": "Cyprus"}, "CX": {"bbox": [105.538932800293, -10.5757246017456, 105.719596862793, -10.4157762527466], "name": "Christmas Island"}, "CR": {"bbox": [-85.950637817382798, 8.0329732894897496, -82.555976867675795, 11.216820716857899], "name": "Costa Rica"}, "CV": {"bbox": [-25.358749389648398, 14.808020591735801, -22.669439315795898, 17.197181701660199], "name": "Cape Verde"}, "CU": {"bbox": [-84.957443237304702, 19.828079223632798, -74.131767272949205, 23.226045608520501], "name": "Cuba"}, "SZ": {"bbox": [30.794103622436499, -27.317104339599599, 32.137264251708999, -25.7196445465088], "name": "Swaziland"}, "SY": {"bbox": [35.727214813232401, 32.310657501220703, 42.385036468505902, 37.319145202636697], "name": "Syria"}, "KG": {"bbox": [69.276596069335895, 39.172824859619098, 80.283180236816406, 43.238227844238303], "name": "Kyrgyzstan"}, "KE": {"bbox": [33.908851623535199, -4.6780476570129403, 41.899082183837898, 5.0199389457702601], "name": "Kenya"}, "SR": {"bbox": [-58.0865669250488, 1.8311448097228999, -53.977485656738303, 6.0045466423034703], "name": "Suriname"}, "KI": {"bbox": [172.95521545410199, -11.437039375305201, -151.80386352539099, 1.9487781524658201], "name": "Kiribati"}, "KH": {"bbox": [102.339981079102, 10.409081459045399, 107.627738952637, 14.686418533325201], "name": "Cambodia"}, "KN": {"bbox": [-62.869564056396499, 17.095340728759801, -62.543258666992202, 17.420120239257798], "name": "Saint Kitts and Nevis"}, "KM": {"bbox": [43.215785980224602, -12.3878583908081, 44.5382270812988, -11.362380027771], "name": "Comoros"}, "ST": {"bbox": [6.4701690673828098, 0.024765998125076301, 7.4663748741149902, 1.7013231515884399], "name": "Sao Tome and Principe"}, "SK": {"bbox": [16.8477478027344, 47.728103637695298, 22.5704460144043, 49.603172302246101], "name": "Slovakia"}, "KR": {"bbox": [125.887100219727, 33.190940856933601, 129.58468627929699, 38.612453460693402], "name": "South Korea"}, "SI": {"bbox": [13.3830814361572, 45.413131713867202, 16.566003799438501, 46.877922058105497], "name": "Slovenia"}, "KP": {"bbox": [124.315872192383, 37.673324584960902, 130.67489624023401, 43.006061553955099], "name": "North Korea"}, "KW": {"bbox": [46.555549621582003, 28.524608612060501, 48.431480407714801, 30.095947265625], "name": "Kuwait"}, "SN": {"bbox": [-17.5352382659912, 12.307273864746101, -11.3558855056763, 16.691635131835898], "name": "Senegal"}, "SM": {"bbox": [12.401859283447299, 43.897911071777301, 12.515556335449199, 43.999809265136697], "name": "San Marino"}, "SL": {"bbox": [-13.3076324462891, 6.9296102523803702, -10.284236907959, 10.0000009536743], "name": "Sierra Leone"}, "SC": {"bbox": [46.204761505127003, -9.7538681030273402, 56.279514312744098, -4.2837162017822301], "name": "Seychelles"}, "KZ": {"bbox": [46.491851806640597, 40.936328887939503, 87.312683105468807, 55.451202392578097], "name": "Kazakhstan"}, "KY": {"bbox": [-81.432785034179702, 19.263025283813501, -79.727256774902301, 19.761703491210898], "name": "Cayman Islands"}, "SG": {"bbox": [103.638259887695, 1.25855576992035, 104.00747680664099, 1.4712781906127901], "name": "Singapore"}, "SE": {"bbox": [11.1186923980713, 55.337104797363303, 24.160892486572301, 69.062507629394503], "name": "Sweden"}, "SD": {"bbox": [21.838943481445298, 3.48638963699341, 38.580036163330099, 23.146892547607401], "name": "Sudan"}, "DO": {"bbox": [-72.003501892089801, 17.543155670166001, -68.319992065429702, 19.9298610687256], "name": "Dominican Republic"}, "DM": {"bbox": [-61.484115600585902, 15.201688766479499, -61.244144439697301, 15.6318101882935], "name": "Dominica"}, "DJ": {"bbox": [41.773468017578097, 10.909915924072299, 43.416976928710902, 12.706834793090801], "name": "Djibouti"}, "DK": {"bbox": [8.0756092071533203, 54.562381744384801, 15.1588354110718, 57.748424530029297], "name": "Denmark"}, "VG": {"bbox": [-64.715377807617202, 18.389976501464801, -64.268753051757798, 18.7572231292725], "name": "British Virgin Islands"}, "DE": {"bbox": [5.8656382560729998, 47.275772094726598, 15.0398902893066, 55.055641174316399], "name": "Germany"}, "YE": {"bbox": [42.532524108886697, 12.111081123352101, 54.530532836914098, 19.002336502075199], "name": "Yemen"}, "DZ": {"bbox": [-8.6738691329956108, 18.960025787353501, 11.979549407959, 37.093727111816399], "name": "Algeria"}, "US": {"bbox": [-124.733261108398, 24.544242858886701, -66.954795837402301, 49.388618469238303], "name": "United States"}, "UY": {"bbox": [-58.442726135253899, -34.980823516845703, -53.073928833007798, -30.082221984863299], "name": "Uruguay"}, "YT": {"bbox": [45.037952423095703, -13.0001335144043, 45.292957305908203, -12.648889541626], "name": "Mayotte"}, "UM": {"bbox": [-176.64511108398401, -0.38900604844093301, -74.999992370605497, 18.4209995269775], "name": "United States Minor Outlying Islands"}, "LB": {"bbox": [35.114273071289098, 33.053855895996101, 36.639198303222699, 34.6914253234863], "name": "Lebanon"}, "LC": {"bbox": [-61.074153900146499, 13.704776763916, -60.874198913574197, 14.1032466888428], "name": "Saint Lucia"}, "LA": {"bbox": [100.093048095703, 13.9100255966187, 107.69703674316401, 22.500391006469702], "name": "Laos"}, "TV": {"bbox": [176.11897277832, -7.4943618774414098, 178.69947814941401, -5.6687493324279803], "name": "Tuvalu"}, "TW": {"bbox": [119.53468322753901, 21.9018039703369, 122.000457763672, 25.298252105712901], "name": "Taiwan"}, "TT": {"bbox": [-61.923778533935497, 10.0361032485962, -60.517929077148402, 11.3383436203003], "name": "Trinidad and Tobago"}, "TR": {"bbox": [25.668498992919901, 35.8154106140137, 44.835002899169901, 42.107620239257798], "name": "Turkey"}, "LK": {"bbox": [79.652908325195298, 5.9168324470520002, 81.881294250488295, 9.8313627243041992], "name": "Sri Lanka"}, "LI": {"bbox": [9.4778032302856392, 47.055854797363303, 9.6321964263915998, 47.273532867431598], "name": "Liechtenstein"}, "LV": {"bbox": [20.9742736816406, 55.668853759765597, 28.241168975830099, 58.082313537597699], "name": "Latvia"}, "TO": {"bbox": [-175.68228149414099, -21.4550590515137, -173.90756225585901, -15.562986373901399], "name": "Tonga"}, "LT": {"bbox": [20.941524505615199, 53.901298522949197, 26.871946334838899, 56.446922302246101], "name": "Lithuania"}, "LU": {"bbox": [5.7345552444457999, 49.446578979492202, 6.5284729003906197, 50.184947967529297], "name": "Luxembourg"}, "LR": {"bbox": [-11.4920845031738, 4.3530564308166504, -7.3651123046875, 8.5517921447753906], "name": "Liberia"}, "LS": {"bbox": [27.029066085815401, -30.668966293335, 29.465763092041001, -28.572055816650401], "name": "Lesotho"}, "TH": {"bbox": [97.345626831054702, 5.6099991798400897, 105.63939666748, 20.463197708129901], "name": "Thailand"}, "TF": {"bbox": [50.170253753662102, -49.735191345214801, 77.598815917968807, -37.790718078613303], "name": "French Southern Territories"}, "TG": {"bbox": [-0.14732402563095101, 6.1044163703918501, 1.8066931962966899, 11.1389780044556], "name": "Togo"}, "TD": {"bbox": [13.473473548889199, 7.4410672187805202, 24.00266456604, 23.450372695922901], "name": "Chad"}, "TC": {"bbox": [-72.483879089355497, 21.422622680664102, -71.123634338378906, 21.9618816375732], "name": "Turks and Caicos Islands"}, "LY": {"bbox": [9.3870182037353498, 19.508041381835898, 25.1506156921387, 33.1690063476562], "name": "Libya"}, "VA": {"bbox": [12.4457054138184, 41.900272369384801, 12.458376884460399, 41.907444000244098], "name": "Vatican"}, "VC": {"bbox": [-61.459259033203097, 12.5810098648071, -61.1138725280762, 13.377835273742701], "name": "Saint Vincent and the Grenadines"}, "AE": {"bbox": [51.583324432372997, 22.633327484130898, 56.381664276122997, 26.084161758422901], "name": "United Arab Emirates"}, "AD": {"bbox": [1.4221107959747299, 42.435073852539098, 1.78038918972015, 42.658699035644503], "name": "Andorra"}, "AG": {"bbox": [-61.906429290771499, 16.996976852416999, -61.672416687011697, 17.7293891906738], "name": "Antigua and Barbuda"}, "AF": {"bbox": [60.478435516357401, 29.377470016479499, 74.879463195800795, 38.483425140380902], "name": "Afghanistan"}, "AI": {"bbox": [-63.172904968261697, 18.166812896728501, -62.971351623535199, 18.28342628479], "name": "Anguilla"}, "VI": {"bbox": [-65.038246154785199, 17.6817226409912, -64.565170288085895, 18.391750335693398], "name": "U.S. Virgin Islands"}, "IS": {"bbox": [-24.546525955200199, 63.393245697021499, -13.495813369751, 66.534645080566406], "name": "Iceland"}, "IR": {"bbox": [44.047271728515597, 25.064079284668001, 63.317478179931598, 39.777229309082003], "name": "Iran"}, "AM": {"bbox": [43.449775695800803, 38.397052764892599, 49.478397369384801, 41.301837921142599], "name": "Armenia"}, "AL": {"bbox": [19.293968200683601, 39.648353576660199, 21.068475723266602, 42.665615081787102], "name": "Albania"}, "AO": {"bbox": [11.679217338561999, -18.042078018188501, 24.0821228027344, -4.3768253326415998], "name": "Angola"}, "AN": {"bbox": [-69.157218933105497, 12.017148017883301, -68.192298889160199, 12.385673522949199], "name": "Netherlands Antilles"}, "AQ": {"bbox": [-179.999923706055, -89.999908447265597, 179.999923706055, -60.515525817871101], "name": "Antarctica"}, "AS": {"bbox": [-170.84133911132801, -14.382479667663601, -169.41606140136699, -14.1621150970459], "name": "American Samoa"}, "AR": {"bbox": [-73.582984924316406, -55.061321258544901, -53.591827392578097, -21.781274795532202], "name": "Argentina"}, "AU": {"bbox": [112.91104888916, -43.643974304199197, 153.63928222656199, -10.062803268432599], "name": "Australia"}, "AT": {"bbox": [9.5359144210815394, 46.378025054931598, 17.162725448608398, 49.017063140869098], "name": "Austria"}, "AW": {"bbox": [-70.061141967773395, 12.4060916900635, -69.866851806640597, 12.630619049072299], "name": "Aruba"}, "IN": {"bbox": [68.186676025390597, 6.7471385002136204, 97.403312683105497, 35.504230499267599], "name": "India"}, "AX": {"bbox": [19.649024963378899, 59.977935791015597, 20.290779113769499, 60.425117492675803], "name": "Aland Islands"}, "AZ": {"bbox": [44.7741088867188, 38.820186614990199, 50.370090484619098, 41.905647277832003], "name": "Azerbaijan"}, "IE": {"bbox": [-10.478557586669901, 51.451580047607401, -6.0023884773254403, 55.387924194335902], "name": "Ireland"}, "ID": {"bbox": [95.009323120117202, -10.9418621063232, 141.02183532714801, 5.9044175148010298], "name": "Indonesia"}, "UA": {"bbox": [22.128885269165, 44.390407562255902, 40.2073974609375, 52.369369506835902], "name": "Ukraine"}, "QA": {"bbox": [50.757213592529297, 24.4829406738281, 51.636646270752003, 26.1547241210938], "name": "Qatar"}, "MZ": {"bbox": [30.2173156738281, -26.868688583373999, 40.843002319335902, -10.471881866455099], "name": "Mozambique"}};
var country_ids = ["AF", "AX", "AL", "DZ", "AS", "AD", "AO", "AI", "AQ", "AG", "AR", "AM", "AW", "AU", "AT", "AZ", "BS", "BH", "BD", "BB", "BY", "BE", "BZ", "BJ", "BM", "BT", "BO", "BA", "BW", "BV", "BR", "IO", "VG", "BN", "BG", "BF", "BI", "KH", "CM", "CA", "CV", "KY", "CF", "TD", "CL", "CN", "CX", "CC", "CO", "KM", "CG", "CD", "CK", "CR", "HR", "CU", "CY", "CZ", "DK", "DJ", "DM", "DO", "TL", "EC", "EG", "SV", "GQ", "ER", "EE", "ET", "FK", "FO", "FJ", "FI", "FR", "GF", "PF", "TF", "GA", "GM", "GE", "DE", "GH", "GI", "GR", "GL", "GD", "GP", "GU", "GT", "GG", "GN", "GW", "GY", "HT", "HM", "HN", "HK", "HU", "IS", "IN", "ID", "IR", "IQ", "IE", "IM", "IL", "IT", "CI", "JM", "JP", "JE", "JO", "KZ", "KE", "KI", "XK", "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LI", "LT", "LU", "MO", "MK", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MQ", "MR", "MU", "YT", "MX", "FM", "MD", "MC", "MN", "ME", "MS", "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "AN", "NC", "NZ", "NI", "NE", "NG", "NU", "NF", "KP", "MP", "NO", "OM", "PK", "PW", "PS", "PA", "PG", "PY", "PE", "PH", "PN", "PL", "PT", "PR", "QA", "RE", "RO", "RU", "RW", "BL", "SH", "KN", "LC", "MF", "PM", "VC", "WS", "SM", "ST", "SA", "SN", "RS", "SC", "SL", "SG", "SK", "SI", "SB", "SO", "ZA", "GS", "KR", "ES", "LK", "SD", "SR", "SJ", "SZ", "SE", "CH", "SY", "TW", "TJ", "TZ", "TH", "TG", "TK", "TO", "TT", "TN", "TR", "TM", "TC", "TV", "VI", "UG", "UA", "AE", "GB", "US", "UM", "UY", "UZ", "VU", "VA", "VE", "VN", "WF", "EH", "YE", "ZM", "ZW"];
var british_ids = ['GB', 'GBE', 'GBS', 'GBW', 'GBI'];

function get_area_names(ids) {
    var names = [];
    for (var i = 0; i < ids.length; i++) {
        var id = ids[i];
        names.push([id, areas[id]['name']]);
    }

    return names;
}

function get_countries() {
    return get_area_names(country_ids);
}

function get_british_isles() {
    return get_area_names(british_ids);
}

function get_bbox(id) {
    // returns undefined if the id is invalid
    var area = areas[id];
    if (area)
        return area['bbox'];
    return area;
}