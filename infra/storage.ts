sst.Linkable.wrap(supabase.Project, function (item) {
    return {
        properties: {
            user: $interpolate`postgres.${item.id}`,
            password: item.databasePassword,
            host: $interpolate`aws-0-${item.region}.pooler.supabase.com`,
            port: 5432,
            database: "postgres",
        },
    };
});

export const project = new supabase.Project("Database", {
    name: $app.stage == 'mugi' ? $interpolate`${$app.name}-${$app.stage}` : $interpolate`${$app.name}`,
    region: "eu-west-1",
    organizationId: "cwnuywvtvsqdzjucsfhn",
    databasePassword: new random.RandomString("DatabasePassword", {
        length: 16,
    }).result,
});