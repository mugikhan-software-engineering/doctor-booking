import type { APIGatewayProxyHandlerV2, APIGatewayProxyEventV2 } from 'aws-lambda';
import { SESClient, SendTemplatedEmailCommand } from '@aws-sdk/client-ses';

export async function handler(event: APIGatewayProxyEventV2) {
	const client = new SESClient({ region: 'af-south-1' });

	if (event.body !== null && event.body !== undefined) {
		const json = JSON.parse(event.body);
		const { name, email, issue, message } = json;

		const params = new SendTemplatedEmailCommand({
			Destination: {
				ToAddresses: ['mugikhan@gmail.com']
			},
			Source: 'mugikhan@gmail.com',
			Template: 'ContactUsTemplate',
			TemplateData: JSON.stringify({ name: name, email: email, issue: issue, message: message }),
			ReplyToAddresses: ['EMAIL_ADDRESS']
		});
		const run = async () => {
			const sendReminderEmailCommand = params;
			try {
				return await client.send(sendReminderEmailCommand);
			} catch (err) {
				console.log('Failed to send template email', err);
				return err;
			}
		};

		try {
			let response = await client.send(params);
			return response;
		} catch (error) {
			return error;
		}
	} else {
		return {
			statusCode: 400,
			body: 'Your email failed to send!'
		};
	}
}
