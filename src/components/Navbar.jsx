import { Link, useNavigate } from "react-router-dom"
import styles from "../styles/navbar.module.css";
import { AppContext } from "../context/AppContext";
import { useContext} from "react";

export default function Navbar() {
    const navigate = useNavigate();
    const { API_URL, token } = useContext(AppContext);
    const currentUser = JSON.parse(localStorage.getItem("user"))
    const profileLink = currentUser ? currentUser.id : "null"

    async function handleLogout() {
        currentUser ? await fetch(`${API_URL}/users/${currentUser.id}/offline`, {
            headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + token
            }
        }) : "null"
        await fetch(`${API_URL}/auth/log-out`)
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/log-in")
    }
    return (
        <nav className={styles.navbar}>
            <ul className={styles.list}>
                <li className={styles.iconParent}>
                    <Link to={`profile/${profileLink}`}>
                        <img className={styles.icon} src="/profile.svg" />
                    </Link>
                    <span className={styles.iconChild}>My Profile</span>
                </li>
                <li className={styles.contactsLink}>
                    <Link to="/contacts">
                        <img className={styles.icon} src="/chat.svg"/>
                        <span className={styles.iconChild}>Contacts</span>
                    </Link>
                </li>
                <li className={styles.iconParent}>
                    <Link to="/users">
                        <img className={styles.icon} src="/users.svg" />
                    </Link>
                    <span className={styles.iconChild}>Users</span>
                </li>
                <li className={styles.iconParent}>
                    <a onClick={handleLogout}>
                        <img className={styles.icon} src="/logout.svg" />
                    </a>
                    <span className={styles.iconChild}>Log out</span>
                </li>
            </ul>
        </nav>
    )
}