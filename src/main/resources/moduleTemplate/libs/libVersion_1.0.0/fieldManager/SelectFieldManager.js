import Module from "../systemFunctions/Module.js";
import FieldManager from "./FieldManager.js";
import SelectFieldInteractor from "../fieldInteractors/SelectFieldInteractor.js";

export default class SelectFieldManager extends FieldManager
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
		return new SelectFieldManager(newSelector, this.fieldName, this.emptyOption, this.allowEmpty, this.restrictions);
	}

	getInteractor()
	{
		return new SelectFieldInteractor(this);
	}

	getValue()
	{
		return this.getChildElement(".field > select").value;
	}

	setValue(value)
	{
		if (value === undefined)
		{
			this.clear();
			return;
		}
		else if (typeof value === "bigint")
		{
			value = Number(value);
		}

		let selectElement = this.getChildElement(".field > select");
		if (typeof value === "number")
		{
			if (this.getOptions().length > value)
			{
				selectElement.selectedIndex = value;
			}
			else
			{
				Module.error(this.getMessagePrefix() + "option with index " + value + " is not available")
			}
		}
		else
		{
			value = String(value);
			if (this.getOptions().map(option => option.value).includes(value))
			{
				selectElement.value = value;
			}
			else
			{
				Module.error(this.getMessagePrefix() + "option '" + value + "' is not available")
			}
		}
	}

	getSelectedIndex()
	{
		return this.getChildElement(".field > select").selectedIndex;
	}

	getOptions()
	{
		return this.getChildElements(".field > select > option");
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