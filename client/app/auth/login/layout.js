"use client"

import {Tabs, TabsTrigger, TabsList} from "@/components/ui/tabs";
import { useSelectedLayoutSegment } from 'next/navigation'
import Link from "next/link";

export default function LoginLayout({ children }) {
    const segment = useSelectedLayoutSegment();
    console.log(segment);
    return (<div className="bg-white text-gray-800 h-screen flex w-screen items-center justify-center">
        <Link href="/" className="fixed top-0 w-screen text-center font-bold text-blue-500 text-3xl pt-2">QwizR
        </Link>
        <main className="w-screen mx-auto">
          <div className="max-w-md w-full mx-auto">
            <div className="grid grid-cols-2 items-center text-center p-2 gap-4 bg-gray-200 rounded-lg mb-4">
            <Link className={segment == "student"? "bg-blue-400 rounded-lg text-white font-bold":"font-bold"} href="./student">Student</Link>
            <Link className={segment == "tutor"? "bg-blue-400 rounded-lg text-white font-bold":"font-bold"} href="./tutor">Tutor</Link>
            </div>
            {children}
        </div>
        <div className="mx-auto w-fit my-2 text-gray-800">
          Don&apos;t have an account? <Link href="/auth/register" className="text-blue-700">Sign up</Link>
        </div>
      </main>
      <p className="fixed bottom-0 left-0 p-4 text-gray-600">&copy; QwizR 2025</p>
    </div>
    );
  }
  