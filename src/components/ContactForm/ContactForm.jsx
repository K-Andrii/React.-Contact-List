import { useEffect, useState } from 'react';

import styles from './ContactForm.module.css';

function ContactForm({ onSave, onDelete, currentContact }) {
  const [formData, setFormData] = useState(currentContact);

  useEffect(() => {
    setFormData(currentContact);
  }, [currentContact]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSaveClick = () => {
    onSave(formData);
  };

  const handleClearField = (fieldName) => {
    setFormData((prev) => ({ ...prev, [fieldName]: '' }));
  };

  return (
    <form className={styles.formContainer}>
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
            onClick={() => handleClearField('firstName')}
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
            onClick={() => handleClearField('lastName')}
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
            onClick={() => handleClearField('email')}
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
            onClick={() => handleClearField('phone')}
          >
            ✕
          </button>
        </div>
      </div>

      <div className={styles.buttonsWrapper}>
        <button type="button" className="actionBtn" onClick={handleSaveClick}>
          Save
        </button>
        {currentContact.id && (
          <button
            type="button"
            className="actionBtn"
            onClick={() => onDelete(currentContact.id)}
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}

export default ContactForm;
