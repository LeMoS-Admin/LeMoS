import FieldInteractor from "./FieldInteractor.js";

export default class SelectFieldInteractor extends FieldInteractor
{
	constructor(fieldManager)
	{
		super(fieldManager);
	}

	getSelectedIndex()
	{
		return this._fieldManager.getSelectedIndex();
	}

	getOptions()
	{
		return this._fieldManager.getOptions();
	}
}