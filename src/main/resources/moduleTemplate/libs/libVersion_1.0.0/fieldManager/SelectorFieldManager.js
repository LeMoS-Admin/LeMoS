import Module from "../systemFunctions/Module.js";
import FieldManager from "./FieldManager.js";
import SelectorFieldInteractor from "../fieldInteractors/SelectorFieldInteractor.js";

export default class SelectorFieldManager extends FieldManager
{
	constructor(selector, fieldName, emptyOption, allowEmpty, restrictions)
	{
		super(selector, fieldName, allowEmpty, "Ignore", restrictions);
		this.emptyOption = emptyOption;

		// Grundsätzlich kümmern sich nur fundamentale Felder (ohne innere Felder) um die Events (Ausnahme: siehe ObjectFieldManager)
		this.getNode().addEventListener("change", () => this.handleChangeEvent());
	}

	clone(newSelector)
	{
		return new SelectorFieldManager(newSelector, this.fieldName, this.emptyOption, this.allowEmpty, this.restrictions);
	}

	getInteractor()
	{
		return new SelectorFieldInteractor(this);
	}

	getValue()
	{
		return this.getChildElement(".field > select").value;
	}

	setValue(value)
	{
		let selectElement = this.getChildElement(".field > select");
		if (typeof value === "string")
		{
			if (this.getOptions().includes(value))
			{
				selectElement.value = value;
			}
			else
			{
				Module.log(this.getMessagePrefix() + "option '" + value + "' is not available")
			}
		}
		else
		{
			if (this.getOptions().length > value)
			{
				selectElement.selectedIndex = value;
			}
			else
			{
				Module.log(this.getMessagePrefix() + "option with index " + value + " is not available")
			}
		}
	}

	getSelectedIndex()
	{
		return this.getChildElement(".field > select").selectedIndex;
	}

	getOptions()
	{
		return this.getChildElements(".field > select > option").map(option => option.value);
	}

	isEmpty()
	{
		if (this.emptyOption)
		{
			return this.getSelectedIndex() === 0;
		}
		else
		{
			return this.getValue() === "";
		}
	}

	clear()
	{
		this.setValue(0);
	}

	toString()
	{
		return super.toString() +
			"\n\temptyOption: " + this.emptyOption +
			"\n\tselectedIndex: " + this.getSelectedIndex() +
			"\n\tvalue: " + this.getValue();
	}
}