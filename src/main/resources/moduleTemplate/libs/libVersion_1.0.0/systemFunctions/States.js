export default class States
{
	static _stepCount;
	static _currentStateID;
	static _currentStateName;
	static _currentStateExplanation;
	static _lastStateID;
	static _lastStateName;
	static _lastStateExplanation;
	static _lastTransitionName;
	static _lastTransitionExplanation;

	static _reset()
	{
		States._stepCount = 0;
		States._currentStateID = undefined;
		States._currentStateName = undefined;
		States._currentStateExplanation = undefined;
		States._lastStateID = undefined;
		States._lastStateName = undefined;
		States._lastStateExplanation = undefined;
		States._lastTransitionName = undefined;
		States._lastTransitionExplanation = undefined;
	}

	static getStepCount()
	{
		return States._stepCount;
	}

	static getCurrentStateID()
	{
		return States._currentStateID;
	}

	static getCurrentStateName()
	{
		return States._currentStateName;
	}

	static getCurrentStateExplanation()
	{
		return States._currentStateExplanation;
	}

	static getLastStateID()
	{
		return States._lastStateID;
	}

	static getLastStateName()
	{
		return States._lastStateName;
	}

	static getLastStateExplanation()
	{
		return States._lastStateExplanation;
	}

	static getLastTransitionName()
	{
		return States._lastTransitionName;
	}

	static getLastTransitionExplanation()
	{
		return States._lastTransitionExplanation;
	}
}
