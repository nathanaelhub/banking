'use client';

import Link from 'next/link'
import React, { useState } from 'react'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput';
import { authFormSchema } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { signIn, signUp } from '@/lib/actions/user.actions';
import PlaidLink from './PlaidLink';

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ''
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      if (type === 'sign-up') {
        const userData = {
          firstName: data.firstName!,
          lastName: data.lastName!,
          address1: data.address1!,
          city: data.city!,
          state: data.state!,
          postalCode: data.postalCode!,
          dateOfBirth: data.dateOfBirth!,
          ssn: data.ssn!,
          email: data.email,
          password: data.password
        }

        const result = await signUp(userData);

        if (result?.error || !result?.user) {
          toast.error(result?.error || 'Failed to create account. Please try again.');
          return;
        }

        toast.success('Account created! Link your bank to get started.');
        setUser(result.user);
      }

      if (type === 'sign-in') {
        const result = await signIn({
          email: data.email,
          password: data.password,
        })

        if (result?.error || !result?.user) {
          toast.error(result?.error || 'Invalid email or password.');
          return;
        }

        toast.success('Welcome back!');
        router.push('/');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="flex min-h-screen w-full flex-col justify-center gap-6 px-14 py-10">
      {/* Header */}
      <header className="flex flex-col gap-6">
        {/* Brand mark + name */}
        <Link href="/" className="cursor-pointer flex items-center gap-2.5">
          <div
            className="w-[32px] h-[32px] rounded-[10px] flex items-center justify-center flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #8B5CF6 0%, #5B21B6 100%)',
              boxShadow: '0 6px 14px -4px rgba(91,33,182,.55), inset 0 1px 0 rgba(255,255,255,.25)',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2.4 13.6 10.4 21.6 12 13.6 13.6 12 21.6 10.4 13.6 2.4 12 10.4 10.4Z" fill="#fff"/>
              <circle cx="18.5" cy="5.5" r="1.6" fill="#fff" opacity=".85"/>
            </svg>
          </div>
          <span
            className="text-[18px] font-semibold tracking-[-0.01em] text-[#14111C]"
            style={{ fontFamily: 'var(--font-geist, sans-serif)' }}
          >
            Apex Finance
          </span>
        </Link>

        <div className="flex flex-col gap-1.5">
          {/* Security badge */}
          <span
            className="apex-badge apex-badge-violet mb-1 self-start"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
              <path d="M12 22S4 18 4 12V5L12 2L20 5V12C20 18 12 22 12 22Z" stroke="#5B21B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Bank-grade encryption
          </span>

          <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-[#14111C]">
            {user
              ? 'Link your bank'
              : type === 'sign-in'
                ? 'Welcome back'
                : 'Create an account'
            }
          </h1>
          <p className="text-[13.5px] text-[#6B6577]">
            {user
              ? 'Connect your bank account to get started with Apex Finance.'
              : type === 'sign-in'
                ? 'Sign in to your Apex Finance account.'
                : 'Get started — it only takes a minute.'
            }
          </p>
        </div>
      </header>

      {user ? (
        <div className="flex flex-col gap-4">
          <PlaidLink user={user} variant="primary" />
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
              {type === 'sign-up' && (
                <>
                  <div className="flex gap-3">
                    <CustomInput control={form.control} name='firstName' label="First Name" placeholder='Jane' />
                    <CustomInput control={form.control} name='lastName' label="Last Name" placeholder='Doe' />
                  </div>
                  <CustomInput control={form.control} name='address1' label="Address" placeholder='123 Main St' />
                  <CustomInput control={form.control} name='city' label="City" placeholder='New York' />
                  <div className="flex gap-3">
                    <CustomInput control={form.control} name='state' label="State" placeholder='NY' />
                    <CustomInput control={form.control} name='postalCode' label="Postal Code" placeholder='10001' />
                  </div>
                  <div className="flex gap-3">
                    <CustomInput control={form.control} name='dateOfBirth' label="Date of Birth" placeholder='YYYY-MM-DD' />
                    <CustomInput control={form.control} name='ssn' label="SSN (last 4)" placeholder='1234' />
                  </div>
                </>
              )}

              <CustomInput control={form.control} name='email' label="Email" placeholder='jane@example.com' />
              <CustomInput control={form.control} name='password' label="Password" placeholder='••••••••' />

              <div className="flex flex-col gap-3 mt-2">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-[42px] rounded-[10px] font-semibold text-white text-[14.5px] transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)',
                    boxShadow: '0 4px 12px -2px rgba(91,33,182,.35)',
                    border: 'none',
                  }}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin mr-2" />
                      Loading...
                    </>
                  ) : type === 'sign-in'
                    ? 'Sign in'
                    : 'Create account'
                  }
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1.5">
            <p className="text-[13.5px] font-normal text-[#6B6577]">
              {type === 'sign-in'
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === 'sign-in' ? '/sign-up' : '/sign-in'}
              className="text-[13.5px] font-medium text-[#7C3AED] hover:underline"
            >
              {type === 'sign-in' ? 'Sign up' : 'Sign in'}
            </Link>
          </footer>
        </>
      )}
    </section>
  )
}

export default AuthForm
