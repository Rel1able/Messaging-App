import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/NavBar";
import Contacts from "./components/Contacts";
import { useEffect } from "react";
function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/sign-up")
    }
  })
  return (
    <div className="app-container">
      <div className="chat-container">
        <Navbar />
        <Contacts/>
      </div>
      <Outlet/>
    </div>
  )
}

export default App
