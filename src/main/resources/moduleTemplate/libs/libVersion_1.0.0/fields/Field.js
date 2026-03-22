import Module from "../functions/Module.js";
import ValidationError from "../ValidationError.js";

export default class Field
{
	static pseudoCount = 0;
	static topLevelFields = [];

	constructor(selector, fieldName, allowEmpty, datatype, restrictions)
	{
		this.selector = selector;
		this.fieldName = fieldName;
		this.allowEmpty = allowEmpty;
		this.datatype = datatype;
		this.restrictions = restrictions;

		// Zusätzliche Behandlung von Top-Level-Feldern (Felder, die direkt via ID und ohne Verkettung selektiert werden)
		if (selector.startsWith("#") && !selector.trim().includes(" "))
		{
			// Nur Top-Level-Felder sollen von anderen Klassen referenziert werden können
			Field.topLevelFields.push(this);
		}
	}

	static getAllFields()
	{
		return Field.topLevelFields;
	}

	static getInputFields()
	{
		return Field.topLevelFields.filter(field => field.getNode().classList.contains("InputField"));
	}

	static getNonInputFields()
	{
		return Field.topLevelFields.filter(field => !field.getNode().classList.contains("InputField"));
	}

	clone(newSelector) { }

	cloneAsPseudo()
	{
		let pseudoName = "_clone" + Field.pseudoCount++;
		let pseudoSelector = "#fields > ." + pseudoName;
		let pseudoNode = this.getNode().cloneNode(true);
		let parentNode = document.getElementById("fields");

		pseudoNode.style.display = "none";
		parentNode.appendChild(pseudoNode);
		return this.clone(pseudoSelector);
	}

	removePseudo()
	{
		if (!this.selector.includes("._clone"))
		{
			throw new Error("Field is not a PseudoField");
		}
		else
		{
			document.getElementById("fields").removeChild(this.getNode());
		}
	}

	getNode()
	{
		return document.querySelector(this.selector);
	}

	valueOf()
	{
		return this.getValue();
	}

	getValue(keepEmptyEntries) { }

	setValue() { }

	isEmpty() { }

	reset() { }

	toString() { }

	validate(doAlert = true, tolerateEmptiness = false)
	{
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
					alert(message);
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
			throw new ValidationError(this.fieldName + ": mehrere Fehler");
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
			throw new ValidationError(this.fieldName + ": Feld darf nicht leer sein");
		}
	}

	validateDatatype(value = this.getValue())
	{
		if (!this.#datatypeCorrect(value))
		{
			throw new ValidationError(this.fieldName + ": Wert '" + value + "' muss vom Typ '" + this.datatype + "' sein");
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
		// Hintergrund: innere Felder können nicht referenziert werden, das aktuelle innere Feld muss daher explizit übergeben werden
		// Beispiele der tatsächlichen Aufrufe der Restriktionen:
		//   globales Textfeld t1: restrictions(<<ignoriert>>, <<ignoriert>>)
		//   globales Listenfeld l1: restrictions(<<Eintrag von l1>>, <<ignoriert>>)
		//   inneres Textfeld t2: restrictions(<<Feld t2>>, <<ignoriert>>)
		//   inneres Listenfeld l2: restrictions(<<Eintrag von l1>>, <<Feld l2>>)

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
		Module._handleGeneralEvent("change");
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