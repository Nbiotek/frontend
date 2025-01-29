'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Space_Mono } from 'next/font/google';
import { GoogleIcon, FacebookIcon, AppleIcon } from '@/lib/utils/svg';

import { FormInput } from '@/components/ui/form-input';

// importing ui components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { FaRegEyeSlash } from 'react-icons/fa6';
import { FaRegEye } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';

import { Text } from '@/lib/utils/Text';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const checkPasswordStrength = (password: string) => {
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const isLongEnough = password.length >= 8;

    if (isLongEnough && hasNumber && hasSpecialChar && hasUpperCase) {
      return 'Strong';
    } else if (isLongEnough && (hasNumber || hasSpecialChar || hasUpperCase)) {
      return 'Medium';
    }
    return 'Weak';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
      setPasswordMatch(value === formData.confirmPassword);
    }

    if (name === 'confirmPassword') {
      setPasswordMatch(formData.password === value);
    }
  };
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Add your login API call here
      console.log('Login attempt:', formData);
      // On successful login:
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card className="w-full border-none bg-transparent shadow-none ">
        <CardHeader className="text-center">
          <CardTitle className="text-[24px] font-normal text-neutral-700">Create Account</CardTitle>
          <CardDescription className="text-[20px] font-light text-neutral-700">
            {' '}
            Please fill in the details below
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 rounded-lg bg-white p-8 shadow-lg">
          <FormInput label="Email or Phone number" id="email" type="email" error="" />
          <div className="relative">
            <FormInput
              label="Password"
              id="password"
              name="password"
              value={formData.password}
              type={showPassword ? 'text' : 'password'}
              error={passwordStrength === 'Weak' ? 'Password is too weak' : ''}
              helperText={passwordStrength && `Password strength: ${passwordStrength}`}
              onChange={handleInputChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="transform-translate-y-1/2 text-gray-500 absolute right-2 top-1/2"
            >
              {showPassword ? (
                <FaRegEye className="h-5 w-5" color="#101828" />
              ) : (
                <FaRegEyeSlash className="h-5 w-5" color="#101828" />
              )}
            </button>
          </div>
          <div className="relative">
            <FormInput
              label="Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              type={showPassword ? 'text' : 'password'}
              error={!passwordMatch ? 'Passwords do not match' : ''}
              onChange={handleInputChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="transform-translate-y-1/2 text-gray-500 absolute right-2 top-1/2"
            >
              {showPassword ? (
                <FaRegEye className="h-5 w-5" color="#101828" />
              ) : (
                <FaRegEyeSlash className="h-5 w-5" color="#101828" />
              )}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-5 w-5 rounded border-red-600 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <label htmlFor="remember-me" className="ml-2 block  ">
                <Text variant="small" weight="light" className="text-gray_light">
                  {' '}
                  Remember me
                </Text>
              </label>
            </div>
            <Link href="/forgot-password" className="text-sm font-medium text-blue-300">
              <Text color="primary_cr" variant="small" weight="thin">
                {' '}
                Forgot your password?
              </Text>
            </Link>
          </div>
          <div className="my-[9px]">
            <Button className="w-full bg-blue-400 py-[16px] font-[700]">Login</Button>
          </div>

          <div className="flex flex-col items-center">
            <div className="mb-6 flex w-full items-center">
              <div className="flex-grow border-t border-neutral-200"></div>
              <span className="text-gray-500 mx-4">or sign up with</span>
              <div className="flex-grow border-t border-neutral-200"></div>
            </div>
            <div className="flex justify-between gap-[12px]">
              <div className="flex w-[150px] cursor-pointer justify-center rounded-lg border border-[#d0d0d0] bg-white p-[10px]">
                <GoogleIcon />
              </div>
              <div className="flex w-[150px] cursor-pointer justify-center rounded-lg border border-[#d0d0d0] bg-white p-[10px]">
                <FacebookIcon />
              </div>
              <div className="flex w-[150px] cursor-pointer justify-center rounded-lg border border-[#d0d0d0] bg-white p-[10px]">
                <AppleIcon />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className=" w-full ">
          <Text
            variant="small"
            color="warning_cr"
            weight="light"
            align="center"
            className="mt-5 w-full text-gray_light"
          >
            {' '}
            Don’t want to sign in yet? <span className="text-blue-300">Explore</span>
          </Text>
        </CardFooter>
      </Card>
      <div className="w-[330px]">
        <Text align="center" variant="body" weight="light" className="text-gray_light">
          {' '}
          By creating an account you argree to{' '}
          <span className="text-neutral-1000 font-bold">NBIOTEK</span>{' '}
          <Link href="" className="font-[500] text-blue-300 underline">
            Terms
          </Link>{' '}
          and{' '}
          <Link href="" className="font-[500] text-blue-300 underline">
            Condition
          </Link>
        </Text>
      </div>
    </>
  );
}
