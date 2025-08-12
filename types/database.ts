export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      recipes: {
        Row: {
          id: string
          created_at: string
          user_id: string
          title: string
          ingredients: string
          instructions: string
          cooking_time: number | null
          difficulty: 'Easy' | 'Medium' | 'Hard'
          category: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          title: string
          ingredients: string
          instructions: string
          cooking_time?: number | null
          difficulty?: 'Easy' | 'Medium' | 'Hard'
          category?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          title?: string
          ingredients?: string
          instructions?: string
          cooking_time?: number | null
          difficulty?: 'Easy' | 'Medium' | 'Hard'
          category?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "recipes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      difficulty_level: 'Easy' | 'Medium' | 'Hard'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Convenience types for common operations
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Recipe = Database['public']['Tables']['recipes']['Row']

// Insert types
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
export type RecipeInsert = Database['public']['Tables']['recipes']['Insert']

// Update types
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update']
export type RecipeUpdate = Database['public']['Tables']['recipes']['Update']

// Extended types for UI
export interface RecipeWithAuthor extends Recipe {
  author: Profile
}

export interface RecipeCard {
  id: string
  title: string
  ingredients: string
  cooking_time: number | null
  difficulty: 'Easy' | 'Medium' | 'Hard'
  category: string | null
  created_at: string
  author: {
    id: string
    username: string | null
    full_name: string | null
  }
}
