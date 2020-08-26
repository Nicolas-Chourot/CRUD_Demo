
let Contacts = require('./models/initContacts.js');
//Contacts.initContacts();
//////////////////////////////////////////////////////////////////////////

function AccessControlConfig(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
}

function Prefligth(req, res){  
    if (req.method === 'OPTIONS'){
        console.log('preflight CORS verifications');
        res.end();
        // request handled
        return true;
    }
    // request not handled
    return false;
}

const http = require('http');
const server = http.createServer((req, res) => {
    AccessControlConfig(res);
    if (!Prefligth(req, res)){
        let router = require('./router');
        if (!router.dispatch_API_EndPoint(req, res)) {
            // do something else with request
        }
    }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`HTTP Server running on port ${PORT}...`));
/////////////////////////////////////////////////////////////////////////
