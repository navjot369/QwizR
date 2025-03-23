import React from 'react';
import { Card, CardContent } from "@/components/ui/card"


export default function Testinomials() {
    return(<section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">What Educators Are Saying</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from teachers who have transformed their assessment process with QwizR.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
          </div>
        </div>
      </section>);
}