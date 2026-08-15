import Header from "./components/Header/Header.jsx";
import ContactList from "./components/ContactList/ContactList.jsx";
import ContactForm from "./components/ContactForm/ContactForm.jsx";
import styles from "./App.module.css";

function App() {
  return (
    <div className="appContainer">
      <Header />
      <div className={styles.contentWrapper}>
        <ContactList />
        <ContactForm />
      </div>
    </div>
  );
}

export default App;
