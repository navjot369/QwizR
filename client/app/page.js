"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import Hero from "./components/hero"
import Features from "./components/features"
import Working from "./components/wokring"
import Testinomials from "./components/testinomials"
import Team from "./components/team"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import FAQ from "./components/faq"

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(null)

  const toggleFaq = (index) => {
    if (openFaq === index) {
      setOpenFaq(null)
    } else {
      setOpenFaq(index)
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Header />
      <Hero />
      <Features />
      <Working />
      <Testinomials />
      <Team />
      <FAQ />
      <Footer />
    </div>
  )
}

