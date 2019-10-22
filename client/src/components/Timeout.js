import React, { Component } from 'react';


class Timeout extends Component{

    constructor(props){
        super(props);
        this.state = {
            maxTime: 120,
            progress: 0
        };
        this.salon = props.salon;
        this.TXmit = props.TXmit;
        this.timer = null;

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.salon !== this.salon) {
            this.salon = nextProps.salon;
            this.setState({maxTime: ( this.salon === 'RRF' ? 120 : 300)})
            this.TXmit = nextProps.TXmit;
            this.resetTimer();
        } else if (nextProps.TXmit !== this.TXmit){
            this.TXmit = nextProps.TXmit;
            if (nextProps.TXmit === ''){
                this.resetTimer();
            } else {
                this.startTimer();
            }
        }
        
    }

    resetTimer = () => {
        if (this.timer !== null) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        this.setState({progress: 0});
    }

    startTimer = () => {
        this.resetTimer();
        this.timer = setTimeout(this.tick,1000);
    }

    tick = () => {
        var t = this.state.progress + 1;
        if (t > this.state.maxTime) {
            t = this.state.maxTime;
            this.setState({progress: t});

        } else {
            this.setState({progress: t});
            this.timer = setTimeout(this.tick,1000);
        }
    }

    getTime = (sec) => {
        var minutes = Math.floor(sec / 60).toString();
        var secondes = (sec % 60).toString();
        //minutes = (minutes.length === 1?"0":"") + minutes;
        secondes =(secondes.length===1?"0":"") + secondes;
        return minutes + ":" + secondes;
    }


    render() {
        var w=[0,0,0];
        var large = 160;

        if (this.state.progress <= this.state.maxTime-60){
            w[0]=Math.round(large*this.state.progress/this.state.maxTime);
        } else if ((this.state.progress > this.state.maxTime-60) && (this.state.progress <= this.state.maxTime-30)){
            w[0]=Math.round(large*(this.state.maxTime-60)/this.state.maxTime);
            w[1]=Math.round(large*(this.state.progress+60-this.state.maxTime)/this.state.maxTime);
        } else if (this.state.progress > this.state.maxTime-30){
            w[0]=Math.round(large*(this.state.maxTime-60)/this.state.maxTime);
            w[1]=Math.round(large*30/this.state.maxTime);
            w[2]=Math.round(large*(this.state.progress + 30 - this.state.maxTime)/this.state.maxTime);
            if ( (w[0]+w[1]+w[2]) > large) w[2]=large-w[1]-w[0];
        }

        return (
            <div id="timer">
                <div className="barre">
                    <span style={{width: w[0]+"px"}}></span>
                    {w[1] > 0 && <span style={{width: w[1]+"px", backgroundColor:'#ffd000'}}></span>}
                    {w[2] > 0 && <span style={{width: w[2]+"px", backgroundColor:'#f00'}}></span>}
                </div>
                <div className="time">{this.getTime(this.state.progress)}</div>
            </div>
        )
    }
}

export default Timeout