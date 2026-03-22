import ExpandableFieldManager from "./ExpandableFieldManager.js";
import TextFieldManager from "./TextFieldManager.js";
import ListFieldInteractor from "../fieldInteractors/ListFieldInteractor.js";

export default class ListFieldManager extends ExpandableFieldManager
{
	constructor(selector, fieldName, initialEntries, maxEntries, allowEmpty, datatype, restrictions, reactions)
	{
		super(selector, fieldName, initialEntries, maxEntries, allowEmpty, datatype, restrictions, reactions);

		let firstEntrySelector = this.selector + " > .entries > .entry0 > .fieldContainer";
		let firstEntryInteractor = new TextFieldManager(firstEntrySelector, this.fieldName, false, false, false, this.datatype, this.restrictions, this.reactions);
		this.entries.push(firstEntryInteractor);
		this.setLength(this.initialEntries);
	}

	clone(newSelector)
	{
		let additionalNodeParent = document.querySelector(newSelector + " > .entries");
		for (let additionalNode of document.querySelectorAll(newSelector + " > .entries > .entry:not(.entry0)"))
		{
			additionalNodeParent.removeChild(additionalNode);
		}
		let clone = new ListFieldManager(newSelector, this.fieldName, this.initialEntries, this.maxEntries, this.allowEmpty, this.datatype, this.restrictions, this.reactions);
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

	isHighlighted()
	{
		// Felder die aus mehreren Elementen bestehen, werden über ihren Container hervorgehoben
		return this.getChildElement(".entries").classList.contains("highlighted");
	}

	setHighlighted(highlighted)
	{
		// Felder die aus mehreren Elementen bestehen, werden über ihren Container hervorgehoben
		let classList = this.getChildElement(".entries").classList;
		if (highlighted && !classList.contains("highlighted"))
		{
			classList.add("highlighted");
		}
		else if (!highlighted && classList.contains("highlighted"))
		{
			classList.remove("highlighted")
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