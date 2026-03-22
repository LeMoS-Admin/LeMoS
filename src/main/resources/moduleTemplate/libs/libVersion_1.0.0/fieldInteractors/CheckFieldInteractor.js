import FieldInteractor from "./FieldInteractor.js";

export default class CheckFieldInteractor extends FieldInteractor
{
	constructor(fieldManager)
	{
		super(fieldManager);
	}

	getOptions()
	{
		return this._fieldManager.getOptions()
				   .map(option => option.value);
	}

	getCheckedOptions()
	{
		return this._fieldManager.getOptions()
				   .filter(option => option.checked)
				   .map(option => option.value);
	}

	getUncheckedOptions()
	{
		return this._fieldManager.getOptions()
				   .filter(option => !option.checked)
				   .map(option => option.value);
	}

	getOptionNames()
	{
		return this._fieldManager.getOptions()
				   .map(option => option.dataset.name);
	}

	getCheckedOptionNames()
	{
		return this._fieldManager.getOptions()
				   .filter(option => option.checked)
				   .map(option => option.dataset.name);
	}

	getUncheckedOptionNames()
	{
		return this._fieldManager.getOptions()
				   .filter(option => !option.checked)
				   .map(option => option.dataset.name);
	}
}