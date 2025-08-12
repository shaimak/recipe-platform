'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function SupabaseTest() {
  const [status, setStatus] = useState<'loading' | 'connected' | 'error'>('loading')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function testConnection() {
      try {
        // Test basic connection by fetching profiles
        const { data, error } = await supabase
          .from('profiles')
          .select('count')
          .limit(1)
        
        if (error) {
          throw error
        }
        
        setStatus('connected')
      } catch (err) {
        setStatus('error')
        setError(err instanceof Error ? err.message : 'Unknown error')
      }
    }

    testConnection()
  }, [])

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Supabase Connection Test</h3>
      
      {status === 'loading' && (
        <div className="text-gray-600">Testing connection...</div>
      )}
      
      {status === 'connected' && (
        <div className="text-green-600 font-medium">
          ✅ Supabase connection successful!
        </div>
      )}
      
      {status === 'error' && (
        <div className="text-red-600">
          ❌ Connection failed: {error}
        </div>
      )}
    </div>
  )
}
