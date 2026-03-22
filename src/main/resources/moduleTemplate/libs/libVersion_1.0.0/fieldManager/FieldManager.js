import Module from "../systemFunctions/Module.js";
import Controller from "../internalFunctions/Controller.js";
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
		this.initialyDisplayed = this.isDisplayed();
		this.initialyEnabled = this.isEnabled();
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

	backup()
	{
		let backup = new Map();
		backup.set("value", this.getValue());
		backup.set("displayed", this.isDisplayed());
		backup.set("enabled", this.isEnabled());
		return backup;
	}

	restore(backup)
	{
		this.setValue(backup.get("value"));
		this.setDisplayed(backup.get("displayed"));
		this.setEnabled(backup.get("enabled"));
	}

	reset(excludeInputFields = false)
	{
		if (!(excludeInputFields && this.isInputField()))
		{
			this.resetInternal(excludeInputFields);
		}
	}

	resetInternal(excludeInputFields = false)
	{
		this.clear();
		this.setFailed(false);
		this.setDisplayed(this.initialyDisplayed);
		this.setEnabled(this.initialyEnabled);
	}

	toString()
	{
		return this.constructor.name.replace("Manager", "") + ": " +
			"\n\tselector: " + this.selector +
			"\n\tfieldName: " + this.fieldName +
			"\n\tallowEmpty: " + this.allowEmpty +
			"\n\tdatatype: " + this.datatype;
	}

	getPrint()
	{
		return String(this.getValue());
	}

	// Hinweis: tolerateEmptiness wird bei einer durch ein Change-Event ausgelösten Überprüfung von Tabelleneinträgen benötigt,
	// 			um keine Fehlermeldungen wegen noch nicht ausgefüllter Felder zu erzeugen
	validate(tolerateEmptiness = false)
	{
		// Felder ohne Eingabemöglichkeit müssen nicht validiert werden
		if (!this.isInputField())
		{
			return;
		}

		try
		{
			this.validateEmptiness(tolerateEmptiness);
			this.validateInternal(undefined, tolerateEmptiness);
			this.setFailed(false);
		}
		catch (err)
		{
			err.message = this.getMessagePrefix() + err.message;
			this.setFailed(true, err.message);
			Module.fail(err);
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
				entry.validateInternal(this, tolerateEmptiness);
				entry.setFailed(false);
			}
			catch (err)
			{
				err.message = entry.getMessagePrefix() + err.message;
				entry.setFailed(true, err.message);
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
			throw new ValidationError("mehrere Fehler:\n\t " + errorList);
		}
	}

	validateInternal(outerField, tolerateEmptiness)
	{
		this.validateDatatype();
		this.validateRestrictions(this, outerField);
	}

	validateEmptiness(tolerateEmptiness = false)
	{
		if (this.isEmpty() && !this.allowEmpty && !tolerateEmptiness)
		{
			throw new ValidationError("Feld darf nicht leer sein");
		}
	}

	validateDatatype(value = this.getValue())
	{
		if (!this.isEmpty() && !this.#datatypeCorrect(value)) // Vorherige Prüfung, ob leer, um keine Fehler durch leere Zahlen zu erzeugen
		{
			throw new ValidationError("Wert '" + value + "' ist kein " + this.datatype);
		}
	}

	#datatypeCorrect(value)
	{
		switch (this.datatype)
		{
			case "Integer":
				return typeof value === "number" && !Number.isNaN(value) && Number.isInteger(value);
			case "Number":
				return typeof value === "number" && !Number.isNaN(value);
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
		Controller.handleChangeEvent();
		this.validate();
	}

	getChildElement(childSelector)
	{
		return document.querySelector(this.selector + " > " + childSelector);
	}

	getChildElements(childSelector)
	{
		return Array.from(document.querySelectorAll(this.selector + " > " + childSelector));
	}

	isDisplayed()
	{
		return this.getNode().style.display !== "none";
	}

	setDisplayed(displayed)
	{
		if (displayed)
		{
			this.getNode().style.display = "";
		}
		else
		{
			this.getNode().style.display = "none";
		}
	}

	isEnabled()
	{
		return this.getNode().classList.contains("InputField");
	}

	setEnabled(enabled)
	{
		let classList = this.getNode().classList;
		if (enabled && !classList.contains("InputField"))
		{
			classList.add("InputField");
		}
		else if (!enabled && classList.contains("InputField"))
		{
			classList.remove("InputField")
		}
		this.getChildElement(".field > *").disabled = !enabled;
	}
}