import Container from "./Container";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SendData from "../utils/SendDataToServer";
import { MouseEvent } from "react";
import {Button} from "./ui/button";
import { useToast } from "./ui/use-toast";
import AnimatedPage from "./animation/AnimatedPage";

function SignupPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignUp = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    const response = await SendData({
      route: "sign-up",
      username: userName,
      password,
      email,
    });

    setLoading(false);

    if (response.success) {
      navigate("/log-in");
      toast({
        title: response.message,
      });
    } else {
      toast({
        title: response.message.error,
      });
    }
  };

  return (
    <Container>
      <AnimatedPage>
        <div className="flex justify-center">
          <div className="md:w-1/3 w- border-2 rounded-lg p-16 bg-neutral-950">
            <h1 className="text-white text-3xl">Sign up</h1>
            <form className="flex gap-4 flex-col text-2xl text-white mt-4">
              <label>
                Enter user name :{" "}
                <input
                  onChange={(e) => setUserName(e.target.value)}
                  required
                  value={userName}
                  className="mt-2 rounded-lg text-lg w-full p-1 text-black"
                  type="text"
                  name="username"
                />
              </label>
              <br />
              <label>
                Enter Password :{" "}
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  value={password}
                  className="mt-2 rounded-lg text-lg w-full p-1 text-black"
                  type="password"
                  name="password"
                />
              </label>
              <br />
              <label>
                Enter email :{" "}
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  value={email}
                  className="mt-2 rounded-lg text-lg w-full p-1 text-black"
                  type="email"
                  name="email"
                />
              </label>
              <Button
                variant={"secondary"}
                onClick={(e) => handleSignUp(e)}
                className="w-24"
                disabled={loading}
              >
                {loading ? "Loading..." : "Submit"}
              </Button>
            </form>
          </div>
        </div>
      </AnimatedPage>
    </Container>
  );
}

export default SignupPage;
