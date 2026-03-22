import ExpandableFieldManager from "./ExpandableFieldManager.js";
import ObjectFieldManager from "./ObjectFieldManager.js";
import TableFieldInteractor from "../fieldInteractors/TableFieldInteractor.js";

export default class TableFieldManager extends ExpandableFieldManager
{
	constructor(selector, fieldName, initialEntries, maxEntries, allowEmpty, restrictions, innerFields)
	{
		super(selector, fieldName, initialEntries, maxEntries, allowEmpty, "Ignore", restrictions);

		if (innerFields instanceof ObjectFieldManager)
		{
			// Ist der Fall, wenn die Tabelle geklont wird
			this.entries.push(innerFields)
		}
		else
		{
			this.entries.push(new ObjectFieldManager(this.selector + " > .table", this.fieldName, this.restrictions, "entry0", innerFields));
		}
		this.setLength(this.initialEntries);
	}

	clone(newSelector)
	{
		let additionalNodeParent = document.querySelector(newSelector + " > .table");
		for (let additionalNode of document.querySelectorAll(newSelector + " > .table > .entry"))
		{
			// Löschen aller Einträge (inklusive entry0), da diese von ObjectFieldManager selbst kopiert werden
			additionalNodeParent.removeChild(additionalNode);
		}
		let firstEntryClone = this.entries.at(0).clone(newSelector + " > .table", "entry0");
		let clone = new TableFieldManager(newSelector, this.fieldName, this.initialEntries, this.maxEntries, this.allowEmpty, this.restrictions, firstEntryClone);
		clone.resetInternal();
		return clone;
	}

	isInputField()
	{
		// Tabellenfelder, die Eingabefelder enthalten, müssen stets ebenfalls als Eingabefeld betrachtet werden
		return this.entries.some(entry => entry.isInputField());
	}

	getInteractor()
	{
		return new TableFieldInteractor(this);
	}

	reset(excludeInputFields = false)
	{
		// Auch wenn Eingabefelder ausgeschlossen sind und die Tabelle ein Eingabefeld ist, sollen ihre inneren Felder zurückgesetzt werden können
		if (!(excludeInputFields && this.isInputField()))
		{
			this.resetInternal(excludeInputFields);
		}
		else
		{
			for (let entry of this.entries)
			{
				entry.reset(excludeInputFields);
			}
		}
		return this;
	}

	toString()
	{
		let valueString = this.getEntries()
							  .map(entry => entry.toString())
							  .join(",\n\t");
		return super.toString() +
			"\n\tvalue:\n\t" + valueString;
	}

	getPrint()
	{
		let valueString = this.getEntries()
							  .map(entry => entry.getPrint())
							  .join(",\n\t");
		return "[\n\t" + valueString + "]"
	}

	setFailed(isFailed, message)
	{
		// Felder die aus mehreren Elementen bestehen, signalisieren Fehler über ihren Container
		let container = this.getChildElement(".table");
		if (isFailed)
		{
			container.classList.add("failed");
		}
		else
		{
			container.classList.remove("failed");
		}
	}

	addEntryInternal()
	{
		let entryName = "entry" + this.getLength();
		return this.entries.at(0).clone(this.selector + " > .table", entryName);
	}

	removeEntryInternal(entryIndex)
	{
		// Eintrag aus DOM entfernen
		let parentNode = this.getChildElement(".table");
		for (let entryNodeToRemove of this.getChildElements(".table > .entry" + entryIndex))
		{
			parentNode.removeChild(entryNodeToRemove);
		}
	}
}