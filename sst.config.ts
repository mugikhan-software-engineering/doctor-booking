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
						environment: {
							WHATSAPP_API_VERSION: 'v22.0',
							WHATSAPP_PHONE_NUMBER_ID: process.env.WHATSAPP_PHONE_NUMBER_ID || '',
							WHATSAPP_ACCESS_TOKEN: process.env.WHATSAPP_ACCESS_TOKEN || ''
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
