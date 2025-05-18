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
                <li><Link to={`profile/${currentUser.id}`}>Profile</Link></li>
                <li><Link to="/users">Users</Link></li>
                <a onClick={handleLogout}>Log out</a>
            </ul>
        </nav>
    )
}