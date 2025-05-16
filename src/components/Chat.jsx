import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import App from "../App";

export default function Chat() {
    const { API_URL } = useContext(AppContext);
    const [chatMessages, setChatMessages] = useState([]);
    const {userId} = useParams();
    console.log(userId);

    useEffect(() => {
        async function getChatData() {
            try {
                const req = await fetch(`${API_URL}/messages/${userId}`, {credentials: "include"});
                if (!req.ok) {
                    throw new Error("Failed to fetch the data");
                }
                const res = await req.json();
                setChatMessages(res);
            } catch (err) {
                console.error(err);
            }

            
        }
        getChatData();
    }, [])
    
    return (
        <h1>this is chat</h1>
    )
}