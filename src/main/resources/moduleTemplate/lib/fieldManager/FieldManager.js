import Controller from "../internalFunctions/Controller.js";
import ValidationError from "../ValidationError.js";

export default class FieldManager
{
	constructor(selector, fieldName, allowEmpty, datatype, restrictions, reactions)
	{
		this.selector = selector;
		this.fieldName = fieldName;
		this.allowEmpty = allowEmpty;
		this.datatype = datatype;
		this.restrictions = restrictions;
		this.reactions = reactions;
		this.initialyDisplayed = this.isDisplayed();
		this.initialyEnabled = this.isEnabled();
		this.initialyHighlighted = this.isHighlighted();
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
		backup.set("highlighted", this.isHighlighted());
		return backup;
	}

	restore(backup)
	{
		this.setValue(backup.get("value"));
		this.setDisplayed(backup.get("displayed"));
		this.setEnabled(backup.get("enabled"));
		this.setHighlighted(backup.get("highlighted"));
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
		this.setHighlighted(this.initialyHighlighted);
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
	validate(outerField = undefined, tolerateEmptiness = false)
	{
		// Felder ohne Eingabemöglichkeit müssen nicht validiert werden
		if (!this.isInputField())
		{
			return;
		}

		try
		{
			this.validateEmptiness(tolerateEmptiness);
			if (!this.isEmpty() || this.allowEmpty)
			{
				// Wenn das Feld nicht leer ist, ist die Validierung kein Problem.
				// Wenn das Feld leer ist und auch leer sein darf, wird erwartet, dass dies in den Restriktionen berücksichtigt wurde.
				// Wenn das Feld nicht leer ist und nicht leer sein darf, wird in der Regel durch this.validateEmptiness(...) ein Fehler ausgelöst.
				//   Wenn tolerateEmptiness true ist, wird dieser Teil der Validierung jedoch erreicht, obwohl es in den Restriktionen potenziell nicht berücksichtigt wurde.
				//   In diesem Fall darf die Validierung des Felds daher nicht fortgesetzt werden, um Fehler durch leere Felder zu vermeiden.
				this.validateInternal(outerField, tolerateEmptiness);
			}
			this.setFailed(false);
		}
		catch (err)
		{
			err.message = this.getMessagePrefix() + err.message;
			this.setFailed(true, err.message);
			throw err;
		}
	}

	validateInternal(outerField, tolerateEmptiness)
	{
		this.validateDatatype();
		this.validateRestrictions(this, outerField);
	}

	validateMultiple(entries, tolerateEmptiness = false)
	{
		let errors = [];
		for (let entry of entries)
		{
			try
			{
				entry.validate(this, tolerateEmptiness);
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
			throw new ValidationError("mehrere Fehler:\n\t " + errorList);
		}
	}

	validateEmptiness(tolerateEmptiness = false)
	{
		if (this.isEmpty() && !this.allowEmpty && !tolerateEmptiness)
		{
			throw new ValidationError("Feld darf nicht leer sein");
		}
	}

	validateDatatype(value = this.getValue(), print = this.getPrint())
	{
		if (!this.isEmpty()) // Vorherige Prüfung, ob leer, um keine Fehler durch leere Zahlen zu erzeugen
		{
			switch (this.datatype)
			{
				case "Integer":
					if (typeof value !== "number" || Number.isNaN(value) || !Number.isInteger(value))
					{
						throw new ValidationError("Wert " + print + " ist keine Ganzzahl");
					}
					break;
				case "Number":
					if (typeof value !== "number" || Number.isNaN(value))
					{
						throw new ValidationError("Wert " + print + " ist keine Zahl");
					}
					break;
				case "String":
					if (typeof value !== "string")
					{
						throw new ValidationError("Wert " + print + " ist keine Zeichenkette");
					}
					break;
				case "Ignore":
					break;
			}
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

	performReactions(entry, outerField)
	{
		// Parameter analog zu validateRestrictions(...)
		// Muss nicht von ExpandableFields überschrieben werden, da Änderungen (welche die Reactions auslösen) von ihren Einträgen verwaltet werden

		if (entry instanceof FieldManager)
		{
			entry = entry.getInteractor();
		}
		if (outerField instanceof FieldManager)
		{
			outerField = outerField.getInteractor();
		}

		this.reactions(entry, outerField);
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
		this.performReactions();
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

	isHighlighted()
	{
		return this.getChildElement(".field > *").classList.contains("highlighted");
	}

	setHighlighted(highlighted)
	{
		let classList = this.getChildElement(".field > *").classList;
		if (highlighted && !classList.contains("highlighted"))
		{
			classList.add("highlighted");
		}
		else if (!highlighted && classList.contains("highlighted"))
		{
			classList.remove("highlighted")
		}
	}
}