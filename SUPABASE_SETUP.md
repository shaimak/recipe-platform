# Supabase Setup Guide for RecipeShare (Simplified)

This guide will help you set up Supabase for your RecipeShare application with a simplified schema.

## 1. Supabase Project Setup

### Create a New Project
1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `recipe-share` (or your preferred name)
   - **Database Password**: Create a strong password
   - **Region**: Choose the closest region to your users
5. Click "Create new project"

### Enable Authentication
1. In your Supabase dashboard, go to **Authentication** → **Settings**
2. Under **Auth Providers**, ensure **Email** is enabled
3. Configure email templates if desired (optional)

## 2. Database Schema Setup

### Run the SQL Schema
1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the entire contents of `supabase-schema.sql`
3. Paste it into the SQL editor
4. Click **Run** to execute the schema

This will create:
- ✅ **profiles** table (user profiles)
- ✅ **recipes** table (recipe data)
- ✅ Row Level Security (RLS) policies
- ✅ Database triggers and functions
- ✅ Proper indexes for performance

## 3. Environment Variables

### Create Environment File
Create a `.env.local` file in your project root:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Optional: For server-side operations
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### Get Your Supabase Credentials
1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the **Project URL** and **anon public** key
3. Paste them into your `.env.local` file

## 4. Install Dependencies

Install the Supabase client library:

```bash
npm install @supabase/supabase-js
```

## 5. Verify Setup

### Test Database Connection
You can test the connection by running:

```bash
npm run dev
```

The application should now be able to connect to Supabase.

## 6. Database Schema Overview

### Tables

| Table | Purpose | Fields |
|-------|---------|--------|
| `profiles` | User profiles | id, username, full_name, created_at, updated_at |
| `recipes` | Recipe data | id, created_at, user_id, title, ingredients, instructions, cooking_time, difficulty, category, updated_at |

### Security Features

- ✅ **Row Level Security (RLS)** enabled on all tables
- ✅ **User ownership** - users can only modify their own content
- ✅ **Public read access** - anyone can view all recipes
- ✅ **Automatic profile creation** when users sign up

### Data Structure

**Profiles Table:**
- `id` - UUID (references auth.users)
- `username` - TEXT, unique
- `full_name` - TEXT
- `created_at` - TIMESTAMP
- `updated_at` - TIMESTAMP

**Recipes Table:**
- `id` - UUID, primary key
- `created_at` - TIMESTAMP
- `user_id` - UUID (references profiles.id)
- `title` - TEXT, required
- `ingredients` - TEXT, required
- `instructions` - TEXT, required
- `cooking_time` - INTEGER (minutes)
- `difficulty` - ENUM ('Easy', 'Medium', 'Hard')
- `category` - TEXT
- `updated_at` - TIMESTAMP

## 7. Next Steps

After completing this setup:

1. **Test Authentication**: Create a sign-up/sign-in page
2. **Create Recipe Form**: Build the recipe creation interface
3. **Recipe Listing**: Display recipes from the database
4. **Recipe Details**: Show individual recipe pages

## 8. Example Usage

### Creating a Recipe
```typescript
const { data, error } = await supabase
  .from('recipes')
  .insert({
    user_id: user.id,
    title: 'Chocolate Chip Cookies',
    ingredients: '2 cups flour, 1 cup sugar, 2 eggs...',
    instructions: '1. Preheat oven to 350°F\n2. Mix ingredients...',
    cooking_time: 25,
    difficulty: 'Easy',
    category: 'Dessert'
  })
```

### Fetching Recipes
```typescript
const { data: recipes, error } = await supabase
  .from('recipes')
  .select(`
    *,
    author:profiles(username, full_name)
  `)
  .order('created_at', { ascending: false })
```

## 9. Troubleshooting

### Common Issues

**"Invalid API key" error**
- Verify your environment variables are correct
- Ensure you're using the anon key, not the service role key

**"Table doesn't exist" error**
- Make sure you ran the complete SQL schema
- Check that all tables were created successfully

**RLS Policy errors**
- Verify that RLS is enabled on all tables
- Check that policies are correctly configured

### Getting Help

- Check the [Supabase Documentation](https://supabase.com/docs)
- Review the [Supabase Discord](https://discord.supabase.com)
- Check the generated types in `types/database.ts`

## 10. Production Considerations

Before deploying to production:

1. **Environment Variables**: Set up production environment variables
2. **Database Backups**: Configure automated backups
3. **Monitoring**: Set up database monitoring
4. **Rate Limiting**: Configure API rate limits
5. **Security**: Review and test all RLS policies

---

Your simplified Supabase setup is now complete! You can start building the authentication and recipe management features with just two tables.
