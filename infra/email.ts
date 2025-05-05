export const email = new sst.aws.Email("HelpEmail", {
    sender: "help@drahsanahmad.com",
    transform: {
        identity: (args, opts) => {
            args.configurationSetName = undefined;
            opts.import = "help@drahsanahmad.com";
        }
    }
});