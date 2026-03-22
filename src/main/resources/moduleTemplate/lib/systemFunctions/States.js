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

	static _backup()
	{
		let backup = new Map();
		backup.set("stepCount", States._stepCount);
		backup.set("currentStateID", States._currentStateID);
		backup.set("currentStateName", States._currentStateName);
		backup.set("currentStateExplanation", States._currentStateExplanation);
		backup.set("lastStateID", States._lastStateID);
		backup.set("lastStateName", States._lastStateName);
		backup.set("lastStateExplanation", States._lastStateExplanation);
		backup.set("lastTransitionName", States._lastTransitionName);
		backup.set("lastTransitionExplanation", States._lastTransitionExplanation);
		return backup;
	}

	static _restore(backup)
	{
		States._stepCount = backup.get("stepCount");
		States._currentStateID = backup.get("currentStateID");
		States._currentStateName = backup.get("currentStateName");
		States._currentStateExplanation = backup.get("currentStateExplanation");
		States._lastStateID = backup.get("lastStateID");
		States._lastStateName = backup.get("lastStateName");
		States._lastStateExplanation = backup.get("lastStateExplanation");
		States._lastTransitionName = backup.get("lastTransitionName");
		States._lastTransitionExplanation = backup.get("lastTransitionExplanation");
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
