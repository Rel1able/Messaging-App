import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Contacts from "./components/Contacts";
import { useEffect, useContext } from "react";
import { AppContext } from "./context/AppContext";
function App() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const { API_URL, setIsRunning} = useContext(AppContext);
  
    useEffect(() => {
      if (!user) {
        navigate("/log-in")
      }
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


  useEffect(() => {
    let intervalId;
    async function checkServer() {
      const req = await fetch(`${API_URL}/auth/ping`);
      if (!req.ok) {
        throw new Error("Server is not running");
      }
      const res = await req.json();
      setIsRunning(res);
      clearInterval(intervalId);
    }
    intervalId = setInterval(checkServer, 2000);
    return() =>  clearInterval(intervalId);
  }, [])

  return (
    <div className="page">
      <header className="header">Messaging app</header>
      <div className="app-container">
      <div className="chat-container">
        <Navbar />
        <div className="contacts">
          <Contacts/>
        </div>
        
      </div>
      <Outlet/>
    </div>
    </div>
    
  )
}

export default App
