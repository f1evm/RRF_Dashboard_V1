import React, { Component } from 'react';
import VuMeter from './VuMeter';
import './AudioPlayer.css';

var context, analyser, canvas;
    
class AudioPlayer extends Component {

    constructor(props){
        super(props);
        this.state = {
            playing: false,
            vuMeter:{
                min: 0.0,
                max: 100.0,
                volume: 0.0,
                width: 200, //500,
                height: 100, //50,
                ech:128,
                vuType: "analog",    // vuType : rectangle, analog
            },
            vuOn: true,
            spectrum: true
        }
    }

    coeffVolume = 1.5;
    averaging = 0.05;
    
    
    componentDidMount(){
        var contextClass = (window.AudioContext || 
            window.webkitAudioContext || 
            window.mozAudioContext || 
            window.oAudioContext || 
            window.msAudioContext );
        
        if ( contextClass ) { 
            // Web Audio API is available.
            //console.log('context OK');
            context = new contextClass ();
        } else { 
             console.error("Audio context error") // Web Audio API is not available. Ask the user to use a supported browser. 
        }

        var audio = this.audioSrc;
        //context.resume();
        var source = context.createMediaElementSource(audio); 
        var elem= document.getElementById("canvas");
        canvas = elem.getContext("2d");
        
        analyser = context.createAnalyser();
        analyser.fftSize=2048;
        analyser.smoothingTimeConstant=0.8;
        source.connect(analyser);
        analyser.connect(context.destination);
        this.showgraphic();

    }

    showgraphic = () => {
        if (this.state.spectrum){
            var dataf = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(dataf);
        
            canvas.clearRect(0,0,256,100);
/*            canvas.strokeStyle ="black";
            canvas.beginPath();
            var x = Math.log10(500)*256/Math.log10(analyser.frequencyBinCount);
            canvas.moveTo(x,0);
            canvas.lineTo(x,256);
            x = Math.log10(1)*256/Math.log10(analyser.frequencyBinCount);
            canvas.moveTo(x,0);
            canvas.lineTo(x,256);
            canvas.stroke();
            canvas.strokeStyle = "white";
            canvas.beginPath();
            canvas.moveTo(0,100-dataf[0]/2.56);
            x=0;
*/
canvas.clearRect(0,0,256,100);
canvas.strokeStyle = 'black';
canvas.fillStyle = "black";
canvas.setLineDash([3,3]);
canvas.beginPath();
var df = analyser.frequencyBinCount / 24400;
var x = Math.round(Math.log10(100*df)*256/Math.log10(analyser.frequencyBinCount))+0.5;
canvas.moveTo(x,0);
canvas.lineTo(x,100);
canvas.save();
canvas.translate(x,100);
canvas.rotate(-Math.PI/2);
//canvas.font = '10px sansserif';
canvas.fillText('100 Hz',3,-2);
canvas.restore();
x = Math.round(Math.log10(1000*df)*256/Math.log10(analyser.frequencyBinCount))+0.5;
canvas.moveTo(x,0);
canvas.lineTo(x,100);
canvas.save();
canvas.translate(x,100);
canvas.rotate(-Math.PI/2);
canvas.fillText('1 kHz',3,-2);
canvas.restore();
x = Math.round(Math.log10(10000*df)*256/Math.log10(analyser.frequencyBinCount))+0.5;
canvas.moveTo(x,0);
canvas.lineTo(x,100);
canvas.save();
canvas.translate(x,100);
canvas.rotate(-Math.PI/2);
canvas.fillText('10 kHz',3,-2);
canvas.restore();
x = Math.round(Math.log10(20000*df)*256/Math.log10(analyser.frequencyBinCount))+0.5;
canvas.moveTo(x,0);
canvas.lineTo(x,100);
canvas.save();
canvas.translate(x,100);
canvas.rotate(-Math.PI/2);
canvas.fillText('20 kHz',3,-2);
canvas.restore();
canvas.stroke();
canvas.strokeStyle = "white";
canvas.setLineDash([]);
canvas.beginPath();
canvas.moveTo(0,100); //100-dataf[0]/2.56);
x=0;

            for (var f=1; f<analyser.frequencyBinCount;f++){
                x=Math.log10(f)*256/Math.log10(analyser.frequencyBinCount);
                canvas.lineTo(x,100-dataf[f]/2.56);
            }
            canvas.stroke();
        }

        var datav = new Uint8Array(analyser.fftSize);
        analyser.getByteTimeDomainData(datav);
        var value = 0;
        for(f=0; f<datav.length; f++){
            value += (datav[f]-128)**2;
            //value += Math.abs(datav[f]-128);
        }
        var rms =  this.coeffVolume * Math.sqrt(value / datav.length);
        //var average = value /datav.length;
        var vum = this.state.vuMeter;
        //vum.volume = Math.max(rms, this.state.vuMeter.volume*this.averaging);
        vum.volume = (rms - this.state.vuMeter.volume)*this.averaging + this.state.vuMeter.volume;
        //vum.volume = (average - this.state.vuMeter.volume)*this.averaging + this.state.vuMeter.volume;
        this.setState({vuMeter:vum});
        
        requestAnimationFrame(this.showgraphic);
    }

