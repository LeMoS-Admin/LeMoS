import FieldManager from "./FieldManager.js";
import InfoFieldInteractor from "../fieldInteractors/InfoFieldInteractor.js";

export default class InfoFieldManager extends FieldManager
{
	constructor(selector, fieldName, contentType)
	{
		super(selector, fieldName, true, "Ignore", () => {});
		this.contentType = contentType;
		this.initialValue = this.getValue();

		// Grundsätzlich kümmern sich nur fundamentale Felder (ohne innere Felder) um die Events (Ausnahme: siehe ObjectFieldManager)
		this.getNode().addEventListener("change", () => this.handleChangeEvent());

		if (this.contentType === "Audio" || this.contentType === "Video")
		{
			this.getChildElement(".field > *").addEventListener("error", () => this.#handleErrorEvent());
		}
	}

	clone(newSelector)
	{
		return new InfoFieldManager(newSelector, this.fieldName, this.contentType);
	}

	getInteractor()
	{
		return new InfoFieldInteractor(this);
	}

	getValue()
	{
		if (this.contentType === "Text")
		{
			return this.getChildElement(".field > span").innerHTML;
		}
		else
		{
			return this.getChildElement(".field > *").attributes.getNamedItem("src").value;
		}
	}

	setValue(value)
	{
		if (this.contentType === "Text")
		{
			this.getChildElement(".field > span").innerHTML = value;
		}
		else
		{
			this.getChildElement(".field > *").attributes.getNamedItem("src").value = value;
		}
	}

	isEmpty()
	{
		return this.getValue().trim() === "";
	}

	clear()
	{
		this.setValue(this.initialValue);
	}

	toString()
	{
		return super.toString() +
			"\n\tcontentType: " + this.contentType +
			"\n\tvalue: " + this.getValue();
	}

	validate(doAlert = true, tolerateEmptiness = false)
	{
		// Do nothing
	}

	setFailed(isFailed, message)
	{
		// Do nothing
	}

	#handleErrorEvent()
	{
		// Nicht ladbares Audio-/Videoelement ausblenden
		this.getChildElement(".field > *").style.display = "none";
		// Alternativ-Text einblenden
		this.getChildElement(".field > span").style.display = "";
	}
}