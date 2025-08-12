import Image from "next/image";
import Link from "next/link";
import SupabaseTest from "@/components/SupabaseTest";

// Mock data for featured recipes
const featuredRecipes = [
  {
    id: 1,
    title: "Classic Margherita Pizza",
    description: "A traditional Italian pizza with fresh mozzarella, basil, and tomato sauce",
    image: "/pizza.jpg",
    cookTime: "30 min",
    difficulty: "Medium",
    author: "Chef Maria"
  },
  {
    id: 2,
    title: "Chocolate Chip Cookies",
    description: "Soft and chewy cookies with the perfect amount of chocolate chips",
    image: "/cookies.jpg",
    cookTime: "25 min",
    difficulty: "Easy",
    author: "Baker John"
  },
  {
    id: 3,
    title: "Grilled Salmon with Herbs",
    description: "Fresh salmon grilled to perfection with aromatic herbs and lemon",
    image: "/salmon.jpg",
    cookTime: "20 min",
    difficulty: "Easy",
    author: "Chef Sarah"
  },
  {
    id: 4,
    title: "Vegetarian Pasta Primavera",
    description: "Colorful spring vegetables tossed with al dente pasta and light cream sauce",
    image: "/pasta.jpg",
    cookTime: "35 min",
    difficulty: "Medium",
    author: "Chef Alex"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="text-xl font-bold text-gray-900">RecipeShare</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/recipes" className="text-gray-700 hover:text-black transition-colors">
                Browse Recipes
              </Link>
              <Link href="/create" className="text-gray-700 hover:text-black transition-colors">
                Create Recipe
              </Link>
              <Link href="/login" className="text-gray-700 hover:text-black transition-colors">
                Sign In
              </Link>
              <Link 
                href="/signup" 
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all duration-200"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Share Your
              <span className="text-black"> Recipes</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover amazing recipes from home cooks around the world. Share your culinary creations and inspire others to cook delicious meals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/recipes" 
                className="bg-black text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Explore Recipes
              </Link>
              <Link 
                href="/create" 
                className="border-2 border-black text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-black hover:text-white transition-all duration-200"
              >
                Share Your Recipe
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gray-200 rounded-full opacity-30"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gray-300 rounded-full opacity-30"></div>
      </section>

      {/* Featured Recipes Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Recipes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover some of our most popular recipes from talented home cooks
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredRecipes.map((recipe) => (
              <div key={recipe.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200">
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  <div className="text-6xl text-gray-400">🍕</div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{recipe.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{recipe.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>⏱️ {recipe.cookTime}</span>
                    <span>📊 {recipe.difficulty}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">by {recipe.author}</span>
                    <Link 
                      href={`/recipes/${recipe.id}`}
                      className="text-black hover:text-gray-700 font-medium text-sm"
                    >
                      View Recipe →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/recipes" 
              className="inline-flex items-center text-black hover:text-gray-700 font-semibold"
            >
              View All Recipes
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Supabase Test Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Database Connection Test</h2>
            <p className="text-gray-600">Testing Supabase connection...</p>
          </div>
          <div className="max-w-md mx-auto">
            <SupabaseTest />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">1,000+</div>
              <div className="text-gray-300">Recipes Shared</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-gray-300">Home Cooks</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">10,000+</div>
              <div className="text-gray-300">Meals Cooked</div>
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
                <li><Link href="/recipes" className="hover:text-white transition-colors">Browse Recipes</Link></li>
                <li><Link href="/create" className="hover:text-white transition-colors">Create Recipe</Link></li>
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
