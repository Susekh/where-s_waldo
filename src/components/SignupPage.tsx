import Container from "./Container";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SendData from "../customHooks/sendData";

function SignupPage() {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSignUp = async() => {
      const response = await SendData(userName, password, "log-in");
        if(response.message === "User created Succesfully"){
            navigate("/log-in")
        }
    }

  return (
    <Container>
    <h1 className="text-white text-3xl">Sign up</h1>
    <form className="flex gap-4 flex-col text-2xl text-white mt-4">
        <label>
            Enter user name : <input onChange={(e) => setUserName(e.target.value)} value={userName} className="rounded-lg text-black" type="text" name="username" />
        </label><br />
        <label>
            Enter Password : <input onChange={(e) => setPassword(e.target.value)} value={password} className="rounded-lg text-black" type="password" name="password" />
        </label>
        <button onClick={handleSignUp} className="text-white bg-slate-700 p-2 w-24 rounded-xl">Submit</button>
    </form>
</Container>
  )
}

export default SignupPage