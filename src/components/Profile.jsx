import { useParams, Link } from "react-router-dom"
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import styles from "../styles/profile.module.css";

export default function Profile() {
    const [user, setUser] = useState({});
    const [editing, setEditing] = useState(false);
    const [aboutMe, setAboutMe] = useState("");
    const [errors, setErrors] = useState([]);
    const { API_URL, isRunning, token } = useContext(AppContext);    
    const { userId } = useParams();
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const statusColor = user.status === "Offline" ? "red" : "green"

    useEffect(() => {
        if (user.about) {
            setAboutMe(user.about)
        }
    }, [user])

    useEffect(() => {
        async function getUserData() {
            try {
                const req = await fetch(`${API_URL}/users/${userId}`);
                const res = await req.json();
                setUser(res.user);
            } catch (err) {
                console.error(err);
            }        
        }
        getUserData();
    }, [userId, isRunning])

    async function updateAboutSection() {
        try {

            const req = await fetch(`${API_URL}/users/${userId}/about`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                    Authorization: "Bearer " + token
                },
                body: JSON.stringify({description: aboutMe})
            })
            const res = await req.json();
            if (!req.ok) {
                console.error(res.errors);
                setErrors(res.errors);
                return
            }
            

            const updatedUser = {...user, about: aboutMe}
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setUser(updatedUser);
            setEditing(false);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        user.firstName ? (
            <div className={styles.container}>
            <div className={styles.iconContainer}>
                <img className={styles.icon} src="/account.svg"/>
            </div>
            <div className={styles.name}>
                <h2>{user.firstName}</h2>
                <h2>{user.lastName}</h2>
            </div>
            <h3 className={styles.username}>@{user.username}</h3>
            {+userId !== +currentUser.id && <Link className={styles.btn} to={`/chat/${userId}`}>Text {user.firstName}</Link>}
            <h4 style={{ color: statusColor }}>{user.status}</h4>
            {+userId === +currentUser.id &&
                (editing ?
                <div className={styles.about}>
                    <h4>About me:</h4>
                    <input placeholder="Tell us something about you" className={styles.input} type="text" value={aboutMe} onChange={e => setAboutMe(e.target.value)} />
                    <button className={styles.btn} onClick={updateAboutSection}>Save</button>
                    <ul className={styles.errorList}>
                            {errors.map((err, id) => (
                                <li key={id} className={styles.error}>{err.msg}</li>
                            ))}
                    </ul>
                </div>
                :  <div className={styles.about}>
                    <h4>About me: {user.about}</h4>
                    <button className={styles.btn} onClick={() => setEditing(true)}>Edit</button>
                        
                </div> 
            )}
            
           
        </div>
        ) : <div className={styles.loading}>Loading...</div>
       
    )
}