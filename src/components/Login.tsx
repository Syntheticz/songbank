"use client";

import React, { useEffect, useState } from "react";
import Icon from "../../public/logo.png";
import FB from "../../public/fb.svg";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { getServerSession } from "next-auth";
import { test } from "@/lib/serverHelper";
import ErrorComponent from "./ErrorComponent";

let BASE_URL =
  process.env.NODE_ENV === "development"
    ? process.env.BASE_URL
    : process.env.PROD_URL;

export default function Login() {
  const [rawData, setRawData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    message: "",
    error: false,
  });

  const router = useRouter();

  function handleOnClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    signIn("facebook", { callbackUrl: `${BASE_URL}` });
  }

  function handleGoogle(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    signIn("google", { callbackUrl: `${BASE_URL}`, redirect: false });
  }

  useEffect(() => {
    setError({ error: false, message: "" });
  }, [rawData]);

  async function handleLogin(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();

    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (rawData.email === "" || rawData.password === "") {
      setError({ error: true, message: "There are empty fields." });
    }

    if (!emailRegex.test(rawData.email)) {
      setError({ error: true, message: "Please enter a valid email." });
    }

    const res = await signIn("credentials", {
      email: rawData.email,
      password: rawData.password,
      redirect: false,
    });

    if (res?.error) {
      setError({ error: true, message: "Wrong username or password" });
    } else {
      router.push("/");
    }
  }

  return (
    <div className="max-w-[370px] rounded-3xl min-w-[300px] flex flex-col items-center pb-6 border-2 border-gray-2 00 shadow-lg">
      <div className="w-full gap-2 flex flex-col justify-center items-center p-6">
        <div className="w-1/2">
          <Image src={Icon} objectFit="fill" alt="Church Icon" />
        </div>
        <input
          onChange={(e) => {
            setRawData({ ...rawData, email: e.target.value });
          }}
          id="artist"
          className="bg-gray-100 border-2 w-full font-montserrat text-sm h-10 p-2 placeholder:font-medium font-semibold border-primary rounded-sm"
          type="text"
          placeholder="Email"
        />
        <input
          onChange={(e) => {
            setRawData({ ...rawData, password: e.target.value });
          }}
          id="artist"
          className="bg-gray-100 border-2 w-full font-montserrat text-sm h-10 p-2 placeholder:font-medium font-semibold border-primary rounded-sm"
          type="password"
          placeholder="Password"
        />
        <button
          onClick={(e) => {
            handleLogin(e);
          }}
          className="w-full bg-primary rounded text-white font-montserrat font-semibold  text-lg tracking-wide h-10"
        >
          Log In
        </button>
        <span
          onClick={() => {
            router.push("/signup");
          }}
          className="text-xs font-montserrat font-semibold text-primary hover:text-tertiary hover:underline cursor-pointer active:text-secondary"
        >
          Sign up
        </span>
      </div>

      <div className="w-full flex justify-center items-center gap-2 px-6">
        <span className="h-1 bg-primary w-full rounded-full opacity-50"></span>
        <span className="font-montserrat font-bold opacity-50">OR</span>
        <span className="h-1 bg-primary w-full rounded-full opacity-50"></span>
      </div>

      <div className="w-full flex flex-col gap-2 px-6 mt-6 ">
        {/* <button onClick={(e) => {handleOnClick(e)}}className='w-full rounded-lg relative bg h-12 transition-all bg-[#1877f2] gap-2 flex items-center justify-center'>
                <svg fill="#FFFFFF" className='h-w w-8 mb-1 ' viewBox="0 0 24 24"><path d="M12.001 2.002c-5.522 0-9.999 4.477-9.999 9.999 0 4.99 3.656 9.126 8.437 9.879v-6.988h-2.54v-2.891h2.54V9.798c0-2.508 1.493-3.891 3.776-3.891 1.094 0 2.24.195 2.24.195v2.459h-1.264c-1.24 0-1.628.772-1.628 1.563v1.875h2.771l-.443 2.891h-2.328v6.988C18.344 21.129 22 16.992 22 12.001c0-5.522-4.477-9.999-9.999-9.999z"/></svg>      
                <span className='font-montserrat text-sm font-bold tracking-wide text-white'>Continue with Facebook</span>
          </button> */}

        <button
          onClick={(e) => {
            handleGoogle(e);
          }}
          className="w-full rounded-lg relative bg h-12 transition-all border-2 border-gray-300 gap-2 flex items-center justify-center"
        >
          <svg
            className="h-w w-6 mb-1 "
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid"
            viewBox="0 0 256 262"
            id="Google"
          >
            <path
              fill="#4285f4"
              d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
            ></path>
            <path
              fill="#34a853"
              d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
            ></path>
            <path
              fill="#fbbc05"
              d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
            ></path>
            <path
              fill="#ea4335"
              d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
            ></path>
          </svg>
          <span className="font-montserrat text-sm font-bold tracking-wide ">
            Continue with Google
          </span>
        </button>
      </div>

      {error.error ? <ErrorComponent message={error.message} /> : null}
    </div>
  );
}
