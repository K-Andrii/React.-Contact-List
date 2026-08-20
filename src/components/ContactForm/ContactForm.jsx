import styles from "./ContactForm.module.css";
import { useEffect, useState } from "react";

const INITIAL_FORM_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

function ContactForm({ onSave, onDelete, currentContact }) {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveClick = () => {
    onSave(formData);
    if (!currentContact) setFormData(INITIAL_FORM_STATE);
  };

  const handleClearField = (fieldName) => {
    setFormData({ ...formData, [fieldName]: "" });
  };

  useEffect(() => {
    if (currentContact) {
      setFormData(currentContact);
    } else {
      setFormData(INITIAL_FORM_STATE);
    }
  }, [currentContact]);

  return (
    <div className={styles.formContainer}>
      <div className={styles.inputsWrapper}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="FirstName"
          />
          <button
            className={styles.clearBtn}
            onClick={() => handleClearField("firstName")}
          >
            ✕
          </button>
        </div>

        <div className={styles.inputGroup}>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="LastName"
          />
          <button
            className={styles.clearBtn}
            onClick={() => handleClearField("lastName")}
          >
            ✕
          </button>
        </div>

        <div className={styles.inputGroup}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <button
            className={styles.clearBtn}
            onClick={() => handleClearField("email")}
          >
            ✕
          </button>
        </div>

        <div className={styles.inputGroup}>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
          />
          <button
            className={styles.clearBtn}
            onClick={() => handleClearField("phone")}
          >
            ✕
          </button>
        </div>
      </div>

      <div className={styles.buttonsWrapper}>
        <button className="actionBtn" onClick={handleSaveClick}>
          Save
        </button>
        {currentContact && (
          <button className="actionBtn" onClick={onDelete}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default ContactForm;
