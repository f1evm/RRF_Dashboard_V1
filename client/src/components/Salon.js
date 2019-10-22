import React, { Component } from 'react';


class Salon extends Component {

    componentDidMount(){
        this.setState({salon: this.props.salon})
    }
     
    btnClick = (e) => {
        var lst = document.getElementById("listeSalons");
        lst.style.display = lst.style.display === "block" ? "none" : "block";
    }

    listeClick = (e) => {
        //this.setState({salon: e.target.value});
        document.getElementById("listeSalons").style.display = "none";
        this.props.changeSalon(e.target.id)
    }

    upper1stChar = (str) => {
        return str.replace(/^\D/, function(f){return f.toUpperCase()})
    }

    render() {
        return (
            <div id="salon">
                <p>Salon</p>
                <div>
                    <span id="btnSalon" className="btnSalon fa fa-caret-down" onClick={this.btnClick} title="Choix du salon" />                    
                    <div className='slctSalon' >{(this.props.salon)}
                        <div id="listeSalons" onClick={this.listeClick}>
                        {this.props.liste.map( sln => <div id={sln.name} >{this.upper1stChar(sln.name)} <small>{sln.dtmf}</small></div>)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Salon