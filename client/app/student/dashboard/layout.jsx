"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";
import { createContext, useState, useEffect } from "react";
import {
  PanelRightClose,
  PanelLeftClose,
  Home,
  FilePlus,
  ScanEye,
  ChartCandlestick,
} from "lucide-react";
import clsx from "clsx";

const links = [
  { t: "Home", l: "/student/dashboard", i: <Home /> },
  {
    t: "Assessments",
    l: "/student/dashboard/assessment",
    i: <FilePlus />,
  },
  { t: "Reports", l: "/student/dashboard/report", i: <ScanEye /> }
];

const AuthContext = createContext();

export default function DashboardLayout({ children }) {
  const [token, setToken] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const path = usePathname();

   useEffect(() => {
            const LocalToken = localStorage.getItem("auth");
            if (!LocalToken) {
              window.location.href = "/";
            } else {
              setToken(LocalToken);
            }
    }, []);



  return (
    <div
      className={clsx(
        "md:grid md:h-screen md:w-screen duration-300 resize-x",
        sidebarOpen && "md:grid-cols-[300px_1fr]",
        !sidebarOpen && "md:grid-cols-[50px_1fr]"
      )}
    >
      <div></div>
      <div className={clsx("bg-blue-400 h-full fixed top-0 left-0 hidden md:flex justify-between flex-col p-2 resize", sidebarOpen && "w-[300px]",
        !sidebarOpen && "w-[50px]")}>
        <div className="w-full">
          <Toaster />
          {sidebarOpen? (<header
            className="font-bold text-4xl p-4 w-full text-center text-amber-50">
            QwizR
          </header>):(<header
            className="font-bold text-4xl py-4 px-1 w-full text-center text-amber-50">
            Q
          </header>)}
          <div
            className={clsx(
              "flex flex-col text-white gap-2",
              sidebarOpen && "md:pl-4",
              !sidebarOpen && "items-center"
            )}
          >
            {links.map((link, ind) => (
              <Link
                href={link.l}
                className={clsx(
                  "flex justify-start items-center font-bold text-xl gap-2  hover:text-blue-700",
                  path == link.l && "text-blue-800"
                )}
                key={ind}
              >
                {link.i} {sidebarOpen && link.t}
              </Link>
            ))}
          </div>
        </div>
        <div
          className={clsx(
            "flex w-full p-2",
            sidebarOpen ? "justify-between" : "justify-center"
          )}
        >
          {sidebarOpen && <div>(Account)</div>}
          {sidebarOpen ? (
            <button onClick={() => setSidebarOpen(false)}>
              <PanelLeftClose className="text-white" />
            </button>
          ) : (
            <button onClick={() => setSidebarOpen(true)}>
              <PanelRightClose className="text-white" />
            </button>
          )}
        </div>
      </div>
      <AuthContext.Provider value={token}>
      <main className="p-4">{children}</main>
      </AuthContext.Provider>
    </div>
  );
}


export {AuthContext};