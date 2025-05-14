import { useContext, useEffect, useState } from "react";
import { AppContext } from "./context/AppContext";
import { Outlet } from "react-router-dom";
import Navbar from "./components/NavBar";
import Contacts from "./components/Contacts";
function App() {

  const { API_URL } = useContext(AppContext);
  useEffect(() => {
    async function testServer() {
      const req = await fetch(`${API_URL}/ping`)
      const res = await req.json();
      console.log("Response: ", res)
    }
    testServer();
  }, [])
  
  return (
    <div className="app-container">
      <Navbar />
      <Contacts/>
      <Outlet/>
    </div>
  )
}

export default App
