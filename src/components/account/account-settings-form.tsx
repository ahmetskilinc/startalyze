'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { zodResolver } from '@hookform/resolvers/zod';
import { authClient } from '@/server/auth/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { user } from '@/server/db/schema';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const personalInfoSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters.' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, { message: 'Current password is required' }),
    newPassword: z.string().min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const billingSchema = z.object({});

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;
export type PasswordValues = z.infer<typeof passwordSchema>;
export type BillingValues = z.infer<typeof billingSchema>;

interface AccountSettingsFormProps {
  user: typeof user.$inferSelect;
}

export function AccountSettingsForm({ user }: AccountSettingsFormProps) {
  const personalInfoForm = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
    },
  });

  const passwordForm = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
  });

  const billingForm = useForm<BillingValues>({
    resolver: zodResolver(billingSchema),
  });

  async function onPersonalInfoSubmit(data: PersonalInfoValues) {
    try {
      const { error } = await authClient.updateUser({
        firstName: data.firstName,
        lastName: data.lastName,
        name: `${data.firstName} ${data.lastName}`,
      });

      if (error) {
        toast.error(typeof error === 'string' ? error : 'Failed to update personal information');
        return;
      }
      toast.success('Personal information updated successfully.');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update personal information.');
    }
  }

  async function onPasswordSubmit(data: PasswordValues) {
    try {
      const { error } = await authClient.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      if (error) {
        toast.error(typeof error === 'string' ? error : 'Failed to change password');
        return;
      }
      toast.success('Password changed successfully.');
      passwordForm.reset();
    } catch (error) {
      console.error(error);
      toast.error('Failed to change password.');
    }
  }

  async function onBillingSubmit(data: BillingValues) {
    // try {
    //   const { error } = await authClient.updateBilling({
    //   });
    //   if (error) {
    //     toast.error(typeof error === "string" ? error : "Failed to update billing information");
    //     return;
    //   }
    //   toast.success("Password changed successfully.");
    //   passwordForm.reset();
    // } catch (error) {
    //   console.error(error);
    //   toast.error("Failed to change password.");
    // }

    toast.success('Billing information updated successfully.');
  }

  return (
    <Tabs defaultValue="personal" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="personal">Personal Info</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="billing" disabled={process.env.NODE_ENV === 'production'}>
          Billing
        </TabsTrigger>
      </TabsList>

      <TabsContent value="personal" className="space-y-4">
        <Form {...personalInfoForm}>
          <form
            onSubmit={personalInfoForm.handleSubmit(onPersonalInfoSubmit)}
            className="space-y-6"
          >
            <div className="bg-card rounded-lg border p-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Personal Information</h3>
                  <p className="text-muted-foreground text-sm">
                    Update your personal information and email address.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex w-full flex-col gap-4 md:flex-row">
                    <FormField
                      control={personalInfoForm.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your first name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={personalInfoForm.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your last name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={personalInfoForm.control}
                    name="email"
                    disabled
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your email" {...field} type="email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button type="submit">Update Personal Info</Button>
              </div>
            </div>
          </form>
        </Form>
      </TabsContent>

      <TabsContent value="password" className="space-y-4">
        <Form {...passwordForm}>
          <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
            <div className="bg-card rounded-lg border p-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Change Password</h3>
                  <p className="text-muted-foreground text-sm">Update your password securely.</p>
                </div>
                <div className="space-y-4">
                  <FormField
                    control={passwordForm.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Enter current password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Enter new password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Confirm new password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button type="submit">Change Password</Button>
              </div>
            </div>
          </form>
        </Form>
      </TabsContent>

      <TabsContent value="billing" className="space-y-4">
        <Form {...billingForm}>
          <form onSubmit={billingForm.handleSubmit(onBillingSubmit)} className="space-y-6">
            <div className="bg-card rounded-lg border p-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Billing</h3>
                  <p className="text-muted-foreground text-sm">Manage your billing information.</p>
                </div>
                <div className="space-y-4">{/* FORM FIELDS GO HERE */}</div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button type="submit" disabled={process.env.NODE_ENV === 'production'}>
                  Update Billing
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </TabsContent>
    </Tabs>
  );
}
