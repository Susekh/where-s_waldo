import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SendData from "../utils/SendDataToServer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import AnimatedPage from "@/components/animation/AnimatedPage";
import Container from "@/components/Container";

function ForgotPasswordPage() {
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailPreview, setEmailPreview] = useState("");
  const [step, setStep] = useState<"username" | "otp">("username");
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    setLoading(true);
    const response = await SendData({ route: "forgot-password", username });
    setLoading(false);

    if (response.success) {
      toast({ title: "OTP Sent", description: response.message });
      setEmailPreview(response.emailPreview);
      setStep("otp");
    } else {
      toast({
        title: "Error",
        description: response.message?.error || "Something went wrong.",
      });
    }
  };

  const handleOtpSubmit = async () => {
    setLoading(true);
    const response = await SendData({
      route: "forgot-password/otp",
      username,
      otp,
      newPassword,
      confirmPassword,
    });
    setLoading(false);

    if (response.success) {
      toast({ title: "Success", description: response.message });
      navigate("/log-in");
    } else {
      toast({
        title: "Error",
        description: response.message?.error || "Invalid input or OTP expired.",
      });
    }
  };

  return (
    <Container>
      <AnimatedPage>
        <div className="flex justify-center">
          <div className="md:w-1/3 w-full border-2 rounded-lg p-10 bg-neutral-950">
            <h1 className="text-white text-3xl mb-6">Forgot Password</h1>

            {step === "username" ? (
              <>
                <label className="text-white text-lg mb-4">
                  Enter your username:
                  <input
                    className="rounded-lg w-full text-black mt-2 p-2"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </label>

                <Button
                  variant="secondary"
                  className="mt-4"
                  onClick={handleForgotPassword}
                  disabled={loading || !username.trim()}
                >
                  {loading ? "Loading..." : "Send OTP"}
                </Button>
              </>
            ) : (
              <>
                <p className="text-white mb-4">
                  OTP has been sent to <strong>{emailPreview}</strong>
                </p>
                <label className="text-white text-lg mb-4">
                  Enter OTP:
                  <input
                    className="rounded-lg w-full text-black mt-2 p-2"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </label>

                <label className="text-white text-lg mb-4">
                  New Password:
                  <input
                    className="rounded-lg w-full text-black mt-2 p-2"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </label>

                <label className="text-white text-lg mb-4">
                  Confirm Password:
                  <input
                    className="rounded-lg w-full text-black mt-2 p-2"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </label>

                <Button
                  variant="secondary"
                  className="mt-4"
                  onClick={handleOtpSubmit}
                  disabled={
                    loading ||
                    !otp.trim() ||
                    !newPassword.trim() ||
                    !confirmPassword.trim()
                  }
                >
                  {loading ? "Loading..." : "Reset Password"}
                </Button>
              </>
            )}

            <div className="mt-6 text-white">
              <p>Remembered your password?</p>
              <Button variant="link" onClick={() => navigate("/log-in")}>
                Login
              </Button>
            </div>
          </div>
        </div>
      </AnimatedPage>
    </Container>
  );
}

export default ForgotPasswordPage;
