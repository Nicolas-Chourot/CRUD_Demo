function capitalizeFirstLetter(s){
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1);   
}
// api pipeline
exports.dispatchEndPoint = function(req, res){
    // by convention api endpoint start with /api/...
    if (req.url.indexOf('api') > -1) {
        // extract url componants
        let urlParts = req.url.split("/");
        // do we have a name of ressource
        if (urlParts.length > 2){
            // by convention controller name -> NameController
            let controllerName = capitalizeFirstLetter(urlParts[2]) + 'Controller';
            let id = -1;
            // do we have an id
            if (urlParts.length > 3){
                id = parseInt(urlParts[3]);
            }
            try{
                
                // dynamically import the targeted controller
                const Controller = require(`./${controllerName}`);
                // instanciate the controller
                let controller =  new Controller(req, res);
                if (req.method === 'GET') {
                    if (id > -1)
                        controller.get(id);
                    else
                        controller.getAll();
                    return true;
                }
                if (req.method === 'POST'){
                    req.on('data', data =>{
                        try {
                            controller.post(JSON.parse(data));
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
                    return true;
                }
            } catch(error){
                // endpoint not found
                console.log('endpoint not found');
                // not found status
                res.writeHead(404, {'content-type':'application/json'});
                res.end(null);
            }
        }
    }
    return false;
}