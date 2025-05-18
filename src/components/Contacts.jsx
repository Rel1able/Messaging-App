import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import styles from "../styles/contacts.module.css";

export default function Contacts() {
    //Get users that logged user has chat with!!!!




    // const { API_URL } = useContext(AppContext);
    // const [users, setUsers] = useState([]);
    // useEffect(() => {
    //     async function getUsers() {
    //         try {
    //             const req = await fetch(`${API_URL}/users`, {credentials: "include"});
    //             if (!req.ok) {
    //                 throw new Error("Failed to get the data")
    //             }
    //             const res = await req.json();
    //             console.log(res.users);
    //             setUsers(res.users);
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     }
    //     getUsers();
    // }, [])

    // return (
    //     users.length > 0 ? <ul className={styles.contactsList}>
    //         {users.map((user, id) => {
    //             return <li key={id}>
    //                 <Link to={`/chat/${user.id}`}>
    //                     {user.username}
    //                     {user.status}
    //                 </Link>
                    
    //             </li>
    //         })}
    //     </ul> : <div>Loading...</div>
        
    // )
}