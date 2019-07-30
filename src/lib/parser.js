const EventEmitter = require('events');
const sliceFile = require('slice-file');

class SvxlinkParser extends EventEmitter {
	constructor(path) {
		super()

		//console.log("Constructor SvxlinkParser")
		const sf = sliceFile(path)
		sf.follow(0).on('data', line => {
			line = line.toString('utf8')
			//console.log(line)
			
			const log = line.substr(line.indexOf('### ReflectorLogic'), line.length)
			//console.log(log);
			if (log.startsWith('### ReflectorLogic')) {
				//const rm = log.split(': ');
				const rl = log.split(': ')[1]
				//console.log(">",rm[0]);
				//console.log(">>",rm[1]);
				const event = rl.substring(0, rl.indexOf('('))
				const args = rl.substring(
					rl.indexOf('(') + 1,
					rl.lastIndexOf(')')
				).split(', ')
				this.emit('ReflectorLogic.' + event, args)
				//console.log('ReflectorLogic.' + event, args)
			} /*else if (log.startsWith('Using configuration file: ')) {
				const network = log.slice(log.lastIndexOf('.') + 1, -1)
				this.emit('spotnik.network', network)
			} else if (log.startsWith('SimplexLogic: digit=')) {
				this.emit('SimplexLogic.digit', log.slice(log.lastIndexOf('=') + 1, -1))
			} else if (log.startsWith('Rx1: The squelch is OPEN')) {
				this.emit('Rx1.open')
			} else if (log.startsWith('Rx1: The squelch is CLOSED')) {
				this.emit('Rx1.closed')
			} else if (log.startsWith('Tx1: Turning the transmitter ON')) {
				this.emit('Tx1.on')
			} else if (log.startsWith('Tx1: Turning the transmitter OFF')) {
				this.emit('Tx1.off')
			}*/
		})
	}
}

module.exports = SvxlinkParser;