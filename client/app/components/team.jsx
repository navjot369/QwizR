import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";



export default function Team() {
    const teamMembers = [
          {
            name: "Navjot Singh",
            role: "Full-Stack Development and Product Mangagement",
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
        ]
      
        return (<div className="min-h-screen bg-white text-gray-800" id="team">
      
            {/* Hero Section */}
            <section className="py-20 px-4 bg-blue-50">
              <div className="inset-0 bg-gradient-to-r from-blue-50 to-purple-50 z-0"></div>
              <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                  <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">Meet Our Team</h1>
                  <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                    The passionate educators and technologists behind QwizR who are dedicated to transforming digital assessment for young learners.
                  </p>
                </div>
              </div>
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {teamMembers.map((member, index) => (
                    <Card key={index} className="overflow-hidden transition-all duration-300 hover:shadow-lg p-2">
                      <div className="aspect-square overflow-hidden bg-gray-100">
                        <Image
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover transition-transform duration-500  rounded-lg"
                          width="300"
                          height="300"
                        />
                      </div>
                      <CardContent className="p-3">
                        <h3 className="text-xl font-bold text-blue-600 mb-1">{member.name}</h3>
                        <p className="text-sm text-gray-500 mb-3">{member.role}</p>
                        {/* <p className="text-gray-700 mb-4">{member.bio}</p> */}
                        <div className="flex space-x-3">
                          
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
            </div>);      
}













/*{ {member.social.github && (
                            <a
                              href={member.social.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-500 hover:text-blue-600 transition-colors"
                            >
                              <Github size={18} />
                              <span className="sr-only">GitHub</span>
                            </a>
                          )}
                          {member.social.twitter && (
                            <a
                              href={member.social.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-500 hover:text-blue-600 transition-colors"
                            >
                              <Twitter size={18} />
                              <span className="sr-only">Twitter</span>
                            </a>
                          )}
                          {member.social.linkedin && (
                            <a
                              href={member.social.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-500 hover:text-blue-600 transition-colors"
                            >
                              <Linkedin size={18} />
                              <span className="sr-only">LinkedIn</span>
                            </a>
                          )}
                          {member.social.email && (
                            <a
                              href={`mailto:${member.social.email}`}
                              className="text-gray-500 hover:text-blue-600 transition-colors"
                            >
                              <Mail size={18} />
                              <span className="sr-only">Email</span>
                            </a>
)} }*/