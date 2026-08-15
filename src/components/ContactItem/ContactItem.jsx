import styles from "./ContactItem.module.css";

function ContactItem() {
  return (
    <div className={styles.contactContainer}>
      <div className={styles.contactInfo}>
        <span>FirstName</span>
        <span>LastName</span>
      </div>
      <button className={styles.deleteContactBtn}>✕</button>
    </div>
  );
}

export default ContactItem;
