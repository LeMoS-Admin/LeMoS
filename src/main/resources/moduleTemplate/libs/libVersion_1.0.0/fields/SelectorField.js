import Field from "./Field.js";

export default class SelectorField extends Field
{
	constructor(selector, fieldName, emptyOption, allowEmpty, restrictions)
	{
		super(selector, fieldName, allowEmpty, "String", restrictions);
		this.emptyOption = emptyOption;

		// Grundsätzlich kümmern sich nur fundamentale Felder (ohne innere Felder) um die Events (Ausnahme: siehe ObjectField)
		this.getNode().addEventListener("change", () => this.handleChangeEvent());
	}

	clone(newSelector)
	{
		return new SelectorField(newSelector, this.fieldName, this.emptyOption, this.allowEmpty, this.restrictions);
	}

	getValue()
	{
		return this.getChildElement(".field > select").value;
	}

	setValue(v)
	{
		let selectElement = this.getChildElement(".field > select");
		if (typeof v === "string")
		{
			if (this.getOptions().includes(v))
			{
				selectElement.value = v;
			}
			else
			{
				console.log(this.fieldName + ": option '" + v + "' is not available")
			}
		}
		else
		{
			if (this.getOptions().length > v)
			{
				selectElement.selectedIndex = v;
			}
			else
			{
				console.log(this.fieldName + ": option with index " + v + " is not available")
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

	reset()
	{
		this.setValue(0);
		this.setFailed(false);
	}

	toString()
	{
		return "'" + this.getValue() + "' (index: " + this.getSelectedIndex() + ")";
	}
}