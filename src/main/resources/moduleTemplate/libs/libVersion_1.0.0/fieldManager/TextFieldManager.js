import MultilineableFieldManager from "./MultilineableFieldManager.js";
import TextFieldInteractor from "../fieldInteractors/TextFieldInteractor.js";

export default class TextFieldManager extends MultilineableFieldManager
{
	constructor(selector, fieldName, multiline, growable, allowEmpty, datatype, restrictions)
	{
		super(selector, fieldName, multiline, growable, allowEmpty, datatype, restrictions);

		// Grundsätzlich kümmern sich nur fundamentale Felder (ohne innere Felder) um die Events (Ausnahme: siehe ObjectFieldManager)
		this.getNode().addEventListener("change", () => this.handleChangeEvent());
	}

	clone(newSelector)
	{
		return new TextFieldManager(newSelector, this.fieldName, this.multiline, this.growable, this.allowEmpty, this.datatype, this.restrictions);
	}

	getInteractor()
	{
		return new TextFieldInteractor(this);
	}

	getValue()
	{
		let value = this.getField().value;
		if (this.datatype === "Integer" || this.datatype === "Number")
		{
			return value.asNumber();
		}
		else
		{
			return value;
		}
	}

	setValue(value)
	{
		if (value === undefined || Number.isNaN(value))
		{
			this.clear();
			return;
		}

		this.getField().value = String(value);
		this.resetHeight();
		this.scrollToBottom();
	}

	isEmpty()
	{
		return this.getField().value.trim() === "";
	}

	clear()
	{
		this.setValue("");
	}

	toString()
	{
		return super.toString() +
			"\n\tvalue: " + this.getValue();
	}

	getPrint()
	{
		return "'" + super.getPrint() + "'";
	}
}

