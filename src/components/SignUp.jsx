import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/auth.module.css";

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
                body: JSON.stringify({ firstName, lastName, username, password, confPassword }),
            });
            const res = await req.json();
            if (!req.ok) {
                setErrors(res.errors);
            } else {
                navigate("/log-in")
            }
            
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div className={styles.container}>
        <h1 className={styles.title}>Please create account</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputDiv}>
                <label htmlFor="firstName">First Name</label>
                <input placeholder="Enter your first name" className={styles.input} type="text" id="firstName" required onChange={e => setFirstName(e.target.value)} />
            </div>
            <div className={styles.inputDiv}>
                <label htmlFor="lastName">Last Name</label>
                <input placeholder="Enter your last name" className={styles.input}  type="text" id="lastName" required onChange={e => setLastName(e.target.value)} />
            </div>
            <div className={styles.inputDiv}>
                <label htmlFor="username">Username</label>
                <input placeholder="Create a username" className={styles.input}  type="text" id="username" required onChange={e => setUsername(e.target.value)}/>
            </div>
            <div className={styles.inputDiv}>
                <label htmlFor="password">Password</label>
                <input placeholder="Create a password" className={styles.input}  type="password" id="password" required onChange={e => setPassword(e.target.value)}/>
            </div>
            <div className={styles.inputDiv}>
                <label htmlFor="confPassword">Confirm password</label>
                <input placeholder="Confirm your password" className={styles.input}  type="password" id="confPassword" required onChange={e => setConfPassword(e.target.value)}/>
            </div>
            <button className={styles.btn} type="submit">Sign Up</button>
            {
                errors.length > 0 && (
                    <ul className={styles.errorsList}>
                        {errors.map((err) => (
                            <li className={styles.error}>{err.msg}</li>
                        ))}
                    </ul>
                )
            }
            </form>
            <h4 className={styles.note}>Already have an account? <Link to="/log-in">Log in</Link></h4>
            </div>
    )
}