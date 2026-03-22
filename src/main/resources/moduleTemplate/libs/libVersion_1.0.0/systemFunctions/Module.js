import Controller from "../internalFunctions/Controller.js";

export default class Module
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

	static isFilled(...fields)
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