import ValidationError from "../ValidationError.js";

export default class Logger
{
	static #logger = undefined;

	static
	{
		// Error-Handler registrieren
		window.addEventListener("error", errorEvent => Logger.#printError(errorEvent.error));
	}

	static set(logger)
	{
		Logger.#logger = logger;
	}

	static clear()
	{
		Logger.#logger.clear();
	}

	static log(content)
	{
		console.log("Debug: " + content);
	}

	static print(content)
	{
		console.log("Info:  " + content);
		Logger.#logger.add(content);
	}

	static alert(content)
	{
		console.log("Alert: " + content);
		Logger.#logger.add(content);
		alert(content);
	}

	static fail(content)
	{
		if (content instanceof ValidationError)
		{
			Logger.#errorInternal("Fail:  ", content);
		}
		else if (content instanceof Error)
		{
			Logger.#errorInternal("Error: ", content);
		}
		else
		{
			Logger.#errorInternal("Fail:  ", new ValidationError(content));
		}
	}

	static error(content)
	{
		if (content instanceof Error)
		{
			Logger.#errorInternal("Error: ", content);
		}
		else
		{
			Logger.#errorInternal("Error: ", new Error(content));
		}
	}

	static #errorInternal(prefix, error)
	{
		// Prefix soll nicht mehrfach eingefügt werden
		if (!error.message.startsWith("Fail:  ") || !error.message.startsWith("Error: "))
		{
			error.message = prefix + error.message;
		}

		// Hinweis: Ausgabe erfolgt automatisch durch Error-Handler
		throw error;
	}

	static #printError(error)
	{
		console.log(error.message)
		Logger.#logger.add(error.message);
		alert(error.message);
	}
}