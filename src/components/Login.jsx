import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, Link } from "react-router-dom";


export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { API_URL } = useContext(AppContext);
    async function handleSubmit(e) {
        e.preventDefault();
        const req = await fetch(`${API_URL}/auth/log-in`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
            credentials: "include" 
        })
        const res = await req.json();
        if (!req.ok) {
            setError("You have entered the wrong username or password. Please try again.")
        } else {
            setError("");
            localStorage.setItem("user", JSON.stringify(res.user));
            navigate("/");
        }
        console.log(res);
    }

    return (
        <>
            <h1>Please log in</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" required onChange={e => setUsername(e.target.value)} />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="text" id="password" required onChange={e => setPassword(e.target.value)} />
            </div>
            <button type="submit">Log in</button>
            {error && <p>{error}</p>}
            </form>
            <h4>Don't have the account yet? <Link to="/sign-up">Sign up</Link></h4>
            </>
    )
}