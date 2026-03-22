import Module from "../systemFunctions/Module.js";
import FieldManager from "./FieldManager.js";

export default class ExpandableFieldManager extends FieldManager
{
	constructor(selector, fieldName, initialEntries, maxEntries, allowEmpty, datatype, restrictions)
	{
		super(selector, fieldName, allowEmpty, datatype, restrictions);
		this.entries = [];
		this.initialEntries = initialEntries;
		this.maxEntries = maxEntries;
	}

	static getSelectorWithReplacedEntryName(selector, oldEntryName, newEntryName)
	{
		let oldEntryNameIndex = selector.lastIndexOf(oldEntryName);
		let stringBeforeIndex = selector.substring(0, oldEntryNameIndex);
		let stringAfterIndex = selector.substring(oldEntryNameIndex);
		return stringBeforeIndex + stringAfterIndex.replace(oldEntryName, newEntryName);
	}

	getValue()
	{
		return this.getEntries()
				   .map(entry => entry.getValue());
	}

	setValue(value)
	{
		this.setLength(value.length);

		if (value.length === 0)
		{
			// Da stets ein Eintrag benötigt ist, wird dieser bei einer Soll-Länge lediglich geleert
			this.entries.at(0).clear();
		}
		else
		{
			// Hinweis: es muss über this.entries iteriert werden, da ggf. die maximale Länge überschritten wurde
			// Ergebnis: überschüssige Einträge von value werden ignoriert
			for (let index of this.entries.keys())
			{
				this.entries.at(index).setValue(value.at(index));
			}
		}
	}

	isEmpty()
	{
		return this.entries.every(entry => entry.isEmpty());
	}

	clear()
	{
		this.setLength(1);
		this.entries.at(0).clear();
	}

	resetInternal(excludeInputFields = false)
	{
		this.setLength(this.initialEntries);
		this.setFailed(false);
		for (let entry of this.entries)
		{
			entry.reset(excludeInputFields);
		}
	}

	toString()
	{
		return super.toString() +
			"\n\tinitialEntries: " + this.initialEntries +
			"\n\tmaxEntries: " + this.maxEntries;
	}

	validateInternal(outerField, tolerateEmptiness)
	{
		super.validateMultiple(this.entries, tolerateEmptiness);
	}

	getLength()
	{
		return this.entries.length;
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
		if (keepEmptyEntries)
		{
			return this.entries;
		}
		else
		{
			return this.entries.filter(entry => !entry.isEmpty());
		}
	}

	addEntry()
	{
		if (this.getLength() === this.maxEntries)
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
		if (this.getLength() === 1)
		{
			// Es muss stets ein Eintrag erhalten bleiben
			Module.log(this.getMessagePrefix() + "last remaining entry can not be removed")
			this.entries.at(0).clear();
			return;
		}

		// Wählen des letzten Eintrags ohne Inhalt
		let entryIndexToRemove = this.entries.findLastIndex(entry => entry.isEmpty());

		// Wählen des letzten Eintrags, falls die anderen Verfahren keinen bestimmt haben
		if (entryIndexToRemove === -1)
		{
			entryIndexToRemove = this.entries.length - 1;
		}

		// Inhalte verschieben, um letzten Eintrag entfernen zu können
		for (let k = entryIndexToRemove; k < this.getLength() - 1; k++)
		{
			let curEntry = this.entries.at(k);
			let nextEntry = this.entries.at(k + 1);
			curEntry.setValue(nextEntry.getValue());
		}

		// Letzten Eintrag entfernen
		this.removeEntryInternal(this.entries.length - 1);
		this.entries.pop();
	}

	removeEntryInternal(lastEntryIndex) { }
}