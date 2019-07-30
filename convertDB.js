const jsonfile = require('jsonfile')


var listeNoeuds = [];
const url = './réseau RRF.kml';   //'./client/public/Noeuds.xlsx';

 
//const file = './data.json'

var tj = require('@mapbox/togeojson'),
    fs = require('fs'),
    // node doesn't have xml parsing or a dom. use xmldom
    DOMParser = require('xmldom').DOMParser;

var kml = new DOMParser().parseFromString(fs.readFileSync(url, 'utf8'));

var converted = tj.kml(kml);

var convertedWithStyles = tj.kml(kml, { styles: true });

var NdsArray = convertedWithStyles.features;


var newNd = {};
var Nd1 = JSON.parse(fs.readFileSync('Noeuds.1.json')); 

NdsArray.map(nds => {
    newNd.name = nds.properties.name;
    newNd.location = nds.geometry.coordinates;
    newNd.type = nds.properties.styleUrl;
    newNd.info = nds.properties.description;
    newNd.sysop = '';
    if ((newNd.name !== "RRF")){
        listeNoeuds.push(newNd);
    }
    newNd = {};
});


    listeNoeuds.map(nd =>{
        if (nd.type[0] === '#'){
            switch ( nd.type){
                case '#icon-503-4186F0':
                    nd.type='relais';
                    break;
                case '#icon-503-DB4436':
                    nd.type='link';
                    break;
                case '#icon-503-F4EB37':
                    nd.type='projet';
                    break;
                case '#icon-503-F8971B':
                    nd.type='intermittent';
                    break;
                case '#icon-960-3F5BA9':
                    nd.type='allstar';
                    break;
                case '#icon-960-7C3592':
                    nd.type='serveur';
                    break;
                case '#icon-959-DB4436':
                    nd.type='hotspot';
                    break;
                case 'hotspot':
                    nd.type='hotspot';
                    break;
                default :
                    nd.type='divers';
            }
        }
        var l = nd.location;
        nd.lat = l[1];
        nd.lon = l[0];
        nd.location = l[0].toString().concat(",",l[1]);

        if (nd.info && nd.info !== '') {
            var info = nd.info.split('<br>')[0];
            var sysop = nd.info.split('<br>')[1];
        }
        nd.info = (info ? info.replace(/\\n/g,"<br>") : info);
        nd.sysop = sysop;
        
    })

Nd1.map( nd => {
    listeNoeuds.push(nd);
})

jsonfile.writeFile('./Noeuds.json', listeNoeuds, function (err) {
    if (err) console.error(err)
  })

jsonfile.writeFile('./client/build/Noeuds.json', listeNoeuds, function (err) {
    if (err) console.error(err)
  })

jsonfile.writeFile('/home/PUBLIC/NodesList/Noeuds.json', listeNoeuds, function (err) {
    if (err) console.error(err)
  })
