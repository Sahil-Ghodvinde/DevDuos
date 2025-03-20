export default function Footer() {
  return (
    <footer className="w-full py-8 bg-gray-100 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-gray-600">© {new Date().getFullYear()} DevDuos</p>
            <p className="text-sm text-gray-500 mt-1">All rights reserved.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <a 
              href="#" 
              className="text-sm text-gray-600 hover:text-[#1e1894] transition-colors duration-200"
            >
              Terms
            </a>
            <a 
              href="#" 
              className="text-sm text-gray-600 hover:text-[#1e1894] transition-colors duration-200"
            >
              Privacy
            </a>
            <a 
              href="#" 
              className="text-sm text-gray-600 hover:text-[#1e1894] transition-colors duration-200"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

