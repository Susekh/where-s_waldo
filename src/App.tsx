import { Outlet } from "react-router-dom"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import Container from "./components/Container"
import { AppProvider } from "./context/appContext"
import { useState } from "react"


function App() {
  const [logoutBtn, setLogoutBtn] = useState(false);
  const [gameTime, setGameTime] = useState(0);
  const [charArr, setCharArr] = useState<string[]>([]);


  return (
    <>
    <AppProvider value={{logoutBtn, setLogoutBtn, gameTime, setGameTime, charArr, setCharArr}}>
      <NavBar />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </AppProvider>
    
    </>
  )
}

export default App