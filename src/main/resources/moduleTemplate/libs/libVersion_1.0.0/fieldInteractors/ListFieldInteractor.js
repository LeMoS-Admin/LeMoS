import ListableFieldInteractor from "./ListableFieldInteractor.js";

export default class ListFieldInteractor extends ListableFieldInteractor
{
	constructor(fieldManager, keepEmptyEntries)
	{
		super(fieldManager, keepEmptyEntries);
	}

	withEmptyEntries()
	{
		return new ListFieldInteractor(this._fieldManager, true);
	}

	getValue()
	{
		return this._fieldManager.getValue(this.keepEmptyEntries);
	}

	minimum()
	{
		return this.getValue().minimum();
	}

	maximum()
	{
		return this.getValue().maximum();
	}

	average()
	{
		return this.getValue().average();
	}

	median()
	{
		return this.getValue().median();
	}

	sum()
	{
		return this.getValue().sum();
	}
}