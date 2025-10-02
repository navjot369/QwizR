'use client';

export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-gray-100">QwizR</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Making learning fun and assessment easy for young learners.</p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook">
                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
              </a>
              <a href="#" aria-label="Twitter">
                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
              </a>
              <a href="#" aria-label="Instagram">
                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-gray-100">Product</h3>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">
                  Features
                </a>
              </li>
              <li>
                <a href="#team" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">
                  Team
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#faq" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-gray-100">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">
                  Tutorials
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">
                  Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-gray-100">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 dark:text-gray-300">help.qwizr@gmail.com</li>
              <li className="text-gray-600 dark:text-gray-300">+91 99988 87776</li>
              <li className="text-gray-600 dark:text-gray-300">
                Educational Lane
                <br />
                Rajpura, Punjab 13423
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-300 text-sm">&copy; 2025 QwizR. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 text-sm">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
