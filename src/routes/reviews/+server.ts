import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { PLACES_API_KEY } from '$env/static/private';

export const GET: RequestHandler = async () => {
	const response = await fetch(
		`https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJB3c16pyolR4RA3gLQl3Z5nI&key=${PLACES_API_KEY}`
	);
	let res = await response.json();
	return json(
		{
			reviews: res.result.reviews ?? []
		},
		{
			status: 200,
			headers: {
				'Cache-Control': 'max-age=86400, s-maxage=86400, stale-if-error=86400, must-revalidate'
			}
		}
	);
};
