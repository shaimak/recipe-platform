'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Navigation from '@/components/Navigation';
import Link from 'next/link';

interface Recipe {
  id: string;
  title: string;
  ingredients: string;
  instructions: string;
  cooking_time: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  created_at: string;
  user_id: string;
  profiles: {
    username: string;
    full_name: string;
  };
}

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    fetchRecipes();
  }, [user, router]);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('recipes')
        .select(`
          *,
          profiles (
            username,
            full_name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setRecipes(data || []);
    } catch (err) {
      console.error('Error fetching recipes:', err);
      setError('Failed to load recipes');
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-600 bg-green-100';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'Hard':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="mt-2 text-gray-600">Discover recipes shared by our community</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Link
                href="/create"
                className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Share Your Recipe
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading recipes...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
            <button
              onClick={fetchRecipes}
              className="mt-4 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : recipes.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍳</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No recipes yet</h3>
            <p className="text-gray-600 mb-6">Be the first to share a recipe with the community!</p>
            <Link
              href="/create"
              className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Share Your First Recipe
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Recent Recipes ({recipes.length})
              </h2>
              <p className="text-gray-600">Latest recipes from our community</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200"
                >
                  <div className="h-48 bg-gray-100 flex items-center justify-center">
                    <div className="text-6xl text-gray-400">🍽️</div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                      {recipe.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm text-gray-500">by</span>
                      <Link
                        href={`/profiles/${recipe.profiles?.username}`}
                        className="text-sm font-medium text-gray-900 hover:text-black transition-colors"
                      >
                        {recipe.profiles?.full_name || recipe.profiles?.username || 'Anonymous'}
                      </Link>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>⏱️ {recipe.cooking_time} min</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                          recipe.difficulty
                        )}`}
                      >
                        {recipe.difficulty}
                      </span>
                    </div>
                    
                    {recipe.category && (
                      <div className="mb-4">
                        <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                          {recipe.category}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {new Date(recipe.created_at).toLocaleDateString()}
                      </span>
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
          </>
        )}
      </div>
    </div>
  );
}
