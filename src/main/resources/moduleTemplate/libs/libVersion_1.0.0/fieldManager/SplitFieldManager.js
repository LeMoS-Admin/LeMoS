import MultilineableFieldManager from "./MultilineableFieldManager.js";
import ListFieldInteractor from "../fieldInteractors/ListFieldInteractor.js";

export default class SplitFieldManager extends MultilineableFieldManager
{
	constructor(selector, fieldName, multiline, growable, separator, allowEmpty, datatype, restrictions)
	{
		super(selector, fieldName, multiline, growable, allowEmpty, datatype, restrictions);
		this.separator = separator;

		// Grundsätzlich kümmern sich nur fundamentale Felder (ohne innere Felder) um die Events (Ausnahme: siehe ObjectFieldManager)
		this.getNode().addEventListener("change", () => this.handleChangeEvent());
	}

	clone(newSelector)
	{
		return new SplitFieldManager(newSelector, this.fieldName, this.multiline, this.growable, this.separator, this.allowEmpty, this.datatype, this.restrictions);
	}

	getInteractor()
	{
		return new ListFieldInteractor(this);
	}

	getValue()
	{
		return this.getField().value
				   .split(this.separator)
				   .filter(entry => entry.trim() !== "");
	}

	setValue(value)
	{
		if (value instanceof Array)
		{
			this.getField().value = value.join(this.separator);
		}
		else
		{
			this.getField().value = value;
		}
		this.resetHeight();
	}

	isEmpty()
	{
		return this.getValue().length === 0;
	}

	clear()
	{
		this.setValue([]);
	}

	toString()
	{
		return super.toString() +
			"\n\tseparator: " + this.separator +
			"\n\tvalue: [" + this.getValue().join(", ") + "]";
	}

	getPrint()
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