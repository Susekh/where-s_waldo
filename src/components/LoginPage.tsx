import { useState } from "react"
import Container from "./Container"
import { useNavigate } from "react-router-dom";
import SendData from "../utils/SendDataToServer";
import { MouseEvent } from "react";
import { useApp } from "../context/appContext";
import AnimatedPage from "./animation/AnimatedPage";
import { Button } from "@/components/ui/button"
import { useToast } from "./ui/use-toast";




function LoginPage() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { setLogoutBtn, setCharArr } = useApp();
    const { toast } = useToast();
    const navigate = useNavigate()

    const handleLogin = async(e : MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const response = await SendData(userName, password, "log-in");
        console.log(response.message);
        
        if(response.message === "User logged In Successfully"){
            navigate("/")
            setLogoutBtn(true);
            setCharArr(response.charArr ? response.charArr : []);
            toast({
                title : "Login message.",
                description : response.message
            })
        } else {
            toast({
                title : response.message.response.data.error,
            })
        }
        console.log("check res :: ",response);
        console.log("User : ",response.user);
    }

  return (
    <Container>
      <AnimatedPage>
        <div className="flex justify-center">
            <div className=" md:w-1/3 w- border-2 rounded-lg p-16 bg-neutral-950">
            <h1 className="text-white text-3xl">Login</h1>
            <form className="flex gap-4 flex-col text-2xl text-white mt-4">
                <label>
                    Enter user name <br/> <input onChange={(e) => setUserName(e.target.value)} value={userName} required className="rounded-lg w-full text-black mt-4 text-lg p-2" type="text" name="username" />
                </label><br />
                <label>
                    Enter Password <br/> <input onChange={(e) => setPassword(e.target.value)} value={password} required className="rounded-lg w-full text-black mt-4 text-lg p-2" type="password" name="password" />
                </label>
                <Button variant={"secondary"} onClick={(e) => handleLogin(e)} className="w-24" size={"lg"}>Submit</Button>
            </form>
            <div className="flex gap-4 mt-4">
                <p className="text-white mt-2">Not Signed up? : </p>
                <Button onClick={() => navigate("/sign-up")} >signup</Button>
            </div>
            </div>
        </div>
      </AnimatedPage>
    </Container>
  )
}

export default LoginPage