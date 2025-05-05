"use server";
import { createClient } from "@/auth/server";
// import { handleError } from "@/lib/utils";
const handleError = (error: unknown): { errorMessage: string } => {
    console.error(error);
    return { errorMessage: error instanceof Error ? error.message : "An unknown error occurred" };
  };
export const loginAction = async (email: string, password: string) => {
  try {
    const { auth } = await createClient();
    const { error } = await auth.signInWithPassword({ email, password });
    if (error) {
      return error;
    }
    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};
export const logOutAction = async () => {
  try {
    const { auth } = await createClient();
    const { error } = await auth.signOut();
    if (error) {
      return error;
    }
    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};
export const signUpAction = async (email: string, password: string) => {
  try {
    const { auth } = await createClient();
    const { data, error } = await auth.signUp({ email, password });
    if (error) {
      return error ;
    }

    const userId= data.user?.id;
    if(!userId) {
        throw new Error("User ID not found.");
    }    

    // add user to the database

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};
