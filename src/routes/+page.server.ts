import type { PlaceDetailsResponse } from '$lib/types/review_types';
import type { PageServerLoad, Actions } from './$types';
import { fail, json } from '@sveltejs/kit';
import { Resource } from 'sst';

export const load: PageServerLoad = (async () => { 
	const response = await fetch(
		`https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJB3c16pyolR4RA3gLQl3Z5nI&key=${Resource.PlacesApiKey.value}`
	);
	const res: PlaceDetailsResponse = await response.json();
	return {
		reviews: res.result.reviews ?? []
	};
	// return json(
	// 	{
	// 		reviews: res.result.reviews ?? []
	// 	},
	// 	{
	// 		status: 200,
	// 		headers: {
	// 			'Cache-Control': 'max-age=86400, s-maxage=86400, stale-if-error=86400, must-revalidate'
	// 		}
	// 	}
	// );
}) satisfies PageServerLoad;

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
			issue: data.get('issue')?.toString() ?? '',
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
			const apiUrl = `${Resource.api.url}/send-email`;

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
