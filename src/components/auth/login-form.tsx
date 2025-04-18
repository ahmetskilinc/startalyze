'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authClient } from '@/server/auth/client';
import { ShineBorder } from '../ui/shine-border';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { UI_CUSTOM } from '@/lib/constants';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { signInSchema } from '@/lib/zod';
import { useState } from 'react';
import { toast } from 'sonner';
import Link from 'next/link';
import { z } from 'zod';

export function SigninForm() {
  const router = useRouter();

  const [pending, setPending] = useState(false);
  const [socialLoading, setSocialLoading] = useState<'google' | 'github' | null>(null);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    try {
      setPending(true);
      await authClient.signIn.email(
        { email: values.email, password: values.password },
        {
          onSuccess: () => {
            router.push('/chat');
          },
          onError: (ctx) => {
            setPending(false);
            toast.error('Login failed', {
              description: ctx.error?.message ?? 'Invalid credentials',
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

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    try {
      setSocialLoading(provider);
      await authClient.signIn.social(
        { provider, callbackURL: '/chat' },
        {
          onError: (ctx) => {
            toast.error('Social login failed', {
              description: ctx.error?.message ?? `Unable to login with ${provider}`,
            });
          },
        },
      );
    } catch (error) {
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
        <CardTitle className="text-xl">Login</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
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
            <Button
              type="submit"
              className="mt-2 w-full cursor-pointer bg-indigo-500 hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              disabled={pending}
            >
              {pending ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </Form>

        <div className="text-muted-foreground mt-4 flex justify-end text-sm">
          <Link
            href="/forgot-password"
            className="text-indigo-500 hover:text-indigo-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <div className="text-muted-foreground mt-6 mb-4 flex items-center gap-4 text-xs uppercase">
          <div className="border-muted-foreground/30 flex-1 border-t" />
          <span className="shrink-0 px-2">or continue with</span>
          <div className="border-muted-foreground/30 flex-1 border-t" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="flex w-full cursor-pointer items-center justify-center gap-2"
            onClick={() => handleSocialLogin('google')}
            disabled={socialLoading === 'google'}
          >
            <FcGoogle className="text-xl" />
            {socialLoading === 'google' ? 'Redirecting...' : 'Google'}
          </Button>
          <Button
            variant="outline"
            className="flex w-full cursor-pointer items-center justify-center gap-2"
            onClick={() => handleSocialLogin('github')}
            disabled={socialLoading === 'github'}
          >
            <FaGithub className="text-xl" />
            {socialLoading === 'github' ? 'Redirecting...' : 'GitHub'}
          </Button>
        </div>

        <div className="mt-4 text-center">
          <span className="text-sm">
            Don&apos; have an account?{' '}
            <Link href="/signup" className="text-indigo-500 hover:underline">
              Sign up
            </Link>
          </span>
        </div>
      </CardContent>

      <CardFooter className="text-muted-foreground flex flex-col items-center justify-between text-xs">
        <div className="text-center">
          <span className="text-xs">
            By signing in, you agree to our{' '}
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
