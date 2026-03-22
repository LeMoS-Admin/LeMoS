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

	getSelectedName()
	{
		return this.getOptionNames().at(this.getSelectedIndex());
	}

	getOptions()
	{
		return this._fieldManager.getOptions()
				   .map(option => option.value);
	}

	getOptionNames()
	{
		return this._fieldManager.getOptions()
				   .map(option => option.dataset.name);
	}
}