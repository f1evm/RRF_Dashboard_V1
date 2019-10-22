import React, {Component} from 'react';
import './AudioPlayer.css';

var vumeter;

class VuMeter extends Component {

    draw(){
        switch (this.props.vuType){
            default :
            case "rectangle" :
                var vu= document.getElementById("vumeter");
                if (vu){
                    vumeter = vu.getContext("2d");
                    var w=this.props.width;
                    var h=this.props.height;
                    vumeter.clearRect(0,0,w,h);
                    vumeter.beginPath();
                    vumeter.fillStyle="green";
                    vumeter.fillRect(0,0,this.props.volume*w/this.props.ech,h);
                    vumeter.stroke();
                };
                break;
            case "analog" :
                vu= document.getElementById("vumeter");
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
                break;
        }
    }

    drawNeedle(volume,w,h){
        
        vumeter.save();
        vumeter.translate(w/2, h+35);
        var angle = -Math.PI*3/4 + Math.PI * volume * 0.5 ;
        
        vumeter.beginPath();
        vumeter.lineWidth=4;
        vumeter.rotate(angle);
        vumeter.moveTo(0,0);
        vumeter.lineTo(h+25,0);
        vumeter.restore();
        vumeter.stroke();
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
            <div id="divVu">
                <canvas id="vumeter" width={this.props.width+'px'} height={this.props.height+'px'}></canvas>
            </div>
        )
    }
}

export default VuMeter;
