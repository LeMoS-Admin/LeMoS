import ExpandableFieldManager from "./ExpandableFieldManager.js";
import TextFieldManager from "./TextFieldManager.js";
import ListFieldInteractor from "../fieldInteractors/ListFieldInteractor.js";

export default class ListFieldManager extends ExpandableFieldManager
{
	constructor(selector, fieldName, initialEntries, maxEntries, allowEmpty, datatype, restrictions)
	{
		super(selector, fieldName, initialEntries, maxEntries, allowEmpty, datatype, restrictions);

		let firstEntrySelector = this.selector + " > .entries > .entry0 > .fieldContainer";
		let firstEntryInteractor = new TextFieldManager(firstEntrySelector, this.fieldName, false, false, true, this.datatype, this.restrictions);
		this.entries.push(firstEntryInteractor);
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
		let clone = new ListFieldManager(newSelector, this.fieldName, this.initialEntries, this.maxEntries, this.allowEmpty, this.datatype, this.restrictions);
		clone.resetInternal();
		return clone;
	}

	getInteractor()
	{
		return new ListFieldInteractor(this);
	}

	toString()
	{
		return super.toString() +
			"\n\tvalue: [" + this.getValue().join(", ") + "]";
	}

	getPrint()
	{
		return "['" + this.getValue().join("', '") + "']";
	}

	setFailed(isFailed, message)
	{
		// Felder die aus mehreren Elementen bestehen, signalisieren Fehler über ihren Container
		let container = this.getChildElement(".entries");
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
		let entryNodeToAdd = this.getChildElement(".entries > .entry0").cloneNode(true);
		let parentNode = this.getChildElement(".entries");
		entryNodeToAdd.classList.replace("entry0", "entry" + this.getLength());
		parentNode.appendChild(entryNodeToAdd);

		let newEntrySelector = ExpandableFieldManager.getSelectorWithReplacedEntryName(this.entries.at(0).selector, "entry0", "entry" + this.getLength());
		return this.entries.at(0).clone(newEntrySelector);
	}

	removeEntryInternal(entryIndex)
	{
		// Eintrag aus DOM entfernen
		let entryNodeToRemove = this.getChildElement(".entries > .entry" + entryIndex);
		let parentNode = this.getChildElement(".entries");
		parentNode.removeChild(entryNodeToRemove);
	}
}