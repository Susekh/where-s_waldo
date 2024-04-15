import Container from "./Container";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SendData from "../customHooks/SendDataToServer";
import { MouseEvent } from "react";
import { Button } from "./ui/button";

function SignupPage() {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSignUp = async(e : MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      const response = await SendData(userName, password, "sign-up");
      console.log(userName);
      
      console.log(response.message);
      
        if(response.message === "User created Succesfully"){
            navigate("/log-in")
            alert("User created succesfully")
        } else {
          alert(response.message.response.data.error);
        }
    }

  return (
    <Container>
      <div className="flex justify-center">
            <div className=" md:w-1/3 w- border-2 rounded-lg p-16 bg-neutral-950">
              <h1 className="text-white text-3xl">Sign up</h1>
              <form className="flex gap-4 flex-col text-2xl text-white mt-4">
                  <label>
                      Enter user name : <input onChange={(e) => setUserName(e.target.value)} value={userName} className="mt-2 rounded-lg text-lg w-full p-1 text-black" type="text" name="username" />
                  </label><br />
                  <label>
                      Enter Password : <input onChange={(e) => setPassword(e.target.value)} value={password} className="mt-2 rounded-lg text-lg w-full p-1 text-black" type="password" name="password" />
                  </label>
                  <Button variant={"secondary"} onClick={(e) => handleSignUp(e)} className="w-24">Submit</Button>
              </form>
            </div>
      </div>
        
</Container>
  )
}

export default SignupPage