function capitalizeFirstLetter(s){
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1);   
}
////////////////////////////////////////////////////////////
// dispatch_API_EndPoint : an api pipeline
// parse the req.url that must have the following format:
// /api/{ressource name} or
// /api/{ressource name}/{id}
// then select the targeted controller
// using the http verb (req.method) and optionnal id
// call the right controller function
///////////////////////////////////////////////////////////
exports.dispatch_API_EndPoint = function(req, res){
    // by convention api endpoint start with /api/...
    if (req.url.indexOf('/api/') > -1) {
        // extract url componants, array from req.url.split("/") should 
        // look like ['','api','{ressource name}','{id}]'
        let urlParts = req.url.split("/");
        // do we have a ressource name
        if (urlParts.length > 2){
            // by convention controller name -> NameController
            let controllerName = capitalizeFirstLetter(urlParts[2]) + 'Controller';
            let id = undefined;
            // do we have an id
            if (urlParts.length > 3){
                if (urlParts[3] !== '') {
                    id = parseInt(urlParts[3]);
                    if (isNaN(id)) { 
                            // id is not a number
                            // bad request status
                            res.writeHead(400, {'content-type':'text/plain'});
                            res.end();
                            // we can't continue to process the request and we must exit this function
                            // request not consumed
                            return false;
                        }
                }
            }
            // At this point we have a controllerName and an id holding a number or undefined.
            // in the following, we will call the corresponding method of the controller class accordingly  
            // by using the Http verb of the request.
            // for the POST and PUT verb, will we have to extract the data from the body of the request
            try{
                // dynamically import the targeted controller
                // if the controllerName dos not exist the catch section will called
                const Controller = require('./' + controllerName);
                // instanciate the controller       
                let controller =  new Controller(req, res);

                if (req.method === 'GET') {
                    controller.get(id);
                    // request consumed
                    return true;
                }
                if (req.method === 'POST'){
                    req.on('data', body =>{
                        try {
                            // we assume that the data is in the JSON format
                            if (req.headers['content-type'] === "application/json")
                                controller.post(JSON.parse(body));
                            else {
                                // Unsupported Media Type status
                                res.writeHead(415, {'content-type':'text/plain'});
                                res.end();
                            }
                            // request consumed
                            return true;
                        } catch(error){
                            console.log(error);
                             // Unprocessable Entity status
                            res.writeHead(422, {'content-type':'text/plain'});
                            res.end();
                            // request consumed
                            return true;
                        }
                    });
                }
                if (req.method === 'PUT'){
                    req.on('data', body =>{
                        try {
                            // we assume that the data is in the JSON format
                            if (req.headers['content-type'] === "application/json")
                                controller.put(JSON.parse(body));
                            else {
                                // Unsupported Media Type status
                                res.writeHead(415, {'content-type':'text/plain'});
                                res.end();
                            }
                            // request consumed
                            return true;
                        } catch(error){
                            console.log(error);
                            // Unprocessable Entity status
                            res.writeHead(422, {'content-type':'text/plain'});
                            res.end();
                            // request consumed
                            return true;
                        }
                    });
                }
                if (req.method === 'DELETE') {
                    if (!isNaN(id)) {
                        controller.remove(id);
                        // request consumed
                        return true;
                    } else {
                         // bad request status
                         res.writeHead(400, {'content-type':'text/plain'});
                         res.end();
                         // request consumed
                        return true;
                    }
                }
            } catch(error){
                // catch likely called because of missing controller class
                // i.e. require('./' + controllerName) failed
                console.log('endpoint not found');
                // not found status
                res.writeHead(404, {'content-type':'text/plain'});
                res.end();
                 // request consumed
                 return true;
            }
        }
    }
    // not an API endpoint
    // request not consumed
    return false;
}