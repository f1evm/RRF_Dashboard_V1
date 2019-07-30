/* Configuration du TABLEAU DE BORD RRF */

/* Port du serveur */
const PORT = 443;

/* Liste et paramètres des salons */

  const SALONS = [
    {name: "RRF", 
        file: "",
        url: "http://rrf.f5nlg.ovh", 
        api:"/api/svxlink/RRF", 
        stream:"/realtime/RRF", 
        audioUrl:"http://rrf2.f5nlg.ovh:8000",
        audioStream:"/stream"
    },
    {name: "technique", 
        file: "",
        url:"http://rrf.f5nlg.ovh", 
        api: "/api/svxlink/technique", 
        stream:"/realtime/technique", 
        audioUrl:"http://rrf2.f5nlg.ovh:8000",
        audioStream:"/technique"
    },
    {name: "bavardage",
	    file: "",
	    url: "http://fon.f1tzo.com:8080",
	    api: "/api/svxlink/bavardage",
	    stream: "/realtime/bavardage",
	    audioUrl: "http://rrf2.f5nlg.ovh:8000",
	    audioStream: "/bavardage"
    }, 
    {name: "local",
	    file: "",
	    url: "http://fon.f1tzo.com:8080",
	    api: "/api/svxlink/local",
	    stream: "/realtime/local",
	    audioUrl: "http://rrf2.f5nlg.ovh:8000",
	    audioStream: "/local"
    },
    {name: "satellite", 
        file: "",
	    url:"http://rrf2.f5nlg.ovh:8080", 
        api: "/api/svxlink/satellite", 
        stream:"/realtime/satellite", 
        audioUrl:"http://rrf2.f5nlg.ovh:8000",
        audioStream:"/satellite"
    },
    {name: "FON",
	    file: "",
	    url: "http://localhost:8008",
	    api: "api/svxlink/FON",
	    stream: "/realtime/FON",
	    audioUrl: "http://f1tzo.com:8000",
	    audioStream: "/stream"
    }
  ];
  
/* Liste et paramètres des cartes utilisées dans la vue "Carte" */

const CARTO = [
    {name: "jawg-streets",
        url: "https://tile.jawg.io/jawg-streets/{z}/{x}/{y}.png?access-token=2WFyabqzwhtc4oCYGid2R8ftFUKJy0evKTXaJ7n0xa7182LmkLehTy1atz2TKjju",
        accessKey: "",
        attribution: '&copy; F1EVM - <a href="https://www.jawg.io" target="_blank">&copy; Jawg</a> - <a href="https://www.openstreetmap.org" target="_blank">&copy; OpenStreetMap</a>&nbsp;contributors'
    },
    {name: "osm.ArcGIS",
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/Specialty/DeLorme_World_Base_Map/MapServer/tile/{z}/{y}/{x}",
        accessKey: "",
        attribution: '&copy; F1EVM - &copy; <a href="http://osm.org/copyright"  target="_blank">OpenStreetMap</a> contributors'
    },
    {name: "osm.Mapnik",
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        accessKey: "",
        attribution: '&copy; F1EVM - &copy; <a href="http://osm.org/copyright"  target="_blank">OpenStreetMap</a> contributors'
    },
    {name: "osm.BlackAndWhite",
        url: "https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png",
        accessKey: "",
        attribution: '&copy; F1EVM - &copy; <a href="http://osm.org/copyright"  target="_blank">OpenStreetMap</a> contributors'
    }
  ];

/* Liste des événements */
/* Ne pas modifier - Réservé au développement */
const EVENTS = [
	'ReflectorLogic.MsgNodeList',
	'ReflectorLogic.MsgNodeLeft',
	'ReflectorLogic.MsgNodeJoined',
	'ReflectorLogic.MsgTalkerStart',
	'ReflectorLogic.MsgTalkerStop',
	'spotnik.network'
];

module.exports.PORT=PORT;
module.exports.SALONS=SALONS;
module.exports.CARTO=CARTO;
module.exports.EVENTS=EVENTS;
