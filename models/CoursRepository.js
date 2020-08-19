const Cours = require('./Cours');
const fs = require('fs');

class CoursRepository {
    constructor(){
        this.coursList = [];
        this.coursFile = './data/cours.json';
        this.read();
    }
    read() {
        // the sync version of readFile prevent from concurent io
        try{
            let rawdata = fs.readFileSync(this.coursFile);
            this.coursList = JSON.parse(rawdata);
        } catch(error) {
            if (error.code === 'ENOENT') {
                // file does not exist no readind is necessary
                // it will be created on demand
                this.coursList = [];
            }
        }
    }
    write() {
        // the sync version of writeFile prevent from concurent io
        fs.writeFileSync(this.coursFile, JSON.stringify(this.coursList));
        this.read();
    }
    nextId() {
        let maxId = 0;
        for(let cours of this.coursList){
            if (cours.id > maxId) {
                maxId = contact.id;
            }
        }
        return maxId + 1;
    }
    add(cours) {
        try {
            cours.id = this.nextId();
            this.coursList.push(cours);
            this.write();
            return cours;
        } catch(error) {
            return null;
        }
    }
    getAll() {
        return this.coursList;
    }
    get(id){
        for(let cours of this.coursList){
            if (cours.id === id) {
               return cours;
            }
        }
        return null;
    }
    remove(id) {
        let index = 0;
        for(let cours of this.coursList){
            if (cours.id === id) {
                this.coursList.splice(index,1);
                this.write();
                return true;
            }
            index ++;
        }
        return false;
    }
    update(id, cours) {
        let index = 0;
        for(let cours of this.coursList){
            if (cours.id === id) {
                this.coursList[index] = cours;
                this.write();
                return true;
            }
            index ++;
        }
        return false;
    }
}

module.exports = CoursRepository;