'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Navigation from '@/components/Navigation';
import Link from 'next/link';

interface ProfileFormData {
  username: string;
  full_name: string;
}

export default function Profile() {
  const { user, profile, updateProfile } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState<ProfileFormData>({
    username: '',
    full_name: ''
  });

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    // Initialize form with existing profile data
    if (profile) {
      setFormData({
        username: profile.username || '',
        full_name: profile.full_name || ''
      });
    }
  }, [user, profile, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError('You must be logged in to update your profile');
      return;
    }

    // Basic validation
    if (!formData.username.trim()) {
      setError('Username is required');
      return;
    }
    if (!formData.full_name.trim()) {
      setError('Full name is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error } = await updateProfile({
        username: formData.username.trim(),
        full_name: formData.full_name.trim()
      });

      if (error) {
        throw error;
      }

      setSuccess(true);
      setIsEditing(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);

    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form to original profile data
    if (profile) {
      setFormData({
        username: profile.username || '',
        full_name: profile.full_name || ''
      });
    }
    setIsEditing(false);
    setError(null);
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
              <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
              <p className="mt-2 text-gray-600">Manage your profile information</p>
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

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-600">Profile updated successfully!</p>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-8">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-600">{error}</p>
                </div>
              )}

              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username *
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Enter your username"
                  required
                />
                <p className="mt-1 text-sm text-gray-500">
                  This will be your unique identifier on the platform
                </p>
              </div>

              {/* Full Name */}
              <div>
                <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
                <p className="mt-1 text-sm text-gray-500">
                  This will be displayed with your recipes
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Updating...' : 'Save Changes'}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              {/* Profile Info */}
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-2xl text-gray-600">
                    {profile?.full_name?.charAt(0) || profile?.username?.charAt(0) || 'U'}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {profile?.full_name || 'Your Name'}
                  </h2>
                  <p className="text-gray-600">@{profile?.username || 'username'}</p>
                </div>
              </div>

              {/* Profile Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <p className="text-gray-900">{profile?.username || 'Not set'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <p className="text-gray-900">{profile?.full_name || 'Not set'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Member Since
                  </label>
                  <p className="text-gray-900">
                    {profile?.created_at 
                      ? new Date(profile.created_at).toLocaleDateString()
                      : 'Recently'
                    }
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Updated
                  </label>
                  <p className="text-gray-900">
                    {profile?.updated_at 
                      ? new Date(profile.updated_at).toLocaleDateString()
                      : 'Never'
                    }
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  Back to Dashboard
                </Link>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
