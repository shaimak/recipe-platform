'use client'

import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"

export default function Navigation() {
  const { user, profile, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <Link href="/" className="text-xl font-bold text-gray-900 hover:text-gray-700">
              RecipeShare
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/dashboard" className="text-gray-700 hover:text-black transition-colors">
              Dashboard
            </Link>
            <Link href="/profile" className="text-gray-700 hover:text-black transition-colors">
              Profile
            </Link>
            
            {user ? (
              <>
                <Link href="/create" className="text-gray-700 hover:text-black transition-colors">
                  Create Recipe
                </Link>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">
                    Welcome, {profile?.username || profile?.full_name || user.email}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="text-gray-700 hover:text-black transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-black transition-colors">
                  Sign In
                </Link>
                <Link 
                  href="/signup" 
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all duration-200"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
