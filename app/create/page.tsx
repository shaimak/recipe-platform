'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Navigation from '@/components/Navigation';
import Link from 'next/link';

interface RecipeFormData {
  title: string;
  ingredients: string;
  instructions: string;
  cooking_time: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
}

export default function CreateRecipe() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState<RecipeFormData>({
    title: '',
    ingredients: '',
    instructions: '',
    cooking_time: 30,
    difficulty: 'Medium',
    category: ''
  });

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
  }, [user, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'cooking_time' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError('You must be logged in to create a recipe');
      return;
    }

    // Basic validation
    if (!formData.title.trim()) {
      setError('Recipe title is required');
      return;
    }
    if (!formData.ingredients.trim()) {
      setError('Ingredients are required');
      return;
    }
    if (!formData.instructions.trim()) {
      setError('Instructions are required');
      return;
    }
    if (formData.cooking_time <= 0) {
      setError('Cooking time must be greater than 0');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('recipes')
        .insert([
          {
            title: formData.title.trim(),
            ingredients: formData.ingredients.trim(),
            instructions: formData.instructions.trim(),
            cooking_time: formData.cooking_time,
            difficulty: formData.difficulty,
            category: formData.category.trim() || null,
            user_id: user.id
          }
        ])
        .select()
        .single();

      if (error) {
        throw error;
      }

      setSuccess(true);
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);

    } catch (err) {
      console.error('Error creating recipe:', err);
      setError('Failed to create recipe. Please try again.');
    } finally {
      setLoading(false);
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Share Your Recipe</h1>
              <p className="mt-2 text-gray-600">Create and share your favorite recipe with the community</p>
            </div>
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-black transition-colors"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {success ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Recipe Created Successfully!</h2>
            <p className="text-gray-600 mb-6">Your recipe has been shared with the community.</p>
            <div className="animate-pulse text-sm text-gray-500">
              Redirecting to dashboard...
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-600">{error}</p>
                </div>
              )}

              {/* Recipe Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Recipe Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="e.g., Classic Margherita Pizza"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="e.g., Italian, Dessert, Vegetarian"
                />
              </div>

              {/* Cooking Time and Difficulty */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="cooking_time" className="block text-sm font-medium text-gray-700 mb-2">
                    Cooking Time (minutes) *
                  </label>
                  <input
                    type="number"
                    id="cooking_time"
                    name="cooking_time"
                    value={formData.cooking_time}
                    onChange={handleChange}
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty Level *
                  </label>
                  <select
                    id="difficulty"
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              {/* Ingredients */}
              <div>
                <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-2">
                  Ingredients *
                </label>
                <textarea
                  id="ingredients"
                  name="ingredients"
                  value={formData.ingredients}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="List all ingredients with quantities...&#10;&#10;Example:&#10;- 2 cups all-purpose flour&#10;- 1 cup warm water&#10;- 1 tsp salt&#10;- 2 tbsp olive oil"
                  required
                />
              </div>

              {/* Instructions */}
              <div>
                <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-2">
                  Instructions *
                </label>
                <textarea
                  id="instructions"
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleChange}
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Provide step-by-step cooking instructions...&#10;&#10;Example:&#10;1. Preheat oven to 450°F (230°C)&#10;2. Mix flour and salt in a large bowl&#10;3. Add warm water gradually while stirring&#10;4. Knead dough for 10 minutes until smooth"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creating Recipe...' : 'Share Recipe'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
