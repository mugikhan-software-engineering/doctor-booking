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
			// const cert = Certificate.fromCertificateArn(
			// 	stack,
			// 	'MyCert',
			// 	'arn:aws:acm:af-south-1:075245960512:certificate/747e222a-0247-4de6-a886-26abb1aa6b32'
			// );
			const api = new Api(stack, 'api', {
				routes: {
					'POST /send-email': 'packages/functions/src/send_email.handler'
				}
				// customDomain: {
				// 	domainName: 'api.drahsanahmad.com',
				// 	isExternalDomain: true,
				// 	cdk: {
				// 		certificate: cert
				// 	}
				// }
			});
			api.attachPermissions(['ses:SendTemplatedEmail']);
			const site = new SvelteKitSite(stack, 'site', {
				bind: [api]
				// customDomain: {
				// 	domainName: 'drahsanahmad.com',
				// 	isExternalDomain: true,
				// 	cdk: {
				// 		certificate: cert
				// 	}
				// }
			});
			stack.addOutputs({
				ApiUrl: api.customDomainUrl || api.url,
				SiteUrl: site.customDomainUrl || site.url
			});
		});
	}
} satisfies SSTConfig;
