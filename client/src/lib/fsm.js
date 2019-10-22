function fsm(changeHandler = () => {}, init = {}) {
	const states = Object.create(null)
	var EE ;

	function reset() {
		states.nodes = []
		states.TXmit = ''
		states.salon = ''
	}

	reset()

	Object.assign(states, init)
	EE = new EventSource('/realtime/' + states.salon)
	slFetch(states.salon);
	//console.log('init: ',init)
	//console.log('states: ',states)
	initEvents();

	function changeSalon(sln) {
		EE.close();
		//console.log('EE : ', EE);
		states.nodes = [];
		states.TXmit = '';
		states.salon = sln;
		EE = new EventSource('/realtime/' + sln);
		slFetch(sln);
		initEvents();
	}

	function slFetch(sln) {
		fetch('/api/svxlink/' + sln)
		.then(response => response.json())
		.then(data => {
		  var tmpNodes=[];
		  
		  data.nodes.forEach(nd => {
			if ((tmpNodes.indexOf(nd) < 0 ) && (nd !== "MsgNodeJoined(")) {
			  tmpNodes.push(nd);
			}
		  })
			states.nodes = tmpNodes;
			states.TXmit = data.transmitter;
			changeHandler();
			//console.log('fetch: init : ',{data})
		})
		.catch(err => {
			console.log('slFetch Error : ', err)
			
		})
  
	}


	function on(event, handler) {
		if (typeof EE.addEventListener === 'function') {
			EE.addEventListener(event, evt => {
				handler(JSON.parse(evt.data))
			})
		} else {
			EE.on(event, handler)
		}
	}

	function initEvents(){

	on('ReflectorLogic.MsgNodeList', names => {
		states.nodes = names
		changeHandler()
	})

	on('ReflectorLogic.MsgNodeLeft', ([name]) => {
		const idx = states.nodes.indexOf(name)
		//console.log('MsgNodeLeft : ',name)
		if (idx > -1) {
			states.nodes.splice(idx, 1)
		}
		changeHandler()
	})

	on('ReflectorLogic.MsgNodeJoined', ([name]) => {
		//console.log('MsgNodeJoined : ',name)
		const idx = states.nodes.indexOf(name)
		if (idx <0 ) {
			states.nodes.unshift(name)
		}
		changeHandler()
	})

	on('ReflectorLogic.MsgTalkerStart', ([name]) => {
		//console.log('MsgTalkerStart : ', name)
		if (( name.indexOf('RRF') !== 0) && ( name.indexOf('GW-E') !== 0)){
			states.TXmit = name
		}
		changeHandler()
	})

	on('ReflectorLogic.MsgTalkerStop', ([name]) => { // eslint-disable-line no-unused-vars
		//console.log('MsgTalkerStop : ', name)
		if (( name.indexOf('RRF') !== 0) && ( name.indexOf('GW-E') !== 0)){
			states.TXmit = ''
		}
		changeHandler()
	})

	on('spotnik.network', name => {
		reset()
		states.network = name
		changeHandler()
	})

	on('SimplexLogic.digit', digit => {
		states.digits.push(digit)
		changeHandler()
	})

	on('Rx1.open', () => {
		states.transmit = true
		changeHandler()
	})

	on('Rx1.closed', () => {
		states.transmit = false
		changeHandler()
	})

	on('Tx1.on', () => {
		states.receive = true
		changeHandler()
	})

	on('Tx1.off', () => {
		states.receive = false
		changeHandler()
	})
	}
	return {'states': states, 'changeSalon': changeSalon}
}

export default fsm;

