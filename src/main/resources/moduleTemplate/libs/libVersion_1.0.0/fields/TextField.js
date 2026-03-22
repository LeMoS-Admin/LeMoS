import Field from "./Field.js";

export default class TextField extends Field
{
	constructor(selector, fieldName)
	{
		super(selector, fieldName, true, "String", () => {});

		// Grundsätzlich kümmern sich nur fundamentale Felder (ohne innere Felder) um die Events (Ausnahme: siehe ObjectField)
		this.getNode().addEventListener("change", () => this.handleChangeEvent());
	}

	clone(newSelector)
	{
		return new TextField(newSelector, this.fieldName);
	}

	getValue()
	{
		return this.getChildElement(".field > p").innerText;
	}

	setValue(v)
	{
		// Do nothing
	}

	isEmpty()
	{
		return true;	// Wenn nach leeren Feldern gesucht wird sollen Textfelder nicht gefunden werden
	}

	reset()
	{
		// Do nothing
	}

	toString()
	{
		return "'" + this.getValue() + "'";
	}

	validate()
	{
		// Do nothing
	}

	setFailed(isFailed, message)
	{
		// Do nothing
	}
}