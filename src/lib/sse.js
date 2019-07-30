const SSE = require('express-sse')
const fsm = require('./fsm') 
const { SALONS, EVENTS } = require('../../config')
const SvxlinkParser = require('./parser')


var parsers = [];
var sses = [];
var fsms = []


SALONS.forEach(sln => {
	if (sln.file !== '') {
		parsers[sln.name] = new SvxlinkParser(sln.file);
		
		sses[sln.name] = new SSE()
		fsms[sln.name] = new fsm(parsers[sln.name])
		EVENTS.forEach( event => {
			parsers[sln.name].on(event, data => {
				sses[sln.name].send(data || [], event)
				//console.log('### ', sln.name, '::>',event, data)
			})
		})
	}
})



module.exports.fsms = fsms
module.exports.sses = sses
