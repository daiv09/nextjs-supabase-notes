import Link from "next/link";
import Image from "next/image";
import { shadow } from "@/styles/utils";
import { Button } from "@/components/ui/button";
import DarkModeToggle from "@/components/DarkModeToggle";
import LogOutButton from "@/components/LogOutButton";
import { getUser } from "@/auth/server";
async function Navbar() {
  const user = await getUser(); // Replace with actual user authentication logic
  return (
    <div
      className="bg-popover relative flex h-24 w-full items-center justify-between px-3 sm:px-8"
      style={{
        boxShadow: shadow,
      }}
    >
      <Link href="/" className="flex items-end gap-2">
        <Image
          src="/logo.png"
          alt="logo"
          height={60}
          width={60}
          className="rounded-full"
        />
        <h1 className="text-primary flex flex-col items-center pb-1 text-2xl leading-6 font-bold">
          ACE <span>Notes</span>
        </h1>
      </Link>

      <div className="flex gap-4">
        {user ? (
          <LogOutButton />
        ) : (
            <div className="flex gap-2">
            <Button asChild className="hidden sm:block">
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          
            <Button asChild variant="outline">
              <Link href="/login">Login</Link>
            </Button>
          </div>
          
        )}
        <DarkModeToggle/>
      </div>
    </div>
  );
}

export default Navbar;
