import Field from "../fields/Field.js";
import ValidationError from "../ValidationError.js";

export default class Module
{
	static eventHandlerMap = new Map();

	static filled(...variables) // Verteiler
	{
		if (variables.length === 0)
		{
			return this.filled1();
		}
		else
		{
			return this.filled2(variables);
		}
	}

	static filled1()
	{
		let result = [];
		for (let variable of Field.getInputFields())
		{
			if (!variable.isEmpty())
			{
				result.push(variable);
			}
		}
		return result;
	}

	static filled2(variables)
	{
		for (let variable of variables)
		{
			if (variable.isEmpty())
			{
				return false;
			}
		}
		return true;
	}

	static _resetInputFields()
	{
		for (let variable of Field.getInputFields())
		{
			variable.reset();
		}
	}

	static _resetNonInputFields()
	{
		for (let variable of Field.getNonInputFields())
		{
			variable.reset();
		}
	}

	static _resetAllFields()
	{
		for (let variable of Field.getAllFields())
		{
			variable.reset();
		}
	}

	static _backupFields()
	{
		let backup = new Map();
		for (let field of Field.getAllFields())
		{
			backup.set(field.fieldName, field.getValue(true));
		}
		return backup;
	}

	static _restoreFields(backup)
	{
		for (let field of Field.getAllFields())
		{
			field.setValue(backup.get(field.fieldName));
		}
	}

	static _validateFields()
	{
		let errors = [];
		for (let field of Field.getInputFields())
		{
			try
			{
				field.validate(false);
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
			alert(errors.at(0).message);
			throw errors.at(0);
		}
		else if (errors.length > 1)
		{
			alert("Lernmodul: mehrere Fehler");
			throw new ValidationError("Lernmodul: mehrere Fehler");
		}
	}

	static _setGeneralEventHandler(event, handler)
	{
		Module.eventHandlerMap.set(event, handler)
	}

	static _handleGeneralEvent(event)
	{
		if (Module.eventHandlerMap.has(event))
		{
			Module.eventHandlerMap.get(event)();
		}
	}
}