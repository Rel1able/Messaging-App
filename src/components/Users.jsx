import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

export default function Users() {
    const { API_URL } = useContext(AppContext);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        async function getUsers() {
            try {
                const req = await fetch(`${API_URL}/users`, {credentials: "include"});
                if (!req.ok) {
                    throw new Error("Failed to get the data")
                }
                const res = await req.json();
                console.log(res.users);
                setUsers(res.users);
            } catch (err) {
                console.error(err);
            }
        }
        getUsers();
    }, [])

    return (
        users.length > 0 ? <ul>
            {users.map((user, id) => {
                return <li key={id}>
                    <Link to={`/profile/${user.id}`}>
                        {user.firstName}
                        {user.lastName}
                        {user.username}
                        {user.status}
                    </Link>
                    
                </li>
            })}
        </ul> : <div>Loading...</div>
        
    )
}