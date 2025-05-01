import type { SSTConfig } from 'sst';
import { SvelteKitSite, Api, StackContext } from 'sst/constructs';

export default {
	config(_input) {
		return {
			name: 'doctor-booking',
			region: 'af-south-1',
			profile: _input.stage === 'prod' ? 'admin' : 'admin'
		};
	},
	stacks(app) {
		app.stack(function Site({ stack }: StackContext) {
			const api = new Api(stack, 'api', {
				routes: {
					'POST /send-email': 'packages/functions/src/send_email.handler',
					'POST /contact': 'packages/functions/src/contact_handler.handler'
				},
				customDomain: {
					domainName: 'api.drahsanahmad.com'
				},
				defaults: {
					function: {
						runtime: 'nodejs20.x',
						environment: {
							TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID || '',
							TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || '',
							TWILIO_MESSAGING_SERVICE_SID: process.env.TWILIO_MESSAGING_SERVICE_SID || ''
						}
					}
				}
			});
			// Add permissions for SES and allow outbound HTTP requests for WhatsApp API
			api.attachPermissions(['ses:SendTemplatedEmail', 'execute-api:Invoke']);
			const site = new SvelteKitSite(stack, 'site', {
				customDomain: {
					domainName: 'drahsanahmad.com',
					domainAlias: 'www.drahsanahmad.com'
				},
				bind: [api]
			});
			stack.addOutputs({
				ApiUrl: api.customDomainUrl || api.url,
				SiteUrl: site.customDomainUrl || site.url
			});
		});
	}
} satisfies SSTConfig;
