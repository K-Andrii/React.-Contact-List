import styles from "./ContactForm.module.css";

function ContactForm() {
  return (
    <div className={styles.formContainer}>
      <div className={styles.inputsWrapper}>
        <div className={styles.inputGroup}>
          <input type="text" placeholder="FirstName" />
          <button className={styles.clearBtn}>✕</button>
        </div>

        <div className={styles.inputGroup}>
          <input type="text" placeholder="LastName" />
          <button className={styles.clearBtn}>✕</button>
        </div>

        <div className={styles.inputGroup}>
          <input type="email" placeholder="Email" />
          <button className={styles.clearBtn}>✕</button>
        </div>

        <div className={styles.inputGroup}>
          <input type="tel" placeholder="Phone" />
          <button className={styles.clearBtn}>✕</button>
        </div>
      </div>

      <div className={styles.buttonsWrapper}>
        <button className="actionBtn">Save</button>
        <button className="actionBtn">Delete</button>
      </div>
    </div>
  );
}

export default ContactForm;
