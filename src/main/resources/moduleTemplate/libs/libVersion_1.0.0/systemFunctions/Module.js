import ValidationError from "../ValidationError.js";

export default class Module
{
	static #logger = undefined;
	static #variables = [];
	static #fields = [];
	static #changeEventHandler = () => {};

	// Protokollierung
	static
	{
		// Error-Handler registrieren
		window.addEventListener("error", errorEvent => Module.#printError(errorEvent.error));
	}

	static setLogger(logger)
	{
		Module.#logger = logger;
	}

	static log(content)
	{
		console.log("Debug: " + content);
	}

	static print(content)
	{
		console.log("Info:  " + content);
		this.#logger.add(content);
	}

	static alert(content)
	{
		console.log("Alert: " + content);
		this.#logger.add(content);
		alert(content);
	}

	static fail(content, throwError = true)
	{
		if (content instanceof Error)
		{
			Module.#errorInternal("Fail:  ", content, throwError);
		}
		else
		{
			Module.#errorInternal("Fail:  ", new ValidationError(content), throwError);
		}
	}

	static error(content, throwError = true)
	{
		if (content instanceof Error)
		{
			Module.#errorInternal("Error: ", content, throwError);
		}
		else
		{
			Module.#errorInternal("Error: ", new Error(content), throwError);
		}
	}

	static #errorInternal(prefix, error, throwError)
	{
		error.message = prefix + error.message;
		if (throwError)
		{
			// Ausgabe erfolgt automatisch durch Error-Handler
			throw error;
		}
		else
		{
			Module.#printError(error);
		}
	}

	static #printError(error)
	{
		console.log(error.message)
		this.#logger.add(error.message);
		alert(error.message);
	}

	// Variablenverwaltung

	static _registerVariable(variable)
	{
		Module.#variables.push(variable);
	}

	static _backupVariables()
	{
		let backup = new Map();
		for (let variable of Module.#variables)
		{
			backup.set(variable.name, variable.value);
		}
		return backup;
	}

	static _restoreVariables(backup)
	{
		for (let variable of Module.#variables)
		{
			variable.value = (backup.get(variable.name));
		}
	}

	static _resetVariables()
	{
		for (let variable of Module.#variables)
		{
			variable._reset();
		}
	}

	// Feldverwaltung
	static countFilled()
	{
		let result = 0;
		for (let field of Module.#getInputFields())
		{
			if (!field.isEmpty())
			{
				result++;
			}
		}
		return result;
	}

	static isFilled(...fields)
	{
		for (let field of fields)
		{
			if (field.isEmpty())
			{
				return false;
			}
		}
		return true;
	}

	static _registerField(field)
	{
		if (!Module.#fields.some(obj => obj._fieldManager === field._fieldManager))
		{
			Module.#fields.push(field);
		}
	}

	static #getAllFields()
	{
		return Module.#fields;
	}

	static #getInputFields()
	{
		return Module.#fields.filter(field => field._fieldManager.isInputField());
	}

	static _backupFields()
	{
		let backup = new Map();
		for (let field of Module.#getAllFields())
		{
			backup.set(field.getName(), field._backup());
		}
		return backup;
	}

	static _restoreFields(backup)
	{
		for (let field of Module.#getAllFields())
		{
			field._restore(backup.get(field.getName()));
		}
	}

	static _resetAllFields()
	{
		for (let field of Module.#getAllFields())
		{
			field._reset();
		}
	}

	static _resetNonInputFields()
	{
		for (let field of Module.#getAllFields())
		{
			field._reset(true);	// excludeInputFields = true, um Eingabefelder auszulassen
		}
	}

	static _validateFields()
	{
		let errors = [];
		for (let field of Module.#getInputFields())
		{
			try
			{
				field._fieldManager.validate(false);
			}
			catch (err)
			{
				if (err instanceof ValidationError)
				{
					errors.push(err);
				}
				else
				{
					throw err;
				}
			}
		}
		if (errors.length === 1)
		{
			Module.fail(errors.at(0));
		}
		else if (errors.length > 1)
		{
			let errorList = errors.map(err => "- " + err.message).join("\n").replaceAll("\n", "\n\t ");
			Module.fail("Lernmodul: mehrere Fehler:\n\t " + errorList);
		}
	}

	static _setChangeEventHandler(handler)
	{
		Module.#changeEventHandler = handler;
	}

	static _handleChangeEvent()
	{
		Module.#changeEventHandler();
	}
}