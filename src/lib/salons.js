const {SALONS} = require('../../config');
//const SSE = require('express-sse')
//const SvxlinkParser = require('./parser')
//const Fsm = require('./fsm')


var salons=[];

SALONS.forEach(salon => {
        
    salons[salon.name] = {local: salon.file !== "", ...salon}
    
})

module.exports=salons