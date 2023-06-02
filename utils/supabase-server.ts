import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from '@/types/database.types';

const supabaseServer = () => createServerComponentClient<Database>({ cookies });

export default supabaseServer;
