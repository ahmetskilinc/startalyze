'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from '@/components/ui/form';
import { ShineBorder } from '@/components/ui/shine-border';
import { zodResolver } from '@hookform/resolvers/zod';
import { authClient } from '@/server/auth/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UI_CUSTOM } from '@/lib/constants';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { signUpSchema } from '@/lib/zod';
import { useState } from 'react';
import { toast } from 'sonner';
import Link from 'next/link';
import { z } from 'zod';

export function SignupForm() {
  const [pending, setPending] = useState(false);
  const [socialLoading, setSocialLoading] = useState<'google' | 'github' | null>(null);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    if (values.password !== values.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      setPending(true);
      await authClient.signUp.email(
        {
          email: values.email,
          password: values.password,
          name: '',
          firstName: '',
          lastName: '',
          onboardingCompleted: false,
          plan: 'free',
        },
        {
          onSuccess: async () => {
            toast.success('Account created', {
              description: 'Check your email for a verification link.',
            });
            await authClient.sendVerificationEmail({
              email: values.email,
              callbackURL: '/chat',
            });
          },
          onError: (ctx) => {
            setPending(false);
            toast.error('Signup failed', {
              description: ctx.error?.message ?? 'Something went wrong',
            });
          },
        },
      );
    } catch (error) {
      toast.error('Something went wrong', {
        description: 'Please try again later.',
      });
    }
  };

  const handleSocialSignup = async (provider: 'google' | 'github') => {
    try {
      setSocialLoading(provider);
      await authClient.signIn.social(
        { provider, callbackURL: '/chat' },
        {
          onError: (ctx) => {
            toast.error('Social signup failed', {
              description: ctx.error?.message ?? `Unable to sign up with ${provider}`,
            });
          },
        },
      );
    } catch {
      toast.error('Something went wrong', {
        description: 'Try again later.',
      });
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <Card className="relative mx-auto w-full max-w-[350px] overflow-hidden shadow-xl">
      <ShineBorder shineColor={UI_CUSTOM.shine_color} />
      <CardHeader>
        <CardTitle className="text-xl">Sign up</CardTitle>
        <CardDescription>Create your account to get started</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
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
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="mt-2 w-full cursor-pointer bg-indigo-500 hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              disabled={pending}
            >
              {pending ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
        </Form>

        <div className="text-muted-foreground mt-6 mb-4 flex items-center gap-4 text-xs uppercase">
          <div className="border-muted-foreground/30 flex-1 border-t" />
          <span className="shrink-0 px-2">or continue with</span>
          <div className="border-muted-foreground/30 flex-1 border-t" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="flex cursor-pointer items-center justify-center gap-2"
            onClick={() => handleSocialSignup('google')}
            disabled={socialLoading === 'google'}
          >
            <FcGoogle className="text-xl" />
            {socialLoading === 'google' ? 'Redirecting...' : 'Google'}
          </Button>
          <Button
            variant="outline"
            className="flex cursor-pointer items-center justify-center gap-2"
            onClick={() => handleSocialSignup('github')}
            disabled={socialLoading === 'github'}
          >
            <FaGithub className="text-xl" />
            {socialLoading === 'github' ? 'Redirecting...' : 'GitHub'}
          </Button>
        </div>

        <div className="mt-4 text-center">
          <span className="text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-indigo-500 hover:underline">
              Login
            </Link>
          </span>
        </div>
      </CardContent>

      <CardFooter className="text-muted-foreground flex flex-col items-center justify-between text-xs">
        <div className="text-center">
          <span className="text-xs">
            By signing up, you agree to our{' '}
            <Link href="/terms" className="text-indigo-500 hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy-policy" className="text-indigo-500 hover:underline">
              Privacy Policy
            </Link>
            .
          </span>
        </div>
        <div className="mt-2">© {new Date().getFullYear()} Startalyze. All rights reserved.</div>
      </CardFooter>
    </Card>
  );
}
