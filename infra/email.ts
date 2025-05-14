export const email = new sst.aws.Email("HelpEmail", {
    sender: $app.stage === "mugi" ? "mugikhan@gmail.com" : "help@drahsanahmad.com",
    transform: {
        identity: (args, opts) => {
            args.configurationSetName = undefined;
            opts.import = $app.stage === "mugi" ? "mugikhan@gmail.com" : "help@drahsanahmad.com";
        }
    }
});