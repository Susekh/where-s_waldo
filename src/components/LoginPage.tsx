import { useState } from "react";
import Container from "./Container";
import { useNavigate } from "react-router-dom";
import SendData from "../utils/SendDataToServer";
import { MouseEvent } from "react";
import { useApp } from "../context/appContext";
import AnimatedPage from "./animation/AnimatedPage";
import { Button } from "@/components/ui/button";
import { useToast } from "./ui/use-toast";
import { Eye, EyeOff } from "lucide-react";

function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setLogoutBtn, setCharArr } = useApp();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loginFailed, setLoginFailed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    const response = await SendData({ route: "log-in", username: userName, password });
    setLoading(false);

    if (response.success) {
      navigate("/");
      setLogoutBtn(true);
      setCharArr(response.charArr ? response.charArr : []);
      toast({
        title: "Login Successful",
        description: response.message,
      });
      setLoginFailed(false);
    } else {
      toast({
        title: response.message.error,
      });
      setLoginFailed(true);
    }
  };

  return (
    <Container>
      <AnimatedPage>
        <div className="flex justify-center">
          <div className="md:w-1/3 w-full border-2 rounded-lg p-16 bg-neutral-950">
            <h1 className="text-white text-3xl">Login</h1>
            <form className="flex gap-4 flex-col text-2xl text-white mt-4">
              <label>
                Enter user name <br />
                <input
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
                  required
                  className="rounded-lg w-full text-black mt-4 text-lg p-2"
                  type="text"
                  name="username"
                />
              </label>
              <br />
              <label>
                Enter Password <br />
                <div className="relative">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    className="rounded-lg w-full text-black mt-4 text-lg p-2"
                    type={showPassword ? "text" : "password"}
                    name="password"
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-3 transform -translate-y-1/2"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-6 mt-2 h-6 text-gray-500" />
                    ) : (
                      <Eye className="w-6 mt-2 h-6 text-gray-500" />
                    )}
                  </button>
                </div>
              </label>

              <Button
                variant={"secondary"}
                onClick={(e) => handleLogin(e)}
                className="w-24"
                size={"lg"}
                disabled={loading || !userName.trim() || !password.trim()}
              >
                {loading ? "Loading..." : "Submit"}
              </Button>
            </form>

            {loginFailed && (
              <div className="flex gap-4 mt-4">
                <p className="text-white mt-2">Forgot your password?</p>
                <Button onClick={() => navigate("/forgot-password")}>
                  Forgot Password
                </Button>
              </div>
            )}

            <div className="flex gap-4 mt-4">
              <p className="text-white mt-2">Not Signed up? : </p>
              <Button onClick={() => navigate("/sign-up")}>Signup</Button>
            </div>
          </div>
        </div>
      </AnimatedPage>
    </Container>
  );
}

export default LoginPage;
