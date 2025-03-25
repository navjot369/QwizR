"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">QwizR</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="#features" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              Features
            </Link>
            <Link href="#how-it-works" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              How It Works
            </Link>
            <Link href="#testimonials" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              Testimonials
            </Link>
            <Link href="#team" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              Team
            </Link>
            <Link href="#faq" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              FAQ
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/auth/login/student" variant="outline" className="border-2 px-2 rounded-sm py-1 border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600">
              Log In
            </Link>
            {/*<Button className="bg-blue-600 hover:bg-blue-700 text-white">Sign Up</Button> */}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="#features"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600"
              onClick={toggleMenu}
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600"
              onClick={toggleMenu}
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600"
              onClick={toggleMenu}
            >
              Pricing
            </Link>
            <Link
              href="#testimonials"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600"
              onClick={toggleMenu}
            >
              Testimonials
            </Link>
            <Link
              href="#faq"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600"
              onClick={toggleMenu}
            >
              FAQ
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <Button variant="outline" className="w-full border-blue-600 text-blue-600 mb-2">
                  Log In
                </Button>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Sign Up</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

