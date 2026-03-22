import ExpandableField from "./ExpandableField.js";
import PlainField from "./PlainField.js";

export default class ListField extends ExpandableField
{
	constructor(selector, fieldName, initialEntries, maxEntries, allowEmpty, datatype, restrictions)
	{
		super(selector, fieldName, initialEntries, maxEntries, allowEmpty, datatype, restrictions);

		let firstEntrySelector = this.selector + " > .entries > .entry0 > .fieldContainer";
		let firstEntryVariable = new PlainField(firstEntrySelector, this.fieldName, false, false, true, this.datatype, this.restrictions);
		this.entries.push(firstEntryVariable);
		this.setLength(this.initialEntries);

		this.getChildElement(".buttons > .addEntryButton").addEventListener("click", () => this.addEntry());
		this.getChildElement(".buttons > .removeEntryButton").addEventListener("click", () => this.removeEntry());
	}

	clone(newSelector)
	{
		let additionalNodeParent = document.querySelector(newSelector + " > .entries");
		for (let additionalNode of document.querySelectorAll(newSelector + " > .entries > .entry:not(.entry0)"))
		{
			additionalNodeParent.removeChild(additionalNode);
		}
		let clone = new ListField(newSelector, this.fieldName, this.initialEntries, this.maxEntries, this.allowEmpty, this.datatype, this.restrictions);
		clone.reset();
		return clone;
	}

	setFailed(isFailed, message)
	{
		// Felder die aus inneren Feldern bestehen, signalisieren Fehler über den Container der inneren Felder
		let container = this.getChildElement(".entries");
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
		let entryNodeToAdd = this.getChildElement(".entries > .entry0").cloneNode(true);
		let parentNode = this.getChildElement(".entries");
		entryNodeToAdd.classList.replace("entry0", "entry" + this.getLength());
		parentNode.appendChild(entryNodeToAdd);

		let newEntrySelector = ExpandableField.getSelectorWithReplacedEntryName(this.entries.at(0).selector, "entry0", "entry" + this.getLength());
		return this.entries.at(0).clone(newEntrySelector);
	}

	removeEntryInternal(entryIndexToRemove)
	{
		// Eintrag aus DOM entfernen
		let entryNodeToRemove = this.getChildElement(".entries > .entry" + entryIndexToRemove);
		let parentNode = this.getChildElement(".entries");
		parentNode.removeChild(entryNodeToRemove);
	}
}