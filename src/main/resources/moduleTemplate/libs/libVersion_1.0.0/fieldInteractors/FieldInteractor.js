import Controller from "../internalFunctions/Controller.js";
import Utils from "../systemFunctions/Utils.js";

export default class FieldInteractor
{
	constructor(fieldManager)
	{
		this._fieldManager = fieldManager;

		if (this._fieldManager.isTopLevelField())
		{
			Controller.registerField(this);
		}
	}

	get value()
	{
		return this.getValue();
	}

	set value(value)
	{
		return this.setValue(value);
	}

	_backup()
	{
		return this._fieldManager.backup();
	}

	_restore(backup)
	{
		this._fieldManager.restore(backup);
		return this;
	}

	_reset(excludeInputFields = false)
	{
		this._fieldManager.reset(excludeInputFields);
		return this;
	}

	valueOf()
	{
		// Ermöglicht implizite Umwandlung des Felds in einen Wert
		// Hinweis: direkter Zugriff auf getValue()-Methode der FieldManager, damit auch Tabellen durch JS-Objekte repräsentiert werden (this.getValue() ist überschrieben)
		return this._fieldManager.getValue();
	}

	toString()
	{
		// Ermöglicht implizite Umwandlung des Felds in einen String
		// Hinweis: direkter Zugriff auf getValue()-Methode der FieldManager, damit auch Tabellen durch JS-Objekte repräsentiert werden (this.getValue() ist überschrieben)
		return String(this._fieldManager.getValue());
	}

	getValue()
	{
		return this._fieldManager.getValue();
	}

	setValue(value)
	{
		this._fieldManager.setValue(value);
		return this;
	}

	equals(value)
	{
		return Utils.equals(this, value);
	}

	isEmpty()
	{
		return this._fieldManager.isEmpty();
	}

	clear()
	{
		this._fieldManager.clear();
		return this;
	}

	getName()
	{
		return this._fieldManager.fieldName;
	}

	getPrint()
	{
		return this._fieldManager.getPrint();
	}

	getDebug()
	{
		return this._fieldManager.toString();
	}

	isDisplayed()
	{
		return this._fieldManager.isDisplayed();
	}

	setDisplayed(displayed = true)
	{
		this._fieldManager.setDisplayed(displayed);
		return this;
	}

	isEnabled()
	{
		return this._fieldManager.isEnabled();
	}

	setEnabled(enabled = true)
	{
		this._fieldManager.setEnabled(enabled);
		return this;
	}
}