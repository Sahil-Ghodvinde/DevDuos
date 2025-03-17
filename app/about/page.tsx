"use client"

import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <section className="w-full py-16 bg-[#1e1894] text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">About us</h1>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-6">
              DevDuos was founded by two engineering students who struggled to find teammates and access all hackathons
              in one place. While building this platform, we discovered another major challenge—hackathon participants
              often have numerous doubts and questions, yet there's no dedicated space for discussions. To address this,
              we developed DevDuos Spaces, a community-driven forum where innovators can connect, collaborate, and seek
              guidance.
            </p>
            <p className="text-lg mb-8">
              What started as a simple idea to unite all hackathons under one roof has now evolved into a thriving
              ecosystem for innovators, fostering collaboration, learning, and growth.
            </p>

            <div className="flex justify-center">
              <Link href="/contact">
                <button className="px-8 py-3 bg-white text-[#1e1894] rounded-full font-medium hover:bg-gray-100 transition-colors">
                  Contact us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Mission</h2>
          <p className="text-lg text-gray-700 mb-12">
            Our mission is to democratize access to hackathons and make team formation seamless. We believe that
            everyone should have the opportunity to participate in hackathons, regardless of their background or
            experience level. By providing a centralized platform for hackathon discovery and team formation, we aim to
            lower the barriers to entry and foster a more inclusive tech community.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-[#1e1894]">Discover</h3>
              <p className="text-gray-700">
                Find all hackathons in one place, with comprehensive information and easy filtering.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-[#1e1894]">Connect</h3>
              <p className="text-gray-700">
                Meet like-minded individuals and form teams based on complementary skills and interests.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-[#1e1894]">Create</h3>
              <p className="text-gray-700">
                Build innovative solutions to real-world problems with your newly formed team.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">The Team</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-32 h-32 bg-[#c4c1f8] rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-[#1e1894] font-bold">Founder 1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Jane Doe</h3>
              <p className="text-gray-600 mb-4">Co-Founder & CEO</p>
              <p className="text-gray-700">
                Computer Science graduate with a passion for hackathons and community building.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-32 h-32 bg-[#c4c1f8] rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-[#1e1894] font-bold">Founder 2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">John Smith</h3>
              <p className="text-gray-600 mb-4">Co-Founder & CTO</p>
              <p className="text-gray-700">
                Full-stack developer who loves creating tools that solve real problems for developers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

