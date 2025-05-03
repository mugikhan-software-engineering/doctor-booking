import type { APIGatewayProxyHandlerV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { SESClient, SendTemplatedEmailCommand } from '@aws-sdk/client-ses';
import twilio from 'twilio';
import { Resource } from "sst";

export const handler: APIGatewayProxyHandlerV2 = async (event): Promise<APIGatewayProxyStructuredResultV2> => {
	if (event.body == null || event.body == undefined) {
		return {
			statusCode: 400,
			body: 'Missing request body'
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
				ToAddresses: [Resource.App.stage === "production" ? 'receptiondrahmad66@gmail.com' : 'mugikhan@gmail.com']
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
			const accountSid = process.env.TWILIO_ACCOUNT_SID;
			const authToken = process.env.TWILIO_AUTH_TOKEN;

			// Skip WhatsApp if credentials are missing
			if (!accountSid || !authToken) {
				throw new Error('Missing Twilio Account SID OR Auth Token');
			}

			const twilioClient = twilio(accountSid, authToken);

			// Format phone number (remove any non-digit characters and ensure it has country code)
			let recipientPhone = contact.replace(/\D/g, '');
			if (!recipientPhone.startsWith('+27')) {
				// Add South Africa country code if not present (assuming South African numbers)
				if (recipientPhone.startsWith('0')) {
					recipientPhone = '+27' + recipientPhone.substring(1);
				} else if (recipientPhone.startsWith('27')) {
					recipientPhone = '+27' + recipientPhone.substring(2);
				} else {
					recipientPhone = '+27' + recipientPhone;
				}
			}

			const contentSid = 'HX78c6666f3a4e8a1a5bbd64fdb6ff40b0';
			const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
			if (!messagingServiceSid) {
				throw new Error('Missing Twilio Messaging Service SID');
			}

			const from = 'whatsapp:+27737881600';
			const to = `whatsapp:${recipientPhone}`;

			const message = await twilioClient.messages.create({
				contentSid: contentSid,
				contentVariables: JSON.stringify({ 1: `${name}`, 2: `${issue}` }),
				from: from,
				messagingServiceSid: messagingServiceSid,
				to: to
			});

			if (!message) {
				throw new Error('Failed to send WhatsApp message');
			}

			if (message.errorCode !== null || message.errorMessage !== null) {
				throw new Error(message.errorMessage || 'Error sending WhatsApp message');
			}

			results.whatsapp.success = true;
		} catch (error) {
			results.whatsapp.error = error instanceof Error ? error.message : String(error);
			results.whatsapp.success = false;
		}
	}

	// Determine overall status code based on results
	let statusCode = 200;
	let responseMessage = "Your message has been sent successfully!";

	if (!results.email.success && !results.whatsapp.success) {
		statusCode = 500;
		responseMessage = "Failed to send your message. Please try again later.";
	}

	return {
		statusCode: statusCode,
		body: responseMessage
	};
};
