import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';

export const load = (async () => {
	debugger;
	const response = await fetch(
		`https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJB3c16pyolR4RA3gLQl3Z5nI&key=${env.GOOGLE_API_KEY}`
	);
	let res = await response.json();
	return {
		reviews: res.result.reviews ?? []
	};
}) satisfies PageServerLoad;
