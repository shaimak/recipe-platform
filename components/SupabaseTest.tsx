'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function SupabaseTest() {
  const [status, setStatus] = useState<'loading' | 'connected' | 'error'>('loading')
  const [error, setError] = useState<string | null>(null)
  const [testResults, setTestResults] = useState<{
    connection: boolean
    profiles: boolean
    recipes: boolean
    auth: boolean
  }>({
    connection: false,
    profiles: false,
    recipes: false,
    auth: false
  })
  const [isCreatingTest, setIsCreatingTest] = useState(false)
  const [testMessage, setTestMessage] = useState<string | null>(null)

  useEffect(() => {
    async function runTests() {
      const results = {
        connection: false,
        profiles: false,
        recipes: false,
        auth: false
      }

      try {
        // Test 1: Basic connection and profiles table
        console.log('Testing Supabase connection...')
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('count')
          .limit(1)
        
        if (profilesError) {
          throw new Error(`Profiles table error: ${profilesError.message}`)
        }
        
        results.connection = true
        results.profiles = true
        console.log('✅ Profiles table accessible')

        // Test 2: Recipes table
        const { data: recipesData, error: recipesError } = await supabase
          .from('recipes')
          .select('count')
          .limit(1)
        
        if (recipesError) {
          console.warn('⚠️ Recipes table error:', recipesError.message)
        } else {
          results.recipes = true
          console.log('✅ Recipes table accessible')
        }

        // Test 3: Authentication
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        
        if (authError) {
          console.warn('⚠️ Auth error:', authError.message)
        } else {
          results.auth = true
          console.log('✅ Authentication working')
        }

        setTestResults(results)
        setStatus('connected')
        
      } catch (err) {
        setStatus('error')
        setError(err instanceof Error ? err.message : 'Unknown error')
        console.error('❌ Supabase test failed:', err)
      }
    }

    runTests()
  }, [])

  const createTestRecipe = async () => {
    setIsCreatingTest(true)
    setTestMessage(null)
    
    try {
      // First, let's check if we have any profiles to work with
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id')
        .limit(1)
      
      if (profilesError) {
        throw new Error(`Failed to fetch profiles: ${profilesError.message}`)
      }
      
      if (!profiles || profiles.length === 0) {
        setTestMessage('⚠️ No profiles found. Please create a user account first.')
        return
      }
      
      // Create a test recipe
      const { data, error } = await supabase
        .from('recipes')
        .insert({
          user_id: profiles[0].id,
          title: 'Test Recipe - Connection Working!',
          ingredients: 'Test ingredient 1, Test ingredient 2',
          instructions: '1. Test step one\n2. Test step two\n3. Test step three',
          cooking_time: 30,
          difficulty: 'Easy',
          category: 'Test'
        })
        .select()
      
      if (error) {
        throw new Error(`Failed to create test recipe: ${error.message}`)
      }
      
      setTestMessage('✅ Test recipe created successfully! Database is fully functional.')
      
      // Clean up - delete the test recipe after 5 seconds
      setTimeout(async () => {
        if (data && data[0]) {
          await supabase
            .from('recipes')
            .delete()
            .eq('id', data[0].id)
        }
      }, 5000)
      
    } catch (err) {
      setTestMessage(`❌ Test failed: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setIsCreatingTest(false)
    }
  }

  return (
    <div className="p-6 border rounded-lg bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Supabase Connection Test</h3>
      
      {status === 'loading' && (
        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-3"></div>
            Testing Supabase connection...
          </div>
        </div>
      )}
      
      {status === 'connected' && (
        <div className="space-y-4">
          <div className="text-green-600 font-medium">
            ✅ Supabase connection successful!
          </div>
          
          <div className="space-y-2 text-sm">
            <div className={`flex items-center ${testResults.connection ? 'text-green-600' : 'text-red-600'}`}>
              {testResults.connection ? '✅' : '❌'} Basic Connection
            </div>
            
            <div className={`flex items-center ${testResults.profiles ? 'text-green-600' : 'text-red-600'}`}>
              {testResults.profiles ? '✅' : '❌'} Profiles Table Access
            </div>
            
            <div className={`flex items-center ${testResults.recipes ? 'text-green-600' : 'text-red-600'}`}>
              {testResults.recipes ? '✅' : '❌'} Recipes Table Access
            </div>
            
            <div className={`flex items-center ${testResults.auth ? 'text-green-600' : 'text-red-600'}`}>
              {testResults.auth ? '✅' : '❌'} Authentication Service
            </div>
          </div>
          
          {testResults.recipes && (
            <div className="pt-4 border-t">
              <button
                onClick={createTestRecipe}
                disabled={isCreatingTest}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {isCreatingTest ? 'Creating Test Recipe...' : 'Test Database Write'}
              </button>
              {testMessage && (
                <div className={`mt-2 p-2 rounded text-sm ${
                  testMessage.includes('✅') ? 'bg-green-50 text-green-800' : 
                  testMessage.includes('⚠️') ? 'bg-yellow-50 text-yellow-800' : 
                  'bg-red-50 text-red-800'
                }`}>
                  {testMessage}
                </div>
              )}
            </div>
          )}
          
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
            <p className="text-green-800 text-sm">
              Your Supabase setup is working correctly! You can now start building authentication and recipe features.
            </p>
          </div>
        </div>
      )}
      
      {status === 'error' && (
        <div className="space-y-3">
          <div className="text-red-600 font-medium">
            ❌ Connection failed
          </div>
          <div className="text-red-500 text-sm bg-red-50 p-3 border border-red-200 rounded">
            {error}
          </div>
          <div className="text-sm text-gray-600">
            <p>Please check:</p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Your Supabase URL and API key in .env.local</li>
              <li>Your database schema has been created</li>
              <li>Your Supabase project is active</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
