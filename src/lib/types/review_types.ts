export interface Review {
	author_name: string;
	author_url: string;
	profile_photo_url: string;
	rating: number;
	relative_time_description: string;
	text: string;
	time: number;
}

export interface PlaceDetailsResponse {
	html_attributions: string[];
	result: {
		reviews?: Review[];
		// Add other fields you might need from the response
		formatted_address?: string;
		formatted_phone_number?: string;
		international_phone_number?: string;
		name?: string;
		opening_hours?: {
			open_now: boolean;
			periods: Array<{
				open: { day: number; time: string };
				close: { day: number; time: string };
			}>;
			weekday_text: string[];
		};
		rating?: number;
		url?: string;
		website?: string;
	};
	status: string;
}