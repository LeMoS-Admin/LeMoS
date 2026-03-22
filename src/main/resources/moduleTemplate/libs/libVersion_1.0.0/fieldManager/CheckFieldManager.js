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
		let checkedOptions = this.getCheckedOptions();
		if (this.multipleCheck)
		{
			return checkedOptions;
		}
		else
		{
			return checkedOptions.at(0)
		}
	}

	setValue(value)
	{
		this.clear();
		if (value === undefined)
		{
			return;
		}

		if (typeof value === "string")
		{
			this.#setChecked(value);
		}
		else
		{
			for (let v of value)
			{
				this.#setChecked(v);
			}
		}
	}

	#setChecked(value)
	{
		if (this.getOptions().includes(value))
		{
			this.#getOptionsInternal()
				.find(option => option.value === value)
				.checked = true;
		}
		else
		{
			Module.log(this.getMessagePrefix() + "option '" + value + "' is not available")
		}
	}

	getOptions()
	{
		return this.#getOptionsInternal()
				   .map(option => option.value);
	}

	getCheckedOptions()
	{
		return this.#getOptionsInternal()
				   .filter(option => option.checked)
				   .map(option => option.value);
	}

	getUncheckedOptions()
	{
		return this.#getOptionsInternal()
				   .filter(option => !option.checked)
				   .map(option => option.value);
	}

	#getOptionsInternal()
	{
		return this.getChildElements(".field > input");
	}

	isEmpty()
	{
		return this.getCheckedOptions().length === 0;
	}

	clear()
	{
		this.#getOptionsInternal()
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

	getPrint()
	{
		if (!this.multipleCheck)
		{
			let value = this.getValue();
			if (value === undefined)
			{
				value = "undefined";
			}
			return value;
		}
		else
		{
			return "['" + this.getValue().join("', '") + "']";
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