import FieldManager from "./FieldManager.js";

export default class MultilineableFieldManager extends FieldManager
{
	constructor(selector, fieldName, multiline, growable, allowEmpty, datatype, restrictions, reactions)
	{
		super(selector, fieldName, allowEmpty, datatype, restrictions, reactions);
		this.multiline = multiline;
		this.growable = growable;

		if (this.growable)
		{
			this.getField().addEventListener("input", () => this.resetHeight());
		}
	}

	backup()
	{
		// Weitere Verarbeitungsschritte (Aufteilung in Array, Konvertierung in Zahlen) vermeiden
		return super.backup().set("value", this.getField().value);
	}

	toString()
	{
		return super.toString() +
			"\n\tmultiline: " + this.multiline +
			"\n\tgrowable: " + this.growable;
	}

	resetHeight()
	{
		if (this.growable)
		{
			let element = this.getField();
			element.style.height = "0px";
			element.style.height = element.scrollHeight + 3.5 + "px";
			// Hinweis: bei nur einer Zeile sollte die Feldhöhe durch die zusätzlichen 3.5px einem normalen Textfeld entsprechen
		}
	}

	scrollToBottom()
	{
		// Bei Benutzereingaben nicht ausgeführt, da der Benutzer an jeder Stelle schreiben kann
		let element = this.getField();
		element.scrollTop = element.scrollHeight;
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