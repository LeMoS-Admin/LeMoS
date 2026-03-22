import Controller from "../internalFunctions/Controller.js";

export default class Fields
{
	static countFilled()
	{
		let result = 0;
		for (let field of Controller.getInputFields())
		{
			if (!field.isEmpty())
			{
				result++;
			}
		}
		return result;
	}

	static areFilled(...fields)
	{
		for (let field of fields)
		{
			if (field.isEmpty())
			{
				return false;
			}
		}
		return true;
	}
}