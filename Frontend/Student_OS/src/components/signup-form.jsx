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
import { useState } from "react";
import { showErrorToast, showSuccessToast } from "@/lib/toastUtils"
import axios from "axios"

export function SignupForm({className, ...props}) {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


    // Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();

    // Match check
    if (password !== confirmPassword) {
      showErrorToast("Passwords do not match!", "Please check both fields.");
      return;
    }

    // Min length
    if (password.length < 4) {
      showErrorToast(
        "Weak Password!",
        "Password must be at least 4 characters."
      );
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/api/user/users_create_user/",
        {
          username: email,
          hashed_password: password,
        }
      );

      showSuccessToast(
        "Account Created!",
        "Your account has been registered 🎉"
      );

      setTimeout(() => {
        navigate("/login");
      }, 800);
    } catch (error) {
      console.log("Signup Error:", error);

      // If user already exists (just guessing your backend)
      if (error.response?.status === 400) {
        showErrorToast("User Already Exists!", "Try another email.");
      } else {
        showErrorToast("Signup Failed!", "Something went wrong on the server.");
      }
    }
  };




  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 bg-zinc-900 text-white border-0 shadow-sky-500/50 shadow-lg">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSignup}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Enter your email below to create your account
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                <FieldDescription>
                  We&apos;ll use this to contact you. We will not share your
                  email with anyone else.
                </FieldDescription>
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input id="confirm-password" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <Button variant="link" type="submit" className="bg-white text-black">Create Account</Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                {/* Or continue with */}
              </FieldSeparator>
              <FieldDescription className="text-center">
                Already have an account? <Link to="/login" className="hover:underline text-blue-400">Sign up</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/SignUp2.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
