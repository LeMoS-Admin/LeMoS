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

	split(splitter, limit)
	{
		return this.getValue().split(splitter, limit);
	}

	startsWith(searchString, position)
	{
		return this.getValue().startsWith(searchString, position);
	}


// Verändernde Methoden
	concat(strings)
	{
		let newValue = this.getValue().concat(strings);
		this.setValue(newValue);
		return this;
	}

	repeat(number)
	{
		let newValue = this.getValue().repeat(number);
		this.setValue(newValue);
		return this;
	}

	replace(searchValue, replacer)
	{
		let newValue = this.getValue().replace(searchValue, replacer);
		this.setValue(newValue);
		return this;
	}

	replaceAll(searchValue, replacer)
	{
		let newValue = this.getValue().replaceAll(searchValue, replacer);
		this.setValue(newValue);
		return this;
	}

	slice(start, end)
	{
		let newValue = this.getValue().slice(start, end);
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
	length()
	{
		return this.getValue().length;
	}

	asNumber()
	{
		return this.getValue().asNumber();
	}

	insert(index, strings)
	{
		let newValue = this.getValue().insert(index, strings);
		this.setValue(newValue);
		return this;
	}

	remove(start, end = start)
	{
		let newValue = this.getValue().remove(start, end);
		this.setValue(newValue);
		return this;
	}
}