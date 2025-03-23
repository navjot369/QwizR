import { ChevronDown } from "lucide-react";
import { useState } from "react";

const questions = [
  {
    question: "Is QwizR suitable for all primary grade levels?",
    answer:
      "Yes, QwizR is designed for students in grades K-6. The platform offers age-appropriate features and content for each grade level, with simpler interfaces for younger children and more advanced tools for older students.",
  },
  {
    question: "How does the AI question suggestion system work?",
    answer:
      "Our AI system analyzes curriculum standards, grade-level expectations, and best practices in education to generate age-appropriate questions. Teachers can specify subjects, topics, and difficulty levels, and the AI will suggest relevant questions that can be customized further.",
  },
  {
    question: "Can I import existing assessments into QwizR?",
    answer:
      "Yes, QwizR supports importing assessments from various formats including Word, PDF, and Google Docs. Our system will convert your existing materials into interactive digital assessments that take advantage of QwizR's features.",
  },
  {
    question: "How does QwizR ensure data privacy and security?",
    answer:
      "QwizR takes data privacy seriously, especially for young learners. We are COPPA and FERPA compliant, use encryption for all data, and never share student information with third parties. All student data is stored securely and accessible only to authorized teachers and administrators.",
  },
  {
    question: "Is training available for teachers new to QwizR?",
    answer:
      "We offer comprehensive training resources including video tutorials, live webinars, and a detailed knowledge base. Our Professional and School plans also include personalized onboarding sessions to help teachers get the most out of QwizR.",
  },
  {
    question: "Can parents access their child's assessment results?",
    answer:
      "Yes, teachers can share assessment results with parents through secure parent portals or downloadable reports. This helps keep parents informed about their child's progress and areas where they might need additional support.",
  },
];

export default function FAQ() {
    const [openFaq, setOpenFaq] = useState(null)
    
      const toggleFaq = (index) => {
        if (openFaq === index) {
          setOpenFaq(null)
        } else {
          setOpenFaq(index)
        }
      }
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Find answers to common questions about QwizR.
          </p>
        </div>

        <div className="space-y-4">
          {questions.map((faq, index) => (
            <div key={index} className="border rounded-lg overflow-hidden">
              <button
                className="flex justify-between items-center w-full p-4 text-left font-medium focus:outline-none"
                onClick={() => toggleFaq(index)}
              >
                {faq.question}
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    openFaq === index ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              {openFaq === index && (
                <div className="p-4 bg-gray-50 border-t">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
