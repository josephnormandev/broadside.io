export default class LoggerService
{
    static async initialize()
    {

    }

	static red(message)
	{
		console.log("\x1b[31m" + message + "\x1b[0m");
	}

    static green(message)
	{
		console.log("\x1b[32m" + message + "\x1b[0m");
	}

	static yellow(message)
	{
		console.log("\x1b[33m" + message + "\x1b[0m");
	}

	static blue(message)
	{
		console.log("\x1b[34m" + message + "\x1b[0m");
	}

	static cyan(message)
	{
		console.log("\x1b[36m" + message + "\x1b[0m");
	}
}
