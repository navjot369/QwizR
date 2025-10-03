export default function Stats() {
  return (
    <section className="py-16 bg-blue-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">1000+</p>
            <p className="text-gray-600 dark:text-gray-300">Schools</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">50,000+</p>
            <p className="text-gray-600 dark:text-gray-300">Students</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">10,000+</p>
            <p className="text-gray-600 dark:text-gray-300">Teachers</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">1M+</p>
            <p className="text-gray-600 dark:text-gray-300">Assessments</p>
          </div>
        </div>
      </div>
    </section>
  );
}
