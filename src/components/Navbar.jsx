import { Link } from "react-router-dom"
import styles from "../styles/navbar.module.css";

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.list}>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/contacts">Contacts</Link></li>
            </ul>
        </nav>
    )
}