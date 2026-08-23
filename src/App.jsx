import { useEffect, useState } from 'react';

import { nanoid } from 'nanoid';

import ContactForm from './components/ContactForm/ContactForm.jsx';
import ContactList from './components/ContactList/ContactList.jsx';
import Header from './components/Header/Header.jsx';
import { INITIAL_FORM_STATE, STORAGE_KEY } from './utils/constants.js';

import styles from './App.module.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [currentContact, setCurrentContact] = useState(INITIAL_FORM_STATE);

  useEffect(() => {
    try {
      const savedContacts = localStorage.getItem(STORAGE_KEY);
      if (savedContacts) {
        setContacts(JSON.parse(savedContacts));
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, []);

  const handleSave = (data) => {
    if (currentContact.id) updateContact(data);
    else createNewContact(data);
  };
  const updateContact = (data) => {
    const updatedContact = { ...data, id: currentContact.id };
    const newContacts = contacts.map((contact) =>
      contact.id === currentContact.id ? updatedContact : contact,
    );
    setContacts(newContacts);
    setCurrentContact(updatedContact);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newContacts));
  };
  const createNewContact = (data) => {
    const newContact = { ...data, id: nanoid() };
    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
    setCurrentContact({ ...INITIAL_FORM_STATE }); // ⬅ нова копія, а не той самий об'єкт
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newContacts));
  };
  const handleEdit = (contact) => setCurrentContact(contact);
  const handleDelete = (id) => {
    const newContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(newContacts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newContacts));
    if (currentContact.id === id) setCurrentContact({ ...INITIAL_FORM_STATE }); // ⬅ теж
  };

  const handleNew = () => {
    setCurrentContact({ ...INITIAL_FORM_STATE }); // ⬅ теж
  };

  return (
    <div className="appContainer">
      <Header />
      <div className={styles.contentWrapper}>
        <ContactList
          contacts={contacts}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onNew={handleNew}
        />
        <ContactForm
          onSave={handleSave}
          onDelete={handleDelete}
          currentContact={currentContact}
        />
      </div>
    </div>
  );
}

export default App;
