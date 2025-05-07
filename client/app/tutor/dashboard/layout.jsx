"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";
import { useState, useEffect } from "react";
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
  { t: "Home", l: "/tutor/dashboard", i: <Home /> },
  {
    t: "Create Question",
    l: "/tutor/dashboard/new/questions",
    i: <FilePlus />,
  },
  { t: "View Question", l: "/tutor/dashboard/view/questions", i: <ScanEye /> },
  { t: "New Assessment", l: "/tutor/dashboard/new/assessment", i: <FilePlus />},
  { t: "Assessments", l: "/tutor/dashboard/view/assessments", i: <ChartCandlestick />}
];

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const path = usePathname();

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
      <main className="p-4">{children}</main>
    </div>
  );
}
