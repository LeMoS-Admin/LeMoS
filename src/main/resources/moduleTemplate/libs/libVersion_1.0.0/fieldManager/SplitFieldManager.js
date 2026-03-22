import MultilineableFieldManager from "./MultilineableFieldManager.js";
import ListFieldInteractor from "../fieldInteractors/ListFieldInteractor.js";

export default class SplitFieldManager extends MultilineableFieldManager
{
	constructor(selector, fieldName, multiline, growable, separator, allowEmpty, datatype, restrictions)
	{
		super(selector, fieldName, multiline, growable, allowEmpty, datatype, restrictions);
		this.separator = separator;

		// Grundsätzlich kümmern sich nur fundamentale Felder (ohne innere Felder) um die Events (Ausnahme: siehe ObjectFieldManager)
		this.getNode().addEventListener("change", () => this.handleChangeEvent());
	}

	clone(newSelector)
	{
		return new SplitFieldManager(newSelector, this.fieldName, this.multiline, this.growable, this.separator, this.allowEmpty, this.datatype, this.restrictions);
	}

	getInteractor()
	{
		return new ListFieldInteractor(this);
	}

	getValue(keepEmptyEntries = false)
	{
		let value = this.getField().value;
		if (value === "") // Komplett leeres Feld würde bei keepEmptyEntries sonst trotzdem eine (leere) Zeile zurückgeben
		{
			return [];
		}

		value = value.split(this.separator);
		if (!keepEmptyEntries)
		{
			value = value.filter(entry => entry !== "");
		}

		if (this.datatype === "Integer" || this.datatype === "Number")
		{
			value = value.map(val => Number(val.replace(",", "."))); // Dezimaltrennzeichen anpassen (Dezimalkomma durch Dezimalpunkt ersetzen)
		}

		return value;
	}

	setValue(value)
	{
		if (value === undefined || Number.isNaN(value))
		{
			this.clear();
			return;
		}

		if (value instanceof Array)
		{
			// NaN muss explizit in "" umgewandelt werden, damit der Eintrag leer bleibt und nicht zu "NaN" wird
			this.getField().value = value.map(val =>
											  {
												  if (Number.isNaN(val))
												  {
													  return ""
												  }
												  else
												  {
													  return val
												  }
											  }).join(this.separator);
		}
		else
		{
			this.getField().value = String(value);
		}
		this.resetHeight();
		this.scrollToBottom();
	}

	isEmpty()
	{
		return this.getValue().length === 0;
	}

	clear()
	{
		this.setValue([]);
	}

	toString()
	{
		return super.toString() +
			"\n\tseparator: " + this.separator +
			"\n\tvalue: [" + this.getValue().join(", ") + "]";
	}

	validateInternal(outerField, tolerateEmptiness)
	{
		for (let value of this.getValue())
		{
			this.validateDatatype(value);
			this.validateRestrictions(value, this);
		}
	}
}