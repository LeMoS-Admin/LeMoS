import Logger from "../systemFunctions/Logger.js";

export default class Controller
{
	static #variables = [];
	static #fields = [];
	static #changeEventHandler = () => {};

	// Variablenverwaltung
	static registerVariable(variable)
	{
		Controller.#variables.push(variable);
	}

	static backupVariables()
	{
		let backup = new Map();
		for (let variable of Controller.#variables)
		{
			backup.set(variable.name, variable.value);
		}
		return backup;
	}

	static restoreVariables(backup)
	{
		for (let variable of Controller.#variables)
		{
			variable.value = (backup.get(variable.name));
		}
	}

	static resetVariables()
	{
		for (let variable of Controller.#variables)
		{
			variable._reset();
		}
	}

	// Feldverwaltung
	static registerField(field)
	{
		if (!Controller.#fields.some(obj => obj._fieldManager === field._fieldManager))
		{
			Controller.#fields.push(field);
		}
	}

	static getAllFields()
	{
		return Controller.#fields;
	}

	static getInputFields()
	{
		return Controller.#fields.filter(field => field._fieldManager.isInputField());
	}

	static backupFields()
	{
		let backup = new Map();
		for (let field of Controller.getAllFields())
		{
			backup.set(field.getName(), field._backup());
		}
		return backup;
	}

	static restoreFields(backup)
	{
		for (let field of Controller.getAllFields())
		{
			field._restore(backup.get(field.getName()));
		}
	}

	static resetAllFields()
	{
		for (let field of Controller.getAllFields())
		{
			field._reset();
		}
	}

	static resetNonInputFields()
	{
		for (let field of Controller.getAllFields())
		{
			field._reset(true);	// excludeInputFields = true, um Eingabefelder auszulassen
		}
	}

	static validateFields()
	{
		let errors = [];
		for (let field of Controller.getInputFields())
		{
			try
			{
				field._fieldManager.validate();
			}
			catch (err)
			{
				errors.push(err);
			}
		}
		if (errors.length === 1)
		{
			throw errors.at(0);
		}
		else if (errors.length > 1)
		{
			let errorList = errors.map(err => "- " + err.message).join("\n").replaceAll("\n", "\n\t ");
			Logger.fail("Lernmodul: mehrere Fehler:\n\t " + errorList);
		}
	}

	static setChangeEventHandler(handler)
	{
		Controller.#changeEventHandler = handler;
	}

	static handleChangeEvent()
	{
		Controller.#changeEventHandler();
	}
}