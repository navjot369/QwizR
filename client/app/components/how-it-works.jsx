import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function HowItWorks() {
  return (
    <section className="py-20 bg-blue-50 dark:bg-gray-800 px-4" id="how-it-works">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">How QwizR Works</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our platform makes assessment creation, delivery, and evaluation simple and effective.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Step 1 */}
          <motion.div variants={stepVariants} className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md relative">
            <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold absolute -top-6 left-1/2 transform -translate-x-1/2">
              1
            </div>
            <h3 className="text-xl font-bold mt-6 mb-4 text-center text-gray-800 dark:text-gray-100">Create</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Teachers design engaging assessments using our intuitive interface and AI-powered suggestions.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div variants={stepVariants} className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md relative">
            <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold absolute -top-6 left-1/2 transform -translate-x-1/2">
              2
            </div>
            <h3 className="text-xl font-bold mt-6 mb-4 text-center text-gray-800 dark:text-gray-100">Engage</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Students complete interactive assessments with drawing, matching, and multimedia elements.
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div variants={stepVariants} className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md relative">
            <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold absolute -top-6 left-1/2 transform -translate-x-1/2">
              3
            </div>
            <h3 className="text-xl font-bold mt-6 mb-4 text-center text-gray-800 dark:text-gray-100">Evaluate</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Teachers receive detailed insights and analytics to track progress and identify areas for improvement.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
