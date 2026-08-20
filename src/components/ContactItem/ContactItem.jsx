import styles from "./ContactItem.module.css";

function ContactItem({ contact, onEdit, onDelete }) {
  return (
    <div
      className={styles.contactContainer}
      onDoubleClick={() => onEdit(contact)}
    >
      <div className={styles.contactInfo}>
        <span>
          {contact.firstName} {contact.lastName}
        </span>
      </div>
      <button
        className={styles.deleteContactBtn}
        onClick={(e) => {
          e.stopPropagation();
          onDelete(contact.id);
        }}
      >
        ✕
      </button>
    </div>
  );
}

export default ContactItem;
