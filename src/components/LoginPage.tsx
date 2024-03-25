import { useState } from "react"
import Container from "./Container"
import { useNavigate } from "react-router-dom";
import SendData from "../customHooks/sendData";
import { MouseEvent } from "react";
import { useApp } from "../context/appContext";




function LoginPage() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { setLogoutBtn } = useApp();

    const navigate = useNavigate()

    const handleLogin = async(e : MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const response = await SendData(userName, password, "log-in");
        console.log(response.message);
        
        if(response.message === "login successful"){
            navigate("/play-game")
            setLogoutBtn(true);
        } else if ( response.message === "couldn't login user"){
            alert("Could not login user");
        }else if( response.message === "Server Error"){
            alert("Server error encountered")
        } else {
            alert("Error Occured while logging in")
        }
    }

  return (
    <Container>
        <h1 className="text-white text-3xl">Login</h1>
        <form className="flex gap-4 flex-col text-2xl text-white mt-4">
            <label>
                Enter user name : <input onChange={(e) => setUserName(e.target.value)} value={userName} className="rounded-lg text-black" type="text" name="username" />
            </label><br />
            <label>
                Enter Password : <input onChange={(e) => setPassword(e.target.value)} value={password} className="rounded-lg text-black" type="password" name="password" />
            </label>
            <button onClick={(e) => handleLogin(e)}  className="text-white bg-slate-700 p-2 w-24 rounded-xl">Submit</button>
        </form>
        <div className="flex gap-4 mt-4">
            <p className="text-white mt-2">Not Signed up? : </p>
            <button onClick={() => navigate("/sign-up")} className="rounded-xl bg-slate-700 text-white p-2 ">signup</button>
        </div>
    </Container>
  )
}

export default LoginPage