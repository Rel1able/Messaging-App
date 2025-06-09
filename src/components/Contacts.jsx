import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import styles from "../styles/contacts.module.css";

export default function Contacts() {
    const { API_URL,refreshTrigger, isRunning, token} = useContext(AppContext);
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [inputValue, setInputValue] = useState("");
    useEffect(() => {
        async function getUsers() {
            try {
                const req = await fetch(`${API_URL}/users/contacts`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token
                    },
                });
                if (!req.ok) {
                    throw new Error("Failed to get the data")
                }
                const res = await req.json();
                setContacts(res.contacts);
                setLoading(false);
            } catch (err) {
                console.error(err);
            }
        }
        getUsers();
    }, [refreshTrigger, isRunning])

    const sortedContacts = !inputValue ? contacts : contacts.filter((contacts) => contacts.username.toLowerCase().includes(inputValue));

    return (
        loading ? <div className={styles.loading}>Loading...</div> : 
            contacts.length > 0 ?
                <ul className={styles.contactsList}>        
                <input className={styles.input} value={inputValue} type="text" placeholder="Search" onChange={e => setInputValue(e.target.value.toLowerCase())} />

                   
            {sortedContacts.map((user, id) => {
                return <li className={styles.contactContainer} key={id}>
                    <Link className={styles.contact} to={`/chat/${user.id}`}>
                        <div className={styles.iconContainer}>
                            <img className={styles.icon} src="/account.svg" />
                            <p className={styles.status} style={{background: user.status === "Offline" ? "red" : "green"}}></p>
                        </div>
                        <p className={styles.name}>{user.firstName} {user.lastName}</p>
                     
                    </Link>
                    
                </li>
            })}
        </ul> : <div className={styles.findContacts}>You don't have any contacts Yet <Link to="/users">Try to find one</Link></div>
        
    )
}