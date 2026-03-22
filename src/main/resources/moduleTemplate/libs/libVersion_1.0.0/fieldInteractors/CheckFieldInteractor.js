import FieldInteractor from "./FieldInteractor.js";

export default class CheckFieldInteractor extends FieldInteractor
{
	constructor(fieldManager)
	{
		super(fieldManager);
	}

	getOptions()
	{
		return this._fieldManager.getOptions();
	}

	getCheckedOptions()
	{
		return this._fieldManager.getCheckedOptions();
	}

	getUncheckedOptions()
	{
		return this._fieldManager.getUncheckedOptions();
	}
}