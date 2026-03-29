import Controller from "../internalFunctions/Controller.js";

export default class Transition
{
	constructor(targetStateID, transitionName, transitionExplanation)
	{
		this.targetState = Controller.getState(targetStateID);
		this.transitionName = transitionName;
		this.transitionExplanation = transitionExplanation;
	}
}