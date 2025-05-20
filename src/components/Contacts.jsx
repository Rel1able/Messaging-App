import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import styles from "../styles/contacts.module.css";

export default function Contacts() {
    const { API_URL,refreshTrigger } = useContext(AppContext);
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function getUsers() {
            try {
                const req = await fetch(`${API_URL}/users/contacts`, {credentials: "include"});
                if (!req.ok) {
                    throw new Error("Failed to get the data")
                }
                const res = await req.json();
                console.log(res.contacts);
                setContacts(res.contacts);
                setLoading(false);
            } catch (err) {
                console.error(err);
            }
        }
        getUsers();
    }, [refreshTrigger])

    return (
        loading ? <div>Loading...</div> : 
        contacts.length > 0 ? <ul className={styles.contactsList}>
            {contacts.map((user, id) => {
                return <li key={id}>
                    <Link  to={`/chat/${user.id}`}>
                        <p>{user.username}</p>
                       <p style={{color: user.status === "Offline" ? "red" : "green"}}>{user.status}</p>
                    </Link>
                    
                </li>
            })}
        </ul> : <div className={styles.findContacts}>You don't have any contacts Yet <Link to="/users">Try to find one</Link></div>
        
    )
}