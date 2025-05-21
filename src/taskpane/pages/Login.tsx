import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Logo from "../components/Logo";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

// Helper to safely access Office object
const updateOfficeSettings = (isLoggedIn: boolean) => {
  try {
    // @ts-ignore - Office is available at runtime but TypeScript doesn't know about it
    if (typeof Office !== "undefined" && Office?.context?.document?.settings) {
      // @ts-ignore
      Office.context.document.settings.set("isLoggedIn", isLoggedIn);
      // @ts-ignore
      Office.context.document.settings.saveAsync();
    }
  } catch (error) {
    console.error("Error updating Office settings:", error);
  }
};

// Define schema for form validation
const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email format" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    // Simulate login - in a real app, you would call your authentication API
    console.log("Login attempt with:", data);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Store login state in localStorage
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", data.email);

    // Notify Word add-in that user is logged in
    updateOfficeSettings(true);

    // Navigate to dashboard
    onLogin();
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="flex flex-col items-center space-y-2 mb-6">
          <Logo />
          <h1 className="text-2xl font-bold text-gray-900">Sign in to Bridge</h1>
          <p className="text-gray-500 text-sm">Enter your credentials to access your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" {...register("password")} />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>

          <button
            style={{ backgroundColor: "#FF0000", color: "white" }}
            type="submit"
            className="w-full rounded-md py-3 px-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <a href="#" className="text-blue-600 hover:underline" onClick={(e) => e.preventDefault()}>
              Sign up
            </a>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
