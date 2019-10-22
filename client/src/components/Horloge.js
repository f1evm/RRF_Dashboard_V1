import React, {Component} from 'react'



class Horloge extends Component {

    draw (){
        hrlg = document.getElementById("horloge");
        if (vu){
            vumeter = vu.getContext("2d");
            w=this.props.width;
            h=this.props.height;
            vumeter.clearRect(0,0,w,h);
            if (!document.getElementById("imgBack")){
                this.drawBack(vu,w,h);
            }
            this.drawNeedle(this.props.volume/this.props.ech,w,h);
        }

    }
    
    drawBack(vu,w,h){
        var imgBack=new Image(w, h);
        imgBack.id="imgBack";
        imgBack.src="images/vumeter.jpg";
        var divVu = document.getElementById("divVu");
        //divVu.style.margin = 'auto';
        divVu.style.width = w + 'px';
        divVu.style.height = h+'px';
        divVu.style.position = 'relative';
        imgBack.style.zIndex = 10;
        vu.style.zIndex = 20;
        
        divVu.appendChild(imgBack);
     }
 
 
    render () {
        this.draw();
        return(
                <canvas id="horloge" width={this.props.width+'px'} height={this.props.height+'px'}></canvas>
        )
    }

}

export default Horloge