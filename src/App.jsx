import { useContext, useEffect, useState } from "react";
import { AppContext } from "./context/AppContext";
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
    <>
      <h1>No way</h1>
      <h2>{API_URL}</h2>
    </>
  )
}

export default App
