import { Link, useNavigate } from "react-router-dom"
import styles from "../styles/navbar.module.css";
import { AppContext } from "../context/AppContext";
import { useContext} from "react";

export default function Navbar() {
    const navigate = useNavigate();
    const { API_URL } = useContext(AppContext);
    const currentUser = JSON.parse(localStorage.getItem("user"))


    async function handleLogout() {
        await fetch(`${API_URL}/users/${currentUser.id}/offline`)
        await fetch(`${API_URL}/auth/log-out`)
        localStorage.removeItem("user");
        navigate("/log-in")
    }
    return (
        <nav className={styles.navbar}>
            <ul className={styles.list}>
                <li className={styles.iconParent}>
                    <Link to={`profile/${currentUser.id}`}>
                        <img className={styles.icon} src="/profile.svg" />
                    </Link>
                    <span className={styles.iconChild}>My Profile</span>
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