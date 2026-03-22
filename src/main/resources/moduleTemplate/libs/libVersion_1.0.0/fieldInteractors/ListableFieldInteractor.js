import FieldInteractor from "./FieldInteractor.js";

export default class ListableFieldInteractor extends FieldInteractor
{
// Iterierende Methoden
	#iteratorPosition;

	constructor(fieldManager, keepEmptyEntries = false)
	{
		super(fieldManager);
		this.restartIterator();
		this.keepEmptyEntries = keepEmptyEntries;
	}

	_backup()
	{
		let backup = super._backup();
		backup.set("iteratorPosition", this.#iteratorPosition);
		// this.keepEmptyEntries muss nicht gesichert werden, da der Wert nur in temporären Instanzen true und ansonsten stets false ist
		return backup;
	}

	_restore(backup)
	{
		super._restore(backup);
		this.#iteratorPosition = (backup.get("iteratorPosition"));
		return this;
	}

	_reset(excludeInputFields = false)
	{
		super._reset(excludeInputFields);
		this.restartIterator(); // Iterator muss immer zurückgesetzt werden (auch bei InputFields), da das Lernmodul nach einem Reset neugestartet wird
		return this;
	}

	withEmptyEntries() {}

	setValue(value)
	{
		super.setValue(value);
		this.restartIterator();
		return this;
	}

	getDebug()
	{
		return super.getDebug() +
			"\n\titeratorPosition: " + this.#iteratorPosition;
	}

// Lesende Methoden
	at(index)
	{
		return this.getValue().at(index);
	}

	entries()
	{
		return this.getValue().entries();
	}

	every(callbackFn)
	{
		return this.getValue().every(callbackFn);
	}

	find(callbackFn)
	{
		return this.getValue().find(callbackFn);
	}

	findIndex(callbackFn)
	{
		return this.getValue().findIndex(callbackFn);
	}

	findLast(callbackFn)
	{
		return this.getValue().findLast(callbackFn);
	}

	findLastIndex(callbackFn)
	{
		return this.getValue().findLastIndex(callbackFn);
	}

	forEach(callbackFn)
	{
		this.getValue().forEach(callbackFn);
		return this;
	}

	join(separator)
	{
		return this.getValue().join(separator);
	}

	keys()
	{
		return this.getValue().keys();
	}

	some(callbackFn)
	{
		return this.getValue().some(callbackFn);
	}

	values()
	{
		return this.getValue().values();
	}

// Verändernde Methoden
	concat(...value)
	{
		let newValue = this.getValue().concat(...value);
		this.setValue(newValue);
		return this;
	}

	fill(value, start, end)
	{
		let newValue = this.getValue().fill(value, start, end);
		this.setValue(newValue);
		return this;
	}

	filter(callbackFn)
	{
		let newValue = this.getValue().filter(callbackFn);
		this.setValue(newValue);
		return this;
	}

	pop()
	{
		let newValue = this.getValue();
		newValue.pop();
		this.setValue(newValue);
		return this;
	}

	map(callbackFn)
	{
		let newValue = this.getValue().map(callbackFn);
		this.setValue(newValue);
		return this;
	}

	push(...element)
	{
		let newValue = this.getValue();
		newValue.push(...element);
		this.setValue(newValue);
		return this;
	}

	reverse()
	{
		let newValue = this.getValue().reverse();
		this.setValue(newValue);
		return this;
	}

	shift()
	{
		let newValue = this.getValue();
		newValue.shift();
		this.setValue(newValue);
		return this;
	}

	slice(start, end)
	{
		let newValue = this.getValue().slice(start, end);
		this.setValue(newValue);
		return this;
	}

	sort(compareFn)
	{
		let newValue = this.getValue().sort(compareFn);
		this.setValue(newValue);
		return this;
	}

	splice(start, deleteCount, ...item)
	{
		let newValue = this.getValue();
		newValue.splice(start, deleteCount, ...item);
		this.setValue(newValue);
		return this;
	}

	unshift(...element)
	{
		let newValue = this.getValue();
		newValue.unshift(...element);
		this.setValue(newValue);
		return this;
	}

// Angepasste Methoden
	includes(searchElement, fromIndex)
	{
		return this.getValue().includes(searchElement, fromIndex)
	}

	indexOf(searchElement, fromIndex)
	{
		return this.getValue().indexOf(searchElement, fromIndex)
	}

	lastIndexOf(searchElement, fromIndex)
	{
		return this.getValue().lastIndexOf(searchElement, fromIndex)
	}


// Zusätzliche Methoden
	getLength()
	{
		return this.getValue().getLength();
	}

	first()
	{
		return this.getValue().first();
	}

	last()
	{
		return this.getValue().last();
	}

	contains(searchElement, fromIndex)
	{
		return this.getValue().includes(searchElement, fromIndex);
	}

	add(...entries)
	{
		return this.push(...entries);
	}

	set(index, ...item)
	{
		let newValue = this.getValue();
		newValue.set(index, ...item);
		this.setValue(newValue);
		return this;
	}

	insert(index, ...item)
	{
		let newValue = this.getValue();
		newValue.insert(index, ...item);
		this.setValue(newValue);
		return this;
	}

	remove(searchElement)
	{
		let newValue = this.getValue();
		newValue.remove(searchElement);
		this.setValue(newValue);
		return this;
	}

	removeIndex(start, end)
	{
		let newValue = this.getValue();
		newValue.removeIndex(start, end);
		this.setValue(newValue);
		return this;
	}

	unify()
	{
		let newValue = this.getValue().unify();
		this.setValue(newValue);
		return this;
	}


// Iterierende Methoden
	next()
	{
		if (!this.hasNext())
		{
			this.#iteratorPosition = this.getLength();
			return undefined;
		}
		this.#iteratorPosition++;
		return this.at(this.#iteratorPosition);
	}

	findNext(callbackFn)
	{
		while (this.hasNext())
		{
			let currentEntry = this.next()
			if (callbackFn(currentEntry))
			{
				return currentEntry;
			}
		}
		return undefined;
	}

	previous()
	{
		if (!this.hasPrevious())
		{
			this.#iteratorPosition = -1;
			return undefined;
		}
		this.#iteratorPosition--;
		return this.at(this.#iteratorPosition);
	}

	findPrevious(callbackFn)
	{
		while (this.hasPrevious())
		{
			let currentEntry = this.previous()
			if (callbackFn(currentEntry))
			{
				return currentEntry;
			}
		}
		return undefined;
	}

	current()
	{
		if (this.isAtStart() || this.isAtEnd())
		{
			return undefined;
		}
		return this.at(this.#iteratorPosition);
	}

	currentIndex()
	{
		return this.#iteratorPosition;
	}

	hasNext()
	{
		return this.#iteratorPosition < this.getLength() - 1;
	}

	hasPrevious()
	{
		return this.#iteratorPosition > 0;
	}

	isAtStart()
	{
		return this.#iteratorPosition === -1;
	}

	isAtEnd()
	{
		return this.#iteratorPosition === this.getLength() || this.isEmpty();
	}

	getIteratorPosition()
	{
		return this.#iteratorPosition;
	}

	setToStart()
	{
		this.#iteratorPosition = -1;
		return this;
	}

	setToEnd()
	{
		this.#iteratorPosition = this.getLength();
		return this;
	}

	setIteratorPosition(position)
	{
		if (position < -1)
		{
			this.setToStart();
		}
		else if (position > this.getLength())
		{
			this.setToEnd();
		}
		else
		{
			this.#iteratorPosition = position;
		}
		return this;
	}

	restartIterator()
	{
		return this.setToStart();
	}
}