import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Contacts() {
    const { API_URL } = useContext(AppContext);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        async function getUsers() {
            try {
                const req = await fetch(`${API_URL}/users`);
                if (!req.ok) {
                    throw new Error("Failed to get the data")
                }
                const res = await req.json();
                console.log(res.users);
                setUsers(res.users);
            } catch (err) {
                console.err(err);
            }
        }
        getUsers();
    }, [])

    return (
        users.length > 0 ? <ul>
            {users.map((user) => {
                return <li>
                    {user.username}
                    {user.status}
                </li>
            })}
        </ul> : <div>Loading...</div>
        
    )
}