    play = () => {
        if (this.state.playing) {
            this.setState({playing: false});
            this.audioSrc.pause();
            this.audioSrc.src='';
            //cancelAnimationFrame(raf);
        } else {
            context.resume().then(() => {
                console.log('Playback resumed successfully');
              });
            this.audioSrc.src= "/audiostream/" + this.props.salon ;  //this.props.file ; 
            this.setState({playing: true});
            this.audioSrc.play();
            requestAnimationFrame(this.showgraphic);
        }
    }

    toggleSpectrum = () => {
        var poignee = document.getElementById("poignee");
        var sens = document.getElementById("sens");

        if (this.state.spectrum){
            this.setState({spectrum: false});
            sens.innerHTML='>';
            poignee.title = "Ouvrir l'analyseur de spectre";
            poignee.className="closed";
        } else {
            this.setState({spectrum: true});
            sens.innerHTML='<';
            poignee.title = "Fermer l'analyseur de spectre";
            poignee.className="opened";
        }
    }
    
    mouseDown = () => {
        var poignee = document.getElementById("poignee");
        poignee.className=poignee.className + " pushed";
    }

    render() {
        var audioStream = "/audiostream/" + this.props.salon;
         return (
            <div className="AudioPlayer">
                <div style={{display: 'inline-block', textAlign: 'center'}}>
                    <h2>Ecoutez le salon<br/>
                    {this.props.salon} : </h2>
                    <span onClick={this.play} style={{fontSize: 3 +'em',align: 'center'}} title={"Cliquez pour écouter.\nDifféré de 8 secondes environ."}  className={!this.state.playing ? "boutonUp far fa-play-circle" : "boutonDown far fa-pause-circle"} />
                    {/*<span onClick={this.play} style={{fontSize: 3 +'em',align: 'center'}}   className={!this.state.playing ? "far fa-play-circle" : "far fa-pause-circle"} />*/}
                    {/*<span /*onClick={} style={{fontSize: 3 +'em',align: 'center'}}   className={!this.state.volume ? "fas fa-volume-up" : "far fa-pause-circle"} />*/}
                </div>
                <audio onEnded={this.play} src={audioStream}
                    ref={(audio) => {this.audioSrc = audio} }
                />
                <span>&nbsp;&nbsp;&nbsp;</span>
                <VuMeter {...this.state.vuMeter} />
                <canvas id="canvas" style={this.state.spectrum ? {} : {display:'none'}} width="256" height="100"></canvas>
                <div id="poignee" className="opened" onMouseDown={this.mouseDown} onClick={this.toggleSpectrum} title="Fermer l'analyseur de spectre"><p id="sens">{'<'}</p></div>
            </div>
        );
    }

      

}


export default AudioPlayer;