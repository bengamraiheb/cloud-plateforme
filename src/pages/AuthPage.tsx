
import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { useNavigate } from "react-router-dom";

type AuthMode = "login" | "register" | "forgot-password";

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("login");
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/90 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-primary/10 [mask-image:linear-gradient(to_bottom,transparent_20%,black_80%)]"></div>
      </div>
      
      <div className="container max-w-lg relative z-10">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">CloudHaven</h1>
          <p className="text-muted-foreground">Secure cloud management platform</p>
        </div>
        
        {mode === "login" && (
          <LoginForm 
            onSuccess={handleAuthSuccess}
            onForgotPassword={() => setMode("forgot-password")}
            onRegister={() => setMode("register")}
          />
        )}
        
        {mode === "register" && (
          <RegisterForm 
            onSuccess={handleAuthSuccess}
            onLogin={() => setMode("login")}
          />
        )}
        
        {mode === "forgot-password" && (
          <ForgotPasswordForm 
            onBack={() => setMode("login")}
            onSuccess={() => setMode("login")}
          />
        )}
      </div>
    </div>
  );
}
