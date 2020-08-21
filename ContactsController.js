const Repository = require('./models/Repository');
class ContactsController{
    constructor(req, res){
        this.req = req;
        this.res = res;
        this.contactsRepository = new Repository('Contacts');
    }
    getAll(){
        console.log('GET: /api/contacts');
        // ok status
        this.res.writeHead(200, {'content-type':'application/json'});
        this.res.end(JSON.stringify(this.contactsRepository.getAll()));
    }
    get(id){
        if(!isNaN(id)){
            console.log('GET: /api/contacts/' + id);
            // ok status
            this.res.writeHead(200, {'content-type':'application/json'});
            this.res.end(JSON.stringify(this.contactsRepository.get(id)));
        } else {
            console.log('GET: /api/contacts');
            // ok status
            this.res.writeHead(200, {'content-type':'application/json'});
            this.res.end(JSON.stringify(this.contactsRepository.getAll())); 
        }
    }
    post(contact){  
        console.log('POST: /api/contacts/', contact); 
        // todo : validate contact before insertion
        // todo : avoid duplicates
        let newContact = this.contactsRepository.add(contact);
        if (newContact) {
            // created status
            this.res.writeHead(201, {'content-type':'application/json'});
            this.res.end(JSON.stringify(newContact));
        } else {
            // internal error status
            this.res.writeHead(500, {'content-type':'text/plain'});
            this.res.end();
        }
    }
    put(contact){
        console.log('PUT: /api/contacts/', contact); 
        // todo : validate contact before insertion
        if (this.contactsRepository.update(contact)){
            // ok status
            this.res.writeHead(200, {'content-type':'text/plain'});
            this.res.end();
        } else {
            // not found status
            this.res.writeHead(404, {'content-type':'text/plain'});
            this.res.end();
        }
    }
    remove(id){
        console.log('DELETE: /api/contacts/'); 
        if (this.contactsRepository.remove(id))
            // accepted status
            this.res.writeHead(202, {'content-type':'text/plain'});
        else
            // not found status
            this.res.writeHead(404, {'content-type':'text/plain'});
        this.res.end(null);
    }
}

module.exports = ContactsController;