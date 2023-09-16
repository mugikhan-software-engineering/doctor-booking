import type { SSTConfig } from 'sst';
import { SvelteKitSite, Api } from 'sst/constructs';

export default {
	config(_input) {
		return {
			name: 'doctor-booking',
			region: 'af-south-1',
			profile: _input.stage === 'prod' ? 'admin' : 'admin'
		};
	},
	stacks(app) {
		app.stack(function Site({ stack }) {
			const api = new Api(stack, 'api', {
				routes: {
					'POST /send-email': 'packages/functions/src/send_email.handler'
				}
			});
			api.attachPermissions(['ses:SendTemplatedEmail']);
			const site = new SvelteKitSite(stack, 'site', {
				bind: [api]
			});
			stack.addOutputs({
				ApiUrl: api.url,
				SiteUrl: site.url
			});
		});
	}
} satisfies SSTConfig;
