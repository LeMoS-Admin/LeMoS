export default class States
{
	static #stepCount;
	static #currentStateID;
	static #currentStateName;
	static #currentStateExplanation;
	static #lastStateID;
	static #lastStateName;
	static #lastStateExplanation;
	static #lastTransitionName;
	static #lastTransitionExplanation;

	static _reset(entryState)
	{
		States.#stepCount = 0;
		States.#currentStateID = entryState.stateID;
		States.#currentStateName = entryState.stateName;
		States.#currentStateExplanation = entryState.stateExplanation;
		States.#lastStateID = undefined;
		States.#lastStateName = undefined;
		States.#lastStateExplanation = undefined;
		States.#lastTransitionName = undefined;
		States.#lastTransitionExplanation = undefined;
	}

	static _backup()
	{
		let backup = new Map();
		backup.set("stepCount", States.#stepCount);
		backup.set("currentStateID", States.#currentStateID);
		backup.set("currentStateName", States.#currentStateName);
		backup.set("currentStateExplanation", States.#currentStateExplanation);
		backup.set("lastStateID", States.#lastStateID);
		backup.set("lastStateName", States.#lastStateName);
		backup.set("lastStateExplanation", States.#lastStateExplanation);
		backup.set("lastTransitionName", States.#lastTransitionName);
		backup.set("lastTransitionExplanation", States.#lastTransitionExplanation);
		return backup;
	}

	static _restore(backup)
	{
		States.#stepCount = backup.get("stepCount");
		States.#currentStateID = backup.get("currentStateID");
		States.#currentStateName = backup.get("currentStateName");
		States.#currentStateExplanation = backup.get("currentStateExplanation");
		States.#lastStateID = backup.get("lastStateID");
		States.#lastStateName = backup.get("lastStateName");
		States.#lastStateExplanation = backup.get("lastStateExplanation");
		States.#lastTransitionName = backup.get("lastTransitionName");
		States.#lastTransitionExplanation = backup.get("lastTransitionExplanation");
	}

	static _setStepCount(stepCount)
	{
		this.#stepCount = stepCount;
	}

	static _applyTransition(transition)
	{
		States.#lastStateID = States.#currentStateID;
		States.#lastStateName = States.#currentStateName;
		States.#lastStateExplanation = States.#currentStateExplanation;
		States.#lastTransitionName = transition.transitionName;
		States.#lastTransitionExplanation = transition.transitionExplanation;
		States.#currentStateID = transition.targetState.stateID;
		States.#currentStateName = transition.targetState.stateName;
		States.#currentStateExplanation = transition.targetState.stateExplanation;
	}

	static getStepCount()
	{
		return States.#stepCount;
	}

	static getCurrentStateID()
	{
		return States.#currentStateID;
	}

	static getCurrentStateName()
	{
		return States.#currentStateName;
	}

	static getCurrentStateExplanation()
	{
		return States.#currentStateExplanation;
	}

	static getLastStateID()
	{
		return States.#lastStateID;
	}

	static getLastStateName()
	{
		return States.#lastStateName;
	}

	static getLastStateExplanation()
	{
		return States.#lastStateExplanation;
	}

	static getLastTransitionName()
	{
		return States.#lastTransitionName;
	}

	static getLastTransitionExplanation()
	{
		return States.#lastTransitionExplanation;
	}
}
