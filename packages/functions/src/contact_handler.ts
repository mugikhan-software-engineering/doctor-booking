import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { SESClient, SendTemplatedEmailCommand } from '@aws-sdk/client-ses';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
	if (event.body == null || event.body == undefined) {
		return {
			statusCode: 400,
			body: JSON.stringify({ message: 'Missing request body' })
		};
	}

	const data = JSON.parse(event.body);
	const { name, contact, email, issue, message } = data;

	// Track success/failure of each channel
	const results = {
		email: { success: false, error: null as string | null },
		whatsapp: { success: false, error: null as string | null }
	};

	// Send email
	try {
		const client = new SESClient({ region: 'af-south-1' });
		const emailParams = new SendTemplatedEmailCommand({
			Destination: {
				ToAddresses: ['mugikhan@gmail.com']
			},
			Source: 'help@drahsanahmad.com',
			Template: 'ContactUsTemplate',
			TemplateData: JSON.stringify({
				name: name,
				contact: contact,
				email: email,
				issue: issue,
				message: message
			})
		});

		await client.send(emailParams);
		results.email.success = true;
	} catch (error) {
		console.error('Email error:', error);
		results.email.error = error instanceof Error ? error.message : String(error);
	}

	// Send WhatsApp message if contact number is provided
	if (contact) {
		try {
			// Get WhatsApp API credentials from environment variables
			const version = process.env.WHATSAPP_API_VERSION || 'v22.0';
			const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
			const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;

			// Skip WhatsApp if credentials are missing
			if (!phoneNumberId || !accessToken) {
				throw new Error('Missing WhatsApp API credentials');
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
				throw new Error(JSON.stringify(responseData));
			}

			results.whatsapp.success = true;
		} catch (error) {
			console.error('WhatsApp error:', error);
			results.whatsapp.error = error instanceof Error ? error.message : String(error);
		}
	}

	// Determine overall status code based on results
	let statusCode = 200;
	let responseMessage = 'Contact form submitted successfully';

	if (!results.email.success && !results.whatsapp.success) {
		statusCode = 500;
		responseMessage = 'Failed to send message through any channel';
	} else if (!results.email.success) {
		statusCode = 207; // Partial success
		responseMessage = 'WhatsApp message sent, but email failed';
	} else if (!results.whatsapp.success && contact) {
		statusCode = 207; // Partial success
		responseMessage = 'Email sent, but WhatsApp message failed';
	}

	return {
		statusCode,
		body: JSON.stringify({
			message: responseMessage,
			results
		})
	};
};
