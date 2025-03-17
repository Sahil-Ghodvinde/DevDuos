export default function Footer() {
  return (
    <footer className="w-full py-8 bg-gray-100 border-t border-gray-200">
      <div className="container mx-auto px-4 text-center text-gray-600">
        <p>© {new Date().getFullYear()} DevDuos. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" className="hover:text-[#1e1894]">
            Terms
          </a>
          <a href="#" className="hover:text-[#1e1894]">
            Privacy
          </a>
          <a href="#" className="hover:text-[#1e1894]">
            Contact
          </a>
        </div>
      </div>
    </footer>
  )
}

