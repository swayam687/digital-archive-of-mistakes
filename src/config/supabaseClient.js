// This file handles the connection to your Supabase database.
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config(); // Loads variables from .env

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Initialize and export the Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;