function capitalizeFirstLetter(s){
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1);   
}

// api pipeline
// parse the req.url that must have the following format:
// /api/{ressource name} or
// /api/{ressource name}/{id}
exports.dispatchEndPoint = function(req, res){
    // by convention api endpoint start with /api/...
    if (req.url.indexOf('/api/') > -1) {
        // extract url componants, array from req.url.split("/") should 
        // look like ['','api','{ressource name}','{id}]'
        let urlParts = req.url.split("/");
        // do we have a ressource name
        if (urlParts.length > 2){
            // by convention controller name -> NameController
            let controllerName = capitalizeFirstLetter(urlParts[2]) + 'Controller';
            let id = -1;
            // do we have an id
            if (urlParts.length > 3){
                id = parseInt(urlParts[3]);
                if (isNaN(id)) {
                     // bad request status
                     res.writeHead(400, {'content-type':'application/json'});
                     res.end();
                    // request not consumed
                    return false;
                }
            }
            try{
                // dynamically import the targeted controller
                const Controller = require('./' + controllerName);
                // instanciate the controller
                let controller =  new Controller(req, res);
                if (req.method === 'GET') {
                    if (id > -1)
                        controller.get(id);
                    else
                        controller.getAll();
                    // request consumed
                    return true;
                }
                if (req.method === 'POST'){
                    req.on('data', data =>{
                        try {
                            controller.post(JSON.parse(data));
                            // request consumed
                            return true;
                        } catch(error){
                            console.log(error);
                            // bad request status
                            res.writeHead(400, {'content-type':'application/json'});
                            res.end(data);
                        }
                    });
                }
                if (req.method === 'PUT'){
                    req.on('data', data =>{
                        try {
                            controller.put(JSON.parse(data));
                            // request consumed
                            return true;
                        } catch(error){
                            console.log(error);
                            // bad request status
                            res.writeHead(400, {'content-type':'application/json'});
                            res.end(data);
                        }
                    });
                }
                if (req.method === 'DELETE') {
                    if (id > -1)
                        controller.remove(id);
                    // request consumed
                    return true;
                }
            } catch(error){
                // catch likely called because of missing controller class
                // i.e. require('./' + controllerName) failed
                console.log('endpoint not found');
                // not found status
                res.writeHead(404, {'content-type':'application/json'});
                res.end(null);
            }
        }
    }
    // request not consumed
    return false;
}