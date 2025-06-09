import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext , useRef} from "react";
import { AppContext } from "../context/AppContext";
import styles from "../styles/chat.module.css";

export default function Chat() {
    const { API_URL, setRefreshTrigger, token } = useContext(AppContext);
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState("");
    const { userId } = useParams();
    const [user, setUser] = useState({});
    const currentUser = JSON.parse(localStorage.getItem("user"));

    const lastMessageRef = useRef(null);
    const inputRef = useRef(null);

    async function getChatData() {
        try {
            const req = await fetch(`${API_URL}/messages/${userId}`, {
                headers: {
                    "Content-type": "application/json",
                    Authorization: "Bearer " + token
                }
                
            });
            if (!req.ok) {
                throw new Error("Failed to fetch the data");
            }
            const res = await req.json();
            setChatMessages(res.chatMessages);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getChatData();
        async function getUserData() {
            try {
                const req = await fetch(`${API_URL}/users/${userId}`, {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: "Bearer " + token
                    }
                });
                const res = await req.json();
                setUser(res.user);
            } catch (err) {
                console.error(err);
            }        
        }
        getUserData();
    }, [userId])

    useEffect(() => {
        lastMessageRef.current.scrollIntoView({behavior: "smooth"})
    }, [chatMessages])

    useEffect(() => {
        inputRef.current.focus();
    })

    async function sendMessage(e) {
        e.preventDefault();
        try {
            const req = await fetch(`${API_URL}/messages/${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({message})
            });
            if (!req.ok) {
                throw new Error("Failed to send message")
            }
            setMessage("");
            getChatData()
            setRefreshTrigger(prev => !prev);
        } catch (err) {
            console.error(err);
        }


    }
    
    return (
        <div className={styles.chatContainer}>
                <Link className={styles.contact} to={`/profile/${userId}`}>
                    <img className={styles.icon2} src="/profile.svg" />
                    <div className={styles.contactName}>
                        <div>{user.firstName}</div>
                        <div>{user.lastName}</div> 
                    </div>
                </Link>
            <ul className={styles.messagesList}>
                {chatMessages.map((msg, id) => {
                    const currentUserIsMessageAuthor = msg.sender.id === currentUser.id;
                    const messageAuthor = currentUserIsMessageAuthor ? "You" : msg.sender.username;
                    const messagePosition = currentUserIsMessageAuthor ? "end" : "start";
                    const messageBackgroundColor = currentUserIsMessageAuthor ? "var(--main-color)" : "black";
                    // const messageColor = currentUserIsMessageAuthor ? "white" : "black";
                    const messagePlacement = !currentUserIsMessageAuthor ? "0.5rem" : "-0.5rem";
                    const datePlacement = !currentUserIsMessageAuthor ? "0.3rem" : "-0.3rem";
                    const isoDate = new Date(msg.sent);
                    const date = isoDate.toLocaleString("en-GB", {
                        day: 'numeric',
                        month: 'short',
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                    });

                    return <li style={{ alignSelf: messagePosition, textAlign: messagePosition }} className={styles.messageContainer} key={id}>
                            <p className={styles.author}>{messageAuthor}</p>
                            <p style={{left: datePlacement}} className={styles.date}>{date}</p>
                            <p className={styles.message} style={{background: messageBackgroundColor, color: "white", right: messagePlacement}}>{msg.text}</p>
                        </li>
                    }
                )}
                <div ref={lastMessageRef} />
            </ul>
            <form className={styles.sendMessageForm} onSubmit={e => sendMessage(e, userId)}>
                <div className={styles.sendFormContainer}>
                    <input ref={inputRef} className={styles.input} value={message} required onChange={e => setMessage(e.target.value)} type="text" id="msg" placeholder="Send your message..." />
                    <button className={styles.btn} type="submit"><img className={styles.icon} src="/send.svg"/></button>
                </div>
            </form>
        </div>
    )
}