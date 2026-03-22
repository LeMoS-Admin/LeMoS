import ExpandableField from "./ExpandableField.js";
import ObjectField from "./ObjectField.js";

export default class TableField extends ExpandableField
{
	constructor(selector, fieldName, initialEntries, maxEntries, allowEmpty, restrictions, innerFields)
	{
		super(selector, fieldName, initialEntries, maxEntries, allowEmpty, "String", restrictions);

		if (innerFields instanceof ObjectField)
		{
			// Ist der Fall, wenn die Tabelle geklont wird
			this.entries.push(innerFields)
		}
		else
		{
			this.entries.push(new ObjectField(this.selector + " > .table", this.fieldName, this.restrictions, "entry0", innerFields));
		}
		this.setLength(this.initialEntries);

		this.getChildElement(".buttons > .addEntryButton").addEventListener("click", () => this.addEntry());
		this.getChildElement(".buttons > .removeEntryButton").addEventListener("click", () => this.removeEntry());
	}

	clone(newSelector)
	{
		let additionalNodeParent = document.querySelector(newSelector + " > .table");
		for (let additionalNode of document.querySelectorAll(newSelector + " > .table > .entry"))
		{
			// Löschen aller Einträge (inklusive entry0), da diese von ObjectField selbst kopiert werden
			additionalNodeParent.removeChild(additionalNode);
		}
		let firstEntryClone = this.entries.at(0).clone(newSelector + " > .table", "entry0");
		let clone = new TableField(newSelector, this.fieldName, this.initialEntries, this.maxEntries, this.allowEmpty, this.restrictions, firstEntryClone);
		clone.reset();
		return clone;
	}

	setFailed(isFailed, message)
	{
		// Felder die aus inneren Feldern bestehen, signalisieren Fehler über den Container der inneren Felder
		let container = this.getChildElement(".table");
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

	addEntryInternal()
	{
		let entryName = "entry" + this.getLength();
		return this.entries.at(0).clone(this.selector + " > .table", entryName);
	}

	removeEntryInternal(entryIndexToRemove)
	{
		// Eintrag aus DOM entfernen
		let parentNode = this.getChildElement(".table");
		for (let entryNodeToRemove of this.getChildElements(".table > .entry" + entryIndexToRemove))
		{
			parentNode.removeChild(entryNodeToRemove);
		}
	}
}