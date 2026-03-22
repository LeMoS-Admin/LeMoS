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
		return this.getField().value;
	}

	setValue(value)
	{
		this.getField().value = value;
		this.resetHeight();
	}

	isEmpty()
	{
		return this.getValue().trim() === "";
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
}

