import MultilineableField from "./MultilineableField.js";

export default class SplitField extends MultilineableField
{
	constructor(selector, fieldName, multiline, growable, separator, allowEmpty, datatype, restrictions)
	{
		super(selector, fieldName, multiline, growable, allowEmpty, datatype, restrictions);
		this.seperator = separator;

		// Grundsätzlich kümmern sich nur fundamentale Felder (ohne innere Felder) um die Events (Ausnahme: siehe ObjectField)
		this.getNode().addEventListener("change", () => this.handleChangeEvent());
	}

	clone(newSelector)
	{
		return new SplitField(newSelector, this.fieldName, this.multiline, this.growable, this.seperator, this.allowEmpty, this.datatype, this.restrictions);
	}

	getValue(keepEmptyEntries = false)
	{
		if (keepEmptyEntries)
		{
			return this.getField().value
					   .split(this.seperator);
		}
		else
		{
			return this.getField().value
					   .split(this.seperator)
					   .filter(entry => entry.trim() !== "");
		}
	}

	setValue(v)
	{
		this.getField().value = v.join(this.seperator);
		this.resetHeight();
	}

	isEmpty()
	{
		return this.getValue().length === 0;
	}

	reset()
	{
		this.setValue([]);
		this.setFailed(false);
	}

	toString()
	{
		return "['" + this.getValue().join("', '") + "']";
	}

	validateInternal(outerField, tolerateEmptiness)
	{
		for (let value of this.getValue())
		{
			this.validateDatatype(value);
			this.validateRestrictions(value, this);
		}
	}
}