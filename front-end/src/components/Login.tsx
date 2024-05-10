import React, { useContext, useEffect } from "react";
import { NavLink as Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

function Login() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useContext<any>(UserContext);

  const { setUser } = useContext<any>(UserContext);

  const [credentials, setCredentials] = React.useState({
    username: "",
    password: "",
  });

  const login = (e: any) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/users/login", {
        email: credentials.username,
        password: credentials.password,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
        toast({
          variant: "default",
          title: "Login successful",
          description: `Welcome back, ${res.data.user.name}!`,
        });
        navigate("/dashboard");
      })
      .catch((err) => {
        console.error(err);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Invalid credentials",
        });
      });
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);
  return (
    <>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link to="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                id="password"
                type="password"
                required
              />
            </div>
            <Button onClick={login} type="submit" className="w-full">
              Login
            </Button>
            {/* <Button variant="outline" className="w-full">
                Login with Google
              </Button> */}
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="#" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default Login;
