function initContacts(){
    const ContactsRepository = require('./models/ContactsRepository');
    const Contact = require('./models/Contact');
    const contactsRepository = new ContactsRepository();
    contactsRepository.add(new Contact('Nicolas Chourot','Nicolas.Chourot@clg.qc.ca','450 430-3120'));
    contactsRepository.add(new Contact('Joel Dusablon','Joel.Dusablon@clg.qc.ca','450 430-3120'));
    contactsRepository.add(new Contact('Patrice Roy','Patrice.Roy@clg.qc.ca','450 430-3120')); 
    contactsRepository.add({
        Id : 0,
        Name: 'Warda Moussadak',
        Email: 'Warda.Moussadak@clg.qc.ca',
        Phone: '450 430-3120'
      });
      contactsRepository.add({
        Id : 0,
        Name: 'Stéphane Chassé',
        Email: 'Stephane.Chasse@clg.qc.ca',
        Phone: '450 430-3120'
    });
}
//initContacts();
//////////////////////////////////////////////////////////////////////////
const http = require('http');
const server = http.createServer((req, res) => {
    console.log(req.method);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    if (req.method === 'OPTIONS'){
        console.log('preflight CORS verifications');
        res.end();
    } else {
        let router = require('./router');
        if (!router.dispatchEndPoint(req, res)) {
            // do something else with request
        }
    }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`HTTP Server running on port ${PORT}...`));
/////////////////////////////////////////////////////////////////////////
