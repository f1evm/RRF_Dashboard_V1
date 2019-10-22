import React, { Component } from 'react';
import AudioPlayer from './components/AudioPlayer';
import Noeuds from './components/Noeuds';
import MapRRF from './components/MapRRF';
import Salon from './components/Salon';
import Fsm from './lib/fsm';
import ReactResizeDetector from 'react-resize-detector';
import XLSX from 'xlsx';
import Timeout from './components/Timeout';
import LastTX from './components/LastTX';
import locator from './components/locator';

import './App.css';
import './components/Noeuds.css';
import './components/Modal.css';
import PrintButton from './components/PrintButton';


const NW = 172; // Largeur d'un Noeud en pixels.

var listeNoeuds = [];

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      salon:  'RRF',
      listeSalons: [],
      listeCartes: [],
      lastTX: [],
      width: 0,
      TXmit: '',
      nodes:[],
      mode: 'table',   // 'table' ou 'map'
      tri: 1
    }

    this.fsm = null;
    this._onResize();
    this.message = '';
  }

  readMessage = () => {
    fetch('/message.txt')
    .then((r) => r.text())
    .then(text  => {
      console.log(text);
      this.message = text;
    })
  }


  componentDidMount() {
    this.initSalon();
    this.getListeCartes();
    this.readMessage();
  }

  
  getListeCartes = () => {
    fetch('/carto')
      .then( response => { return response.json()})
      .then( data => {
          this.setState({listeCartes: data.data});
        })
  }

  initSalon() { 
     
      this.fsm = new Fsm(() => {
        this.setState(this.fsm.states);

       }, {nodes: this.state.nodes, TXmit: this.state.TXmit, salon: this.state.salon})
      
   var ws = null;


    fetch(process.env.PUBLIC_URL + '/Noeuds.json')
    .then(res => {
      if(!res.ok) throw new Error("fetch failed");
      
      return res.json();})
    .then ((data) => {
      listeNoeuds = data;
        this.getListeSalons();
        
      });
  }

    


  changeSalon = (name) => {
  
    this.fsm.changeSalon(name);
    if (this.APlay.state.playing) this.APlay.play();
  }

  getListeSalons = () => {
    fetch('/salons&dtmf')
      .then( response => { return response.json()})
      .then( data => {
          this.setState({listeSalons: data.data});
      })
  }

  getInfo(nom){
    var nod = listeNoeuds.find( nd => {return nd.name===nom});
    if (nod) {
      //console.log(nod.name);
    //var res = nod.name + ' | ' + nod.loc + ' | ' + nod.town;
    var res = nod;
    return res;
    }
    return null;
  };

  infoText = (nom) => {
    var nod = this.getInfo(nom);
    if (nod) {
      var callsign = nom.split(' ')[1];
      /*var inf = nod.info.split('<br>');
      var info = inf[0];
      var sysop = (inf[1]?inf[1]:'');*/
      var info = nod.info;
      var sysop = (nod.sysop ? nod.sysop : '');
      var res = '<strong> ' + nod.name + ' </strong> <br/>' + (info !== '' ? ' <br /> ' + info : '') + (sysop !== ''? '<br />SysOp : ' + sysop : '');
        if (callsign) res = res + "<br /> <a class='lienQrzCom' href='https://www.qrz.com/DB/" + callsign + "' title='Page QRZ.COM de " + callsign + "' target='_blank' rel='noreferrer noopener'>Page QRZ.COM de " + callsign + "</a>";
        return res
    }
    return ''
  }



  openModal = (name) => {
    var info = this.getInfo(name);
    if (info) {
        var modalText = document.getElementById("modal-text");
        modalText.innerHTML = this.infoText(name);
        var modal = document.getElementById("modal");
        modal.style.display="block";
    }
  }


  closeModal = (event) => {
    var modal = document.getElementById("modal");
    var modalContent = document.getElementById("modal-content");
    var modalText = document.getElementById("modal-text");
    var modalClose = document.getElementById("modal-close");
    var target = event.target;
    if ((target === modalClose)||(!modalContent.contains(target))) {
      modal.style.display="none";
      modalText.innerHTML='';
    }
  }

 
  chooseTab = (evt, tabName) => {
    
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabContent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("buttonTab");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
    this.setState({mode : tabName});
  }

  getNombreConnectés = () => {
    var nbre = this.state.nodes.filter(name => {
      var nd = this.getInfo(name);
      if (!nd) return true;
      if (nd.type === "serveur") return false;
      return true;
    }).length;
  
    return nbre;
  }

  chkClicked = (evt) => {
    this.setState({tri: ((this.state.tri +1) % 3 )});

  }


  render() {
    var statsSln = this.state.salon;
    var statsUrl = "http://rrf.f5nlg.ovh:8080/RRFTracker/" + this.state.salon.toUpperCase() + "-today/";
    if ((this.state.salon === 'FON') || (this.state.salon === 'satellite')) 
    {
      statsSln = "RRF";
      statsUrl = "http://rrf.f5nlg.ovh:8080/RRFTracker/RRF-today/";
    }
    var ndsListe = listeNoeuds.filter((nd) => {return (nd.type !== "serveur")});
    ndsListe.sort( (a,b) => {
      var x = a.name.toLowerCase();
      var y = b.name.toLowerCase();
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    });

    return (
      <div className="App">
        <header className="App-header">
          <h1>Tableau de Bord RRF</h1>
        </header>

          <div id="topDiv">
            <div className="droite" style={{/*border: 'solid red',*/ right:30, position: 'relative'}}>
              <Salon changeSalon={this.changeSalon} salon={this.state.salon} liste={this.state.listeSalons} />
              <div id="tx">
                <div style={{marginTop: 5+"px", height: 64+"px"}}>
                  <p>Transmission :</p>
                  <span id="txSpan" style={{align:'right', height: 21 }} className='noeud txon' >{(this.state.TXmit)}</span>
                </div>
                <Timeout TXmit={this.state.TXmit} salon={this.state.salon}></Timeout>
              </div>
            </div>
            <h1><a href="https://f5nlg.wordpress.com/2015/12/28/nouveau-reseau-french-repeater-network/" title="Cliquez pour voir les infos sur le site de F5NLG." target="_blank" rel='noreferrer noopener'>Tableau de Bord RRF</a></h1>
            <div className="message">{this.message}
            </div>
            <div id="audioStream" className="gauche">
                  <AudioPlayer ref={ap => this.APlay=ap} salon={this.state.salon} />
                  {/*<AudioPlayer file={'/audiostream/' + this.state.salon} /> */}
              {/*<AudioPlayer file="/Bloch_Prayer.mp3" />*/}
            </div>
            <div className="clearF"></div>
            <div className="gauche connectes">Liens connectés au salon {this.state.salon} : {this.getNombreConnectés()}</div>
            <div className="droite copyright">
              &copy; F1EVM
            </div>
            <div id="boutons">
              <div className={this.state.tri === 0  ? "ckb": (this.state.tri === 1 ? "ckb ckbUn":"ckb ckbDeux")} onClick={this.chkClicked} title={"Tri :\n Gauche : pas de tri,\n Milieu : sur l'ensemble du nom du node,\n Droite : sur l'indicatif uniquement."}>
                <div>Tri</div>
                <i></i>
              </div>
              <button className="buttonTab" onClick={(evt) => this.chooseTab(evt,'table')} title="Afficher la liste des nodes connectés">Table</button>
              <button className="buttonTab" onClick={(evt) => this.chooseTab(evt,'map')} title="Afficher la carte dynamique">Carte</button>
              <button className="buttonTab" onClick={(evt) => this.chooseTab(evt,'liste')} title="Afficher la liste des points d'accès">Liste</button>
              <button className="buttonChat" ><a href="http://rrf.f5nlg.ovh:81" target="_blank" rel="noopener noreferrer" title="Accès au Chat IRC" >Chat</a></button>
              <button className="buttonStats" ><a href={statsUrl} target="_blank" rel="noopener noreferrer" title={"Statistiques de F4HWN pour le salon "+statsSln} >Stats</a></button>
              <button className="buttonAllstar" ><a href="/allstar" target="_blank" rel="noopener noreferrer" title="Relais AllStar Connectés" >AllStar</a></button>
              <a href="/docs/" target="_blank" title="Informations RRF"><img id="infosButton" src="/images/infos.png" alt="Bouton infos" ></img></a>
            </div>
           
          </div>
        

        <div id="table" className=" tabContent noeuds" >
            {this.state.mode === 'table' &&
                <div>
                  <div style={{width: this.state.width+'px', margin: '0 auto', /* border: 'solid orange 1px'*/}} >
                    <Noeuds listeNoeuds={listeNoeuds} nodes={this.state.nodes} tri={this.state.tri}  TXmit={this.state.TXmit} openModal={this.openModal} getInfo={this.getInfo} />
                  </div>
                  <ReactResizeDetector handleWidth skipOnMount onResize={this._onResize} />
                </div>
            }
        </div>

         
          <div id="map" className="tabContent" style={{display: 'none'}}>
            {this.state.mode === 'map' &&  <MapRRF listeNoeuds={listeNoeuds} nodes={this.state.nodes} cartes={this.state.listeCartes} TXmit = {this.state.TXmit} openModal={this.openModal} /> }
          </div>

          <div id="liste" className="tabContent" style={{display: 'none'}}>
            <div style={{textAlign:"right", maxWidth:"910px", margin: "0 auto"}}>
              <PrintButton />
            </div>
            <div id="lpa">
              <h2>Liste des Points d'Accès RRF</h2>
              <table>
                <thead>
                  <th>Nom</th><th>Type</th><th>Description</th><th>Locator</th><th>Sysop</th>
                </thead>
                <tbody>
                  {ndsListe.map(nd => <tr><td>{nd.name}</td><td>{nd.type}</td><td>{nd.info}</td><td>{locator(nd.lon, nd.lat)}</td><td>{nd.sysop}</td></tr>)}
                </tbody>
              </table>
            </div>
          </div>

          <div id="modal" onClick={this.closeModal}>
                <div id="modal-content" >
                    <span id="modal-close" onClick={this.closeModal} title="Close window" >&times;</span>
                    <p id="modal-text"></p>
                </div>
            </div>
        </div>
    );
  }

  _onResize = (w,h) => {
    var wd = w-(w % NW)
    this.setState({width: wd})
  }

}

export default App;
