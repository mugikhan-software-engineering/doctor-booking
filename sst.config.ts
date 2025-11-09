/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
	app(input) {
		return {
			name: 'doctor-booking',
			removal: input?.stage === 'production' ? 'retain' : 'remove',
			protect: ['production'].includes(input?.stage),
			home: 'aws',
			providers: {
				aws: {
					profile:
						input.stage === 'dev' ? 'doctor-dev' : input.stage === 'mugi' ? 'mugi-dev' : undefined, // Only use doctor-dev profile for dev stage
					region: 'af-south-1'
				}
			}
		};
	},
	async run() {
		const { allSecrets } = await import('./infra/secrets');
		const { email } = await import('./infra/email');
		const { api } = await import('./infra/api');

		const domain = $app.stage === 'production' ? 'drahsanahmad.com' : 'dev.drahsanahmad.com';
		const routerName = $app.stage === 'production' ? 'DoctorBooking' : 'router';
		const redirects = $app.stage === 'production' ? [`www.${domain}`] : undefined;
		const isPermanentStage = ['production', 'dev'].includes($app.stage);
		const router = isPermanentStage
			? new sst.aws.Router(routerName, {
					domain: {
						name: domain,
						redirects: redirects
					}
				})
			: new sst.aws.Router(routerName);

		let links: any[] = [];
		if (isPermanentStage) {
			links = [...allSecrets, api, email];
		} else {
			links = [...allSecrets, api];
		}

		new sst.aws.SvelteKit('site', {
			router: {
				instance: router
			},
			link: links,
			environment: {
				VITE_API_URL: api.url
			}
		});

		return {
			api: api.url
		};
	}
});
