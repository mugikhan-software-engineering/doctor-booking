import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
	if (event.body == null || event.body == undefined) {
		return {
			statusCode: 400,
			body: JSON.stringify({ message: 'Missing request body' })
		};
	}

	const data = JSON.parse(event.body);
	const { name, contact, issue, message } = data;

	// Get WhatsApp API credentials from environment variables
	const version = process.env.WHATSAPP_API_VERSION || 'v22.0';
	const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
	const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;

	// Validate required environment variables
	if (!phoneNumberId || !accessToken) {
		console.error('Missing WhatsApp API credentials');
		return {
			statusCode: 500,
			body: JSON.stringify({ message: 'Server configuration error' })
		};
	}

	// Format phone number (remove any non-digit characters and ensure it has country code)
	let recipientPhone = contact.replace(/\D/g, '');
	if (!recipientPhone.startsWith('27') && !recipientPhone.startsWith('+27')) {
		// Add South Africa country code if not present (assuming South African numbers)
		recipientPhone = recipientPhone.startsWith('0')
			? '27' + recipientPhone.substring(1)
			: '27' + recipientPhone;
	}

	// Remove any remaining '+' characters
	recipientPhone = recipientPhone.replace('+', '');

	// Prepare WhatsApp API request
	const url = `https://graph.facebook.com/${version}/${phoneNumberId}/messages`;
	const body = {
		messaging_product: 'whatsapp',
		recipient_type: 'individual',
		to: recipientPhone,
		type: 'template',
		template: {
			name: 'website_contact_reply',
			language: {
				code: 'en_za'
			},
			components: [
				{
					type: 'body',
					parameters: [
						{
							type: 'text',
							parameter_name: 'customer_name',
							text: name
						},
						{
							type: 'text',
							parameter_name: 'health_issue',
							text: issue
						}
					]
				}
			]
		}
	};

	try {
		const response = await globalThis.fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`
			},
			body: JSON.stringify(body)
		});

		const responseData = await response.json();

		if (!response.ok) {
			console.error('WhatsApp API error:', responseData);
			return {
				statusCode: response.status,
				body: JSON.stringify({
					message: 'Failed to send WhatsApp message',
					error: responseData
				})
			};
		}

		return {
			statusCode: 200,
			body: JSON.stringify({
				message: 'WhatsApp message sent successfully',
				data: responseData
			})
		};
	} catch (error) {
		console.error('Error sending WhatsApp message:', error);
		return {
			statusCode: 500,
			body: JSON.stringify({
				message: 'Error sending WhatsApp message',
				error: error instanceof Error ? error.message : String(error)
			})
		};
	}
};
