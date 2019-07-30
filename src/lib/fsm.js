function fsm(EE, changeHandler = () => {}, init = {}) {
	const states = Object.create(null)

	function reset() {
		states.nodes = []
		states.TXmit = ''
		states.network = ''
		states.nodes = []
		states.transmit = false
		states.receive = false
		states.transmitter = ''
		states.digits = []
	}

	reset()

	Object.assign(states, init)
	//console.log('init: ',init)
	//console.log('states: ',states)

	function on(event, handler) {
		if (typeof EE.addEventListener === 'function') {
			EE.addEventListener(event, evt => {
				handler(JSON.parse(evt.data))
			})
		} else {
			EE.on(event, handler)
		}
	}

	on('ReflectorLogic.MsgNodeList', names => {
		//console.log("fsm ReflectorLogic.MsgNodeList : ", names);
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
		if ((name.indexOf('RRF') !== 0) && (name.indexOf('GW-E') !== 0)){
			states.TXmit = name;
			states.transmitter = name;
		}
		changeHandler()
	})

	on('ReflectorLogic.MsgTalkerStop', ([name]) => { // eslint-disable-line no-unused-vars
		//console.log('MsgTalkerStop : ', name)
		if (( name.indexOf('RRF') !== 0) && (name.indexOf('GW-E') !== 0)){
			states.TXmit = '';
			states.transmitter = '';
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

	return states
}

module.exports= fsm;