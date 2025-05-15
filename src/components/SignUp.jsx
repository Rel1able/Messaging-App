import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {

    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const { API_URL } = useContext(AppContext);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const req = await fetch(`${API_URL}/auth/sign-up`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({firstName, lastName, username, password, confPassword})
            });
            const res = await req.json();
            if (!req.ok) {
                setErrors(res.errors);
            } else {
                navigate("/log-in")
            }
            
            console.log(res);
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <>
        <h1>Please create account</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" required onChange={e => setFirstName(e.target.value)} />
            </div>
            <div>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" required onChange={e => setLastName(e.target.value)} />
            </div>
            <div>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" required onChange={e => setUsername(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" required onChange={e => setPassword(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="confPassword">Confirm password</label>
                <input type="password" id="confPassword" required onChange={e => setConfPassword(e.target.value)}/>
            </div>
            <button type="submit">Sign Up</button>
            {
                errors.length > 0 && (
                    <ul>
                        {errors.map((err) => (
                            <li>{err.msg}</li>
                        ))}
                    </ul>
                )
            }
            </form>
            <h4>Already have an account? <Link to="/log-in">Log in</Link></h4>
            </>
    )
}