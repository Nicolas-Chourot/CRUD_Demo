////This funciton return the endpoints list in html
//// todo : clean the code ;-)
exports.list = (res) => {
    function EnumerateEndpoints(controllerFile){
        const getMethods = (obj) => {
            let properties = new Set()
            let currentObj = obj
            do {
              Object.getOwnPropertyNames(currentObj).map(item => properties.add(item))
            } while ((currentObj = Object.getPrototypeOf(currentObj)))
            return [...properties.keys()].filter(item => typeof obj[item] === 'function')
          }
          
        let Controller = require('./controllers/' + controllerFile);
        let controller = new Controller(null, null);
        let methods = getMethods(controller);
        
        let resourceName = controllerFile.replace('sController.js','').toLowerCase();
        let resourceNames = resourceName + 's';
    
        const resclass = new require("./models/" + resourceName);
    
        let content = "<h2>Resource " + resourceName + ": ";
        content += JSON.stringify(new resclass()).replace(/""/g,'"..."').replace(/,/g,', ') + '</h2><br>';
        //content += JSON.stringify(new resclass())+ '</h2><br>';
    
        if (methods.indexOf('get') > -1){
            content += "<h3>GET: /api/" + resourceNames + "</h3>";
            content += "<h3>GET: /api/" + resourceNames + "/id</h3>";
        }
        if (methods.indexOf('post') > -1){
            content += "<h3>POST: /api/" + resourceNames + "</h3>"; 
        }
        if (methods.indexOf('put') > -1){
            content += "<h3>PUT: /api/" + resourceNames + "/id</h3>";
        }
        if (methods.indexOf('remove') > -1){
            content += "<h3>DELETE: /api/" + resourceNames + "/id</h3>";
        }
        return content + "<hr>";
    }

    let content = "<div style=font-family:arial>";
    content += "<h1>CRUD DEMO ENDPOINTS</h1><hr>";
    const path = require('path');
    const fs = require('fs');
    const directoryPath = path.join(__dirname, "controllers");
    fs.readdir(directoryPath, function(err, files) {
        if (err) {
          console.log("No endpoints");
        } else {
            files.forEach(function(file) {
                if (file != 'Controller.js') {
                    content += EnumerateEndpoints(file);
                }
            });
            res.writeHead(200, {'content-type':'text/html'});
            res.end(content) + "</div>";
        }
    });
}