import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';


export const actions: Actions = {
    default: async ({ request, locals: { supabase } }) => {
        const data = await request.formData();
        const email = data.get('email')?.toString();
        const password = data.get('password')?.toString();

        if (!email || !password) {
            return fail(400, {
                error: 'Email and password are required'
            });
        }

        const { data: { session }, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            return fail(401, {
                error: error.message
            });
        }

        if (session) {
            return {
                success: true
            };
        }

        return fail(401, {
            error: 'Invalid credentials'
        });
    }
}; 