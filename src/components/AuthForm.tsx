"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import React, { useTransition } from "react";
import { CardContent, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import { Label } from "./ui/label";
import { Loader2 } from "lucide-react";
import { loginAction, signUpAction } from "@/actions/users";

type Props = {
  type: "login" | "register";
};

function AuthForm({ type }: Props) {
  const isLogin = type === "login";
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition( async () => { 
      const email = formData.get("email")?.toString() || "";
      const password = formData.get("password")?.toString() || "";

      let errorMessage;
      let title;
      let description;
      if (isLogin) {
        errorMessage = (await loginAction(email, password)).errorMessage;
        title = "Logged In";
        description = "You have successfully logged in.";
      }
      else{
        errorMessage = (await signUpAction(email, password)).errorMessage;
        title = "Registered";
        description = "You have successfully registered.";
      }

      if(!errorMessage){
        toast.success({});
        router.replace("/");
      }
      else{

      }
      const { data, error } = await fetch("/api/auth", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          type: isLogin ? "login" : "register",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      if (error) {
        toast.error(error.message);
        return;
      }

      if (data) {
        toast.success(data.message);
        router.push("/");
      }

    });
  };

  return (
    <form action={handleSubmit}>
      <CardContent className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            required
            disabled={isPending}
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            required
            disabled={isPending}
          />
        </div>
      </CardContent>
      <CardFooter className="mt-4 flex flex-col gap-6">
        <Button className="w-full">
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : isLogin ? (
            " Login"
          ) : (
            " Sign Up"
          )}
        </Button>
        <p className="text-xs">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          {""}
          <Link href={isLogin ? "/sign-up" : "/login"}
          className={`text-blue-500 underline ${isPending? "pointer-events-none opacity-50 " : ""}`}>
            {isLogin ? " Sign Up" : " Login"}
          </Link>
        </p>
      </CardFooter>
    </form>
  );
}

export default AuthForm;
// function loginAction(email: string, password: string) {
//   throw new Error("Function not implemented.");
// }

