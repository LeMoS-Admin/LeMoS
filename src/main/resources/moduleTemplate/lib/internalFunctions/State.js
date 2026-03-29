import Module from "../systemFunctions/Module.js";
import Controller from "../internalFunctions/Controller.js";
import States from "../systemFunctions/States.js";

export default class State
{
	constructor(stateID, stateName, stateExplanation, stepSize, errorMessage, actions, transitions)
	{
		this.stateID = stateID;
		this.stateName = stateName;
		this.stateExplanation = stateExplanation;
		this.stepSize = stepSize;
		this.errorMessage = errorMessage;
		this.actions = actions;
		this.transitions = transitions;
		Controller.registerState(this);
	}

	performActions()
	{
		let logMessage = "Reached state " + this.stateID;
		if (this.stateName !== null)
		{
			logMessage += ": " + this.stateName;
		}
		if (this.stateExplanation !== "")
		{
			logMessage += " (" + this.stateExplanation + ")";
		}
		Module.log(logMessage);

		if (this.stateExplanation !== "")
		{
			Module.print(this.stateExplanation);
		}
		this.actions();
	}

	getNextState()
	{
		let transition = this.transitions();
		if (transition !== null)
		{
			States._applyTransition(transition);
			return transition.targetState;
		}
		else if (this.errorMessage !== "")
		{
			Module.fail(this.errorMessage);
		}
		else if (this.stepSize === 9)
		{
			Module.log("No further transitions, learning module is completed");
			return null;
		}
		else
		{
			Module.log("No suitable transition, staying in current state");
			return null;
		}
	}
}