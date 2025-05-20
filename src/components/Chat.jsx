import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import styles from "../styles/chat.module.css";

export default function Chat() {
    const { API_URL, setRefreshTrigger } = useContext(AppContext);
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState("");
    const { userId } = useParams();
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
    }, [])

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
                <div>
                    <label htmlFor="msg"></label>
                    <input value={message} required onChange={e => setMessage(e.target.value)} type="text" id="msg" placeholder="Send your message..." />
                    <button type="submit">Send</button>
                </div>
            </form>
        </div>
    )
}