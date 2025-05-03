import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { SESClient, SendTemplatedEmailCommand } from '@aws-sdk/client-ses';
import { Resource } from "sst";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
	const client = new SESClient({ region: 'af-south-1' });

	if (event.body == null || event.body == undefined) {
		return {
			statusCode: 400,
			body: 'Your email failed to send!'
		};
	}

	const data = JSON.parse(event.body);
	const { name, contact, email, issue, message } = data;

	if(process.env.SST_DEV) {
		console.log('App Stage', Resource.App.stage);
		console.log('Data', JSON.stringify(data));
		return {
			statusCode: 200,
			body: 'Email sent!'
		};
	}

	const params = new SendTemplatedEmailCommand({
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

	try {
		let response = await client.send(params);
		return {
			statusCode: 200,
			body: 'Your email has been sent!'
		};
	} catch (error) {
		return {
			statusCode: 400,
			body: 'Your email failed to send!'
		};
	}
};
