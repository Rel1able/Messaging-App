import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/NavBar";
import Contacts from "./components/Contacts";
import { useEffect, useContext } from "react";
import { AppContext } from "./context/AppContext";
function App() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const { API_URL} = useContext(AppContext);

  
    useEffect(() => {
      if (!user) {
        navigate("/log-in")
      }
      console.log(user)
    }, [])
  
    async function setOnline() {
      try {
        const req = await fetch(`${API_URL}/users/${user.id}/online`, {
           headers: {
             "Content-Type": "application/json",
           },
               method: "PUT",
               credentials: "include"
        })
         if (!req.ok) {
           throw new Error("Failed to set status to online")
         }
         const res = await req.json();
         console.log(res)
       } catch (err) {
         console.error(err)
      }

  }

  async function setOffline() {
    try {
     const req = await fetch(`${API_URL}/users/${user.id}/offline`, {
        headers: {
          "Content-Type": "application/json",
        },
            method: "PUT",
            credentials: "include"
     })
      if (!req.ok) {
        throw new Error("Failed to set status to offline")
      }
      const res = await req.json();
      console.log(res)
    } catch (err) {
      console.error(err)
    }
    
  }

  useEffect(() => {
      if (user) {
        if (navigator.onLine) {
          setOnline();
        } else {
          setOffline();
          }
      }
  }, [])

  useEffect(() => {
    window.addEventListener("beforeunload",setOffline);
    return () => {
      window.removeEventListener("beforeunload", setOffline)
    }
  }, [])
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
