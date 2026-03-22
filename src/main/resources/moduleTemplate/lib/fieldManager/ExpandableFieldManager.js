import FieldManager from "./FieldManager.js";
import Module from "../systemFunctions/Module.js";
import Scroller from "../internalFunctions/Scroller.js";
import Controller from "../internalFunctions/Controller.js";

export default class ExpandableFieldManager extends FieldManager
{
	constructor(selector, fieldName, initialEntries, maxEntries, allowEmpty, datatype, restrictions, reactions)
	{
		super(selector, fieldName, allowEmpty, datatype, restrictions, reactions);
		this.entries = [];
		this.initialEntries = initialEntries;
		this.maxEntries = maxEntries;

		this.getChildElement(".buttons > .addEntryButton").addEventListener("click", () =>
		{
			Controller.handleChangeEvent();
			// Die Scroll-Position muss stets vom Auslöser einer Änderung angepasst werden, damit die Anpassung nicht mehrfach erfolgt
			// --> Muss im EventListener beschrieben werden, da this.addEntry(); auch intern aufgerufen wird
			Scroller.saveCurrentScrollPosition(this.selector + " > .buttons");
			this.addEntry();
			Scroller.scrollToSavedPosition();
		});
		this.getChildElement(".buttons > .removeEntryButton").addEventListener("click", () =>
		{
			Controller.handleChangeEvent();
			// Die Scroll-Position muss stets vom Auslöser einer Änderung angepasst werden, damit die Anpassung nicht mehrfach erfolgt
			// --> Muss im EventListener beschrieben werden, da this.removeEntry(); auch intern aufgerufen wird
			Scroller.saveCurrentScrollPosition(this.selector + " > .buttons");
			this.removeEntry();
			Scroller.scrollToSavedPosition();
		});
	}

	static getSelectorWithReplacedEntryName(selector, oldEntryName, newEntryName)
	{
		let oldEntryNameIndex = selector.lastIndexOf(oldEntryName);
		let stringBeforeIndex = selector.substring(0, oldEntryNameIndex);
		let stringAfterIndex = selector.substring(oldEntryNameIndex);
		return stringBeforeIndex + stringAfterIndex.replace(oldEntryName, newEntryName);
	}

	getValue(keepEmptyEntries = false)
	{
		return this.getEntries(keepEmptyEntries)
				   .map(entry => entry.getValue());
	}

	setValue(value)
	{
		if (value === undefined)
		{
			this.clear();
			return;
		}
		else if (!(value instanceof Array))
		{
			throw new Error("Value for ExpandableFields must be an Array")
		}

		this.setLength(value.length);

		// Hinweis: es muss über this.entries iteriert werden, da ggf. die maximale Länge überschritten wurde
		// Ergebnis: überschüssige Einträge von value werden ignoriert
		for (let [index, field] of this.entries.entries())
		{
			field.setValue(value.at(index));
		}
	}

	isEmpty()
	{
		return this.entries.every(entry => entry.isEmpty());
	}

	clear()
	{
		this.setLength(this.initialEntries);
		for (let entry of this.entries)
		{
			entry.clear();
		}
	}

	backup()
	{
		let entriesBackup = [];
		for (let entry of this.entries)
		{
			entriesBackup.push(entry.backup());
		}

		let backup = new Map();
		backup.set("value", entriesBackup);
		backup.set("displayed", this.isDisplayed());
		backup.set("enabled", this.isEnabled());
		return backup;
	}

	restore(backup)
	{
		let entriesBackup = backup.get("value");
		this.setLength(entriesBackup.length);
		for (let [index, field] of this.entries.entries())
		{
			field.restore(entriesBackup.at(index));
		}

		this.setDisplayed(backup.get("displayed"));
		this.setEnabled(backup.get("enabled"));
	}

