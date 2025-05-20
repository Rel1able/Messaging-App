import { Link, useNavigate } from "react-router-dom"
import styles from "../styles/navbar.module.css";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";

export default function Navbar() {
    const navigate = useNavigate();
    const { API_URL } = useContext(AppContext);
    const currentUser = JSON.parse(localStorage.getItem("user"))

    async function handleLogout() {
        await fetch(`${API_URL}/auth/log-out`)
        localStorage.removeItem("user");
        navigate("/log-in")
    }
    return (
        <nav className={styles.navbar}>
            <ul className={styles.list}>
                <li><Link to={`profile/${currentUser.id}`}><img className={styles.icon} src="/profile.svg"/></Link></li>
                <li><Link to="/users"><img className={styles.icon} src="/users.svg"/></Link></li>
                <a onClick={handleLogout}><img className={styles.icon} src="/logout.svg"/></a>
            </ul>
        </nav>
    )
}