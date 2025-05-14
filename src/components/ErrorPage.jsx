import { Link } from "react-router-dom";

export default function ErrorPage() {
    return (
        <div>
            <h1>This page doesn't exist!</h1>
            <Link to="/">
                You can go back to the home page by clicking here!
            </Link>
        </div>
    )    
}