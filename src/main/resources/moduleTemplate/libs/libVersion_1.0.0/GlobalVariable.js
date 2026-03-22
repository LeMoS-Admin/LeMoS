import Module from "./systemFunctions/Module.js";

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
			Module._registerVariable(this);
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
		return this.value;
	}

	getValue()
	{
		return this.value;
	}

	setValue(value)
	{
		if (this.isConstant)
		{
			Module.error(this.name + " is constant and therefore not changeable.")
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