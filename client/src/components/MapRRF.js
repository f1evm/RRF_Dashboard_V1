import React, { Component } from 'react'
import {Map, TileLayer, Marker, Popup, LayersControl, ScaleControl} from 'react-leaflet'
import Control from 'react-leaflet-control';
import { icon } from 'leaflet'

const { BaseLayer, Overlay } = LayersControl

const txIconUrl = 'images/nodeIconGreenTX.png';
const linkIconUrl = 'images/nodeIconRed.png';
const nodeIconUrl = 'images/nodeIconLightBlue.png';
const grayIconUrl = 'images/nodeIconGray.png';
const relaisIconUrl = 'images/nodeIconBlue.png';
const projetIconUrl = 'images/nodeIconYellow.png';
const intermittentIconUrl = 'images/nodeIconOrange.png';
const rrfIconUrl = 'images/starBlue.png';
const hotspotIconUrl = 'images/hotspotIcon.png';
const hotspotDisconnectedIconUrl = 'images/hotspotDisconnectedIcon.png';
const allstarIconUrl = 'images/starYellow.png';


const txIcon = icon({
  iconUrl: process.env.PUBLIC_URL + txIconUrl,
  iconRetinaUrl: process.env.PUBLIC_URL + txIconUrl,
  shadowUrl: process.env.PUBLIC_URL + 'images/marker-shadow.png',
  iconSize:    [40, 40],
  iconAnchor:  [20, 39],
  popupAnchor: [1, -32],
  tooltipAnchor: [15, -28],
  shadowSize:  [41, 41],
  shadowAnchor: [13, 40]
});

/*
const templateIcon = icon({
  iconUrl:       process.env.PUBLIC_URL + 'images/nodeIconLightBlue.png',
  iconRetinaUrl: process.env.PUBLIC_URL + 'images/nodeIconLightBlue.png',
  shadowUrl:     process.env.PUBLIC_URL + 'images/marker-shadow.png',
  iconSize:    [32, 32],
  iconAnchor:  [15, 31],
  popupAnchor: [1, -32],
  tooltipAnchor: [15, -28],
  shadowSize:  [41, 41],
  shadowAnchor: [13, 40]
});
*/

const nodeIcon = icon({
    iconUrl:       process.env.PUBLIC_URL + nodeIconUrl,
    iconRetinaUrl: process.env.PUBLIC_URL + nodeIconUrl,
    shadowUrl:     process.env.PUBLIC_URL + 'images/marker-shadow.png',
    iconSize:    [20, 20],
    iconAnchor:  [10, 19],
    popupAnchor: [1, -20],
    tooltipAnchor: [15, -28],
    shadowSize:  [29, 29],
    shadowAnchor: [10, 28]
});

const grayIcon = icon({
  iconUrl:       process.env.PUBLIC_URL + grayIconUrl,
  iconRetinaUrl: process.env.PUBLIC_URL + grayIconUrl,
  shadowUrl:     process.env.PUBLIC_URL + 'images/marker-shadow.png',
  iconSize:    [20, 20],
  iconAnchor:  [10, 19],
  popupAnchor: [1, -20],
  tooltipAnchor: [15, -28],
  shadowSize:  [29, 29],
  shadowAnchor: [10, 28]
});

var  linkIcon =icon({
  iconUrl:       process.env.PUBLIC_URL + linkIconUrl,
  iconRetinaUrl: process.env.PUBLIC_URL + linkIconUrl,
  shadowUrl:     process.env.PUBLIC_URL + 'images/marker-shadow.png',
  iconSize:    [20, 20],
  iconAnchor:  [10, 19],
  popupAnchor: [1, -20],
  tooltipAnchor: [15, -28],
  shadowSize:  [29, 29],
  shadowAnchor: [10, 28]
});

var  relaisIcon =icon({
  iconUrl:       process.env.PUBLIC_URL + relaisIconUrl,
  iconRetinaUrl: process.env.PUBLIC_URL + relaisIconUrl,
  shadowUrl:     process.env.PUBLIC_URL + 'images/marker-shadow.png',
  iconSize:    [20, 20],
  iconAnchor:  [10, 19],
  popupAnchor: [1, -20],
  tooltipAnchor: [15, -28],
  shadowSize:  [29, 29],
  shadowAnchor: [10, 28]
});

