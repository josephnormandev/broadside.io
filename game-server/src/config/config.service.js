const Config = {
};

export default class ConfigService
{
    static async initialize()
    {

    }

    static get(key)
    {
        var result = Config[key];

        if(result != null)
            return result;
        throw `Missing config key ${ key }`;
        console.exit(1);
    }
}