	resetInternal(excludeInputFields = false)
	{
		super.resetInternal(excludeInputFields);
		for (let entry of this.entries)
		{
			entry.reset(excludeInputFields);
		}
		this.setLength(this.initialEntries); // entry.reset setzt auch die Sichtbarkeit des Eintrags zurück, sodass sie ggf. erneut angepasst werden muss
	}

	toString()
	{
		return super.toString() +
			"\n\tinitialEntries: " + this.initialEntries +
			"\n\tmaxEntries: " + this.maxEntries;
	}

	validateInternal(outerField, tolerateEmptiness)
	{
		super.validateMultiple(this.getEntries(), tolerateEmptiness);
	}

	getLength()
	{
		if (this.entries.length === 1 && !this.entries.at(0).isDisplayed())
		{
			return 0;
		}
		else
		{
			return this.entries.length;
		}
	}

	setLength(length)
	{
		let elementsLength = this.getLength();
		if (elementsLength < length)
		{
			for (let k = elementsLength; k < length; k++)
			{
				this.addEntry();
			}
		}
		else if (elementsLength > length)
		{
			for (let k = elementsLength; k > length; k--)
			{
				this.removeEntry();
			}
		}
	}

	getEntries(keepEmptyEntries = false)
	{
		// Ausgeblendete Zeilen werden nicht berücksichtigt, sodass auch eine leere Liste/Tabelle dargestellt werden kann
		if (keepEmptyEntries)
		{
			if (this.getLength() === 0) // Ausgeblendeter Eintrag soll nicht als leerer Eintrag zurückgegeben werden
			{
				return [];
			}
			else
			{
				return this.entries;
			}
		}
		else
		{
			return this.entries.filter(entry => entry.isDisplayed() && !entry.isEmpty());
		}
	}

	addEntry()
	{
		if (this.getLength() === 0)
		{
			// Erster Eintrag wird ausgeblendet statt entfernt und muss daher lediglich wieder sichtbar gemacht werden
			this.entries.at(0).setDisplayed(true);
			return;
		}
		else if (this.getLength() === this.maxEntries)
		{
			// Maximale Anzahl von Einträgen darf nicht überschritten werden
			Module.log(this.getMessagePrefix() + "maximum amount of entries already reached")
			return;
		}

		let addedEntry = this.addEntryInternal();
		this.entries.push(addedEntry);
		addedEntry.reset();
	}

	addEntryInternal() { }

	removeEntry()
	{
		if (this.getLength() <= 1)
		{
			// Es muss stets ein Eintrag erhalten bleiben
			this.entries.at(0).reset();			// reset() statt clear() nutzen, damit alle Eigenschaften zurückgesetzt werden (auch highlighted etc.)
			this.entries.at(0).setDisplayed(false);
			return;
		}

		// Wählen des letzten Eintrags ohne Inhalt
		let entryIndexToRemove = this.entries.findLastIndex(entry => entry.isEmpty());

		// Wählen des letzten Eintrags, falls kein leerer gefunden wurde
		if (entryIndexToRemove === -1)
		{
			entryIndexToRemove = this.entries.length - 1;
		}

		// Inhalte verschieben, um letzten Eintrag entfernen zu können
		for (let k = entryIndexToRemove; k < this.getLength() - 1; k++)
		{
			let curEntry = this.entries.at(k);
			let nextEntry = this.entries.at(k + 1);
			curEntry.restore(nextEntry.backup());			// Backup&Restore-System nutzen, damit alle Eigenschaften übernommen werden (auch highlighted etc.)
		}

		// Letzten Eintrag entfernen
		this.removeEntryInternal(this.entries.length - 1);
		this.entries.pop();
	}

	removeEntryInternal(lastEntryIndex) { }

	isEnabled()
	{
		if (this.entries === undefined)	// Kommt nur während Initialisierung vor
		{
			return super.isEnabled();
		}

		for (let entry of this.entries)
		{
			if (entry.isEnabled())
			{
				return true;
			}
		}
		return false;
	}

	setEnabled(enabled)
	{
		for (let entry of this.entries)
		{
			entry.setEnabled(enabled);
		}
	}
}