var  projetIcon =icon({
  iconUrl:       process.env.PUBLIC_URL + projetIconUrl,
  iconRetinaUrl: process.env.PUBLIC_URL + projetIconUrl,
  shadowUrl:     process.env.PUBLIC_URL + 'images/marker-shadow.png',
  iconSize:    [20, 20],
  iconAnchor:  [10, 19],
  popupAnchor: [1, -20],
  tooltipAnchor: [15, -28],
  shadowSize:  [29, 29],
  shadowAnchor: [10, 28]
});

var  intermittentIcon =icon({
  iconUrl:       process.env.PUBLIC_URL + intermittentIconUrl,
  iconRetinaUrl: process.env.PUBLIC_URL + intermittentIconUrl,
  shadowUrl:     process.env.PUBLIC_URL + 'images/marker-shadow.png',
  iconSize:    [20, 20],
  iconAnchor:  [10, 19],
  popupAnchor: [1, -20],
  tooltipAnchor: [15, -28],
  shadowSize:  [29, 29],
  shadowAnchor: [10, 28]
});


var  rrfIcon =icon({
  iconUrl:       process.env.PUBLIC_URL + rrfIconUrl,
  iconRetinaUrl: process.env.PUBLIC_URL + rrfIconUrl,
  shadowUrl:     '',
  iconSize:    [20, 20],
  iconAnchor:  [10, 10],
  popupAnchor: [1, -12],
  tooltipAnchor: [15, -12],
  shadowSize:  [25, 25],
  shadowAnchor: [8, 25]
});

var  allstarIcon =icon({
  iconUrl:       process.env.PUBLIC_URL + allstarIconUrl,
  iconRetinaUrl: process.env.PUBLIC_URL + allstarIconUrl,
  shadowUrl:     '',
  iconSize:    [20, 20],
  iconAnchor:  [10, 10],
  popupAnchor: [1, -12],
  tooltipAnchor: [15, -12],
  shadowSize:  [25, 25],
  shadowAnchor: [8, 25]
});

var  hotspotIcon =icon({
  iconUrl:       process.env.PUBLIC_URL + hotspotIconUrl,
  iconRetinaUrl: process.env.PUBLIC_URL + hotspotIconUrl,
  shadowUrl:     '',
  iconSize:    [18, 18],
  iconAnchor:  [10, 10],
  popupAnchor: [1, -12],
  tooltipAnchor: [20, -12],
  shadowSize:  [25, 25],
  shadowAnchor: [10, 30]
});

var  hotspotDisconnectedIcon =icon({
  iconUrl:       process.env.PUBLIC_URL + hotspotDisconnectedIconUrl,
  iconRetinaUrl: process.env.PUBLIC_URL + hotspotDisconnectedIconUrl,
  shadowUrl:     '',
  iconSize:    [18, 18],
  iconAnchor:  [8, 8],
  popupAnchor: [1, -12],
  tooltipAnchor: [15, -12],
  shadowSize:  [25, 25],
  shadowAnchor: [8, 25]
});



function testMkr (mkr){
  
  if (!mkr.callsign) mkr.callsign = '';
  if (!mkr.loc) mkr.loc = '';
  if (!mkr.town) mkr.town = '';
  if (!mkr.location) mkr.location = [0, 0];
  if (!mkr.lat) mkr.lat = 0;
  if (!mkr.lon) mkr.lon = 0;
  if (!mkr.alt) mkr.alt = 0;
  if (!mkr.info) mkr.info = '';
  return mkr;
}


function getIcon (type) {
  switch (type) {
    case "link":
      return linkIcon;
    case "relais":
      return relaisIcon;
    case "projet":
      return projetIcon;
    case "intermittent":
      return intermittentIcon;
    case "serveur":
      return rrfIcon;
    case "allstar":
      return allstarIcon;
    case "hotspot":
      return hotspotIcon;
    case "divers":
      return nodeIcon;
    default :
      return nodeIcon;
  }
}


class MarkerItem extends Component {
  
  render() {
    
    var MrkIcon = getIcon(this.props.marker.type);
    var mrk = this.props.marker;
    mrk = testMkr(mrk);
    var position = [mrk.lat, mrk.lon];
    
    if (!this.props.isConnected(mrk.name)){
      if(mrk.type !== 'hotspot') MrkIcon = grayIcon;
      if(mrk.type === 'hotspot') MrkIcon = hotspotDisconnectedIcon;
      if(mrk.type === 'serveur') MrkIcon = undefined;
    }
    const inf = mrk.info.split('<br>');
    const info = inf[0];
    const sysop = inf[1];
    

    return (
      <React.Fragment>
      {MrkIcon &&
        
      <Marker position={position} icon= {MrkIcon} 
        onMouseOver={(e) => {
          e.target.openPopup();
        }}
        onMouseOut={(e) => {
          e.target.closePopup();
        }}
        onclick={(e) => {
          this.props.openModal(mrk.name);
        }}
      >
        <Popup >
          Node : {mrk.name}<br />
          {/*Location : {mrk.town} ({mrk.loc})*/}<br />
          {info}
          {sysop && sysop !== '' && 
            <span><br />Sysop : {sysop}</span>
          }
        </Popup>
      </Marker>
      }</React.Fragment>
    )
  }
}

