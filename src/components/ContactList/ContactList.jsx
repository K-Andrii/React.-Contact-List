import styles from "./ContactList.module.css";
import ContactItem from "../ContactItem/ContactItem.jsx";

function ContactList({ contacts, onEdit, onDelete, onNew }) {
  return (
    <div className={styles.contentWrapper}>
      <div className={styles.contactListContainer}>
        {contacts.map((contact) => (
          <ContactItem
            key={contact.id}
            contact={contact}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
      <button className={styles.actionBtn} onClick={onNew}>
        New
      </button>
    </div>
  );
}

export default ContactList;
