import { auth, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="flex justify-between items-center mx-auto bg-red-100">
      <Link href="/">
        <Image
          src="/logo.jpg"
          alt="logo"
          width={100}
          height={100}
          className="object-cover"
        />
      </Link>

      <ul className="hidden md:flex space-x-4 list-none">
      <li className="mt-2">
              <Link href="/" className="hover:text-gray-400">
                Main page
              </Link>
            </li>
        {!user ? (
          <>
            <li>
              <Link href="/login" className="hover:text-gray-400">
                Login
              </Link>
            </li>
            <li>
              <Link href="/register" className="hover:text-gray-400">
                Register
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="mt-2">
              <Link href="/whatchlist" className="hover:text-gray-400">
                Whatch list
              </Link>
            </li>

            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button
                className="cursor-pointer hover:text-gray-400 mt-2 mr-2 "
                type="submit"
              >
                Logout
              </button>
            </form>
          </>
        )}
      </ul>
    </div>
  );
};

export default Header;
