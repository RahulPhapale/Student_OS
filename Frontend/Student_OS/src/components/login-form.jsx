"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from 'react-router-dom'
import { useState } from "react"
import axios from "axios"
import { showErrorToast, showSuccessToast } from "@/lib/toastUtils"



export function LoginForm({className, ...props}) {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


  // Handle Login
  const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {

     // OAuth2 requires FormData format
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    const res = await axios.post(
      "http://localhost:8000/api/auth",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Successful login if token exists
    if (res.data.access_token) {
      console.log("login data", res.data);
      
      localStorage.setItem("token", res.data.access_token);

      showSuccessToast("Login Successful!", "Welcome back to Student OS 👋");

      setTimeout(() => {
        navigate("/home");
      }, 800);
    }
  } catch (error) {
    console.log("Login Error:", error);

    if (error.response && error.response.status === 401) {
      showErrorToast("Invalid Credentials!", "Incorrect email or password.");
    } else {
      showErrorToast(
        "Server Error!",
        "Unable to connect to the server. Please try again."
      );
    }
  }

  setLoading(false);
};





  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 bg-zinc-900 text-white border-0 shadow-sky-500/50 shadow-lg">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleLogin}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-white/80 text-balance">
                  Login to your <span className="text-sm font-bold">Student OS</span> account
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
              </Field>
              <Field>
                <Button variant="link" className="bg-white text-black" type="submit">Login</Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-black *:data-[slot=field-separator-content]:text-white">
                {/* Or continue with */}
              </FieldSeparator>
              <FieldDescription className="text-center text-white/80">
                Don&apos;t have an account? <Link to="/register" className="hover:underline text-blue-400">Sign up</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="Logo1.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center text-white/80">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
