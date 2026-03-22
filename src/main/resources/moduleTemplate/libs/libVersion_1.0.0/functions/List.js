export default class List
{
	static todo()
	{
	}

	static length(List)
	{
		return List.length;
	}

	static average(ListField)
	{
		let sum = 0.0;
		for (let value of ListField.getValue())
		{
			sum += Number(value);
		}
		return sum / ListField.getLength();
	}
}