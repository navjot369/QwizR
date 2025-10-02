import { Button } from "@/components/ui/button";
import { BookOpen, PenTool } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 px-4">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-900/20 z-0"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-blue-600 dark:text-blue-400 mb-6">
              Making Learning Fun and Assessment Easy
            </h1>
            <p className="text-xl mb-8 text-gray-700 dark:text-gray-300">
              QwizR is an interactive digital assessment platform designed specifically for young learners in primary
              education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white">
                Learn More
              </Button>
            </div>
          </motion.div>
          
          {/* Image + Icons */}
          <div className="relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 md:p-8"
            >
              <Image
                src="/QwizR-landingImg.jpg"
                alt="QwizR Platform Preview"
                className="rounded-lg w-full"
                width={300}
                height={400}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-yellow-400 dark:bg-yellow-500 rounded-full p-4 shadow-lg hidden md:block"
            >
              <BookOpen className="w-8 h-8 text-white" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute -top-6 -right-6 bg-green-400 dark:bg-green-500 rounded-full p-4 shadow-lg hidden md:block"
            >
              <PenTool className="w-8 h-8 text-white" />
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}