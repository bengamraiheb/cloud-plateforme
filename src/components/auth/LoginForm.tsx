
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, LockKeyhole, Mail, ArrowRight, Github, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginCredentials } from "@/types/auth";
import { login } from "@/services/authService";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  rememberMe: z.boolean().optional(),
});

interface LoginFormProps {
  onSuccess?: () => void;
  onForgotPassword?: () => void;
  onRegister?: () => void;
}

export function LoginForm({ onSuccess, onForgotPassword, onRegister }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const credentials: LoginCredentials = {
        email: values.email,
        password: values.password,
      };
      const response = await login(credentials);
      toast({
        title: "Login successful",
        description: `Welcome back, ${response.user.name || response.user.email}!`,
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg backdrop-blur-sm bg-card/80 border-white/10">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold tracking-tight">Sign in</CardTitle>
        <CardDescription>Enter your email and password to access your account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            type="button" 
            className="w-full backdrop-blur-sm hover:bg-primary/10"
            onClick={() => window.location.href = "/api/auth/google"}
          >
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" className="mr-2 h-4 w-4" />
            Google
          </Button>
          <Button 
            variant="outline" 
            type="button" 
            className="w-full backdrop-blur-sm hover:bg-primary/10"
            onClick={() => window.location.href = "/api/auth/microsoft"}
          >
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoft/microsoft-original.svg" className="mr-2 h-4 w-4" />
            Microsoft
          </Button>
        </div>
        
        <div className="relative flex items-center">
          <div className="flex-grow border-t border-muted"></div>
          <span className="mx-3 text-muted-foreground text-sm">Or continue with</span>
          <div className="flex-grow border-t border-muted"></div>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="you@example.com" 
                        className="pl-10" 
                        {...field} 
                        disabled={isLoading}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        className="pl-10" 
                        {...field} 
                        disabled={isLoading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end">
              <Button 
                type="button" 
                variant="link" 
                size="sm" 
                className="text-sm"
                onClick={onForgotPassword}
                disabled={isLoading}
              >
                Forgot password?
              </Button>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-primary to-secondary" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p className="text-center text-sm text-muted-foreground w-full">
          Don't have an account?{" "}
          <Button 
            variant="link" 
            className="p-0 h-auto font-normal" 
            onClick={onRegister}
            disabled={isLoading}
          >
            Sign up
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}
