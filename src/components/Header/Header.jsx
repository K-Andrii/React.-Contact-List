import styles from "./Header.module.css";

function Header(props) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Contact List</h2>
    </div>
  );
}

export default Header;
