import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load = (async () => {}) satisfies PageServerLoad;

export const actions: Actions = {
	sendEmail: async ({ cookies, request }) => {
		const data = await request.formData();
		if (data.get('confirm')) {
			return fail(404, {
				description: 'Failed to send email, Try again later.',
				error: 'bot'
			});
		}
		const emailObj = {
			name: data.get('name'),
			email: data.get('email'),
			issue: data.get('issue'),
			message: data.get('message')
		};
		try {
			const response = await fetch(
				'https://yf1xxtnqq3.execute-api.af-south-1.amazonaws.com/send-email',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(emailObj)
				}
			);
			return {
				description: 'Your email has been sent!'
			};
		} catch (err) {
			return fail(400, {
				description: 'Failed to send email, Try again later.',
				error: JSON.stringify(err)
			});
		}
	}
};
