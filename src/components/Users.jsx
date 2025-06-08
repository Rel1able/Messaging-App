import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import styles from "../styles/users.module.css";
export default function Users() {
    const { API_URL, isRunning } = useContext(AppContext);
    const [users, setUsers] = useState([]);
    const [inputValue, setInputValue] = useState("");
    useEffect(() => {
        async function getUsers() {
            try {
                const req = await fetch(`${API_URL}/users`, {credentials: "include"});
                if (!req.ok) {
                    throw new Error("Failed to get the data")
                }
                const res = await req.json();
                setUsers(res.users);
            } catch (err) {
                console.error(err);
            }
        }
        getUsers();
    }, [isRunning])

    async function handleFilter(e) {
        setInputValue(e.target.value.toLowerCase());
    }

    const filteredUsers = !inputValue ? users : users.filter((user) => user.username.toLowerCase().includes(inputValue))

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Users</h1>
            <input className={styles.input} value={inputValue} onChange={e => handleFilter(e)} type="text" placeholder="Search"/>
            {
                users.length > 0 ?
                <ul className={styles.container}>
                    {filteredUsers.map((user, id) => {
                        return <li key={id}>
                            <Link className={styles.user} to={`/profile/${user.id}`}>
                                <div className={styles.imageContainer}>
                                    <img className={styles.image} src="/account.svg" />
                                </div>
                    
                                <p>{user.firstName}</p>
                                <p> {user.lastName}</p>
                                <p>@{user.username}</p>
                            </Link>
                            
                        </li>
                    })}
                </ul> : <div className={styles.loading}>Loading...</div>
            }
        </div>
        
        
    )
}