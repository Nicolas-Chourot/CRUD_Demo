const ContactsRepository = require('./models/ContactsRepository');
class ContactsController{
    constructor(req, res){
        console.log('ContactsController constructor');
        this.req = req;
        this.res = res;
        this.contactsRepository = new ContactsRepository();
    }
    getAll(){
        console.log('GET: /api/contacts');
        // ok status
        this.res.writeHead(200, {'content-type':'application/json'});
        this.res.end(JSON.stringify(this.contactsRepository.getAll()));
    }
    get(id){
        console.log('GET: /api/contacts/' + id);
        // ok status
        this.res.writeHead(200, {'content-type':'application/json'});
        this.res.end(JSON.stringify(this.contactsRepository.get(id)));
    }
    post(contact){  
        console.log('POST: /api/contacts/', contact); 
        // todo : validate contact before insertion
        let newContact = this.contactsRepository.add(contact);
        if (newContact) {
            // created status
            this.res.writeHead(201, {'content-type':'application/json'});
            this.res.end(JSON.stringify(newContact));
        } else {
            // internal error status
            this.res.writeHead(500, {'content-type':'application/json'});
            this.res.end();
        }
    }
    remove(id){
        console.log('DELETE: /api/contacts/' + id); 
        if (this.contactsRepository.remove(id))
            // accepted status
            this.res.writeHead(202, {'content-type':'application/json'});
        else
            // not found status
            this.res.writeHead(404, {'content-type':'application/json'});
        this.res.end();
    }
}

module.exports = ContactsController;