import type { SSTConfig } from 'sst';
import { SvelteKitSite, Api, StackContext } from 'sst/constructs';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';

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
					'POST /send-email': 'packages/functions/src/send_email.handler'
				}
			});
			api.attachPermissions(['ses:SendTemplatedEmail']);
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
