
import React, {Component} from 'react';



class PrintButton extends Component {

    imprimer = () => {
        if (document.getElementById("topDiv") && document.getElementById("prnt")){
           var topDiv = document.getElementById("topDiv")
            var prntButton = document.getElementById("prnt")
            topDiv.style.display = "none";
            var prntStyle = prntButton.style.display;
            prntButton.style.display = "none";
            window.print();
            topDiv.style.display = "";
            prntButton.style.display = prntStyle;
        }
    }

    
render(){
    return (
        <button id="prnt" onClick={() => this.imprimer()}><img src="/images/printer.svg" alt="printer" style={{width:"30px"}} /> Imprimer la liste</button>
    )
}
}

export default PrintButton;
