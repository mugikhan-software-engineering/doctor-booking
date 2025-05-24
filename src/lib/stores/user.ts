import { writable } from 'svelte/store';
import type { User } from '@supabase/supabase-js';

interface UserStore {
    user: User | null;
}

export const userStore = writable<UserStore>({ user: null });
