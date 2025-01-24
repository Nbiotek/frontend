// app/(auth)/login/page.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { MdError } from "react-icons/md";
import { FormInput } from "@/components/ui/form-input"
import { GoogleIcon, FacebookIcon, AppleIcon } from "@/lib/utils/svg"



// importing ui components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import { Button } from "@/components/ui/button"

import { Text } from "@/lib/utils/Text"



export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Add your login API call here
      console.log("Login attempt:", formData)
      // On successful login:
      router.push("/dashboard")
    } catch (error) {
      console.error("Login failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Card className="w-full bg-transparent border-none shadow-none">
        <CardHeader className="text-center">
          <CardTitle>Sign in to your account</CardTitle>
        </CardHeader>
        <CardContent className="bg-white shadow-lg rounded-lg p-8 flex flex-col gap-3">
            <FormInput
              label="Email or Phone number"
              id="email"
              type="email"
              error={'dd'}
            />
            <div className="relative">
              <FormInput
                label="Password"
                id="password"
                type={showPassword ? "text" : "password"}
                error={''}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 mt-2 transform-translate-y-1/2 text-gray-500 "
              >
                {showPassword ? (
                  <FaRegEye className="w-5 h-5" color="#101828" />
                ) : (
                  <FaRegEyeSlash className="w-5 h-5" color="#101828" />
                )}
              </button>
            </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-5 w-5 border-red-600 rounded focus:ring-blue-500 focus:ring-2 text-blue-600"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block  "
              >
                <Text variant="small" weight="light" className="text-gray_light"  > Remember me</Text>
              </label>
            </div>
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-blue-300"
            >
              <Text color="primary_cr" variant="small" weight="thin"> Forgot your password?</Text>
            </Link>
          </div>
          <div className="my-[10px]">
            <Button className="w-full bg-blue-400 font-[700] py-[16px]">Login</Button>
          </div>

          <div className="flex flex-col items-center">
            <Text className="text-gray_light" weight="light">Dont have account? <Link href='/register' className="text-blue-300 font-normal">Sign me Up</Link></Text>
            <div className="flex items-center my-6 w-full">
              <div className="flex-grow border-t border-neutral-200"></div>
              <span className="mx-4 text-gray-500">or</span>
              <div className="flex-grow border-t border-neutral-200"></div>
            </div>
            <div className="flex justify-between gap-[12px]">
              <div className="w-[150px] border border-[#d0d0d0] flex justify-center p-[10px] bg-white rounded-lg cursor-pointer">
                <GoogleIcon />
              </div>
              <div className="w-[150px] border border-[#d0d0d0] flex justify-center p-[10px] bg-white rounded-lg cursor-pointer">
              <FacebookIcon />
              </div>
              <div className="w-[150px] border border-[#d0d0d0] flex justify-center p-[10px] bg-white rounded-lg cursor-pointer">
                <AppleIcon />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className=" w-full ">
          <Text variant="small" color="warning_cr" weight="light" align="center" className="w-full mt-5 text-gray_light"> Don’t want to sign in yet? <span className="text-blue-300 font-normal">Explore</span></Text>
        </CardFooter>
      </Card>

    </>

  )
}