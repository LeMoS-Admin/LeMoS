import MultilineableField from "./MultilineableField.js";

export default class PlainField extends MultilineableField
{
	constructor(selector, fieldName, multiline, growable, allowEmpty, datatype, restrictions)
	{
		super(selector, fieldName, multiline, growable, allowEmpty, datatype, restrictions);

		// Grundsätzlich kümmern sich nur fundamentale Felder (ohne innere Felder) um die Events (Ausnahme: siehe ObjectField)
		this.getNode().addEventListener("change", () => this.handleChangeEvent());
	}

	clone(newSelector)
	{
		return new PlainField(newSelector, this.fieldName, this.multiline, this.growable, this.allowEmpty, this.datatype, this.restrictions);
	}

	getValue()
	{
		return this.getField().value;
	}

	setValue(v)
	{
		this.getField().value = v;
		this.resetHeight();
	}

	isEmpty()
	{
		return this.getValue().trim() === "";
	}

	reset()
	{
		this.setValue("");
		this.setFailed(false);
	}

	toString()
	{
		return "'" + this.getValue() + "'";
	}
}

