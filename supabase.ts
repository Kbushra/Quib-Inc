import { createClient } from '@supabase/supabase-js';
import 'http';
import { configDotenv } from 'dotenv';

configDotenv();

const client = createClient(process.env.SUPAURL ?? "", process.env.SUPAANON ?? "");
export default client;