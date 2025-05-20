import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import styles from "../styles/chat.module.css";

export default function Chat() {
    const { API_URL, setRefreshTrigger } = useContext(AppContext);
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState("");
    const { userId } = useParams();
    const [user, setUser] = useState({});
    const currentUser = JSON.parse(localStorage.getItem("user"));


    async function getChatData() {
        try {
            const req = await fetch(`${API_URL}/messages/${userId}`, {credentials: "include"});
            if (!req.ok) {
                throw new Error("Failed to fetch the data");
            }
            const res = await req.json();
            console.log(res);
            setChatMessages(res.chatMessages);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getChatData();
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

    async function sendMessage(e) {
        e.preventDefault();
        try {
            const req = await fetch(`${API_URL}/messages/${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({message}),
                credentials: "include"
            });
            if (!req.ok) {
                throw new Error("Failed to send message")
            }
            const res = await req.json();
            setMessage("");
            getChatData()
            setRefreshTrigger(prev => !prev);
            console.log("Message", res);
        } catch (err) {
            console.error(err);
        }


    }
    
    return (
        <div className={styles.chatContainer}>
            <div className={styles.contact}>
                <img className={styles.icon2} src="/profile.svg"/>
                {user.username}
            </div>
            <ul className={styles.messagesList}>
                {chatMessages.map((msg, id) => {
                    const messageAuthor = msg.sender.id === currentUser.id ? "You" : msg.sender.username;
                    const messagePosition = msg.sender.id === currentUser.id ? "end" : "start";
                    return <li style={{alignSelf: messagePosition, textAlign: messagePosition}} className={styles.message} key={id}>
                            <p>{messageAuthor}</p>
                            <p>{msg.text}</p>
                        </li>
                    }
                )}
            </ul>
            <form className={styles.sendMessageForm} onSubmit={e => sendMessage(e, userId)}>
                <div className={styles.sendFormContainer}>
                    <input className={styles.input} value={message} required onChange={e => setMessage(e.target.value)} type="text" id="msg" placeholder="Send your message..." />
                    <button type="submit"><img className={styles.icon} src="/send.svg"/></button>
                </div>
            </form>
        </div>
    )
}