import Field from "./Field.js";
import ExpandableField from "./ExpandableField.js";
import Module from "../functions/Module.js";

export default class ObjectField extends Field
{
	constructor(parentSelector, parentName, restrictions, entryName, fieldMap)
	{
		super(parentSelector, parentName, true, "String", restrictions);
		this.entryName = entryName;

		if (fieldMap instanceof Map)
		{
			// Ist der Fall, wenn das Objekt geklont wird
			this.fieldMap = fieldMap;
		}
		else
		{
			// Hinweis: Definition der Werte mittels {} erzeugt ein Object
			this.fieldMap = new Map();
			for (let [key, field] of Object.entries(fieldMap))
			{
				this.fieldMap.set(key, field);
			}
		}

		// Grundsätzlich kümmern sich nur fundamentale Felder (ohne innere Felder) um die Events
		// - Problem: Felder eines Tabelleneintrags würden nach einer Änderung nur einzeln, aber nicht im Zusammenhang geprüft
		// - Konsequenzen:
		//   - Einige Fehler würden erst bei der vollständigen Validierung zum Zustandsübergang erkannt
		//   - Innere Felder können nicht berücksichtigen, wenn sie leer sein dürfen, weil der gesamte Tabelleneintrag leer ist
		// - Lösung:
		//   - Innerhalb eines Tabelleneintrags soll jede Feldänderung eine Überprüfung des gesamten Objekts auslösen
		//   - Jedes Feld des Tabelleneintrags erhält einen neuen EventHandler
		//   - EventHandler der inneren Felder werden redundant und könnten gleiche Fehler mehrfach vermelden
		//   - EventHandler des Tabelleneintrags muss vor dem der inneren Felder ausgeführt werden und das Event anschließend abbrechen
		// - Umsetzung: Capturing statt Bubbling verwenden, weitere Eventbehandlung mittels Event.stopPropagation() unterbinden
		for (let entry of this.getChildElements("." + this.entryName))
		{
			entry.addEventListener("change", (event) => this.handleChangeEvent(event), true);
		}
	}

	clone(newParentSelector, newEntryName)
	{
		let newFieldMap = {};
		let entryParentNode = document.querySelector(newParentSelector);
		for (let [key, field] of this.fieldMap.entries())
		{
			let newEntryNode = this.getChildElement(".entry0:has(>." + key + ")").cloneNode(true);
			newEntryNode.classList.replace("entry0", newEntryName);
			entryParentNode.appendChild(newEntryNode);

			let newEntrySelector = ExpandableField.getSelectorWithReplacedEntryName(field.selector, "entry0", newEntryName)
												  .replace(this.selector, newParentSelector);
			newFieldMap[key] = field.clone(newEntrySelector);
		}
		return new ObjectField(newParentSelector, this.fieldName, this.restrictions, newEntryName, newFieldMap);
	}

	getValue(keepEmptyEntries)
	{
		return this.fieldMap.values().map(field => field.getValue(keepEmptyEntries)).toArray();
	}

	setValue(v)
	{
		if (v instanceof Array)
		{
			if (v.length !== this.fieldMap.size)
			{
				throw new Error(this.fieldName + ", " + this.entryName + ": length of values to set must be equal to number of fields");
			}

			let fields = this.fieldMap.values().toArray();
			for (let k = 0; k < v.length; k++)
			{
				fields.at(k).setValue(v.at(k));
			}
		}
		else if (v instanceof Map)
		{
			for (let [key, value] of v.entries())
			{
				if (!this.fieldMap.has(key))
				{
					throw new Error(this.fieldName + ", " + this.entryName + ": field '" + key + "' does not exist");
				}
				this.fieldMap.get(key).setValue(value);
			}
		}
		else
		{
			// Hinweis: Definition der Werte mittels {} erzeugt ein Object
			for (let [key, value] of Object.entries(v))
			{
				if (!this.fieldMap.has(key))
				{
					throw new Error(this.fieldName + ", " + this.entryName + ": field '" + key + "' does not exist");
				}
				this.fieldMap.get(key).setValue(value);
			}
		}
	}

	isEmpty()
	{
		return this.fieldMap.values().every(entry => entry.isEmpty());
	}

	reset()
	{
		this.setFailed(false);
		for (let field of this.fieldMap.values())
		{
			field.reset();
		}
	}

	toString()
	{
		let pairs = [];
		for (let [key, value] of this.fieldMap.entries())
		{
			pairs.push("'" + key + "': " + value.toString());
		}
		return "{" + pairs.join(", ") + "}";
	}

	validateInternal(outerField, tolerateEmptiness)
	{
		super.validateMultiple(this.fieldMap.values().toArray(), tolerateEmptiness);
		super.validateRestrictions(this, outerField);
	}

	setFailed(isFailed, message)
	{
		// Tabellenobjekte haben keinen eigenen Container und signalisieren ihre Fehler daher über die Container ihre Felder
		for (let container of this.getChildElements("." + this.entryName))
		{
			if (isFailed)
			{
				container.classList.add("failed");
				//field.setCustomValidity(message);
			}
			else
			{
				container.classList.remove("failed");
				//field.setCustomValidity("");
			}
		}
	}

	handleChangeEvent(event)
	{
		super.validate(true, true);
		Module._handleGeneralEvent("change");
		event.stopPropagation();
	}
}