class MarkerTX extends Component {
  
  render() {
    
    var mrk = this.props.marker;
    mrk = testMkr(mrk);
    var position = [mrk.lat, mrk.lon];
    var MrkIcon = txIcon;
    const inf = mrk.info.split('<br>');
    const info = inf[0];
    const sysop = inf[1];
        

    return (
      
      <Marker zIndexOffset={1000} position={position} icon= {MrkIcon} 
        onMouseOver={(e) => {
          e.target.openPopup();
        }}
        onMouseOut={(e) => {
          e.target.closePopup();
        }}
        onclick={(e) => {
          this.props.openModal(mrk.name);
        }}
      >}
        <Popup >
          Node : {mrk.name}<br />

          {info}
          {sysop && sysop !== '' && 
            <span><br />Sysop : {sysop}</span>
          } 
        </Popup>
      </Marker>
    )
  }
}

/*
function ipLookUp() {
  fetch('/api/ip/json')
  .then(
      function success(response) {
          console.log('User\'s Location Data is ', response);
          console.log('User\'s Country', response.country);
          
},

      function fail(data, status) {
          console.log('Location Request failed.  Returned status of',
                      status);
      }
  );
}
*/

class MapRRF extends Component {
  
  constructor() {
    super();

    this.state = {
      position: {lat: 46, lng: 2.0},
      zoom: 6,
      TXmit:''
    }
  }

  isConnected = (name) => {
    var nodes =  this.props.nodes;
    var nod = nodes.find( nd => {return nd===name});
    return !!nod
  }
 
  render() {
    const position = [this.state.position.lat, this.state.position.lng];
    const heightw = window.innerHeight; 
    var TXnd = this.props.listeNoeuds.find( nd => { return nd.name === this.props.TXmit});
    
    return (
      <div id="mapid" style={{height: heightw + 'px'}}>

      <Map style={{ height: 100 + '%'}} center={position} zoom={this.state.zoom} animate={false}>
         <Control className="leaflet-control" position="topright">
              <div style={{textAlign:"center", paddingRight:"25%"}}>Légende</div>
              <hr style={{margin: "0 0 5px 0"}}/>
              <img src={'/'+linkIconUrl} className="iconLegend" alt="iconUrl" /><span>Lien simplex</span>
              <br/><img src={'/'+relaisIconUrl} className="iconLegend" alt="iconUrl" /><span>Relais, transpondeur</span>
              <br/><img src={'/'+intermittentIconUrl} className="iconLegend" alt="iconUrl" /><span>Non permanent</span>
              <br/><img src={'/'+hotspotIconUrl} className="iconLegend" alt="iconUrl" /><span>Hotspot</span>
              <br/><img src={'/'+nodeIconUrl} className="iconLegend" alt="iconUrl" /><span>Divers</span>
              <br/><img src={'/'+grayIconUrl} className="iconLegend" alt="iconUrl" /><img src={'/'+hotspotDisconnectedIconUrl} className="iconLegend" alt="iconUrl" /><span>Non connecté <br/>sur ce salon</span>
          </Control>
           <LayersControl position="topright">
              {this.props.cartes && this.props.cartes.map( (carte, index) => {
                return <BaseLayer checked={index===0} name={carte.name}>
                  <TileLayer
                    url={carte.url}
                    attribution={carte.attribution}
                  />
                </BaseLayer>
              })}

        </LayersControl>
        <ScaleControl position="topleft"></ScaleControl>
         {this.props.listeNoeuds.map( marker => <MarkerItem key={marker.name} marker={marker} isConnected={this.isConnected} openModal={this.props.openModal} />)};
        {this.props.TXmit !== '' && TXnd && <MarkerTX marker={TXnd} openModal={this.props.openModal} TXmit={this.props.TXmit} /> }
        
      </Map>
  
      </div>
    )
  }
}

export default MapRRF