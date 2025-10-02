import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Team() {
  const teamMembers = [
    {
      name: "Navjot Singh",
      role: "Full-Stack Development and Product Management",
      bio: "Alex has over 10 years of experience in EdTech and a passion for making learning accessible to all children. Previously led product at Khan Academy.",
      image: "/Image_Navjot.jpeg",
      social: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
        github: "https://github.com",
        email: "navjot369.dev@gmail.com",
      },
    },
    {
      name: "Simrandeep Singh",
      role: "",
      bio: "Priya brings 8 years of software engineering experience with a focus on creating intuitive interfaces for young users. Former senior engineer at Duolingo.",
      image: "/Image_Simran.jpeg",
      social: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
        github: "https://github.com",
        email: "priya@qwizr.edu",
      },
    },
    {
      name: "Kheyanshu Garg",
      role: "",
      bio: "Marcus is a former elementary school teacher with a Master's in Education. He ensures QwizR's features align with curriculum standards and teaching best practices.",
      image: "/Image_Kendo.jpeg",
      social: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
        email: "marcus@qwizr.edu",
      },
    },
    {
      name: "Keshav Soni",
      role: "",
      bio: "Sophia specializes in UX/UI design for children. Her colorful, intuitive designs make QwizR accessible and engaging for even the youngest learners.",
      image: "/Image_Keshav.jpeg",
      social: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
        github: "https://github.com",
        email: "sophia@qwizr.edu",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100" id="team">
      <section className="py-20 px-4 bg-blue-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-4">Meet Our Team</h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              The passionate educators and technologists behind QwizR who are dedicated to transforming digital assessment for young learners.
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {teamMembers.map((member, index) => (
              <motion.div key={index} variants={cardVariants}>
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg p-2 bg-white dark:bg-gray-900">
                  <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <Image
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 rounded-lg"
                      width="300"
                      height="300"
                    />
                  </div>
                  <CardContent className="p-3">
                    <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-1">{member.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{member.role}</p>
                    <div className="flex space-x-3">
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
