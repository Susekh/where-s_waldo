import { Outlet } from "react-router-dom"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import Container from "./components/Container"
import { AppProvider } from "./context/appContext"
import { useState } from "react"

function App() {
  const [logoutBtn, setLogoutBtn] = useState(false);


  return (
    <>
    <AppProvider value={{logoutBtn, setLogoutBtn}}>
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