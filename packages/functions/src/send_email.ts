import type {
	APIGatewayProxyHandlerV2,
	APIGatewayProxyEventV2,
	APIGatewayProxyStructuredResultV2
} from 'aws-lambda';
import { SESClient, SendTemplatedEmailCommand } from '@aws-sdk/client-ses';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
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
			TemplateData: JSON.stringify({ name: name, email: email, issue: issue, message: message })
		});

		try {
			let response = await client.send(params);
			console.log(response);
			return {
				statusCode: 200,
				body: 'Your email has been sent!'
			};
		} catch (error) {
			console.error(error);
			let response = {
				statusCode: 400,
				body: 'Your email failed to send!'
			};
			return response;
		}
	} else {
		return {
			statusCode: 400,
			body: 'Your email failed to send!'
		};
	}
};
