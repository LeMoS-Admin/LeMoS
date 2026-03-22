import Module from "../systemFunctions/Module.js";
import Utils from "../systemFunctions/Utils.js";
import ListableFieldInteractor from "./ListableFieldInteractor.js";
import ObjectFieldInteractor from "./ObjectFieldInteractor.js";

export default class TableFieldInteractor extends ListableFieldInteractor
{
	constructor(fieldManager, keepEmptyEntries)
	{
		super(fieldManager, keepEmptyEntries);
	}

	withEmptyEntries()
	{
		return new TableFieldInteractor(this._fieldManager, true);
	}

	getValue()
	{
		return this._fieldManager
				   .getEntries(this.keepEmptyEntries)
				   .map(obj => obj.getInteractor());
	}

	setValue(value)
	{
		// Auspacken der von getValue() als Interaktoren verpackten Einträge
		let newValue = [];
		for (let val of value)
		{
			if (val instanceof ObjectFieldInteractor)
			{
				newValue.push(val._fieldManager.getValue());
			}
			else
			{
				newValue.push(val);
			}
		}
		this._fieldManager.setValue(newValue);
		this.restartIterator();
		return this;
	}

	findByAttribute(attribute, value)
	{
		return super.find(obj => Utils.equals(obj.get(attribute), value));
	}

	findIndexByAttribute(attribute, value)
	{
		return super.findIndex(obj => Utils.equals(obj.get(attribute), value));
	}

	findLastByAttribute(attribute, value)
	{
		return super.findLast(obj => Utils.equals(obj.get(attribute), value));
	}

	findLastIndexByAttribute(attribute, value)
	{
		return super.findLastIndex(obj => Utils.equals(obj.get(attribute), value));
	}

	getAttribute(attribute)
	{
		let attributeValues = [];
		for (let entry of this.getValue())
		{
			attributeValues.push(entry.get(attribute));
		}
		return attributeValues;
	}

	setAttribute(attribute, values)
	{
		if (this.getLength() !== values.length)
		{
			Module.error(this._fieldManager.getMessagePrefix() + "length of values to set must be equal to number of entries");
		}

		let entries = this.getValue();
		for (let index of entries.keys())
		{
			entries.at(index).get(attribute).setValue(values.at(index));
		}
		return this;
	}

	fillAttribute(attribute, value, start = 0, end = this.getLength())
	{
		if (end > this.getLength())
		{
			Module.log(this._fieldManager.getMessagePrefix() + "end must be lower or equal to number of entries");
			end = this.getLength();
		}

		let entries = this.getValue();
		for (let index = start; index < end; index++)
		{
			entries.at(index).get(attribute).setValue(value);
		}
		return this;
	}

	findNextByAttribute(attribute, value)
	{
		return super.findNext(obj => Utils.equals(obj.get(attribute), value));
	}

	findPreviousByAttribute(attribute, value)
	{
		return super.findPrevious(obj => Utils.equals(obj.get(attribute), value));
	}
}