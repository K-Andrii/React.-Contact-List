import { useEffect, useState } from "react";

import { nanoid } from "nanoid";

import ContactForm from "./components/ContactForm/ContactForm.jsx";
import ContactList from "./components/ContactList/ContactList.jsx";
import Header from "./components/Header/Header.jsx";

import styles from "./App.module.css";

const STORAGE_KEY = "contacts";

function App() {
  const [contacts, setContacts] = useState(() => {
    try {
      const savedContacts = localStorage.getItem("contacts");
      return savedContacts ? JSON.parse(savedContacts) : [];
    } catch (error) {
      //eslint-disable-next-line
      console.error(error);
      return [];
    }
  });
  const [currentContact, setCurrentContact] = useState(null);
  const [resetKey, setResetKey] = useState(nanoid());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const handleSave = (data) => {
    if (currentContact) {
      const updatedContact = { id: currentContact.id, ...data };
      setContacts((prev) =>
        prev.map((contact) =>
          contact.id === currentContact.id ? updatedContact : contact,
        ),
      );
      setCurrentContact(updatedContact);
    } else {
      const newContact = { id: nanoid(), ...data };
      setContacts((prev) => [...prev, newContact]);
      setResetKey(nanoid());
    }
  };
  const handleEdit = (contact) => setCurrentContact(contact);
  const handleDelete = (id) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
    if (currentContact && currentContact.id === id) {
      setCurrentContact(null);
    }
  };
  const handleNew = () => {
    setCurrentContact(null);
    setResetKey(nanoid());
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
          key={currentContact ? currentContact.id : resetKey}
          onSave={handleSave}
          onDelete={handleDelete}
          currentContact={currentContact}
        />
      </div>
    </div>
  );
}

export default App;
