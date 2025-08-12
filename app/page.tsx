'use client';

import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Share Your
              <span className="text-black"> Recipes</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join our community of home cooks and food enthusiasts. Share your favorite recipes, discover new ones, and connect with fellow food lovers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!user ? (
                <>
                  <Link 
                    href="/signup" 
                    className="bg-black text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Get Started
                  </Link>
                  <Link 
                    href="/login" 
                    className="border-2 border-black text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-black hover:text-white transition-all duration-200"
                  >
                    Sign In
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    href="/dashboard" 
                    className="bg-black text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Go to Dashboard
                  </Link>
                  <Link 
                    href="/create" 
                    className="border-2 border-black text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-black hover:text-white transition-all duration-200"
                  >
                    Share Your Recipe
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gray-200 rounded-full opacity-30"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gray-300 rounded-full opacity-30"></div>
      </section>



      {/* Stats Section */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">Join Today</div>
              <div className="text-gray-300">Start Sharing Recipes</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">Free Forever</div>
              <div className="text-gray-300">No Hidden Costs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">Easy to Use</div>
              <div className="text-gray-300">Simple Recipe Creation</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold text-sm">R</span>
                </div>
                <span className="text-xl font-bold">RecipeShare</span>
              </div>
              <p className="text-gray-400">
                Share your culinary creations and discover amazing recipes from home cooks around the world.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/signup" className="hover:text-white transition-colors">Get Started</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Sign In</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Account</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/login" className="hover:text-white transition-colors">Sign In</Link></li>
                <li><Link href="/signup" className="hover:text-white transition-colors">Sign Up</Link></li>
                <li><Link href="/profile" className="hover:text-white transition-colors">My Profile</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 RecipeShare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
