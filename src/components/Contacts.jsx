import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import styles from "../styles/contacts.module.css";

export default function Contacts() {
    const { API_URL,refreshTrigger } = useContext(AppContext);
    const [contacts, setContacts] = useState([]);
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
            } catch (err) {
                console.error(err);
            }
        }
        getUsers();
    }, [refreshTrigger])

    return (
        contacts.length > 0 ? <ul className={styles.contactsList}>
            {contacts.map((user, id) => {
                return <li key={id}>
                    <Link to={`/chat/${user.id}`}>
                        {user.username}
                        {user.status}
                    </Link>
                    
                </li>
            })}
        </ul> : <div>You don't have any contacts Yet <Link to="/users">Try to find one</Link></div>
        
    )
}