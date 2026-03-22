import FieldInteractor from "./FieldInteractor.js";

export default class ListableFieldInteractor extends FieldInteractor
{
// Iterierende Methoden
	#iteratorPosition;

	constructor(fieldManager)
	{
		super(fieldManager);
		this.restartIterator();
	}

	_backup()
	{
		let backup = new Map();
		backup.set("fieldValue", super._backup());
		backup.set("#iteratorPosition", this.#iteratorPosition);
		return backup;
	}

	_restore(backup)
	{
		super._restore(backup.get("fieldValue"));
		this.#iteratorPosition = (backup.get("#iteratorPosition"));
		return this;
	}

	_reset(excludeInputFields = false)
	{
		super._reset(excludeInputFields);
		if (!(excludeInputFields && this._fieldManager.isInputField()))
		{
			this.restartIterator();
		}
		return this;
	}

	setValue(value)
	{
		super.setValue(value);
		this.restartIterator();
		return this;
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

	every(predicate)
	{
		return this.getValue().every(predicate);
	}

	find(predicate)
	{
		return this.getValue().find(predicate);
	}

	findIndex(predicate)
	{
		return this.getValue().findIndex(predicate);
	}

	findLast(predicate)
	{
		return this.getValue().findLast(predicate);
	}

	findLastIndex(predicate)
	{
		return this.getValue().findLastIndex(predicate);
	}

	join(separator)
	{
		return this.getValue().join(separator);
	}

	keys()
	{
		return this.getValue().keys();
	}

	some(predicate)
	{
		return this.getValue().some(predicate);
	}

	values()
	{
		return this.getValue().values();
	}

// Verändernde Methoden
	concat(...entries)
	{
		let newValue = this.getValue().concat(...entries);
		this.setValue(newValue);
		return this;
	}

	fill(value, start, end)
	{
		let newValue = this.getValue().fill(value, start, end);
		this.setValue(newValue);
		return this;
	}

	filter(predicate)
	{
		let newValue = this.getValue().filter(predicate);
		this.setValue(newValue);
		return this;
	}

	forEach(callbackFn)
	{
		let newValue = this.getValue();
		newValue.forEach(callbackFn);
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

	push(...entries)
	{
		let newValue = this.getValue();
		newValue.push(...entries);
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

	splice(start, deleteCount, ...entries)
	{
		let newValue = this.getValue();
		newValue.splice(start, deleteCount, ...entries);
		this.setValue(newValue);
		return this;
	}

	unshift(...entries)
	{
		let newValue = this.getValue();
		newValue.unshift(...entries);
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
	length()
	{
		return this.getValue().length;
	}

	first()
	{
		return this.getValue().first();
	}

	last()
	{
		return this.getValue().last();
	}

	contains(entry)
	{
		return this.getValue().includes(entry);
	}

	add(...entries)
	{
		return this.push(...entries);
	}

	set(index, ...entries)
	{
		let newValue = this.getValue();
		newValue.set(index, ...entries);
		this.setValue(newValue);
		return this;
	}

	insert(index, ...entries)
	{
		let newValue = this.getValue();
		newValue.insert(index, ...entries);
		this.setValue(newValue);
		return this;
	}

	remove(value)
	{
		let newValue = this.getValue();
		newValue.remove(value);
		this.setValue(newValue);
		return this;
	}

	removeIndex(start, end = start)
	{
		let newValue = this.getValue();
		newValue.removeIndex(start, end = start);
		this.setValue(newValue);
		return this;
	}

	replace(searchValue, replacementValue)
	{
		let newValue = this.getValue().replace(searchValue, replacementValue);
		this.setValue(newValue);
		return this;
	}

	replaceAll(searchValue, replacementValue)
	{
		let newValue = this.getValue().replaceAll(searchValue, replacementValue);
		this.setValue(newValue);
		return this;
	}

	unique()
	{
		let newValue = this.getValue().unique();
		this.setValue(newValue);
		return this;
	}

	toDebugString()
	{
		return super.toDebugString() +
			"\n\t#iteratorPosition: " + this.#iteratorPosition;
	}


// Iterierende Methoden
	next()
	{
		if (!this.hasNext())
		{
			this.#iteratorPosition = this.length();
			return undefined;
		}
		this.#iteratorPosition++;
		return this.at(this.#iteratorPosition);
	}

	findNext(predicate)
	{
		while (this.hasNext())
		{
			let currentEntry = this.next()
			if (predicate(currentEntry))
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

	findPrevious(predicate)
	{
		while (this.hasPrevious())
		{
			let currentEntry = this.previous()
			if (predicate(currentEntry))
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
		return this.#iteratorPosition < this.length() - 1;
	}

	hasPrevious()
	{
		return this.#iteratorPosition > 0;
	}

	isAtEnd()
	{
		return this.#iteratorPosition === this.length() || this.isEmpty();
	}

	isAtStart()
	{
		return this.#iteratorPosition === -1;
	}

	getIteratorPosition()
	{
		return this.#iteratorPosition;
	}

	setIteratorPosition(index)
	{
		this.#iteratorPosition = index;
		return this;
	}

	restartIterator()
	{
		this.#iteratorPosition = -1;
		return this;
	}
}