import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import type { APIGatewayProxyEvent, Context } from "aws-lambda";
import { Resource } from "sst";

export const handler = async (event: APIGatewayProxyEvent, context: Context) => {
	if (event.body == null || event.body == undefined) {
		return {
			statusCode: 400,
			body: 'Your email failed to send!'
		};
	}

	try {
		const client = new SESv2Client({ region: 'af-south-1' });

		const data = JSON.parse(event.body);
		const { name, contact, email, issue, message } = data;

		if(process.env.SST_DEV) {
			console.log('App Stage', Resource.App.stage);
			console.log('Data', JSON.stringify(data));
			return 'Email sent!';
		}

		const toAddresses = [Resource.App.stage === "production" ? 'receptiondrahmad66@gmail.com' : 'mugikhan@gmail.com'];

		const params = new SendEmailCommand({
			Destination: {
				ToAddresses: toAddresses
			},
			FromEmailAddress: Resource.HelpEmail.sender,
			Content: {
				Template: {
					TemplateName: 'ContactUsTemplate',
					TemplateData: JSON.stringify({
						name: name,
						contact: contact,
						email: email,
						issue: issue,
						message: message
					})
				}
			}
		});

		let response = await client.send(params);
		console.log('Email sent', response);
		return {
			statusCode: 200,
			body: 'Your email has been sent!'
		};
	} catch (error) {
		console.error('Error sending email', error);
		return {
			statusCode: 400,
			body: 'Your email failed to send!'
		};
	}
};
