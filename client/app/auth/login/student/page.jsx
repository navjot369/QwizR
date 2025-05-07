"use client"

import React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { toast } from "sonner"
import axios from "axios"
// import { Header } from "./header"
// import { Footer } from "./footer"

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setForm({...form, [e.target.name] : e.target.value});
  }

  
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
        const res = await axios.post("http://localhost:5050/auth/login/student", form);
        if(res.status == 200) {
          toast.success("Log in Successfull");
          localStorage.setItem("auth", res.data.token);
          window.location.href="/student/dashboard";
        }else if(res.status == 404) {
          toast.error("Invalid Credentials");
        }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
        setIsLoading(false)
    }
}

  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className=" bg-white text-gray-800">
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-bold text-center">Student Login</CardTitle>
                  <CardDescription className="text-center">
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" name="email" placeholder="navjot@gmail.com" required value={form.email} onChange={e =>handleChange(e)}/>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password">Password</Label>
                          <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
                            Forgot password?
                          </Link>
                        </div>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            required
                            value={form.password} onChange={e =>handleChange(e)}
                            name="password"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        disabled={isLoading}
                      >
                        {isLoading ? "Logging in..." : "Login"}
                      </Button>

                    </div>
                  </form>
                </CardContent>
              </Card>
        </div>
  )
}

