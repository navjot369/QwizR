import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { PenTool, BookOpen, Video, Calculator, Users, CheckCircle2, Brain, FileEdit, LayoutTemplate, Settings, LineChart } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15, // delay between cards
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Features() {
  return (
    <section className="py-20 px-4" id="features">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
            Designed for Both Students and Teachers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            QwizR offers specialized features for young learners and powerful tools for educators.
          </p>
        </div>

        <Tabs defaultValue="students" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2 py-2 bg-white">
              <TabsTrigger value="students" className="text-lg py-3 text-blue-500">
                For Students
              </TabsTrigger>
              <TabsTrigger value="teachers" className="text-lg py-3 text-blue-500">
                For Teachers
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Students Tab */}
          <TabsContent value="students">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }} // animate when 30% visible, only once
            >
              {/* Card 1 */}
              <motion.div variants={cardVariants}>
                <Card>
                  <CardContent className="pt-6">
                    <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                      <PenTool className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Interactive Drawing Board</h3>
                    <p className="text-gray-600">
                      Practice alphabet writing and drawing with our digital canvas designed for young learners.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Card 2 */}
              <motion.div variants={cardVariants}>
                <Card>
                  <CardContent className="pt-6">
                    <div className="bg-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                      <BookOpen className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Picture-Based Matching</h3>
                    <p className="text-gray-600">
                      Visual-enhanced assessments that make learning engaging and fun for primary students.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Card 3 */}
              <motion.div variants={cardVariants}>
                <Card>
                  <CardContent className="pt-6">
                    <div className="bg-purple-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                      <Video className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Video-Assisted Questions</h3>
                    <p className="text-gray-600">
                      Multimedia content that aids comprehension and keeps young learners engaged.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Card 4 */}
              <motion.div variants={cardVariants}>
                <Card>
                  <CardContent className="pt-6">
                    <div className="bg-yellow-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                      <Calculator className="w-8 h-8 text-yellow-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Digital Whiteboard</h3>
                    <p className="text-gray-600">
                      Solve mathematical problems step-by-step with our intuitive digital whiteboard.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Card 5 */}
              <motion.div variants={cardVariants}>
                <Card>
                  <CardContent className="pt-6">
                    <div className="bg-red-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                      <Users className="w-8 h-8 text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Intuitive Interface</h3>
                    <p className="text-gray-600">
                      Child-friendly design that&apos;s simple to navigate for even the youngest students.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Card 6 */}
              <motion.div variants={cardVariants}>
                <Card>
                  <CardContent className="pt-6">
                    <div className="bg-orange-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-8 h-8 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Encouraging Feedback</h3>
                    <p className="text-gray-600">
                      Immediate and positive feedback system that motivates children to keep learning.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* Teachers Tab */}
          <TabsContent value="teachers">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {/* Card 1 */}
              <motion.div variants={cardVariants}>
                <Card>
                  <CardContent className="pt-6">
                    <div className="bg-indigo-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                      <Brain className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">AI-Powered Question Suggestions</h3>
                    <p className="text-gray-600">
                      Generate age-appropriate questions with our AI system to save time and enhance creativity.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Card 2 */}
              <motion.div variants={cardVariants}>
                <Card>
                  <CardContent className="pt-6">
                    <div className="bg-teal-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                      <FileEdit className="w-8 h-8 text-teal-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Easy Test Creation</h3>
                    <p className="text-gray-600">
                      Intuitive interface that makes designing assessments quick and simple for busy educators.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Card 3 */}
              <motion.div variants={cardVariants}>
                <Card>
                  <CardContent className="pt-6">
                    <div className="bg-pink-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                      <LayoutTemplate className="w-8 h-8 text-pink-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Multiple Question Formats</h3>
                    <p className="text-gray-600">
                      Choose from diverse assessment templates to match different learning objectives.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Card 4 */}
              <motion.div variants={cardVariants}>
                <Card>
                  <CardContent className="pt-6">
                    <div className="bg-cyan-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                      <Settings className="w-8 h-8 text-cyan-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Assessment Customization</h3>
                    <p className="text-gray-600">
                      Tailor tests to specific needs, learning styles, and curriculum requirements.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Card 5 */}
              <motion.div variants={cardVariants}>
                <Card>
                  <CardContent className="pt-6">
                    <div className="bg-amber-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                      <LineChart className="w-8 h-8 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Real-Time Monitoring</h3>
                    <p className="text-gray-600">
                      Track student progress efficiently with comprehensive analytics and reporting.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Card 6 */}
              <motion.div variants={cardVariants}>
                <Card>
                  <CardContent className="pt-6">
                    <div className="bg-lime-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                      <Users className="w-8 h-8 text-lime-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Collaborative Tools</h3>
                    <p className="text-gray-600">
                      Share assessments and results with parents and colleagues to improve learning outcomes.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
