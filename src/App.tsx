import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Container from "./components/Container"
import { AppProvider } from "./context/appContext"
import { useState } from "react"


function App() {
  const [logoutBtn, setLogoutBtn] = useState(false);

  return (
    <>
    <AppProvider value={{logoutBtn, setLogoutBtn}}>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </AppProvider>
    
    </>
  )
}

export default App