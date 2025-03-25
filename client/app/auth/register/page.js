"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Toaster } from "@/components/ui/sonner"
import { Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "sonner"
import Link from "next/link"
import axios from "axios"
import { cn } from "@/lib/utils"


export default function RegistrationForm() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [formData, setFormData] = useState({
        userType: "student",
        firstName: "navjot",
        lastName: "singh",
        email: "gmailc@gmailc.om",
        password: "Hello@123",
        confirmPassword: "Hello@123",
    });

    // Password strength criteria
    const passwordCriteria = [
        { label: "At least 8 characters", valid: formData.password?.length >= 8 },
        { label: "Contains uppercase letter", valid: /[A-Z]/.test(formData.password || "") },
        { label: "Contains lowercase letter", valid: /[a-z]/.test(formData.password || "") },
        { label: "Contains a number", valid: /[0-9]/.test(formData.password || "") },
        { label: "Contains special character", valid: /[^A-Za-z0-9]/.test(formData.password || "") }
    ]

    const passwordOk = passwordCriteria.every((item) => item.valid) || formData.password.length == 0;
    const confirmPasswordOk = (formData.confirmPassword.length == 0 || formData.password == formData.confirmPassword);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!passwordOk) {
            toast.error("Password is not secure");
            return;
        }
        if (!confirmPasswordOk) {
            toast.error("Both passwords are not same");
            return;
        }
        setIsSubmitting(true);

        try {
            const res = await axios.post("http://localhost:5050/auth/register", formData);
            toast("Registered Successfully");
            
            if(formData.userType == "student") router.replace("/auth/login/student");
            else router.replace("/auth/login/tutor");
        } catch (error) {
            toast.error("Registration failed");
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen p-4 bg-gray-50">
            <Toaster />
            <Card className="w-full max-w-md">
                <CardHeader>
                    <Link href="/" className="text-center font-bold text-blue-500 text-3xl pt-2">QwizR
                    </Link>
                    <CardDescription className="text-center">Register as a student or tutor to get started</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>I am a:</Label>
                            <RadioGroup defaultValue="student" className="flex gap-4" name="userType" onChange={(e) => handleChange(e)}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="student" id="student" className="" />
                                    <Label htmlFor="student" className="cursor-pointer">
                                        Student
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="tutor" id="tutor" />
                                    <Label htmlFor="tutor" className="cursor-pointer">
                                        Tutor
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    placeholder="Navjot"
                                    value={formData.firstName}
                                    onChange={(e) => handleChange(e)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={(e) => handleChange(e)}
                                    placeholder="Singh"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={(e) => handleChange(e)}
                                placeholder="navjotsingh@qwizr.com"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={(e) => handleChange(e)}
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                            </div>

                            <div className="mt-2 space-y-1">
                                {!passwordOk && passwordCriteria.map((criteria, index) => (
                                    <div key={index} className="flex items-center text-xs">
                                        {criteria.valid ? (
                                            <CheckCircle2 className="h-3 w-3 mr-2 text-green-500" />
                                        ) : (
                                            <XCircle className="h-3 w-3 mr-2 text-gray-300" />
                                        )}
                                        <span className={criteria.valid ? "text-green-500" : "text-gray-500"}>{criteria.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={formData.confirmPassword}
                                    onChange={(e) => handleChange(e)}
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                            </div>
                            <div className="mt-2 space-y-1">
                                {!confirmPasswordOk && (<div className="flex items-center text-xs">
                                    {confirmPasswordOk ? (
                                        <CheckCircle2 className="h-3 w-3 mr-2 text-green-500" />
                                    ) : (
                                        <XCircle className="h-3 w-3 mr-2 text-gray-300" />
                                    )}
                                    <span className={confirmPasswordOk ? "text-green-500" : "text-gray-500"}>
                                        Both the passwords should be same
                                    </span>
                                </div>)}
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full mt-4 bg-blue-500" disabled={isSubmitting}>
                            {isSubmitting ? "Registering..." : "Register"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}

