import { auth, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="flex justify-between items-center mx-auto bg-gradient-to-r from-red-400 to-red-600 text-white p-4 shadow-lg rounded-b-lg">
      <Link href="/">
        <Image
          src="/logo.jpg"
          alt="logo"
          width={150} 
          height={150} 
          className="object-cover rounded-full border-4 border-white shadow-lg transform transition-all hover:scale-105" 
        />
      </Link>

      <ul className="hidden md:flex space-x-8 list-none">
        <li>
          <Link href="/" className="hover:text-gray-200 transition-colors duration-300">
            Home
          </Link>
        </li>
        {!user ? (
          <>
            <li>
              <Link href="/login" className="hover:text-gray-200 transition-colors duration-300">
                Login
              </Link>
            </li>
            <li>
              <Link href="/register" className="hover:text-gray-200 transition-colors duration-300">
                Register
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/whatchlist" className="hover:text-gray-200 transition-colors duration-300">
                Watchlist
              </Link>
            </li>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button
                className="cursor-pointer hover:text-gray-200 transition-colors duration-300 mt-2"
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
