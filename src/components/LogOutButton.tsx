"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { logOutAction } from "@/actions/users";

function LogOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogOut = async () => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network request

    const {errorMessage} = await logOutAction(); // Replace this with real error checking
    console.log("errorMessage", errorMessage);
    if (!errorMessage) {
      toast.success("You have been logged out successfully.");
      router.push("/");
    } else {
      toast.error("Something went wrong while logging out.");
    }

    setLoading(false);
  };

  return (
    <Button
      className="w-24"
      variant="outline"
      disabled={loading}
      onClick={handleLogOut}
    >
      {loading ? <Loader2 className="animate-spin" /> : "Log Out"}
    </Button>
  );
}

export default LogOutButton;
