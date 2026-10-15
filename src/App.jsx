import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  addContact as addContactApi,
  deleteContact as deleteContactApi,
  editContact as editContactApi,
  fetchContacts,
} from './api/contactService.js';
import ContactForm from './components/ContactForm/ContactForm.jsx';
import ContactList from './components/ContactList/ContactList.jsx';
import Header from './components/Header/Header.jsx';
import {
  addContact as addContactAction,
  deleteContact as deleteContactAction,
  setContacts as setContactsAction,
  updateContact as updateContactAction,
} from './store/contactsSlice.js';
import { INITIAL_FORM_STATE } from './utils/constants.js';

import styles from './App.module.css';

function App() {
  const contacts = useSelector((state) => state.contacts.items);
  const dispatch = useDispatch();
  const [currentContact, setCurrentContact] = useState(INITIAL_FORM_STATE);

  useEffect(() => {
    const loadContacts = async () => {
      const data = await fetchContacts();
      dispatch(setContactsAction(data));
      dispatch(setContactsAction(data));
    };
    loadContacts().catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error.message);
    });
  }, []);

  const handleSave = (data) => {
    if (currentContact.id) updateContact(data);
    else createNewContact(data);
  };
  const updateContact = async (data) => {
    try {
      const updatedContact = await editContactApi(currentContact.id, data);
      dispatch(updateContactAction(updatedContact));
      setCurrentContact(updatedContact);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error.message);
    }
  };
  const createNewContact = async (data) => {
    try {
      const newData = await addContactApi(data);
      dispatch(addContactAction(newData));
      setCurrentContact({ ...INITIAL_FORM_STATE });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error.message);
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteContactApi(id);
      dispatch(deleteContactAction(id));
      if (currentContact.id === id)
        setCurrentContact({ ...INITIAL_FORM_STATE });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error.message);
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
