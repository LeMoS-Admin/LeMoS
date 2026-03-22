import ValidationError from "../ValidationError.js";
import Scroller from "../internalFunctions/Scroller.js";

export default class Module
{
	static _outputNumber = 1;
	static #numberedOutput = undefined;
	static #alert = undefined;
	static #fail = undefined;
	static #error = undefined;
	static #logger = undefined;

	static
	{
		// Error-Handler registrieren
		window.addEventListener("error", errorEvent => Module.#printError(errorEvent.error));
	}

	static _setNumberedOutput(numberedOutput)
	{
		Module.#numberedOutput = numberedOutput;
	}

	static _setNoteFields(alert, fail, error)
	{
		Module.#alert = alert;
		Module.#fail = fail;
		Module.#error = error;
	}

	static setLogger(logger)
	{
		Module.#logger = logger.withEmptyEntries();	// Leere Zeilen sollen im Logger stets erhalten bleiben
	}

	static clearOutputs()
	{
		Module.clearLogger();
		Module.clearNoteFields();
	}

	static clearLogger()
	{
		Module._outputNumber = 1;
		Module.#logger.clear();
	}

	static clearNoteFields()
	{
		Module.#alert._reset();
		Module.#fail._reset();
		Module.#error._reset();
	}

	static log(content)
	{
		console.log("Debug: " + content);
	}

	static print(content)
	{
		if (Module.#numberedOutput)
		{
			content = Module._outputNumber++ + ". " + content;
		}
		console.log("Info:  " + content);
		Module.#logger.push(content);
	}

	static alert(content)
	{
		console.log("Alert: " + content);
		Module.#alert.setValue(content.replaceAll("\n", "<br>"));
		Module.#alert.setDisplayed(true);
		window.scrollTo(0, 0);
		Scroller.saveCurrentScrollPosition("header"); // Zuletzt gespeicherte Position überschreiben, um zurück scrollen zu vermeiden
	}

	static fail(content)
	{
		if (content instanceof Error)
		{
			throw content;
		}
		else
		{
			throw new ValidationError(content);
		}
	}

	static error(content)
	{
		if (content instanceof Error)
		{
			throw content;
		}
		else
		{
			throw new Error(content);
		}
	}

	static #printError(error)
	{
		if (error instanceof ValidationError)
		{
			console.log("Fail:  " + error.message)
			Module.#fail.setValue(error.message.replaceAll("\n", "<br>"));
			Module.#fail.setDisplayed(true);
		}
		else
		{
			console.log("Error: " + error.message)
			Module.#error.setValue(error.message.replaceAll("\n", "<br>"));
			Module.#error.setDisplayed(true);
		}
		window.scrollTo(0, 0);
		Scroller.saveCurrentScrollPosition("header"); // Zuletzt gespeicherte Position überschreiben, um zurück scrollen zu vermeiden
	}
}