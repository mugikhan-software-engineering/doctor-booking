import { error, redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ locals }) => {
    const {error: err} = await locals.supabase.auth.signOut();
    if (err) {
       throw error(500, 'Failed to logout, Please try again.');
    }
    throw redirect(303, '/');
}