import Logger from "./systemFunctions/Logger.js";
import Controller from "./internalFunctions/Controller.js";

export default class GlobalVariable
{
	constructor(name, value, isConstant)
	{
		this.name = name;
		this.value = value;
		this.initialValue = value;
		this.isConstant = isConstant;

		if (!isConstant)	// Konstante Variablen müssen nicht verwaltet werden
		{
			Controller.registerVariable(this);
		}
	}

	valueOf()
	{
		// Ermöglicht implizite Umwandlung des Felds in einen Wert
		return this.value;
	}

	toString()
	{
		// Ermöglicht implizite Umwandlung des Felds in einen String
		return String(this.value);
	}

	getValue()
	{
		return this.value;
	}

	setValue(value)
	{
		if (this.isConstant)
		{
			Logger.error(this.name + " is constant and therefore not changeable.")
		}
		this.value = value;
		return this;
	}

	_reset()
	{
		this.value = this.initialValue;
		return this;
	}
}