import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { Resource } from 'sst';

export const load = (async () => { }) satisfies PageServerLoad;

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
			name: data.get('name')?.toString() ?? '',
			contact: data.get('contact')?.toString() ?? '',
			email: data.get('email')?.toString() ?? '',
			issue: data.get('issue')?.toString()?.toLowerCase() ?? '',
			message: data.get('message')?.toString() ?? ''
		};

		if (
			!contactObj.contact ||
			!contactObj.email ||
			!contactObj.issue ||
			!contactObj.message ||
			!contactObj.name
		) {
			return fail(400, {
				description: 'Please fill in all fields',
				error: 'Missing required fields'
			});
		}

		if (contactObj.contact && contactObj.contact.startsWith('0')) {
			contactObj.contact = '+27' + contactObj.contact.substring(1);
		}

		try {
			const apiUrl = Resource.App.stage === "production" ? 'https://drahsanahmad.com/api/send-email' : 'https://dev.drahsanahmad.com/api/send-email';

			const response = await fetch(apiUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(contactObj)
			});
			
			const responseMessage = await response.text();

			if (!response.ok) {
				return fail(response.status, {
					description: 'Failed to send your message. Please try again.',
					error: responseMessage
				});
			}

			return {
				success: true,
				description: responseMessage
			};
		} catch (err) {
			return fail(400, {
				description: 'Failed to send your message. Please try again later.',
				error: err instanceof Error ? err.message : 'Unknown error'
			});
		}
	}
};
