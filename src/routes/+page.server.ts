import type { PageServerLoad, Actions } from './$types';
import { PLACES_API_KEY } from '$env/static/private';
import { fail } from '@sveltejs/kit';

export const load = (async () => {
	const response = await fetch(
		`https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJB3c16pyolR4RA3gLQl3Z5nI&key=${PLACES_API_KEY}`
	);
	let res = await response.json();
	return {
		reviews: res.result.reviews ?? []
	};
}) satisfies PageServerLoad;

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
				'https://69zzj7jgrj.execute-api.us-east-1.amazonaws.com/send-email',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(emailObj)
				}
			);
			const json = await response.json();
			return json;
		} catch (err) {
			return fail(400, {
				description: 'Failed to send email, Try again later.',
				error: JSON.stringify(err)
			});
		}
	}
};
