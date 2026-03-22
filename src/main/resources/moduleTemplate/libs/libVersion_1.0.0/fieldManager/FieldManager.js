import Module from "../systemFunctions/Module.js";
import ValidationError from "../ValidationError.js";

export default class FieldManager
{
	constructor(selector, fieldName, allowEmpty, datatype, restrictions)
	{
		this.selector = selector;
		this.fieldName = fieldName;
		this.allowEmpty = allowEmpty;
		this.datatype = datatype;
		this.restrictions = restrictions;
	}

	clone(newSelector) { }

	getNode()
	{
		return document.querySelector(this.selector);
	}

	getMessagePrefix()
	{
		return this.fieldName + ": ";
	}

	isTopLevelField()
	{
		// Top-Level-Felder sind nicht-innere Felder, sie sind an der Selektierung via ID und ohne Verkettung erkennbar
		return this.selector.startsWith("#") && !this.selector.trim().includes(" ");
	}

	isInputField()
	{
		return this.getNode().classList.contains("InputField");
	}

	getInteractor() { }

	getValue() { }

	setValue(value) { }

	isEmpty() { }

	clear() { }

	reset(excludeInputFields = false) {
		if (!(excludeInputFields && this.isInputField()))
		{
			this.resetInternal(excludeInputFields);
		}
	}

	resetInternal(excludeInputFields = false) {
		this.clear();
		this.setFailed(false);
	}

	toString()
	{
		return this.constructor.name + ": " +
			"\n\tselector: " + this.selector +
			"\n\tfieldName: " + this.fieldName +
			"\n\tallowEmpty: " + this.allowEmpty +
			"\n\tdatatype: " + this.datatype;
	}

	getPrint()
	{
		return "'" + this.getValue() + "'";
	}

	validate(doAlert = true, tolerateEmptiness = false)
	{
		// Felder ohne Eingabemöglichkeit müssen nicht validiert werden
		if (!this.isInputField())
		{
			return;
		}

		try
		{
			this.validateEmptiness(tolerateEmptiness);
			if (!this.isEmpty())
			{
				this.validateInternal(undefined, tolerateEmptiness);
			}
			this.setFailed(false);
		}
		catch (err)
		{
			if (err instanceof ValidationError)
			{
				let message = err.message;
				this.setFailed(true, message);
				if (doAlert && message !== "")
				{
					Module.fail(this.getMessagePrefix() + message, false);
				}
				throw err;
			}
			else
			{
				throw err;
			}
		}
	}

	validateMultiple(entries, tolerateEmptiness = false)
	{
		let errors = [];
		for (let entry of entries)
		{
			try
			{
				entry.validateEmptiness(tolerateEmptiness);
				if (!entry.isEmpty())
				{
					entry.validateInternal(this, tolerateEmptiness);
				}
				entry.setFailed(false);
			}
			catch (err)
			{
				if (err instanceof ValidationError)
				{
					entry.setFailed(true, err.message);
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
			throw errors.at(0);
		}
		else if (errors.length > 1)
		{
			let errorList = errors.map(err => "- " + err.message).join("\n").replaceAll("\n", "\n\t ");
			throw new ValidationError(this.getMessagePrefix() + "mehrere Fehler:\n\t " + errorList);
		}
	}

	validateEmptiness(tolerateEmptiness = false)
	{
		if (this.isEmpty() && !this.allowEmpty && !tolerateEmptiness)
		{
			throw new ValidationError(this.getMessagePrefix() + "Feld darf nicht leer sein");
		}
	}

	validateInternal(outerField, tolerateEmptiness)
	{
		this.validateDatatype();
		this.validateRestrictions(this, outerField);
	}

	validateDatatype(value = this.getValue())
	{
		if (!this.#datatypeCorrect(value))
		{
			throw new ValidationError(this.getMessagePrefix() + "Wert '" + value + "' muss vom Typ '" + this.datatype + "' sein");
		}
	}

	#datatypeCorrect(value)
	{
		switch (this.datatype)
		{
			case "Integer":
				value = value.replace(",", "."); // Dezimaltrennzeichen anpassen (Dezimalkomma durch Dezimalpunkt ersetzen)
				return !isNaN(value) && Number.isInteger(Number(value));
			case "Number":
				return !isNaN(value);
			case "String":
				return typeof value === "string";
			case "Ignore":
				return true;
		}
	}

	validateRestrictions(entry, outerField)
	{
		// Bei globalen (nicht-inneren) Feldern
		//   entry = Eintrag eines SplitFields, ListFields oder TableFields, ignoriert für alle anderen
		//   outerField = Feld, zu dem der Eintrag gehört, ignoriert bei globalen (nicht inneren) Feldern
		// Bei inneren Feldern
		//   entry = inneres Feld (= Eintrag des übergeordneten Felds) oder Eintrag des inneren Felds (bei SplitFields, ListFields oder TableFields)
		//   outerField = inneres Feld, falls entry nur ein Eintrag dieses inneren Felds war
		// Hintergrund: innere Felder können nicht als globale Variable referenziert werden, das aktuelle innere Feld muss daher explizit übergeben werden
		// Beispiele der tatsächlichen Aufrufe der Restriktionen:
		//   globales Textfeld t1: restrictions(<<ignoriert>>, <<ignoriert>>)
		//   globales Listenfeld l1: restrictions(<<Eintrag von l1>>, <<ignoriert>>)
		//   inneres Textfeld t2: restrictions(<<Feld t2>>, <<ignoriert>>)
		//   inneres Listenfeld l2: restrictions(<<Eintrag von l1>>, <<Feld l2>>)

		if (entry instanceof FieldManager)
		{
			entry = entry.getInteractor();
		}
		if (outerField instanceof FieldManager)
		{
			outerField = outerField.getInteractor();
		}

		this.restrictions(entry, outerField);
	}

	setFailed(isFailed, message)
	{
		let field = this.getChildElement(".field > *")
		if (isFailed)
		{
			field.classList.add("failed");
			field.setCustomValidity(message);
		}
		else
		{
			field.classList.remove("failed");
			field.setCustomValidity("");
		}
	}

	handleChangeEvent()
	{
		this.validate();
		Module._handleChangeEvent();
	}

	getChildElement(childSelector)
	{
		return document.querySelector(this.selector + " > " + childSelector);
	}

	getChildElements(childSelector)
	{
		return Array.from(document.querySelectorAll(this.selector + " > " + childSelector));
	}
}