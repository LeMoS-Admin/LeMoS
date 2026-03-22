import ListableFieldInteractor from "./ListableFieldInteractor.js";

export default class ListFieldInteractor extends ListableFieldInteractor
{
	constructor(fieldManager)
	{
		super(fieldManager);
	}

	minimum()
	{
		return this.getValue().sort().at(0);
	}

	maximum()
	{
		return this.getValue().sort().at(this.length() - 1);
	}

	average()
	{
		return this.sum() / this.length();
	}

	median()
	{
		let middle = Math.round(this.length() / 2);
		return this.getValue().sort().at(middle);
	}

	sum()
	{
		let sum = 0;
		for (let value of this.getValue())
		{
			sum += Number(value);
		}
		return sum;
	}
}