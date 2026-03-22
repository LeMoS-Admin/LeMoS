import Module from "../systemFunctions/Module.js";
import FieldManager from "./FieldManager.js";
import CheckFieldInteractor from "../fieldInteractors/CheckFieldInteractor.js";

export default class CheckFieldManager extends FieldManager
{
	constructor(selector, fieldName, multipleCheck, allowEmpty, restrictions)
	{
		super(selector, fieldName, allowEmpty, "Ignore", restrictions);
		this.multipleCheck = multipleCheck;

		// Grundsätzlich kümmern sich nur fundamentale Felder (ohne innere Felder) um die Events (Ausnahme: siehe ObjectFieldManager)
		this.getNode().addEventListener("change", () => this.handleChangeEvent());
	}

	clone(newSelector)
	{
		return new CheckFieldManager(newSelector, this.fieldName, this.multipleCheck, this.allowEmpty, this.restrictions);
	}

	getInteractor()
	{
		return new CheckFieldInteractor(this);
	}

	getValue()
	{
		let checkedOptions = this.getOptions()
								 .filter(option => option.checked)
								 .map(option => option.value);

		if (this.multipleCheck)
		{
			// Gibt leeres Array zurück, wenn nichts ausgewählt ist
			return checkedOptions;
		}
		else
		{
			// Gibt undefined zurück, wenn nichts ausgewählt ist
			return checkedOptions.at(0);
		}
	}

	setValue(value)
	{
		this.clear();
		if (value === undefined)
		{
			// Do nothing
		}
		else if (value instanceof Array)
		{
			if (!this.multipleCheck && value.length > 1)
			{
				Module.error(this.getMessagePrefix() + "CheckFields without multipleCheck can not select multiple values")
			}

			for (let v of value)
			{
				this.#setChecked(v);
			}
		}
		else
		{
			this.#setChecked(value);
		}
	}

	#setChecked(value)
	{
		value = String(value);
		if (this.getOptions().map(option => option.value).includes(value))
		{
			this.getOptions()
				.find(option => option.value === value)
				.checked = true;
		}
		else
		{
			Module.error(this.getMessagePrefix() + "option '" + value + "' is not available")
		}
	}

	getOptions()
	{
		return this.getChildElements(".field > input");
	}

	isEmpty()
	{
		return this.getOptions().filter(option => option.checked).length === 0;
	}

	clear()
	{
		this.getOptions()
			.forEach(option => option.checked = false);
	}

	toString()
	{
		let ret = super.toString() +
			"\n\tmultipleCheck: " + this.multipleCheck;

		if (!this.multipleCheck)
		{
			let value = this.getValue();
			if (value === undefined)
			{
				value = "undefined";
			}
			return ret + "\n\tvalue: " + value;
		}
		else
		{
			return ret + "\n\tvalue: [" + this.getValue().join(", ") + "]";
		}
	}

	setFailed(isFailed, message)
	{
		// Felder die aus mehreren Elementen bestehen, signalisieren Fehler über ihren Container
		let container = this.getChildElement(".field");
		if (isFailed)
		{
			container.classList.add("failed");
		}
		else
		{
			container.classList.remove("failed");
		}
	}
}