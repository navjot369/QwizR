import Link from "next/link";
import { House } from "lucide-react";
import { Toaster } from "sonner";

export default function Layout({children}) {
    return(<div className="flex justify-center items-center w-full h-full">
        {/* <Toaster position="top-center" richColors/> */}
        <div>
            <div className="flex justify-center">
                <h1 className="text-3xl text-white font-bold bg-blue-400 rounded-t-2xl py-2 px-4">Create Question</h1>
            </div>
            {children}
        </div>
    </div>);
}
