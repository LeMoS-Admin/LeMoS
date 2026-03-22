import FieldInteractor from "./FieldInteractor.js";

export default class TextFieldInteractor extends FieldInteractor
{
	constructor(fieldManager)
	{
		super(fieldManager);
	}

// Lesende Methoden
	at(index)
	{
		return this.getValue().at(index);
	}

	endsWith(searchString, endPosition)
	{
		return this.getValue().endsWith(searchString, endPosition);
	}

	includes(searchString, position)
	{
		return this.getValue().includes(searchString, position);
	}

	indexOf(searchString, position)
	{
		return this.getValue().indexOf(searchString, position);
	}

	lastIndexOf(searchString, position)
	{
		return this.getValue().lastIndexOf(searchString, position);
	}

	match(regexp)
	{
		return this.getValue().match(regexp);
	}

	matchAll(regexp)
	{
		return this.getValue().matchAll(regexp);
	}

	search(regexp)
	{
		return this.getValue().search(regexp);
	}

	split(separator, limit)
	{
		return this.getValue().split(separator, limit);
	}

	startsWith(searchString, position)
	{
		return this.getValue().startsWith(searchString, position);
	}


// Verändernde Methoden
	concat(...str)
	{
		let newValue = this.getValue().concat(...str);
		this.setValue(newValue);
		return this;
	}

	repeat(count)
	{
		let newValue = this.getValue().repeat(count);
		this.setValue(newValue);
		return this;
	}

	replace(pattern, replacement)
	{
		let newValue = this.getValue().replace(pattern, replacement);
		this.setValue(newValue);
		return this;
	}

	replaceAll(pattern, replacement)
	{
		let newValue = this.getValue().replaceAll(pattern, replacement);
		this.setValue(newValue);
		return this;
	}

	slice(indexStart, indexEnd)
	{
		let newValue = this.getValue().slice(indexStart, indexEnd);
		this.setValue(newValue);
		return this;
	}

	toLowerCase()
	{
		let newValue = this.getValue().toLowerCase();
		this.setValue(newValue);
		return this;
	}

	toUpperCase()
	{
		let newValue = this.getValue().toUpperCase();
		this.setValue(newValue);
		return this;
	}

	trim()
	{
		let newValue = this.getValue().trim();
		this.setValue(newValue);
		return this;
	}

	trimEnd()
	{
		let newValue = this.getValue().trimEnd();
		this.setValue(newValue);
		return this;
	}

	trimStart()
	{
		let newValue = this.getValue().trimStart();
		this.setValue(newValue);
		return this;
	}


// Zusätzliche Methoden
	getLength()
	{
		return this.getValue().getLength();
	}

	asNumber()
	{
		let value = this.getValue();
		if (typeof value === "number")
		{
			return value;
		}
		else
		{
			return this.getValue().asNumber();
		}
	}

	insert(index, ...str)
	{
		let newValue = this.getValue().insert(index, ...str);
		this.setValue(newValue);
		return this;
	}

	remove(indexStart, indexEnd)
	{
		let newValue = this.getValue().remove(indexStart, indexEnd);
		this.setValue(newValue);
		return this;
	}

	replaceAt(index, ...str)
	{
		let newValue = this.getValue().replaceAt(index, ...str);
		this.setValue(newValue);
		return this;
	}
}