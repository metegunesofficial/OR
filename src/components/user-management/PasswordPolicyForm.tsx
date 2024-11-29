import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

const passwordPolicySchema = z.object({
  minLength: z.number().min(8).max(32),
  requireUppercase: z.boolean(),
  requireLowercase: z.boolean(),
  requireNumbers: z.boolean(),
  requireSpecialChars: z.boolean(),
  passwordExpiration: z.number().min(0).max(365),
  maxAttempts: z.number().min(1).max(10),
});

type PasswordPolicyValues = z.infer<typeof passwordPolicySchema>;

interface PasswordPolicyFormProps {
  onSubmit?: (data: PasswordPolicyValues) => void;
  defaultValues?: Partial<PasswordPolicyValues>;
}

const defaultPolicyValues: PasswordPolicyValues = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: false,
  passwordExpiration: 90,
  maxAttempts: 3,
};

const PasswordPolicyForm = ({
  onSubmit = () => {},
  defaultValues = defaultPolicyValues,
}: PasswordPolicyFormProps) => {
  const form = useForm<PasswordPolicyValues>({
    resolver: zodResolver(passwordPolicySchema),
    defaultValues,
  });

  const handleSubmit = (values: PasswordPolicyValues) => {
    onSubmit(values);
  };

  return (
    <Card className="w-full bg-background">
      <CardHeader>
        <CardTitle>Password Policy Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="minLength"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Password Length</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-4">
                      <Slider
                        min={8}
                        max={32}
                        step={1}
                        value={[field.value]}
                        onValueChange={([value]) => field.onChange(value)}
                        className="w-[200px]"
                      />
                      <span className="w-12 text-sm">{field.value}</span>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Set the minimum number of characters required for passwords
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="requireUppercase"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Require Uppercase</FormLabel>
                      <FormDescription>
                        Require at least one uppercase letter
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="requireLowercase"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Require Lowercase</FormLabel>
                      <FormDescription>
                        Require at least one lowercase letter
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="requireNumbers"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Require Numbers</FormLabel>
                      <FormDescription>
                        Require at least one number
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="requireSpecialChars"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Require Special Characters</FormLabel>
                      <FormDescription>
                        Require at least one special character
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="passwordExpiration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password Expiration (Days)</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-4">
                      <Slider
                        min={0}
                        max={365}
                        step={30}
                        value={[field.value]}
                        onValueChange={([value]) => field.onChange(value)}
                        className="w-[200px]"
                      />
                      <span className="w-12 text-sm">{field.value}</span>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Set how often users must change their password (0 for never)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maxAttempts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Login Attempts</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-4">
                      <Slider
                        min={1}
                        max={10}
                        step={1}
                        value={[field.value]}
                        onValueChange={([value]) => field.onChange(value)}
                        className="w-[200px]"
                      />
                      <span className="w-12 text-sm">{field.value}</span>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Number of failed attempts before account lockout
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PasswordPolicyForm;
