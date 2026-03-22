import Module from "../systemFunctions/Module.js";
import Utils from "../systemFunctions/Utils.js";

export default class FieldInteractor
{
	constructor(fieldManager)
	{
		this._fieldManager = fieldManager;

		if (this._fieldManager.isTopLevelField())
		{
			Module._registerField(this);
		}
	}

	_backup()
	{
		// Hinweis: direkter Zugriff auf getValue()-Methode der FieldManager, damit auch Tabellen durch JS-Objekte repräsentiert werden (this.getValue() ist überschrieben)
		return this._fieldManager.getValue();
	}

	_restore(backup)
	{
		this.setValue(backup);
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
		return this._fieldManager.getValue();
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

	toDebugString()
	{
		return this._fieldManager.toString();
	}

	setDisplayed(displayed)
	{
		if (displayed)
		{
			this._fieldManager.getNode().style.display = "";
		}
		else
		{
			this._fieldManager.getNode().style.display = "none";
		}
		return this;
	}
}