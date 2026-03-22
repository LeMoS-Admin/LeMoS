import Field from "./Field.js";

export default class MultilineableField extends Field
{
	constructor(selector, fieldName, multiline, growable, allowEmpty, datatype, restrictions)
	{
		super(selector, fieldName, allowEmpty, datatype, restrictions);
		this.multiline = multiline;
		this.growable = growable;

		if (this.growable)
		{
			this.getField().addEventListener("input", () => this.resetHeight());
		}
	}

	resetHeight()
	{
		if (this.growable)
		{
			let element = this.getField();
			element.style.height = "0px";
			element.style.height = element.scrollHeight + 3.5 + "px";
			// Hinweis: bei nur einer Zeile sollte die Feldhöhe durch fir zusätzlichen 3.5px einem normalen Textfeld entsprechen
		}
	}

	getField()
	{
		if (this.multiline)
		{
			return this.getChildElement(".field > textarea");
		}
		else
		{
			return this.getChildElement(".field > input");
		}
	}
}