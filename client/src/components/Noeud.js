import React, {Component} from 'react'
import './Noeuds.css'

class Noeud extends Component {

    makeInfo = () => {
        if (this.props.info) {
            var info = this.props.info;
            //var res = info.name + ' | ' + (info.loc ? info.loc:'') + ' | ' + (info.town?info.town:'');
            var res = info.name;
            return res
        }
        return ''
    }

    openModal= () => {
        if (this.props.info) {
            this.props.openModal(this.props.name, this.props.info);
        }
    }

    getBand = (name) => {
        let b = name.split(' ')[2];
        if ((b === '10M') || (b === 'T10M')){
            return b;
        }
        return false
    }

    render() {
        var info = this.makeInfo();
        let b = this.getBand(this.props.name);
        var className = `noeud ${b !== false ? 'band'+ b : ''} ${info ==='' ? 'notInDB' : ''} ${this.props.name === this.props.TX ? 'txon' : ''}`
        if (info === '') {
            info = "Ce node ne suit pas les règles de nommage ou n'existe pas dans la base de données.\n Contactez les administrateurs du réseau pour la mettre à jour.\nVoir les infos avec le bouton bleu.";
        } else {
            info += "\n Cliquez pour plus d'infos.";
        }
        return(
            <span  className= { className } title={info} onClick={this.openModal} >{this.props.name}</span>
        )
    }
}

export default Noeud