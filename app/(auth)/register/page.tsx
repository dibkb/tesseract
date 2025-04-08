import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

import { UserAuthForm } from "@/components/form/user-auth-form";
import RegisterHero from "@/components/register-hero";

export const metadata = {
  title: "Create an account",
  description: "Create an account to get started.",
};

export default function RegisterPage() {
  return (
    <div className="container grid h-full w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/login"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-16 top-16 md:right-16 md:top-16"
        )}
      >
        Login
      </Link>
      <div className="relative h-full w-full overflow-hidden rounded-lg">
        {/* <div className="inset-0 bg-black/20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[95%] w-[95%] object-cover rounded-lg z-50" /> */}
        <RegisterHero />
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <p>/--/--</p>
            <p className="text-2xl font-semibold tracking-tight">
              Create an account
            </p>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="hover:text-brand underline underline-offset-4"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="hover:text-brand underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
