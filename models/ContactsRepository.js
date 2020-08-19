const Contact = require('./Contact');
const fs = require('fs');

class ContactsRepository {
    constructor(){
        this.contactsList = [];
        this.contactsFile = './data/contacts.json';
        this.read();
    }
    read() {
        // the sync version of readFile prevent from concurent io
        try{
            let rawdata = fs.readFileSync(this.contactsFile);
            this.contactsList = JSON.parse(rawdata);
        } catch(error) {
            if (error.code === 'ENOENT') {
                // file does not exist no readind is necessary
                // the will be created on demand
                this.contactsList = [];
            }
        }
    }
    write() {
        // the sync version of writeFile prevent from concurent io
        fs.writeFileSync(this.contactsFile, JSON.stringify(this.contactsList));
        this.read();
    }
    nextId() {
        let maxId = 0;
        for(let contact of this.contactsList){
            if (contact.id > maxId) {
                maxId = contact.id;
            }
        }
        return maxId + 1;
    }
    add(contact) {
        try {
            contact.id = this.nextId();
            this.contactsList.push(contact);
            this.write();
            return contact;
        } catch(error) {
            return null;
        }
    }
    getAll() {
        return this.contactsList;
    }
    get(id){
        for(let contact of this.contactsList){
            if (contact.id === id) {
               return contact;
            }
        }
        return null;
    }
    remove(id) {
        let index = 0;
        for(let contact of this.contactsList){
            if (contact.id === id) {
                this.contactsList.splice(index,1);
                this.write();
                return true;
            }
            index ++;
        }
        return false;
    }
    update(id, contact) {
        let index = 0;
        for(let contact of this.contactsList){
            if (contact.id === id) {
                this.contactsList[index] = contact;
                this.write();
                return true;
            }
            index ++;
        }
        return false;
    }
}

module.exports = ContactsRepository;