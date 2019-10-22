import React, { Component } from 'react';


class LastTX extends Component {

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
        this.props.changeSalon(e.target.value)
    }


    render() {
        return (
            <div className='lastTX' >
                <div id="listeSalons" >
                    {this.props.liste.map( sln => <option value={sln}>{sln}</option>)}
                </div>
            </div>
        )
    }
}

export default LastTX