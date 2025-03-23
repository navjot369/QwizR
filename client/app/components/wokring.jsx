

export default function Working() {
    return(<section className="py-20 bg-blue-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">How QwizR Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform makes assessment creation, delivery, and evaluation simple and effective.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="bg-white p-8 rounded-xl shadow-md relative">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold absolute -top-6 left-1/2 transform -translate-x-1/2">
                1
              </div>
              <h3 className="text-xl font-bold mt-6 mb-4 text-center">Create</h3>
              <p className="text-gray-600 text-center">
                Teachers design engaging assessments using our intuitive interface and AI-powered suggestions.
              </p>
              {/* <img
                src="/placeholder.svg?height=200&width=300"
                alt="Create assessments"
                className="rounded-lg mt-6 mx-auto"
              /> */}
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md relative">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold absolute -top-6 left-1/2 transform -translate-x-1/2">
                2
              </div>
              <h3 className="text-xl font-bold mt-6 mb-4 text-center">Engage</h3>
              <p className="text-gray-600 text-center">
                Students complete interactive assessments with drawing, matching, and multimedia elements.
              </p>
              {/* <img
                src="/placeholder.svg?height=200&width=300"
                alt="Student engagement"
                className="rounded-lg mt-6 mx-auto"
              /> */}
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md relative">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold absolute -top-6 left-1/2 transform -translate-x-1/2">
                3
              </div>
              <h3 className="text-xl font-bold mt-6 mb-4 text-center">Evaluate</h3>
              <p className="text-gray-600 text-center">
                Teachers receive detailed insights and analytics to track progress and identify areas for improvement.
              </p>
              {/* <img
                src="/placeholder.svg?height=200&width=300"
                alt="Evaluation and analytics"
                className="rounded-lg mt-6 mx-auto"
              /> */}
            </div>
          </div>
        </div>
      </section>);
}