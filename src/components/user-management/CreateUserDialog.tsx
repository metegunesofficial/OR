import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserStore } from "@/lib/store/userStore";
import { useActivityStore } from "@/lib/store/activityStore";
import { useRoleStore } from "@/lib/store/roleStore";

const userFormSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    role: z.string().min(1, "Please select a role"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain uppercase, lowercase, and number",
      )
      .optional()
      .or(z.literal("")),
    confirmPassword: z.string().optional().or(z.literal("")),
  })
  .refine((data) => !data.password || data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type UserFormValues = z.infer<typeof userFormSchema>;

interface CreateUserDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultValues?: Partial<UserFormValues>;
  mode?: "create" | "edit";
  userId?: string;
}

const CreateUserDialog = ({
  open = false,
  onOpenChange = () => {},
  defaultValues,
  mode = "create",
  userId,
}: CreateUserDialogProps) => {
  const { addUser, updateUser } = useUserStore();
  const { addActivity } = useActivityStore();
  const { roles } = useRoleStore();

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: defaultValues || {
      name: "",
      email: "",
      role: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = (values: UserFormValues) => {
    try {
      if (mode === "create") {
        if (!values.password) {
          form.setError("password", {
            type: "manual",
            message: "Password is required for new users",
          });
          return;
        }

        addUser({
          name: values.name,
          email: values.email,
          role: values.role,
          avatarUrl: `https://dummyimage.com/40/4f46e5/ffffff&text=${values.name
            .split(" ")
            .map((n) => n[0])
            .join("")}`,
        });

        addActivity({
          action: "User Created",
          user: "Admin",
          target: values.email,
          details: `New user account created for ${values.name}`,
          severity: "info",
        });
      } else if (mode === "edit" && userId) {
        updateUser(userId, {
          name: values.name,
          email: values.email,
          role: values.role,
        });

        addActivity({
          action: "User Updated",
          user: "Admin",
          target: values.email,
          details: `User account updated for ${values.name}`,
          severity: "info",
        });
      }

      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error appropriately
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-background">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create New User" : "Edit User"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Add a new user to the system. Fill in all required fields."
              : "Edit user information."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john@hospital.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.id} value={role.id}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {mode === "create" && (
              <>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
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
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {mode === "create" ? "Create User" : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserDialog;
