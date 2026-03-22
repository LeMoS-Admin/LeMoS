import Module from "./systemFunctions/Module.js";
import Controller from "./internalFunctions/Controller.js";

export default class GlobalVariable
{
	constructor(name, value, isConstant)
	{
		this._name = name;
		this._value = value;
		this._initialValue = value;
		this._isConstant = isConstant;

		if (!isConstant)	// Konstante Variablen müssen nicht verwaltet werden
		{
			Controller.registerVariable(this);
		}
	}

	get value()
	{
		return this._value;
	}

	set value(value)
	{
		return this.setValue(value);
	}

	valueOf()
	{
		// Ermöglicht implizite Umwandlung der Variable in einen Wert
		return this._value;
	}

	toString()
	{
		// Ermöglicht implizite Umwandlung der Variable in einen String
		return String(this._value);
	}

	getValue()
	{
		return this._value;
	}

	setValue(value)
	{
		if (this._isConstant)
		{
			Module.error(this._name + " is constant and therefore not changeable.")
		}
		this._value = value;
		return this;
	}

	getName()
	{
		return this._name;
	}

	_reset()
	{
		this.value = this._initialValue;
		return this;
	}
}