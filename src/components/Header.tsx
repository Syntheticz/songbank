"use client";

import React, { useEffect, useState } from "react";
import { authConfig } from "../lib/auth";
import Image from "next/image";
import Search from "../components/Search";
import Menu from "../../public/Menu.svg";
import logo from "../../public/logo.png";
import Logo from "../../public/Logooo.png";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { isUserAdmin } from "@/lib/serverHelper";

let BASE_URL =
  process.env.NODE_ENV === "development"
    ? process.env.BASE_URL
    : process.env.PROD_URL;

export default function Header() {
  const [clicked, setClicked] = useState(false);
  const [rotation, setRotation] = useState(false);
  const [searching, setSearching] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const session = useSession();

  useEffect(() => {
    const checkUser = async () => {
      if (session.status === "authenticated") {
        const user = await isUserAdmin();

        setIsAdmin(user);
      }
    };

    checkUser();
  }, [session]);

  useEffect(() => {
    if (!clicked) {
      setRotation(false);
      return;
    }

    setTimeout(() => {
      setRotation(rotation ? false : true);
    }, 300);
  }, [clicked]);

  const router = useRouter();

  function handleOnClick() {
    signOut({ callbackUrl: `${BASE_URL}` });
  }

  return (
    <div className="min-w-[360px] w-full h-[64px] px-[8px] bg-white py-[4px] flex top-0 items-center shadow-lg mb-8 md:mb-4 sticky z-[999]">
      <Image
        className="cursor-pointer relative"
        onClick={() => {
          router.push("/");
        }}
        src={logo}
        alt={"Logo"}
        width={56}
      />

      <div
        onClick={() => {
          setClicked(false);
        }}
        className={`duration-300 ease-in-out h-full ${
          clicked ? "w-full " : "w-0"
        } bg-black bg-opacity-40 fixed top-0 right-0 z-0`}
      >
        <div
          className={`bg-primary z-30  w-[60%] h-[100%] absolute right-0 top-0`}
        >
          <div
            onClick={() => {
              router.push("/");
            }}
            className="w-full mt-32 h-[160px] flex flex-col items-center justify-center"
          >
            <Image
              className="cursor-pointer"
              src={Logo}
              alt="Logo"
              width={100}
              height={100}
              objectFit={"contain"}
            />
          </div>
          <div
            onClick={() => {
              router.push("/");
            }}
            className="w-full h-14 bg-tertiary mt-8 flex items-center px-4"
          >
            <p className="cursor-pointer text-white font-montserrat text-2xl font-semibold">
              Home
            </p>
          </div>
          {isAdmin ? (
            <div
              onClick={() => {
                router.push("/song/add");
              }}
              className="w-full h-14 bg-tertiary flex items-center px-4"
            >
              <p className="cursor-pointer text-white font-montserrat text-2xl font-semibold">
                Add Song
              </p>
            </div>
          ) : null}
          <div
            onClick={() => {
              router.push("/song/");
            }}
            className="w-full h-14 bg-tertiary flex items-center px-4"
          >
            <p className="cursor-pointer text-white font-montserrat text-2xl font-semibold">
              View Songs
            </p>
          </div>
          <div
            onClick={() => {
              handleOnClick();
            }}
            className={`w-full h-14 bg-tertiary flex items-center px-4 ${
              session.status !== "authenticated" ? "hidden" : ""
            }`}
          >
            <p className="cursor-pointer text-white font-montserrat text-2xl font-semibold">
              Logout
            </p>
          </div>
        </div>
      </div>

      <div className="hidden w-full h-full md:flex justify-between">
        <div className="h-full w-[500px] flex items-center gap-4">
          <Search />
          {isAdmin ? (
            <div className="w-[40%] ">
              <button
                onClick={() => {
                  router.push("song/add");
                }}
                className="text-primary font-montserrat font font-semibold"
              >
                Add Song
              </button>
            </div>
          ) : null}
        </div>

        {session.status !== "authenticated" ? (
          <button
            onClick={() => {
              router.push("/login");
            }}
            className="text-primary font-montserrat font font-semibold"
          >
            Log In
          </button>
        ) : (
          <button
            onClick={() => {
              signOut();
            }}
            className="text-primary font-montserrat font font-semibold"
          >
            Log Out
          </button>
        )}
      </div>

      <div className={`w-full h-full flex items-center justify-end md:hidden`}>
        <button
          onClick={() => {
            setClicked(clicked ? false : true);
          }}
          className={` z-20 w-[44px] h-[44px] duration-300 ease-in-out ${
            clicked ? "block" : "flex flex-col"
          } ${clicked ? "fixed" : "block"}`}
        >
          <hr
            className={`w-full my-auto duration-300 ease-in-out h-2 border-none rounded-md ${
              clicked ? "translate-y-full" : "block"
            } ${rotation ? "rotate-45" : "block"} ${
              clicked ? "bg-white" : "bg-primary"
            } `}
          />
          <hr
            className={`w-full my-auto duration-300 ease-in-out h-2 border-none rounded-md ${
              rotation ? "rotate-45" : "block"
            } ${clicked ? "bg-white" : "bg-primary"} `}
          />
          <hr
            className={`w-full my-auto duration-300 ease-in-out h-2 border-none rounded-md ${
              clicked ? "-translate-y-full" : "block"
            } ${rotation ? "-rotate-45" : "block"} ${
              clicked ? "bg-white" : "bg-primary"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
