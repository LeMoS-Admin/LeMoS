import Field from "./Field.js";

export default class ExpandableField extends Field
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

	getValue(keepEmptyEntries = false)
	{
		return this.getEntries(keepEmptyEntries)
				   .map(entry => entry.getValue(keepEmptyEntries));
	}

	setValue(v)
	{
		this.setLength(v.length);
		// Hinweis: es darf nur bis this.getLength() iteriert werden, da ggf. die maximale Länge überschritten wurde
		// Ergebnis: überschüssige Einträge von v werden ignoriert
		for (let k = 0; k < this.getLength(); k++)
		{
			this.entries.at(k).setValue(v.at(k));
		}
	}

	isEmpty()
	{
		return this.entries.every(entry => entry.isEmpty());
	}

	reset()
	{
		this.setLength(this.initialEntries);
		this.setFailed(false);
		for (let entry of this.entries)
		{
			entry.reset();
		}
	}

	toString()
	{
		let entryStrings = this.getEntries().map(entry => entry.toString());
		return "[" + entryStrings.join(", ") + "]";
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

	addEntry(value)
	{
		if (this.getLength() === this.maxEntries)
		{
			// Maximale Anzahl von Einträgen darf nicht überschritten werden
			console.log(this.fieldName + ": maximum amount of entries already reached")
			return;
		}

		let addedEntry = this.addEntryInternal();
		this.entries.push(addedEntry);

		if (value !== undefined)
		{
			addedEntry.setValue(value);
		}
		else
		{
			addedEntry.reset();
		}
	}

	addEntryInternal() { }

	removeEntry(index)
	{
		if (this.getLength() === 1)
		{
			// Es muss stets ein Eintrag erhalten bleiben
			console.log(this.fieldName + ": last remaining entry can not be removed")
			return;
		}

		// Ermitteln, welcher Eintrag entfernt werden soll
		let entryIndexToRemove;
		if (index !== undefined && index < this.entries.length)
		{
			// Wählen des Eintrags mit dem übergebenen Index (Wenn Index nicht enthalten: undefined)
			entryIndexToRemove = index;
		}
		else
		{
			// Wählen des letzten Eintrags ohne Inhalt
			entryIndexToRemove = this.entries.findLastIndex(entry => entry.isEmpty());

			// Wählen des letzten Eintrags, falls die anderen Verfahren keinen bestimmt haben
			if (entryIndexToRemove === -1)
			{
				entryIndexToRemove = this.entries.length - 1;
			}
		}

		// Inhalte verschieben, um letzten Eintrag entfernen zu können
		for (let k = entryIndexToRemove; k < this.getLength() - 1; k++)
		{
			let curEntry = this.entries.at(k);
			let nextEntry = this.entries.at(k + 1);
			curEntry.setValue(nextEntry.getValue(true));
		}

		// Letzten Eintrag entfernen
		this.removeEntryInternal(entryIndexToRemove);
		this.entries.pop();
	}

	removeEntryInternal(entryIndex) { }
}