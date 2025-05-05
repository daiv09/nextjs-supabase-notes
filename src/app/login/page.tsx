import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import AuthForm from "@/components/AuthForm";

function login() {
  return (
    <div className="mt-20 flex flex-col items-center">
      <Card className="w-full max-w-md">
        <CardHeader className="mb-2">
          <CardTitle className="text-center font-bold text-3xl">Login</CardTitle>
        </CardHeader>

        <AuthForm type="login"/>
      </Card>
    </div>
  );
}

export default login;
