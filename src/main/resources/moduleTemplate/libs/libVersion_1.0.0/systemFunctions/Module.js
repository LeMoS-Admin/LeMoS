import ValidationError from "../ValidationError.js";

export default class Module
{
	static #logger = undefined;

	static
	{
		// Error-Handler registrieren
		window.addEventListener("error", errorEvent => Module.#printError(errorEvent.error));
	}

	static setLogger(logger)
	{
		Module.#logger = logger.withEmptyEntries();	// Leere Zeilen sollen im Logger stets erhalten bleiben
	}

	static clearLogger()
	{
		Module.#logger.clear();
	}

	static log(content)
	{
		console.log("Debug: " + content);
	}

	static print(content)
	{
		console.log("Info:  " + content);
		Module.#logger.push(content);
	}

	static alert(content)
	{
		console.log("Alert: " + content);
		Module.#logger.push(content);
		alert(content);
	}

	static fail(content)
	{
		if (content instanceof ValidationError)
		{
			Module.#errorInternal("Fail:  ", content);
		}
		else if (content instanceof Error)
		{
			Module.#errorInternal("Error: ", content);
		}
		else
		{
			Module.#errorInternal("Fail:  ", new ValidationError(content));
		}
	}

	static error(content)
	{
		if (content instanceof Error)
		{
			Module.#errorInternal("Error: ", content);
		}
		else
		{
			Module.#errorInternal("Error: ", new Error(content));
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
		Module.#logger.push(error.message);
		alert(error.message);
	}
}