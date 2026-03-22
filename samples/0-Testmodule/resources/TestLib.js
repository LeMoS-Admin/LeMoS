export class TestLib
{
	static setSystemLibs(Module, Resource, Utils)
	{
		TestLib.Module = Module;
		TestLib.Resource = Resource;
		TestLib.Utils = Utils;
	}

	static testInfoField(field)
	{
		let errors = [];
		TestLib.#assertResult(field, undefined, false, () => field.isEmpty());
		TestLib.#assertValue(field, undefined, "Infotext");
		TestLib.#assertResult(field, "", true, () => field.isEmpty());
		TestLib.#assertValue(field, "", "");
		TestLib.#assertValue(field, "", "Infotext", () => field.clear());
		return errors;
	}

	static testImageField(field)
	{
		let errors = [];
		TestLib.#assertResult(field, undefined, false, () => field.isEmpty());
		TestLib.#assertValue(field, undefined, TestLib.Resource.get("Bild1"));
		TestLib.#assertResult(field, "", true, () => field.isEmpty());
		TestLib.#assertValue(field, "", "");
		TestLib.#assertValue(field, "", TestLib.Resource.get("Bild1"), () => field.clear());
		TestLib.#assertValue(field, TestLib.Resource.get("Bild1"), TestLib.Resource.get("Bild1"));
		TestLib.#assertValue(field, TestLib.Resource.get("Bild2"), TestLib.Resource.get("Bild2"));
		TestLib.#assertValue(field, undefined, TestLib.Resource.get("Bild1"), () => field.clear());
		return errors;
	}

	static testAudioField(field)
	{
		let errors = [];
		TestLib.#assertResult(field, undefined, false, () => field.isEmpty());
		TestLib.#assertValue(field, undefined, TestLib.Resource.get("Audio1"));
		TestLib.#assertResult(field, "", true, () => field.isEmpty());
		TestLib.#assertValue(field, "", "");
		TestLib.#assertValue(field, "", TestLib.Resource.get("Audio1"), () => field.clear());
		TestLib.#assertValue(field, TestLib.Resource.get("Audio1"), TestLib.Resource.get("Audio1"));
		TestLib.#assertValue(field, TestLib.Resource.get("Audio2"), TestLib.Resource.get("Audio2"));
		TestLib.#assertValue(field, undefined, TestLib.Resource.get("Audio1"), () => field.clear());
		return errors;
	}

	static testVideoField(field)
	{
		let errors = [];
		TestLib.#assertResult(field, undefined, false, () => field.isEmpty());
		TestLib.#assertValue(field, undefined, TestLib.Resource.get("Video1"));
		TestLib.#assertResult(field, "", true, () => field.isEmpty());
		TestLib.#assertValue(field, "", "");
		TestLib.#assertValue(field, "", TestLib.Resource.get("Video1"), () => field.clear());
		TestLib.#assertValue(field, TestLib.Resource.get("Video1"), TestLib.Resource.get("Video1"));
		TestLib.#assertValue(field, TestLib.Resource.get("Video2"), TestLib.Resource.get("Video2"));
		TestLib.#assertValue(field, undefined, TestLib.Resource.get("Video1"), () => field.clear());
		return errors;
	}

	static testTextField(field)
	{
		let errors = [];
		let initialValue = "Hallo Welt";
		TestLib.#assertResult(field, undefined, true, () => field.isEmpty());
		TestLib.#assertValue(field, undefined, "");

		TestLib.#assertResult(field, initialValue, "o", () => field.at(4));
		TestLib.#assertResult(field, initialValue, true, () => field.endsWith("Welt"));
		TestLib.#assertResult(field, initialValue, true, () => field.includes("Hallo Welt"));
		TestLib.#assertResult(field, initialValue, 2, () => field.indexOf("l"));
		TestLib.#assertResult(field, initialValue, 8, () => field.lastIndexOf("l"));
		TestLib.#assertResult(field, initialValue, ["ll", "lo", "lt"], () => field.match("l."));
		TestLib.#assertResult(field, initialValue, ["ll", "lo", "lt"], () => Array.from(field.matchAll("l.")));
		TestLib.#assertResult(field, initialValue, 3, () => field.search("lo."));
		TestLib.#assertResult(field, initialValue, ["Hallo", "Welt"], () => field.split(" "));
		TestLib.#assertResult(field, initialValue, true, () => field.startsWith("Hallo"));

		TestLib.#assertValue(field, initialValue, "Hallo Welt und Weitere", () => field.concat(" und Weitere"));
		TestLib.#assertValue(field, initialValue, "Hallo WeltHallo Welt", () => field.repeat(2));
		TestLib.#assertValue(field, initialValue, "Hallihallo Welt", () => field.replace("o", "ihallo"));
		TestLib.#assertValue(field, initialValue, "Hakko Wekk", () => field.replaceAll("l.", "kk"));
		TestLib.#assertValue(field, initialValue, "lo We", () => field.slice(3, 8));
		TestLib.#assertValue(field, initialValue, "hallo welt", () => field.toLowerCase());
		TestLib.#assertValue(field, initialValue, "HALLO WELT", () => field.toUpperCase());
		TestLib.#assertValue(field, "  Hallo Welt  ", "Hallo Welt", () => field.trim());
		TestLib.#assertValue(field, "  Hallo Welt  ", "  Hallo Welt", () => field.trimEnd());
		TestLib.#assertValue(field, "  Hallo Welt  ", "Hallo Welt  ", () => field.trimStart());

		TestLib.#assertResult(field, initialValue, 10, () => field.length());
		TestLib.#assertResult(field, "20.25", 20.25, () => field.asNumber());
		TestLib.#assertValue(field, initialValue, "Hallo große Welt", () => field.insert(5, "große "));
		TestLib.#assertValue(field, initialValue, "Hallo", () => field.remove(" Welt"));

		TestLib.#assertValue(field, undefined, "", () => field.clear());
		return errors;
	}

	static testSplitField(field)
	{
		// Tests sind für ListField und SplitField identisch, da beide durch den ListFieldInteractor bereitgestellt werden
		return TestLib.testListField();
	}

	static testRadioField(field)
	{
		let errors = [];
		TestLib.#assertResult(field, undefined, true, () => field.isEmpty());
		TestLib.#assertValue(field, undefined, undefined);

		TestLib.#assertValue(field, undefined, undefined, () => field.clear());
		return errors;
	}

	static testCheckField(field)
	{
		let errors = [];
		TestLib.#assertResult(field, undefined, true, () => field.isEmpty());
		TestLib.#assertValue(field, undefined, []);

		TestLib.#assertValue(field, undefined, [], () => field.clear());
		return errors;
	}

	static testSelectorField(field)
	{
		let errors = [];
		TestLib.#assertResult(field, undefined, true, () => field.isEmpty());
		TestLib.#assertValue(field, undefined, "Opt1");

		TestLib.#assertValue(field, undefined, "Opt1", () => field.clear());
		return errors;
	}

	static testListField(field)
	{
		let errors = [];
		let initialValue = ["Lorem", "ipsum", "dolor", "sit", "amet"];
		TestLib.#assertResult(field, undefined, true, () => field.isEmpty());
		TestLib.#assertValue(field, undefined, []);

		TestLib.#assertResult(field, initialValue, "sit", () => field.at(3));
		TestLib.#assertResult(field, initialValue, [[0, "Lorem"], [1, "ipsum"], [2, "dolor"], [3, "sit"], [4, "amet"]], () => Array.from(field.entries()));
		TestLib.#assertResult(field, initialValue, false, () => field.every(str => str.length === 5));
		TestLib.#assertResult(field, initialValue, "ipsum", () => field.find(str => str.includes("i")));
		TestLib.#assertResult(field, initialValue, 1, () => field.findIndex(str => str.includes("i")));
		TestLib.#assertResult(field, initialValue, "sit", () => field.findLast(str => str.includes("i")));
		TestLib.#assertResult(field, initialValue, 3, () => field.findLastIndex(str => str.includes("i")));
		TestLib.#assertResult(field, initialValue, "Lorem ipsum dolor sit amet", () => field.join(" "));
		TestLib.#assertResult(field, initialValue, [0, 1, 2, 3, 4], () => Array.from(field.keys()));
		TestLib.#assertResult(field, initialValue, true, () => field.some(str => str.length === 5));
		TestLib.#assertResult(field, initialValue, ["Lorem", "ipsum", "dolor", "sit", "amet"], () => Array.from(field.values()));

		TestLib.#assertValue(field, initialValue, ["Lorem", "ipsum", "dolor", "sit", "amet", "consetetur", "sadipscing", "elitr"], () => field.concat("consetetur", "sadipscing", "elitr"));
		TestLib.#assertValue(field, initialValue, ["Lorem", "Lorem", "Lorem", "Lorem", "Lorem"], () => field.fill("Lorem"));
		TestLib.#assertValue(field, initialValue, ["ipsum", "sit"], () => field.filter(str => str.includes("i")));
		TestLib.#assertValue(field, initialValue, ["LOREM", "IMPSUM", "DOLOR", "SIT", "AMET"], () => field.forEach(str => str.toUpperCase()));
		TestLib.#assertValue(field, initialValue, ["Lorem", "ipsum", "dolor", "sit"], () => field.pop());
		TestLib.#assertValue(field, initialValue, ["Lorem", "ipsum", "dolor", "sit", "amet", "consetetur", "sadipscing", "elitr"], () => field.push("consetetur", "sadipscing", "elitr"));
		TestLib.#assertValue(field, initialValue, ["amet", "sit", "dolor", "ipsum", "Lorem"], () => field.reverse());
		TestLib.#assertValue(field, initialValue, ["ipsum", "dolor", "sit", "amet"], () => field.shift());
		TestLib.#assertValue(field, initialValue, ["ipsum", "dolor", "sit"], () => field.slice(1, 4));
		TestLib.#assertValue(field, initialValue, ["amet", "dolor", "ipsum", "Lorem", "sit"], () => field.sort());
		TestLib.#assertValue(field, initialValue, ["Lorem", "Lorem", "ipsum", "dolor", "sit", "amet", "amet"], () => field.splice(1, 3, initialValue));
		TestLib.#assertValue(field, initialValue, ["takimata", "sanctus", "est", "Lorem", "ipsum", "dolor", "sit", "amet"], () => field.unshift("takimata", "sanctus", "est"));

		TestLib.#assertResult(field, initialValue, true, () => field.includes("ipsum"));
		TestLib.#assertResult(field, ["Lorem", "ipsum", "Lorem", "ipsum"], 1, () => field.indexOf("ipsum"));
		TestLib.#assertResult(field, ["Lorem", "ipsum", "Lorem", "ipsum"], 2, () => field.lastIndexOf("Lorem"));

		TestLib.#assertResult(field, initialValue, 5, () => field.length());
		TestLib.#assertResult(field, initialValue, "Lorem", () => field.first());
		TestLib.#assertResult(field, initialValue, "amet", () => field.last());
		TestLib.#assertResult(field, initialValue, true, () => field.contains("ipsum"));

		TestLib.#assertValue(field, initialValue, ["Lorem", "ipsum", "dolor", "sit", "amet", "consetetur", "sadipscing", "elitr"], () => field.add("consetetur", "sadipscing", "elitr"));
		TestLib.#assertValue(field, initialValue, ["Lorem", "ipsum", "dolor", "Lorem", "ipsum", "amet"], () => field.set(3, "Lorem", "ipsum"));
		TestLib.#assertValue(field, initialValue, ["Lorem", "ipsum", "dolor", "Lorem", "ipsum", "sit", "amet"], () => field.insert(3, "Lorem", "ipsum"));
		TestLib.#assertValue(field, initialValue, ["Lorem", "ipsum", "dolor", "amet"], () => field.remove("sit"));
		TestLib.#assertValue(field, initialValue, ["Lorem", "ipsum", "dolor", "amet"], () => field.removeIndex(3));
		TestLib.#assertValue(field, ["Lorem", "ipsum", "Lorem", "ipsum"], ["Lorem", "Lorem", "ipsum", "Lorem", "ipsum"], () => field.replace("ipsum", "Lorem", "ipsum"));
		TestLib.#assertValue(field, ["Lorem", "ipsum", "Lorem", "ipsum"], ["Lorem", "Lorem", "ipsum", "Lorem", "Lorem", "ipsum"], () => field.replaceAll("ipsum", "Lorem", "ipsum"));
		TestLib.#assertValue(field, ["Lorem", "ipsum", "Lorem", "ipsum"], ["Lorem", "ipsum"], () => field.unify());

		TestLib.#assertResult(field, [9, "-6", "04", 80, 7], -6, () => field.minimum());
		TestLib.#assertResult(field, [9, "-6", "04", 80, 7], 80, () => field.maximum());
		TestLib.#assertResult(field, [9, "-6", "04", 80, 7], 18.8, () => field.average());
		TestLib.#assertResult(field, [9, "-6", "04", 80, 7], 7, () => field.median());
		TestLib.#assertResult(field, [9, "-6", "04", 80, 7], 94, () => field.sum());

		TestLib.#assertResult(field, initialValue, true, () => field.isAtStart());
		TestLib.#assertResult(field, undefined, true, () => field.hasNext());
		TestLib.#assertResult(field, undefined, "Lorem", () => field.next());
		TestLib.#assertResult(field, undefined, "ipsum", () => field.next());
		TestLib.#assertResult(field, undefined, "amet", () => field.findNext(str => str.length = 4));
		TestLib.#assertResult(field, undefined, false, () => field.hasNext());
		TestLib.#assertResult(field, undefined, false, () => field.isAtEnd());
		TestLib.#assertResult(field, undefined, undefined, () => field.next());
		TestLib.#assertResult(field, undefined, false, () => field.hasNext());
		TestLib.#assertResult(field, undefined, true, () => field.isAtEnd());

		TestLib.#assertResult(field, undefined, "amet", () => field.previous());
		TestLib.#assertResult(field, undefined, "sit", () => field.previous());
		TestLib.#assertResult(field, undefined, undefined, () => field.findPrevious(str => str.length = 3));
		TestLib.#assertResult(field, undefined, false, () => field.hasPrevious());
		TestLib.#assertResult(field, undefined, true, () => field.isAtStart());
		TestLib.#assertResult(field, undefined, "Lorem", () => field.next());
		TestLib.#assertResult(field, undefined, false, () => field.hasPrevious());
		TestLib.#assertResult(field, undefined, false, () => field.isAtStart());

		TestLib.#assertResult(field, undefined, undefined, () => field.restartIterator());
		TestLib.#assertResult(field, undefined, "Lorem", () => field.next());
		TestLib.#assertResult(field, undefined, 0, () => field.getIteratorPosition());
		TestLib.#assertResult(field, undefined, 2, () => field.setIteratorPosition());
		TestLib.#assertResult(field, undefined, 2, () => field.getIteratorPosition());
		TestLib.#assertResult(field, undefined, "dolor", () => field.current());
		TestLib.#assertResult(field, undefined, 2, () => field.currentIndex());

		TestLib.#assertValue(field, undefined, [], () => field.clear());
		return errors;
	}

	static testTableField(field)
	{
		let errors = [];
		TestLib.#assertResult(field, undefined, true, () => field.isEmpty());
		TestLib.#assertValue(field, undefined, []);

		TestLib.#assertValue(field, undefined, [], () => field.clear());
		return errors;
	}

	static #assertResult(field, initialValue, expectedResult, action)
	{
		// Für Aktionen gedacht, bei denen der Rückgabewert geprüft werden soll
		let testName = field.getName() + " with action " + action.toString() + ": ";
		try
		{
			if (initialValue !== undefined)
			{
				field.setValue(initialValue);
			}
			let result = action();
			if (TestLib.Utils.equals(result, expectedResult))
			{
				TestLib.Module.print(testName + "succesfull");
				return undefined;
			}
			else
			{
				let message = "result '" + result + "' is not equal to expected result '" + expectedResult + "'";
				TestLib.Module.print(testName + "failed, message: " + message);
				return new Error(testName + message);
			}
		}
		catch (err)
		{
			TestLib.Module.print(testName + "failed with unexpected error, message: " + err.message);
			err.message = testName + err.message;
			return err;
		}
	}

	static #assertValue(field, initialValue, expectedValue, action = () => {})
	{
		// Für Aktionen gedacht, bei denen der neue Wert des Felds geprüft werden soll
		let testName = field.getName() + " with action " + action.toString() + ": ";
		try
		{
			if (initialValue !== undefined)
			{
				field.setValue(initialValue);
			}
			action();
			if (TestLib.Utils.equals(field, expectedValue))
			{
				TestLib.Module.print(testName + "succesfull");
				return undefined;
			}
			else
			{
				let message = "value '" + field.getPrint() + "' is not equal to expected value '" + expectedValue + "'";
				TestLib.Module.print(testName + "failed, message: " + message);
				return new Error(testName + message);
			}
		}
		catch (err)
		{
			TestLib.Module.print(testName + "failed with unexpected error, message: " + err.message);
			err.message = testName + err.message;
			return err;
		}
	}
}