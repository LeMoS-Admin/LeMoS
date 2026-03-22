import FieldInteractor from "./FieldInteractor.js";

export default class ObjectFieldInteractor extends FieldInteractor
{
	constructor(fieldManager)
	{
		super(fieldManager);
	}

	getValue()
	{
		let map = new Map();
		for (let [key, value] of this._fieldManager.getEntries())
		{
			map.set(key, value.getInteractor());
		}
		return map;
	}

	setValue(value)
	{
		// Auspacken der von getValue() als Interaktoren verpackten Einträge
		let newValue = new Map();
		for (let [key, val] of value)
		{
			if (val instanceof FieldInteractor)
			{
				newValue.set(key, val._fieldManager.getValue());
			}
			else
			{
				newValue.set(key, val);
			}
		}
		this._fieldManager.setValue(newValue);
		return this;
	}


// Lesende Methoden
	entries()
	{
		return this.getValue().entries();
	}

	get(key)
	{
		return this.getValue().get(key);
	}

	has(key)
	{
		return this.getValue().has(key);
	}

	keys()
	{
		return this.getValue().keys();
	}

	values()
	{
		return this.getValue().values();
	}


// Verändernde Methoden
	delete(key)
	{
		let newValue = this.getValue();
		newValue.delete(key);
		this.setValue(newValue);
		return this;
	}

	forEach(callbackFn, thisArg)
	{
		let newValue = this.getValue();
		newValue.forEach(callbackFn, thisArg);
		this.setValue(newValue);
		return this;
	}

	set(key, value)
	{
		let newValue = this.getValue().set(key, value);
		this.setValue(newValue);
		return this;
	}


// Zusätzliche Methoden
	length()
	{
		return this.getValue().size;
	}

	remove(key)
	{
		return this.delete(key);
	}
}