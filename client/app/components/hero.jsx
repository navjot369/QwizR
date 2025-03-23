import { Button } from "@/components/ui/button";
import {BookOpen, PenTool} from "lucide-react";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative overflow-hidden py-20 md:py-32 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 z-0"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-blue-600 mb-6">
                Making Learning Fun and Assessment Easy
              </h1>
              <p className="text-xl mb-8 text-gray-700">
                QwizR is an interactive digital assessment platform designed specifically for young learners in primary
                education.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Get Started
                </Button>
                <Button size="lg" variant="outline" className="border-blue-600 text-blue-600">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-xl shadow-xl p-4 md:p-8">
                <Image
                  src="/QwizR-landingImg.jpg"
                  alt="QwizR Platform Preview"
                  className="rounded-lg w-full"
                  width="300"
                  height="400"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-yellow-400 rounded-full p-4 shadow-lg hidden md:block">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-6 -right-6 bg-green-400 rounded-full p-4 shadow-lg hidden md:block">
                <PenTool className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}

