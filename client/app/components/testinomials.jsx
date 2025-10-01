import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2, // delay between testimonial cards
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Testimonials() {
  return (
    <section className="py-20 px-4" id="testimonials">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">What Educators Are Saying</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from teachers who have transformed their assessment process with QwizR.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Testimonial 1 */}
          <motion.div variants={cardVariants}>
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <h4 className="font-bold">Amandeep Kaur</h4>
                  <p className="text-sm text-gray-600 pl-2">(Science Teacher)</p>
                </div>
                <p className="text-gray-700 italic">
                  "QwizR has transformed how I assess my students. The interactive drawing board is perfect for my
                  second graders who are still developing their writing skills."
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Testimonial 2 */}
          <motion.div variants={cardVariants}>
            <Card className="bg-gradient-to-br from-green-50 to-teal-50">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <h4 className="font-bold">Priyam Aggarwal</h4>
                  <p className="text-sm text-gray-600 pl-2">(Maths Teacher)</p>
                </div>
                <p className="text-gray-700 italic">
                  "The AI-powered question suggestions save me hours of preparation time. I can create engaging math
                  assessments in minutes that my students actually enjoy completing."
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Testimonial 3 */}
          <motion.div variants={cardVariants}>
            <Card className="bg-gradient-to-br from-yellow-50 to-orange-50">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <h4 className="font-bold">Jashanjot Singh</h4>
                  <p className="text-sm text-gray-600 pl-2">(School Principal)</p>
                </div>
                <p className="text-gray-700 italic">
                  "Since implementing QwizR across our school, we've seen increased student engagement and better
                  assessment data. The platform is intuitive for both our teachers and young students."
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
