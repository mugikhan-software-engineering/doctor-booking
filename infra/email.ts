export const email = new sst.aws.Email('HelpEmail', {
	sender: $app.stage === 'mugi' ? 'mugikhan@gmail.com' : 'help@drahsanahmad.com'
});
