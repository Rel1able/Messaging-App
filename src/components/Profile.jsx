import { useParams, Link } from "react-router-dom"
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import styles from "../styles/profile.module.css";

export default function Profile() {
    const [user, setUser] = useState({});
    const { API_URL } = useContext(AppContext);    
    const { userId } = useParams();
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const statusColor = user.status === "Offline" ? "red" : "green"

    useEffect(() => {
        async function getUserData() {
            try {
                const req = await fetch(`${API_URL}/users/${userId}`, {credentials: "include"});
                const res = await req.json();
                console.log(res);
                setUser(res.user);
            } catch (err) {
                console.error(err);
            }        
        }
        getUserData();
    }, [userId])
    return (
        <div className={styles.container}>
            <div className={styles.iconContainer}>
                <img className={styles.icon} src="/account.svg"/>
            </div>
            <div className={styles.name}>
                <h2>{user.firstName}</h2>
                <h2>{user.lastName}</h2>
            </div>
            <h3 className={styles.username}>@{user.username}</h3>
            {+userId !== +currentUser.id && <Link className={styles.btn} to={`/chat/${userId}`}>Text {user.username}</Link>}
            <h4 style={{color:statusColor }}>{user.status}</h4>
            <h4>{user.about}</h4>
           
        </div>
    )
}