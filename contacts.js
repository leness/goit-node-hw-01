const fs = require('fs')
const path = require('path')


const contactsPath = path.resolve('./db/contacts.json');
  
 console.log(contactsPath);


function listContacts() {
 
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err.message)
      return
    }
    const contacts = JSON.parse(data);
    console.log('Contact list: ');
    console.table(contacts);
  })
}


function getContactById(contactId) {

  fs.readFile(contactsPath, "utf-8", (err, data) => {
     if (err) {
      console.error(err.message)
      return
    } else {
      const contacts = JSON.parse(data);
      const contact = contacts.find(({id}) => id === +contactId);
      console.table(contact);
    }
  });
}

function removeContact(contactId) {

  fs.readFile(contactsPath, 'utf-8', (err, data) => {
  
    if (err) {
      console.error(err.message)
      return
    } else {
      const contacts = JSON.parse(data);
      const newContacts = contacts.filter(({id}) => id !== +contactId);

      fs.writeFile(contactsPath, JSON.stringify(newContacts), (err) => {
        if (err) {
         console.error(err.message)
      return
        }
        console.log('Contact deleted successfully!')
        console.table(newContacts);
      });
     
    }
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err.message)
      return
    }
    const contacts = JSON.parse(data);

            contacts.push({
            id: contacts.length + 1,
            name: name,
            email: email,
            phone: phone,
        });

        console.log('Contacts added successfully! New lists of contacts: ');
        console.table(contacts);

        fs.writeFile(contactsPath, JSON.stringify(contacts), error => {
            if (error) {
                return console.log(error);
            }
        })
  })
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
}
