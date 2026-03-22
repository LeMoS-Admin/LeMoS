import Module from "../systemFunctions/Module.js";
import FieldManager from "./FieldManager.js";
import ExpandableFieldManager from "./ExpandableFieldManager.js";
import ObjectFieldInteractor from "../fieldInteractors/ObjectFieldInteractor.js";

export default class ObjectFieldManager extends FieldManager
{
	constructor(parentSelector, parentName, restrictions, entryName, fieldMap)
	{
		super(parentSelector, parentName, true, "Ignore", restrictions);
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

			let newEntrySelector = ExpandableFieldManager.getSelectorWithReplacedEntryName(field.selector, "entry0", newEntryName)
														 .replace(this.selector, newParentSelector);
			newFieldMap[key] = field.clone(newEntrySelector);
		}
		return new ObjectFieldManager(newParentSelector, this.fieldName, this.restrictions, newEntryName, newFieldMap);
	}

	isInputField()
	{
		// Tabellenobjekte, die Eingabefelder enthalten, müssen stets ebenfalls als Eingabefeld betrachtet werden
		return this.fieldMap.values().some(entry => entry.isInputField());
	}

	getMessagePrefix()
	{
		return this.fieldName + ", " + this.entryName + ": ";
	}

	getInteractor()
	{
		return new ObjectFieldInteractor(this);
	}

	getValue()
	{
		let map = new Map();
		for (let [key, value] of this.fieldMap.entries())
		{
			map.set(key, value.getValue());
		}
		return map;
	}

	setValue(value)
	{
		if (value instanceof Array)
		{
			if (value.length !== this.fieldMap.size)
			{
				Module.error(this.getMessagePrefix() + "length of value to set must be equal to number of inner #fields");
			}

			let fields = this.fieldMap.values().toArray();
			for (let index of fields.keys())
			{
				fields.at(index).setValue(value.at(index));
			}
		}
		else if (value instanceof Map)
		{
			for (let [key, val] of value.entries())
			{
				if (!this.fieldMap.has(key))
				{
					Module.error(this.getMessagePrefix() + "field '" + key + "' does not exist");
				}
				this.fieldMap.get(key).setValue(val);
			}
		}
		else
		{
			// Hinweis: Definition der Werte mittels {} erzeugt ein Object
			for (let [key, val] of Object.entries(value))
			{
				if (!this.fieldMap.has(key))
				{
					Module.error(this.getMessagePrefix() + "field '" + key + "' does not exist");
				}
				this.fieldMap.get(key).setValue(val);
			}
		}
	}

	isEmpty()
	{
		return this.fieldMap.values().every(entry => entry.isEmpty() || !entry.isInputField());
	}

	clear()
	{
		for (let field of this.fieldMap.values())
		{
			field.clear();
		}
	}

	resetInternal(excludeInputFields = false)
	{
		this.setFailed(false);
		for (let field of this.fieldMap.values())
		{
			if (excludeInputFields && field.isInputField())
			{
				continue;
			}
			field.reset(excludeInputFields);
		}
	}

	toString()
	{
		let pairs = [];
		for (let [key, value] of this.fieldMap.entries())
		{
			pairs.push(key + ": " + value.toString().replaceAll("\n", "\n\t\t"));
		}

		return super.toString() +
			"\n\tentryName: " + this.entryName +
			"\n\tvalue: {\n\t\t" + pairs.join("\n\t\t") + "\n\t}";
	}

	getPrint()
	{
		let pairs = [];
		for (let [key, value] of this.fieldMap.entries())
		{
			pairs.push("'" + key + "': " + value.getPrint().replaceAll("\n", "\n\t\t"));
		}
		return "{\n\t\t" + pairs.join(",\n\t\t") + "\n\t}";
	}

	getEntries()
	{
		return this.fieldMap;
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
			}
			else
			{
				container.classList.remove("failed");
			}
		}
	}

	handleChangeEvent(event)
	{
		super.validate(true, true);
		Module._handleChangeEvent("change");
		event.stopPropagation();
	}
}

