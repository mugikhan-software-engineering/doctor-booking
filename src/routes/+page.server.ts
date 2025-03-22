import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load = (async () => {}) satisfies PageServerLoad;

export const actions: Actions = {
	sendEmail: async ({ request }) => {
		const data = await request.formData();
		if (data.get('confirm')) {
			return fail(404, {
				description: 'Failed to send email, Try again later.',
				error: 'bot'
			});
		}
		const contactObj = {
			name: data.get('name'),
			contact: data.get('contact'),
			email: data.get('email'),
			issue: data.get('issue'),
			message: data.get('message')
		};

		if (contactObj.contact.startsWith('0')) {
			contactObj.contact = '+27' + contactObj.contact.substring(1);
		}

		try {
			const apiUrl = 'https://api.drahsanahmad.com/contact';

			const response = await fetch(apiUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(contactObj)
			});

			const result = await response.json();

			if (!response.ok) {
				return fail(response.status, {
					description: 'Failed to process your request. Please try again later.',
					error: result.message || 'Unknown error'
				});
			}

			return {
				description: 'Your message has been sent successfully!'
			};
		} catch (err) {
			return fail(400, {
				description: 'Failed to send your message. Please try again later.',
				error: err instanceof Error ? err.message : 'Unknown error'
			});
		}
	}
};
