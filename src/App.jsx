import { useEffect, useState } from 'react';

import { nanoid } from 'nanoid';

import ContactForm from './components/ContactForm/ContactForm.jsx';
import ContactList from './components/ContactList/ContactList.jsx';
import Header from './components/Header/Header.jsx';

import styles from './App.module.css';

function App() {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('contacts');
    return savedContacts ? JSON.parse(savedContacts) : [];
  });
  const [currentContact, setCurrentContact] = useState(null);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSave = (data) => {
    if (currentContact) {
      setContacts(
        contacts.map((contact) =>
          contact.id === currentContact.id
            ? { id: currentContact.id, ...data }
            : contact,
        ),
      );
    } else {
      const newContact = { id: nanoid(), ...data };
      setContacts([...contacts, newContact]);
    }
  };
  const handleEdit = (contact) => setCurrentContact(contact);
  const handleDelete = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
    if (currentContact && currentContact.id === id) {
      setCurrentContact(null);
    }
  };
  const handleNew = () => setCurrentContact(null);

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
