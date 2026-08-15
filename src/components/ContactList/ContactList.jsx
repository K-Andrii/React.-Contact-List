import styles from "./ContactList.module.css";

function ContactList(props) {
  return (
    <div className={styles.contentWrapper}>
      <div className={styles.contactListContainer}></div>
      <button className={styles.actionBtn}>New</button>
    </div>
  );
}

export default ContactList;
