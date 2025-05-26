import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Home from './pages/Home.tsx'
import LeaderBoard from './pages/LeaderBoard.tsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import PlayGame from './pages/PlayGame.tsx'
import LoginPage from './components/LoginPage.tsx'
import SignupPage from './components/SignupPage.tsx'
import IsAuthenticated from './components/IsAuthenticated.tsx'
import ForgotPasswordPage from './pages/ForgotPasswordPage.tsx'



const router = createBrowserRouter([
  {
    path: "/",
    element : <App />,
    children : [
      {
        path : "/",
        element : <Home />
      },
      {
        path : "/play-game",
        element : 
         ( <IsAuthenticated>
            <PlayGame />
          </IsAuthenticated>
         ),
      },
      {
        path : "/leader-board",
        element : 
        (
            <LeaderBoard />
        )
      },
      {
        path : "/log-in",
        element : <LoginPage />
      },
      {
        path : "/sign-up",
        element : <SignupPage />
      },
      {
        path : '/forgot-password',
        element : <ForgotPasswordPage/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
