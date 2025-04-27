import { login } from "@/action/user";
import { auth, signIn } from "@/auth";
import { IconBrandGoogle } from "@tabler/icons-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const Login = async () => {
  const session = await auth();
  const user = session?.user;

  if (user) {
    redirect("/");
  }

  return (
    <div className="mt-10 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white border border-[#121212] dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Log In
      </h2>

      <form className="my-8 p-4 rounded-md shadow-md" action={login}>
        <label htmlFor="email" className="block mb-2">
          Email
          <input
            id="email"
            name="email"
            type="email"
            placeholder="email@email.com"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </label>
        <label htmlFor="password" className=" block mb-2">
          Password
          <input
            id="password"
            name="password"
            type="password"
            placeholder="********"
            className="border border-gray-300 rounded-md p-2 w-full mb-5"
          />
        </label>
        <button className="cursor-pointer bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]">
          Log in &rarr;
        </button>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Don`t have an account? <Link href="/register">Register</Link>
        </p>
      </form>
      <p className="mb-4 text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300 text-center">
        Or LogIn using
      </p>
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <button
          className="cursor-pointer relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
          type="submit"
        >
          <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            Google
          </span>
        </button>
      </form>
    </div>
  );
};

export default Login;
