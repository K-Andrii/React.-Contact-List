import { useEffect, useState } from 'react';

import {
  addContact,
  deleteContact,
  editContact,
  fetchContacts,
} from './api/contactService.js';
import ContactForm from './components/ContactForm/ContactForm.jsx';
import ContactList from './components/ContactList/ContactList.jsx';
import Header from './components/Header/Header.jsx';
import { INITIAL_FORM_STATE } from './utils/constants.js';

import styles from './App.module.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [currentContact, setCurrentContact] = useState(INITIAL_FORM_STATE);

  useEffect(() => {
    const loadContacts = async () => {
      const data = await fetchContacts();
      if (data) {
        setContacts(data);
      }
    };
    loadContacts().catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error);
    });
  }, []);

  const handleSave = (data) => {
    if (currentContact.id) updateContact(data);
    else createNewContact(data);
  };
  const updateContact = async (data) => {
    try {
      const updatedContact = await editContact(currentContact.id, data);
      setContacts((prev) =>
        prev.map((contact) =>
          contact.id === currentContact.id ? updatedContact : contact,
        ),
      );
      setCurrentContact(updatedContact);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };
  const createNewContact = async (data) => {
    try {
      const newData = await addContact(data);
      setContacts((prev) => [...prev, newData]);
      setCurrentContact({ ...INITIAL_FORM_STATE });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteContact(id);
      setContacts((prev) => prev.filter((contact) => contact.id !== id));
      if (currentContact.id === id)
        setCurrentContact({ ...INITIAL_FORM_STATE });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };
  const handleEdit = (contact) => setCurrentContact(contact);
  const handleNew = () => {
    setCurrentContact({ ...INITIAL_FORM_STATE });
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
