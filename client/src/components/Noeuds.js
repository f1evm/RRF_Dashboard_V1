import React, {Component} from 'react';
//import Fsm from '../svxlink/fsm';
import Noeud from './Noeud';
import './Noeuds.css';
//import './Modal.css';

//var listeNoeuds = [];

class Noeuds extends Component {

    
   
    render() {
      if (this.props.nodes){
        var nds = this.props.nodes.filter(() => {return true});
        if (this.props.tri === 1){
          nds.sort();
        } else if (this.props.tri === 2){
          nds.sort((a,b) => {
            var at = a.split(' ');
            if (at.length === 1) at[1] = 'a' + at[0];
            var bt = b.split(' ');
            if (bt.length === 1) bt[1] = 'a' + bt[0];
            
            if (at[1] < bt[1]) return -1;
            if (at[1] === bt[1]) return 0;
            if (at[1] > bt[1]) return 1;
            return 0;
          })
        }
      }

      return (
        <div>
            <div className="clearF">
              {/*Array.isArray(this.props.nodes) ? this.state.nodes.map( name => <Noeud key={name} name={name} TX={this.state.transmitter} info={this.getInfo(name)} openModal={this.openModal} />) :''*/}
              {this.props.nodes && nds.map( name => <Noeud key={name} name={name} TX={this.props.TXmit} info={this.props.getInfo(name)} openModal={this.props.openModal} />) }
            </div>
            
        </div>
      )
    }


}

export default Noeuds