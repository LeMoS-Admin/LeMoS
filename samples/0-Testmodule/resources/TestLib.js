import Logger from "../lib/systemFunctions/Logger.js";
import Resource from "../lib/systemFunctions/Resource.js";
import Utils from "../lib/systemFunctions/Utils.js";

export class TestLib
{
	static testInfoField(field)
	{
		let errors = [];
		errors.push(TestLib.#assertResult(field, null, false, () => field.isEmpty()));
		errors.push(TestLib.#assertResult(field, null, true, () => field.isDisplayed()));
		errors.push(TestLib.#assertResult(field, null, false, () => field.setDisplayed(false).isDisplayed()));
		errors.push(TestLib.#assertResult(field, null, true, () => field.setDisplayed(true).isDisplayed()));
		errors.push(TestLib.#assertResult(field, null, false, () => field.isEnabled()));
		errors.push(TestLib.#assertResult(field, null, false, () => field.setEnabled(true).isEnabled()));

		errors.push(TestLib.#assertValue(field, null, "Infotext"));
		errors.push(TestLib.#assertResult(field, "", true, () => field.isEmpty()));
		errors.push(TestLib.#assertValue(field, "", ""));

		errors.push(TestLib.#assertValue(field, "", "Infotext", () => field.clear()));
		return errors.filter(err => err !== undefined);
	}

	static testImageField(field)
	{
		let errors = [];
		errors.push(TestLib.#assertResult(field, null, false, () => field.isEmpty()));
		errors.push(TestLib.#assertResult(field, null, true, () => field.isDisplayed()));
		errors.push(TestLib.#assertResult(field, null, false, () => field.setDisplayed(false).isDisplayed()));
		errors.push(TestLib.#assertResult(field, null, true, () => field.setDisplayed(true).isDisplayed()));
		errors.push(TestLib.#assertResult(field, null, false, () => field.isEnabled()));
		errors.push(TestLib.#assertResult(field, null, false, () => field.setEnabled(true).isEnabled()));
		errors.push(TestLib.#assertValue(field, null, Resource.get("Image1")));

		errors.push(TestLib.#assertResult(field, "", true, () => field.isEmpty()));
		errors.push(TestLib.#assertValue(field, "", ""));
		errors.push(TestLib.#assertValue(field, "", Resource.get("Image1"), () => field.clear()));
		errors.push(TestLib.#assertValue(field, Resource.get("Image1"), Resource.get("Image1")));
		errors.push(TestLib.#assertValue(field, Resource.get("Image2"), Resource.get("Image2")));

		errors.push(TestLib.#assertValue(field, null, Resource.get("Image1"), () => field.clear()));
		return errors.filter(err => err !== undefined);
	}

	static testAudioField(field)
	{
		let errors = [];
		errors.push(TestLib.#assertResult(field, null, false, () => field.isEmpty()));
		errors.push(TestLib.#assertResult(field, null, true, () => field.isDisplayed()));
		errors.push(TestLib.#assertResult(field, null, false, () => field.setDisplayed(false).isDisplayed()));
		errors.push(TestLib.#assertResult(field, null, true, () => field.setDisplayed(true).isDisplayed()));
		errors.push(TestLib.#assertResult(field, null, false, () => field.isEnabled()));
		errors.push(TestLib.#assertResult(field, null, false, () => field.setEnabled(true).isEnabled()));
		errors.push(TestLib.#assertValue(field, null, Resource.get("Audio1")));

		errors.push(TestLib.#assertResult(field, "", true, () => field.isEmpty()));
		errors.push(TestLib.#assertValue(field, "", ""));
		errors.push(TestLib.#assertValue(field, "", Resource.get("Audio1"), () => field.clear()));
		errors.push(TestLib.#assertValue(field, Resource.get("Audio1"), Resource.get("Audio1")));
		errors.push(TestLib.#assertValue(field, Resource.get("Audio2"), Resource.get("Audio2")));

		errors.push(TestLib.#assertValue(field, null, Resource.get("Audio1"), () => field.clear()));
		return errors.filter(err => err !== undefined);
	}

	static testVideoField(field)
	{
		let errors = [];
		errors.push(TestLib.#assertResult(field, null, false, () => field.isEmpty()));
		errors.push(TestLib.#assertResult(field, null, true, () => field.isDisplayed()));
		errors.push(TestLib.#assertResult(field, null, false, () => field.setDisplayed(false).isDisplayed()));
		errors.push(TestLib.#assertResult(field, null, true, () => field.setDisplayed(true).isDisplayed()));
		errors.push(TestLib.#assertResult(field, null, false, () => field.isEnabled()));
		errors.push(TestLib.#assertResult(field, null, false, () => field.setEnabled(true).isEnabled()));
		errors.push(TestLib.#assertValue(field, null, Resource.get("Video1")));

		errors.push(TestLib.#assertResult(field, "", true, () => field.isEmpty()));
		errors.push(TestLib.#assertValue(field, "", ""));
		errors.push(TestLib.#assertValue(field, "", Resource.get("Video1"), () => field.clear()));
		errors.push(TestLib.#assertValue(field, Resource.get("Video1"), Resource.get("Video1")));
		errors.push(TestLib.#assertValue(field, Resource.get("Video2"), Resource.get("Video2")));

		errors.push(TestLib.#assertValue(field, null, Resource.get("Video1"), () => field.clear()));
		return errors.filter(err => err !== undefined);
	}

	static testTextField(field)
	{
		let errors = [];
		let initialValue = "Hallo Welt";
		errors.push(TestLib.#assertResult(field, null, true, () => field.isEmpty()));
		errors.push(TestLib.#assertResult(field, null, true, () => field.isDisplayed()));
		errors.push(TestLib.#assertResult(field, null, false, () => field.setDisplayed(false).isDisplayed()));
		errors.push(TestLib.#assertResult(field, null, true, () => field.setDisplayed(true).isDisplayed()));
		errors.push(TestLib.#assertResult(field, null, true, () => field.isEnabled()));
		errors.push(TestLib.#assertResult(field, null, false, () => field.setEnabled(false).isEnabled()));
		errors.push(TestLib.#assertResult(field, null, true, () => field.setEnabled(true).isEnabled()));
		errors.push(TestLib.#assertValue(field, null, ""));

		// Lesende Methoden, von String übernommen
		{
			errors.push(TestLib.#assertResult(field, initialValue, "o", () => field.at(4)));
			errors.push(TestLib.#assertResult(field, initialValue, true, () => field.endsWith("Welt")));
			errors.push(TestLib.#assertResult(field, initialValue, true, () => field.includes("Hallo Welt")));
			errors.push(TestLib.#assertResult(field, initialValue, 2, () => field.indexOf("l")));
			errors.push(TestLib.#assertResult(field, initialValue, 8, () => field.lastIndexOf("l")));
			errors.push(TestLib.#assertResult(field, initialValue, ["ll", "lt"], () => field.match(/l./g)));
			errors.push(TestLib.#assertResult(field, initialValue, [["ll"], ["lt"]], () => Array.from(field.matchAll(/l./g))));
			errors.push(TestLib.#assertResult(field, initialValue, 3, () => field.search("lo.")));
			errors.push(TestLib.#assertResult(field, initialValue, ["Hallo", "Welt"], () => field.split(" ")));
			errors.push(TestLib.#assertResult(field, initialValue, true, () => field.startsWith("Hallo")));
		}

		// Verändernde Methoden, von String übernommen
		{
			errors.push(TestLib.#assertValue(field, initialValue, "Hallo Welt und Weitere", () => field.concat(" und Weitere")));
			errors.push(TestLib.#assertValue(field, initialValue, "Hallo WeltHallo Welt", () => field.repeat(2)));
			errors.push(TestLib.#assertValue(field, initialValue, "Hallihallo Welt", () => field.replace("o", "ihallo")));
			errors.push(TestLib.#assertValue(field, initialValue, "Hakko Wekk", () => field.replaceAll(/l./g, "kk")));
			errors.push(TestLib.#assertValue(field, initialValue, "lo We", () => field.slice(3, 8)));
			errors.push(TestLib.#assertValue(field, initialValue, "hallo welt", () => field.toLowerCase()));
			errors.push(TestLib.#assertValue(field, initialValue, "HALLO WELT", () => field.toUpperCase()));
			errors.push(TestLib.#assertValue(field, "  Hallo Welt  ", "Hallo Welt", () => field.trim()));
			errors.push(TestLib.#assertValue(field, "  Hallo Welt  ", "  Hallo Welt", () => field.trimEnd()));
			errors.push(TestLib.#assertValue(field, "  Hallo Welt  ", "Hallo Welt  ", () => field.trimStart()));
		}

		// Zusätzliche Methoden
		{
			errors.push(TestLib.#assertResult(field, initialValue, 10, () => field.length()));
			errors.push(TestLib.#assertResult(field, "20.25", 20.25, () => field.asNumber()));
			errors.push(TestLib.#assertValue(field, initialValue, "Hallo große Welt", () => field.insert(6, "große ")));
			errors.push(TestLib.#assertValue(field, initialValue, "Hallo", () => field.remove(5, 10)));
		}

		errors.push(TestLib.#assertResult(field, null, false, () => field.isEmpty()));
		errors.push(TestLib.#assertValue(field, null, "", () => field.clear()));
		return errors.filter(err => err !== undefined);
	}

	static testSplitField(field)
	{
		// Tests sind für ListField und SplitField identisch, da beide durch den ListFieldInteractor bereitgestellt werden
		return TestLib.testListField(field);
	}

	static testRadioField(field)
	{
		let errors = [];
		errors.push(TestLib.#assertResult(field, null, true, () => field.isEmpty()));
		errors.push(TestLib.#assertResult(field, null, true, () => field.isDisplayed()));
		errors.push(TestLib.#assertResult(field, null, false, () => field.setDisplayed(false).isDisplayed()));
		errors.push(TestLib.#assertResult(field, null, true, () => field.setDisplayed(true).isDisplayed()));
		errors.push(TestLib.#assertResult(field, null, true, () => field.isEnabled()));
		errors.push(TestLib.#assertResult(field, null, false, () => field.setEnabled(false).isEnabled()));
		errors.push(TestLib.#assertResult(field, null, true, () => field.setEnabled(true).isEnabled()));
		errors.push(TestLib.#assertValue(field, null, undefined));

		errors.push(TestLib.#assertResult(field, null, ["Opt0", "Opt1", "Opt2"], () => field.getOptions()));
		errors.push(TestLib.#assertResult(field, "Opt1", ["Opt1"], () => field.getCheckedOptions()));
		errors.push(TestLib.#assertResult(field, "Opt1", ["Opt0", "Opt2"], () => field.getUncheckedOptions()));
		errors.push(TestLib.#assertValue(field, "Opt1", "Opt1"));
		errors.push(TestLib.#assertValue(field, ["Opt1"], "Opt1"));
		errors.push(TestLib.#assertValue(field, undefined, undefined));
		errors.push(TestLib.#assertValue(field, [], undefined));

		errors.push(TestLib.#assertResult(field, "Opt1", false, () => field.isEmpty()));
		errors.push(TestLib.#assertValue(field, null, undefined, () => field.clear()));
		return errors.filter(err => err !== undefined);
	}

	static testCheckField(field)
	{
		let errors = [];
		errors.push(TestLib.#assertResult(field, null, true, () => field.isEmpty()));
		errors.push(TestLib.#assertResult(field, null, true, () => field.isDisplayed()));
		errors.push(TestLib.#assertResult(field, null, false, () => field.setDisplayed(false).isDisplayed()));
		errors.push(TestLib.#assertResult(field, null, true, () => field.setDisplayed(true).isDisplayed()));
		errors.push(TestLib.#assertResult(field, null, true, () => field.isEnabled()));
		errors.push(TestLib.#assertResult(field, null, false, () => field.setEnabled(false).isEnabled()));
		errors.push(TestLib.#assertResult(field, null, true, () => field.setEnabled(true).isEnabled()));
		errors.push(TestLib.#assertValue(field, null, []));

		errors.push(TestLib.#assertResult(field, null, ["Opt0", "Opt1", "Opt2"], () => field.getOptions()));
		errors.push(TestLib.#assertResult(field, ["Opt0", "Opt1"], ["Opt0", "Opt1"], () => field.getCheckedOptions()));
		errors.push(TestLib.#assertResult(field, ["Opt0", "Opt1"], ["Opt2"], () => field.getUncheckedOptions()));
		errors.push(TestLib.#assertValue(field, "Opt1", ["Opt1"]));
		errors.push(TestLib.#assertValue(field, ["Opt0", "Opt1"], ["Opt0", "Opt1"]));
		errors.push(TestLib.#assertValue(field, undefined, []));
		errors.push(TestLib.#assertValue(field, [], []));

		errors.push(TestLib.#assertResult(field, "Opt1", false, () => field.isEmpty()));
		errors.push(TestLib.#assertValue(field, null, [], () => field.clear()));
		return errors.filter(err => err !== undefined);
	}

	static testSelectField(field)
	{
		let errors = [];
		errors.push(TestLib.#assertResult(field, null, true, () => field.isEmpty()));
		errors.push(TestLib.#assertResult(field, null, true, () => field.isDisplayed()));
		errors.push(TestLib.#assertResult(field, null, false, () => field.setDisplayed(false).isDisplayed()));
		errors.push(TestLib.#assertResult(field, null, true, () => field.setDisplayed(true).isDisplayed()));
		errors.push(TestLib.#assertResult(field, null, true, () => field.isEnabled()));
		errors.push(TestLib.#assertResult(field, null, false, () => field.setEnabled(false).isEnabled()));
		errors.push(TestLib.#assertResult(field, null, true, () => field.setEnabled(true).isEnabled()));
		errors.push(TestLib.#assertValue(field, null, "Opt0"));

		errors.push(TestLib.#assertResult(field, null, ["Opt0", "Opt1", "Opt2"], () => field.getOptions()));
		errors.push(TestLib.#assertResult(field, null, 0, () => field.getSelectedIndex()));
		errors.push(TestLib.#assertValue(field, "Opt0", "Opt0"));
		errors.push(TestLib.#assertValue(field, 2, "Opt2"));
		errors.push(TestLib.#assertResult(field, "Opt1", 1, () => field.getSelectedIndex()));

		errors.push(TestLib.#assertResult(field, null, false, () => field.isEmpty()));
		errors.push(TestLib.#assertValue(field, null, "Opt0", () => field.clear()));
		return errors.filter(err => err !== undefined);
	}

	static testListField(field)
	{
		let errors = [];
		let initialValue = ["Lorem", "ipsum", "dolor", "sit", "amet"];
		errors.push(TestLib.#assertResult(field, null, true, () => field.isEmpty()));
		errors.push(TestLib.#assertResult(field, null, true, () => field.isDisplayed()));
		errors.push(TestLib.#assertResult(field, null, false, () => field.setDisplayed(false).isDisplayed()));
		errors.push(TestLib.#assertResult(field, null, true, () => field.setDisplayed(true).isDisplayed()));
		errors.push(TestLib.#assertResult(field, null, true, () => field.isEnabled()));
		errors.push(TestLib.#assertResult(field, null, false, () => field.setEnabled(false).isEnabled()));
		errors.push(TestLib.#assertResult(field, null, true, () => field.setEnabled(true).isEnabled()));
		errors.push(TestLib.#assertValue(field, null, []));
		errors.push(TestLib.#assertResult(field, ["", "", ""], [], () => field.getValue()));
		errors.push(TestLib.#assertResult(field, ["", "", ""], ["", "", ""], () => field.withEmptyEntries().getValue()));

		// Lesende Methoden, von Array übernommen
		{
			errors.push(TestLib.#assertResult(field, initialValue, "sit", () => field.at(3)));
			errors.push(TestLib.#assertResult(field, initialValue, [[0, "Lorem"], [1, "ipsum"], [2, "dolor"], [3, "sit"], [4, "amet"]], () => Array.from(field.entries())));
			errors.push(TestLib.#assertResult(field, initialValue, false, () => field.every(str => str.length === 5)));
			errors.push(TestLib.#assertResult(field, initialValue, "ipsum", () => field.find(str => str.includes("i"))));
			errors.push(TestLib.#assertResult(field, initialValue, 1, () => field.findIndex(str => str.includes("i"))));
			errors.push(TestLib.#assertResult(field, initialValue, "sit", () => field.findLast(str => str.includes("i"))));
			errors.push(TestLib.#assertResult(field, initialValue, 3, () => field.findLastIndex(str => str.includes("i"))));
			errors.push(TestLib.#assertResult(field, initialValue, null, () => field.forEach(str => str.toUpperCase())));
			errors.push(TestLib.#assertResult(field, initialValue, "Lorem ipsum dolor sit amet", () => field.join(" ")));
			errors.push(TestLib.#assertResult(field, initialValue, [0, 1, 2, 3, 4], () => Array.from(field.keys())));
			errors.push(TestLib.#assertResult(field, initialValue, true, () => field.some(str => str.length === 5)));
			errors.push(TestLib.#assertResult(field, initialValue, ["Lorem", "ipsum", "dolor", "sit", "amet"], () => Array.from(field.values())));
		}

		// Verändernde Methoden, von Array übernommen
		{
			errors.push(TestLib.#assertValue(field, initialValue, ["Lorem", "ipsum", "dolor", "sit", "amet", "consetetur", "sadipscing", "elitr"], () => field.concat("consetetur", "sadipscing", "elitr")));
			errors.push(TestLib.#assertValue(field, initialValue, ["Lorem", "Lorem", "Lorem", "Lorem", "Lorem"], () => field.fill("Lorem")));
			errors.push(TestLib.#assertValue(field, initialValue, ["ipsum", "sit"], () => field.filter(str => str.includes("i"))));
			errors.push(TestLib.#assertValue(field, initialValue, ["Lorem", "ipsum", "dolor", "sit"], () => field.pop()));
			errors.push(TestLib.#assertValue(field, initialValue, ["Lorem", "ipsum", "dolor", "sit", "amet", "consetetur", "sadipscing", "elitr"], () => field.push("consetetur", "sadipscing", "elitr")));
			errors.push(TestLib.#assertValue(field, initialValue, ["amet", "sit", "dolor", "ipsum", "Lorem"], () => field.reverse()));
			errors.push(TestLib.#assertValue(field, initialValue, ["ipsum", "dolor", "sit", "amet"], () => field.shift()));
			errors.push(TestLib.#assertValue(field, initialValue, ["ipsum", "dolor", "sit"], () => field.slice(1, 4)));
			errors.push(TestLib.#assertValue(field, initialValue, ["Lorem", "amet", "dolor", "ipsum", "sit"], () => field.sort()));
			errors.push(TestLib.#assertValue(field, initialValue, ["Lorem", "Lorem", "ipsum", "dolor", "sit", "amet", "amet"], () => field.splice(1, 3, ...initialValue)));
			errors.push(TestLib.#assertValue(field, initialValue, ["takimata", "sanctus", "est", "Lorem", "ipsum", "dolor", "sit", "amet"], () => field.unshift("takimata", "sanctus", "est")));
		}

		// Lesende Methoden, von Array übernommen und angepasst
		{
			errors.push(TestLib.#assertResult(field, initialValue, true, () => field.includes("ipsum")));
			errors.push(TestLib.#assertResult(field, ["Lorem", "ipsum", "Lorem", "ipsum"], 1, () => field.indexOf("ipsum")));
			errors.push(TestLib.#assertResult(field, ["Lorem", "ipsum", "Lorem", "ipsum"], 2, () => field.lastIndexOf("Lorem")));
		}

		// Zusätzliche lesende Methoden
		{
			errors.push(TestLib.#assertResult(field, [], 0, () => field.length()));
			errors.push(TestLib.#assertResult(field, initialValue, 5, () => field.length()));
			errors.push(TestLib.#assertResult(field, initialValue, "Lorem", () => field.first()));
			errors.push(TestLib.#assertResult(field, initialValue, "amet", () => field.last()));
			errors.push(TestLib.#assertResult(field, initialValue, true, () => field.contains("ipsum")));
		}

		// Zusätzliche verändernde Methoden
		{
			errors.push(TestLib.#assertValue(field, initialValue, ["Lorem", "ipsum", "dolor", "sit", "amet", "consetetur", "sadipscing", "elitr"], () => field.add("consetetur", "sadipscing", "elitr")));
			errors.push(TestLib.#assertValue(field, initialValue, ["Lorem", "ipsum", "dolor", "Lorem", "ipsum", "amet"], () => field.set(3, "Lorem", "ipsum")));
			errors.push(TestLib.#assertValue(field, initialValue, ["Lorem", "ipsum", "dolor", "Lorem", "ipsum", "sit", "amet"], () => field.insert(3, "Lorem", "ipsum")));
			errors.push(TestLib.#assertValue(field, initialValue, ["Lorem", "ipsum", "dolor", "amet"], () => field.remove("sit")));
			errors.push(TestLib.#assertValue(field, initialValue, ["Lorem", "ipsum", "dolor", "amet"], () => field.removeIndex(3)));
			errors.push(TestLib.#assertValue(field, ["Lorem", "ipsum", "Lorem", "ipsum"], ["Lorem", "ipsum"], () => field.unify()));
		}

		// Zusätzliche lesende Methoden für Berechnungen
		{
			errors.push(TestLib.#assertResult(field, [9, "-6", "04", 80, 7], -6, () => field.minimum()));
			errors.push(TestLib.#assertResult(field, [9, "-6", "04", 80, 7], 80, () => field.maximum()));
			errors.push(TestLib.#assertResult(field, [9, "-6", "04", 80, 7], 18.8, () => field.average()));
			errors.push(TestLib.#assertResult(field, [9, "-6", "04", 80, 7], 7, () => field.median()));
			errors.push(TestLib.#assertResult(field, [9, "-6", "04", 80, 7], 94, () => field.sum()));
		}

		// Zusätzliche iterierende Methoden
		{
			errors.push(TestLib.#assertResult(field, initialValue, true, () => field.isAtStart()));
			errors.push(TestLib.#assertResult(field, null, true, () => field.hasNext()));
			errors.push(TestLib.#assertResult(field, null, "Lorem", () => field.next()));
			errors.push(TestLib.#assertResult(field, null, "ipsum", () => field.next()));
			errors.push(TestLib.#assertResult(field, null, "amet", () => field.findNext(str => str.length === 4)));
			errors.push(TestLib.#assertResult(field, null, false, () => field.hasNext()));
			errors.push(TestLib.#assertResult(field, null, false, () => field.isAtEnd()));
			errors.push(TestLib.#assertResult(field, null, undefined, () => field.next()));
			errors.push(TestLib.#assertResult(field, null, false, () => field.hasNext()));
			errors.push(TestLib.#assertResult(field, null, true, () => field.isAtEnd()));

			errors.push(TestLib.#assertResult(field, null, "amet", () => field.previous()));
			errors.push(TestLib.#assertResult(field, null, "sit", () => field.previous()));
			errors.push(TestLib.#assertResult(field, null, undefined, () => field.findPrevious(str => str.length === 3)));
			errors.push(TestLib.#assertResult(field, null, false, () => field.hasPrevious()));
			errors.push(TestLib.#assertResult(field, null, false, () => field.isAtStart()));
			errors.push(TestLib.#assertResult(field, null, undefined, () => field.previous()));
			errors.push(TestLib.#assertResult(field, null, false, () => field.hasPrevious()));
			errors.push(TestLib.#assertResult(field, null, true, () => field.isAtStart()));

			errors.push(TestLib.#assertResult(field, null, null, () => field.restartIterator()));
			errors.push(TestLib.#assertResult(field, null, "Lorem", () => field.next()));
			errors.push(TestLib.#assertResult(field, null, 0, () => field.getIteratorPosition()));
			errors.push(TestLib.#assertResult(field, null, null, () => field.setIteratorPosition(2)));
			errors.push(TestLib.#assertResult(field, null, 2, () => field.getIteratorPosition()));
			errors.push(TestLib.#assertResult(field, null, "dolor", () => field.current()));
			errors.push(TestLib.#assertResult(field, null, 2, () => field.currentIndex()));

			errors.push(TestLib.#assertResult(field, null, null, () => field.setToStart()));
			errors.push(TestLib.#assertResult(field, null, true, () => field.isAtStart()));
			errors.push(TestLib.#assertResult(field, null, null, () => field.setToEnd()));
			errors.push(TestLib.#assertResult(field, null, true, () => field.isAtEnd()));
		}

		errors.push(TestLib.#assertResult(field, null, false, () => field.isEmpty()));
		errors.push(TestLib.#assertValue(field, null, [], () => field.clear()));
		return errors.filter(err => err !== undefined);
	}

	static testTableField(field)
	{
		let errors = [];
		let initialValue = [[7, 8, 9], [4, 5, 6], [1, 2, 3]];
		errors.push(TestLib.#assertResult(field, null, true, () => field.isEmpty()));
		errors.push(TestLib.#assertResult(field, null, true, () => field.isDisplayed()));
		errors.push(TestLib.#assertResult(field, null, false, () => field.setDisplayed(false).isDisplayed()));
		errors.push(TestLib.#assertResult(field, null, true, () => field.setDisplayed(true).isDisplayed()));
		errors.push(TestLib.#assertResult(field, null, true, () => field.isEnabled()));
		errors.push(TestLib.#assertResult(field, null, false, () => field.setEnabled(false).isEnabled()));
		errors.push(TestLib.#assertResult(field, null, true, () => field.setEnabled(true).isEnabled()));
		errors.push(TestLib.#assertValue(field, null, []));
		errors.push(TestLib.#assertResult(field, [["", "", ""],["", "", ""],["", "", ""]], [], () => field.getValue()));
		errors.push(TestLib.#assertResult(field, [["", "", ""],["", "", ""],["", "", ""]], [{"Attr1": "", "Attr2": "", "Attr3": ""},{"Attr1": "", "Attr2": "", "Attr3": ""},{"Attr1": "", "Attr2": "", "Attr3": ""}], () => field.withEmptyEntries().getValue()));
		errors.push(...TestLib.#testObjectField(field.withEmptyEntries().at(0)));

		// Lesende Methoden, von Array übernommen
		{
			errors.push(TestLib.#assertResult(field, initialValue, {"Attr1": 4, "Attr2": 5, "Attr3": 6}, () => field.at(1)));
			errors.push(TestLib.#assertResult(field, initialValue, [[0, {"Attr1": 7, "Attr2": 8, "Attr3": 9}], [1, {"Attr1": 4, "Attr2": 5, "Attr3": 6}], [2, {"Attr1": 1, "Attr2": 2, "Attr3": 3}]], () => Array.from(field.entries())));
			errors.push(TestLib.#assertResult(field, initialValue, false, () => field.every(entry => Array.from(entry.values()).includes(5))));
			errors.push(TestLib.#assertResult(field, initialValue, {"Attr1": 4, "Attr2": 5, "Attr3": 6}, () => field.find(entry => Array.from(entry.values()).includes(5))));
			errors.push(TestLib.#assertResult(field, initialValue, 1, () => field.findIndex(entry => Array.from(entry.values()).includes(5))));
			errors.push(TestLib.#assertResult(field, initialValue, {"Attr1": 4, "Attr2": 5, "Attr3": 6}, () => field.findLast(entry => Array.from(entry.values()).includes(5))));
			errors.push(TestLib.#assertResult(field, initialValue, 1, () => field.findLastIndex(entry => Array.from(entry.values()).includes(5))));
			errors.push(TestLib.#assertResult(field, initialValue, null, () => field.forEach(entry => entry.set("Attr2", 0))));
			errors.push(TestLib.#assertResult(field, initialValue, "{'Attr1': '7', 'Attr2': '8', 'Attr3': '9'} {'Attr1': '4', 'Attr2': '5', 'Attr3': '6'} {'Attr1': '1', 'Attr2': '2', 'Attr3': '3'}", () => field.join(" ")));
			errors.push(TestLib.#assertResult(field, initialValue, [0, 1, 2], () => Array.from(field.keys())));
			errors.push(TestLib.#assertResult(field, initialValue, true, () => field.some(entry => Array.from(entry.values()).includes(5))));
			errors.push(TestLib.#assertResult(field, initialValue, [{"Attr1": 7, "Attr2": 8, "Attr3": 9}, {"Attr1": 4, "Attr2": 5, "Attr3": 6}, {"Attr1": 1, "Attr2": 2, "Attr3": 3}], () => Array.from(field.values())));
		}

		// Verändernde Methoden, von Array übernommen
		{
			errors.push(TestLib.#assertValue(field, initialValue, [{"Attr1": 7, "Attr2": 8, "Attr3": 9}, {"Attr1": 4, "Attr2": 5, "Attr3": 6}, {"Attr1": 1, "Attr2": 2, "Attr3": 3}, {"Attr1": 0, "Attr2": 0, "Attr3": 0}, {"Attr1": 0, "Attr2": 0, "Attr3": 0}, {"Attr1": 0, "Attr2": 0, "Attr3": 0}], () => field.concat({"Attr1": 0, "Attr2": 0, "Attr3": 0}, {"Attr1": 0, "Attr2": 0, "Attr3": 0}, {"Attr1": 0, "Attr2": 0, "Attr3": 0})));
			errors.push(TestLib.#assertValue(field, initialValue, [{"Attr1": 0, "Attr2": 0, "Attr3": 0}, {"Attr1": 0, "Attr2": 0, "Attr3": 0}, {"Attr1": 0, "Attr2": 0, "Attr3": 0}], () => field.fill({"Attr1": 0, "Attr2": 0, "Attr3": 0})));
			errors.push(TestLib.#assertValue(field, initialValue, [{"Attr1": 4, "Attr2": 5, "Attr3": 6}, {"Attr1": 1, "Attr2": 2, "Attr3": 3}], () => field.filter(entry => Array.from(entry.values()).includes(5) || Array.from(entry.values()).includes(3))));
			errors.push(TestLib.#assertValue(field, initialValue, [{"Attr1": 7, "Attr2": 8, "Attr3": 9}, {"Attr1": 4, "Attr2": 5, "Attr3": 6}], () => field.pop()));
			errors.push(TestLib.#assertValue(field, initialValue, [{"Attr1": 7, "Attr2": 8, "Attr3": 9}, {"Attr1": 4, "Attr2": 5, "Attr3": 6}, {"Attr1": 1, "Attr2": 2, "Attr3": 3}, {"Attr1": 0, "Attr2": 0, "Attr3": 0}, {"Attr1": 0, "Attr2": 0, "Attr3": 0}, {"Attr1": 0, "Attr2": 0, "Attr3": 0}], () => field.push({"Attr1": 0, "Attr2": 0, "Attr3": 0}, {"Attr1": 0, "Attr2": 0, "Attr3": 0}, {"Attr1": 0, "Attr2": 0, "Attr3": 0})));
			errors.push(TestLib.#assertValue(field, initialValue, [{"Attr1": 1, "Attr2": 2, "Attr3": 3}, {"Attr1": 4, "Attr2": 5, "Attr3": 6}, {"Attr1": 7, "Attr2": 8, "Attr3": 9}], () => field.reverse()));
			errors.push(TestLib.#assertValue(field, initialValue, [{"Attr1": 4, "Attr2": 5, "Attr3": 6}, {"Attr1": 1, "Attr2": 2, "Attr3": 3}], () => field.shift()));
			errors.push(TestLib.#assertValue(field, initialValue, [{"Attr1": 4, "Attr2": 5, "Attr3": 6}], () => field.slice(1, 2)));
			errors.push(TestLib.#assertValue(field, initialValue, [{"Attr1": 1, "Attr2": 2, "Attr3": 3}, {"Attr1": 4, "Attr2": 5, "Attr3": 6}, {"Attr1": 7, "Attr2": 8, "Attr3": 9}], () => field.sort()));
			errors.push(TestLib.#assertValue(field, initialValue, [{"Attr1": 7, "Attr2": 8, "Attr3": 9}, {"Attr1": 7, "Attr2": 8, "Attr3": 9}, {"Attr1": 4, "Attr2": 5, "Attr3": 6}, {"Attr1": 1, "Attr2": 2, "Attr3": 3}], () => field.splice(1, 2, ...initialValue)));
			errors.push(TestLib.#assertValue(field, initialValue, [{"Attr1": 0, "Attr2": 0, "Attr3": 0}, {"Attr1": 7, "Attr2": 8, "Attr3": 9}, {"Attr1": 4, "Attr2": 5, "Attr3": 6}, {"Attr1": 1, "Attr2": 2, "Attr3": 3}], () => field.unshift({"Attr1": 0, "Attr2": 0, "Attr3": 0})));
		}

		// Lesende Methoden, von Array übernommen und angepasst
		{
			errors.push(TestLib.#assertResult(field, initialValue, true, () => field.includes({"Attr1": 4, "Attr2": 5, "Attr3": 6})));
			errors.push(TestLib.#assertResult(field, [{"Attr1": 7, "Attr2": 8, "Attr3": 9}, {"Attr1": 4, "Attr2": 5, "Attr3": 6}, {"Attr1": 7, "Attr2": 8, "Attr3": 9}, {"Attr1": 4, "Attr2": 5, "Attr3": 6}], 1, () => field.indexOf({"Attr1": 4, "Attr2": 5, "Attr3": 6})));
			errors.push(TestLib.#assertResult(field, [{"Attr1": 7, "Attr2": 8, "Attr3": 9}, {"Attr1": 4, "Attr2": 5, "Attr3": 6}, {"Attr1": 7, "Attr2": 8, "Attr3": 9}, {"Attr1": 4, "Attr2": 5, "Attr3": 6}], 2, () => field.lastIndexOf({"Attr1": 7, "Attr2": 8, "Attr3": 9})));
		}

		// Zusätzliche lesende Methoden
		{
			errors.push(TestLib.#assertResult(field, [], 0, () => field.length()));
			errors.push(TestLib.#assertResult(field, initialValue, 3, () => field.length()));
			errors.push(TestLib.#assertResult(field, initialValue, {"Attr1": 7, "Attr2": 8, "Attr3": 9}, () => field.first()));
			errors.push(TestLib.#assertResult(field, initialValue, {"Attr1": 1, "Attr2": 2, "Attr3": 3}, () => field.last()));
			errors.push(TestLib.#assertResult(field, initialValue, true, () => field.contains({"Attr1": 4, "Attr2": 5, "Attr3": 6})));
		}

		// Zusätzliche verändernde Methoden
		{
			errors.push(TestLib.#assertValue(field, initialValue, [{"Attr1": 7, "Attr2": 8, "Attr3": 9}, {"Attr1": 4, "Attr2": 5, "Attr3": 6}, {"Attr1": 1, "Attr2": 2, "Attr3": 3}, {"Attr1": 0, "Attr2": 0, "Attr3": 0}, {"Attr1": 0, "Attr2": 0, "Attr3": 0}, {"Attr1": 0, "Attr2": 0, "Attr3": 0}], () => field.add({"Attr1": 0, "Attr2": 0, "Attr3": 0}, {"Attr1": 0, "Attr2": 0, "Attr3": 0}, {"Attr1": 0, "Attr2": 0, "Attr3": 0})));
			errors.push(TestLib.#assertValue(field, initialValue, [{"Attr1": 7, "Attr2": 8, "Attr3": 9}, {"Attr1": 7, "Attr2": 8, "Attr3": 9}, {"Attr1": 1, "Attr2": 2, "Attr3": 3}, {"Attr1": 1, "Attr2": 2, "Attr3": 3}], () => field.set(1, {"Attr1": 7, "Attr2": 8, "Attr3": 9}, {"Attr1": 1, "Attr2": 2, "Attr3": 3})));
			errors.push(TestLib.#assertValue(field, initialValue, [{"Attr1": 7, "Attr2": 8, "Attr3": 9}, {"Attr1": 7, "Attr2": 8, "Attr3": 9}, {"Attr1": 1, "Attr2": 2, "Attr3": 3}, {"Attr1": 4, "Attr2": 5, "Attr3": 6}, {"Attr1": 1, "Attr2": 2, "Attr3": 3}], () => field.insert(1, {"Attr1": 7, "Attr2": 8, "Attr3": 9}, {"Attr1": 1, "Attr2": 2, "Attr3": 3})));
			errors.push(TestLib.#assertValue(field, initialValue, [{"Attr1": 7, "Attr2": 8, "Attr3": 9}, {"Attr1": 1, "Attr2": 2, "Attr3": 3}], () => field.remove({"Attr1": 4, "Attr2": 5, "Attr3": 6})));
			errors.push(TestLib.#assertValue(field, initialValue, [{"Attr1": 7, "Attr2": 8, "Attr3": 9}, {"Attr1": 1, "Attr2": 2, "Attr3": 3}], () => field.removeIndex(1)));
			errors.push(TestLib.#assertValue(field, [{"Attr1": 7, "Attr2": 8, "Attr3": 9}, {"Attr1": 4, "Attr2": 5, "Attr3": 6}, {"Attr1": 7, "Attr2": 8, "Attr3": 9}, {"Attr1": 4, "Attr2": 5, "Attr3": 6}], [{"Attr1": 7, "Attr2": 8, "Attr3": 9}, {"Attr1": 4, "Attr2": 5, "Attr3": 6}], () => field.unify()));
		}

		// Zusätzliche lesende Methoden für Tabellen
		{
			errors.push(TestLib.#assertResult(field, initialValue, {"Attr1": 4, "Attr2": 5, "Attr3": 6}, () => field.findByAttribute("Attr1", 4)));
			errors.push(TestLib.#assertResult(field, initialValue, 1, () => field.findIndexByAttribute("Attr1", 4)));
			errors.push(TestLib.#assertResult(field, initialValue, {"Attr1": 4, "Attr2": 5, "Attr3": 6}, () => field.findLastByAttribute("Attr1", 4)));
			errors.push(TestLib.#assertResult(field, initialValue, 1, () => field.findLastIndexByAttribute("Attr1", 4)));
			errors.push(TestLib.#assertResult(field, initialValue, [7, 4, 1], () => field.getAttribute("Attr1")));
		}

		// Zusätzliche verändernde Methoden für Tabellen
		{
			errors.push(TestLib.#assertValue(field, initialValue, [{"Attr1": 0, "Attr2": 8, "Attr3": 9}, {"Attr1": 1, "Attr2": 5, "Attr3": 6}, {"Attr1": 2, "Attr2": 2, "Attr3": 3}], () => field.setAttribute("Attr1", [0, 1, 2])));
			errors.push(TestLib.#assertValue(field, initialValue, [{"Attr1": 0, "Attr2": 8, "Attr3": 9}, {"Attr1": 0, "Attr2": 5, "Attr3": 6}, {"Attr1": 0, "Attr2": 2, "Attr3": 3}], () => field.fillAttribute("Attr1", 0)));
		}

		// Zusätzliche iterierende Methoden
		{
			errors.push(TestLib.#assertResult(field, initialValue, true, () => field.isAtStart()));
			errors.push(TestLib.#assertResult(field, null, true, () => field.hasNext()));
			errors.push(TestLib.#assertResult(field, null, {"Attr1": 7, "Attr2": 8, "Attr3": 9}, () => field.next()));
			errors.push(TestLib.#assertResult(field, null, {"Attr1": 4, "Attr2": 5, "Attr3": 6}, () => field.next()));
			errors.push(TestLib.#assertResult(field, null, {"Attr1": 1, "Attr2": 2, "Attr3": 3}, () => field.findNext(entry => Array.from(entry.values()).includes(2))));
			errors.push(TestLib.#assertResult(field, null, false, () => field.hasNext()));
			errors.push(TestLib.#assertResult(field, null, false, () => field.isAtEnd()));
			errors.push(TestLib.#assertResult(field, null, undefined, () => field.next()));
			errors.push(TestLib.#assertResult(field, null, false, () => field.hasNext()));
			errors.push(TestLib.#assertResult(field, null, true, () => field.isAtEnd()));

			errors.push(TestLib.#assertResult(field, null, {"Attr1": 1, "Attr2": 2, "Attr3": 3}, () => field.previous()));
			errors.push(TestLib.#assertResult(field, null, {"Attr1": 4, "Attr2": 5, "Attr3": 6}, () => field.previous()));
			errors.push(TestLib.#assertResult(field, null, undefined, () => field.findPrevious(entry => Array.from(entry.values()).includes(5))));
			errors.push(TestLib.#assertResult(field, null, false, () => field.hasPrevious()));
			errors.push(TestLib.#assertResult(field, null, false, () => field.isAtStart()));
			errors.push(TestLib.#assertResult(field, null, undefined, () => field.previous()));
			errors.push(TestLib.#assertResult(field, null, false, () => field.hasPrevious()));
			errors.push(TestLib.#assertResult(field, null, true, () => field.isAtStart()));

			errors.push(TestLib.#assertResult(field, null, null, () => field.restartIterator()));
			errors.push(TestLib.#assertResult(field, null, {"Attr1": 7, "Attr2": 8, "Attr3": 9}, () => field.next()));
			errors.push(TestLib.#assertResult(field, null, 0, () => field.getIteratorPosition()));
			errors.push(TestLib.#assertResult(field, null, null, () => field.setIteratorPosition(2)));
			errors.push(TestLib.#assertResult(field, null, 2, () => field.getIteratorPosition()));
			errors.push(TestLib.#assertResult(field, null, {"Attr1": 1, "Attr2": 2, "Attr3": 3}, () => field.current()));
			errors.push(TestLib.#assertResult(field, null, 2, () => field.currentIndex()));

			errors.push(TestLib.#assertResult(field, null, null, () => field.setToStart()));
			errors.push(TestLib.#assertResult(field, null, true, () => field.isAtStart()));
			errors.push(TestLib.#assertResult(field, null, null, () => field.setToEnd()));
			errors.push(TestLib.#assertResult(field, null, true, () => field.isAtEnd()));
		}

		// Zusätzliche iterierende Methoden für Tabellen
		{
			errors.push(TestLib.#assertResult(field, initialValue, {"Attr1": 4, "Attr2": 5, "Attr3": 6}, () => field.findNextByAttribute("Attr1", 4)));
			errors.push(TestLib.#assertResult(field, null, null, () => field.setToEnd()));
			errors.push(TestLib.#assertResult(field, null, {"Attr1": 4, "Attr2": 5, "Attr3": 6}, () => field.findPreviousByAttribute("Attr1", 4)));
		}

		errors.push(TestLib.#assertResult(field, null, false, () => field.isEmpty()));
		errors.push(TestLib.#assertValue(field, null, [], () => field.clear()));
		return errors.filter(err => err !== undefined);
	}

	static #testObjectField(field)
	{
		let errors = [];
		let initialValue = {"Attr1": "Lorem", "Attr2": "ipsum", "Attr3": "dolor"};
		errors.push(TestLib.#assertResult(field, null, true, () => field.isEmpty()));
		errors.push(TestLib.#assertResult(field, null, true, () => field.isDisplayed()));
		errors.push(TestLib.#assertResult(field, null, false, () => field.setDisplayed(false).isDisplayed()));
		errors.push(TestLib.#assertResult(field, null, true, () => field.setDisplayed(true).isDisplayed()));
		errors.push(TestLib.#assertResult(field, null, true, () => field.isEnabled()));
		errors.push(TestLib.#assertResult(field, null, false, () => field.setEnabled(false).isEnabled()));
		errors.push(TestLib.#assertResult(field, null, true, () => field.setEnabled(true).isEnabled()));
		errors.push(TestLib.#assertValue(field, null, {"Attr1": "", "Attr2": "", "Attr3": ""}));

		// Lesende Methoden, von Map übernommen
		{
			errors.push(TestLib.#assertResult(field, initialValue, [["Attr1", "Lorem"], ["Attr2", "ipsum"], ["Attr3", "dolor"]], () => Array.from(field.entries())));
			errors.push(TestLib.#assertResult(field, initialValue, null, () => field.forEach(str => str.toUpperCase())));
			errors.push(TestLib.#assertResult(field, initialValue, "ipsum", () => field.get("Attr2")));
			errors.push(TestLib.#assertResult(field, initialValue, true, () => field.has("Attr2")));
			errors.push(TestLib.#assertResult(field, initialValue, ["Attr1", "Attr2", "Attr3"], () => Array.from(field.keys())));
			errors.push(TestLib.#assertResult(field, initialValue, ["Lorem", "ipsum", "dolor"], () => Array.from(field.values())));
		}

		// Verändernde Methoden, von Map übernommen
		{
			errors.push(TestLib.#assertValue(field, initialValue, {"Attr1": "Lorem", "Attr2": "", "Attr3": "dolor"}, () => field.delete("Attr2")));
			errors.push(TestLib.#assertValue(field, initialValue, {"Attr1": "Lorem", "Attr2": "Lorem", "Attr3": "dolor"}, () => field.set("Attr2", "Lorem")));
		}

		// Zusätzliche Methoden
		{
			errors.push(TestLib.#assertResult(field, initialValue, 3, () => field.length()));
			errors.push(TestLib.#assertValue(field, initialValue, {"Attr1": "Lorem", "Attr2": "", "Attr3": "dolor"}, () => field.remove("Attr2")));
		}

		errors.push(TestLib.#assertResult(field, null, false, () => field.isEmpty()));
		errors.push(TestLib.#assertValue(field, null, {"Attr1": "", "Attr2": "", "Attr3": ""}, () => field.clear()));
		return errors.filter(err => err !== undefined);
	}

	static #assertResult(field, initialValue, expectedResult, action)
	{
		// Für Aktionen gedacht, bei denen der Rückgabewert geprüft werden soll
		let testName = field.getName() + " with action " + action.toString() + ": ";
		try
		{
			if (initialValue !== null)
			{
				field.setValue(initialValue);
			}
			let result = action();
			if (expectedResult === null || Utils.equals(result, expectedResult))
			{
				Logger.print("Passed: " + testName);
				return undefined;
			}
			else
			{
				let caller = Error().stack.split("\n").at(1).split("/res/").at(-1).replace(")", "").trim();
				let message = "Failed: " + testName + " at " + caller + ", message: "
					+ "result " + Utils.objectToPrint(result) + " is not equal to expected result '" + Utils.objectToPrint(expectedResult) + "'";
				Logger.print(message);
				return new Error(message);
			}
		}
		catch (err)
		{
			let caller = err.stack.split("\n").filter(str => str.includes("TestLib.js")).at(1).split("/res/").at(-1).replace(")", "").trim();
			let message = "Error:  " + testName + " at " + caller + ", message: " + err.toString()
				+ ", stack: \n\t\t" + err.stack.replaceAll("\n", "\n\t\t");
			Logger.print(message);
			err.message = message;
			return err;
		}
	}

	static #assertValue(field, initialValue, expectedValue, action = () => {})
	{
		// Für Aktionen gedacht, bei denen der neue Wert des Felds geprüft werden soll
		let testName = field.getName() + " with action " + action.toString();
		try
		{
			if (initialValue !== null)
			{
				field.setValue(initialValue);
			}
			action();
			if (expectedValue === null || Utils.equals(field, expectedValue))
			{
				Logger.print("Passed: " + testName);
				return undefined;
			}
			else
			{
				let caller = Error().stack.split("\n").at(1).split("/res/").at(-1).replace(")", "").trim();
				let message = "Failed: " + testName + " at " + caller + ", message: "
					+ "value " + Utils.objectToPrint(field).replaceAll("\n", " ").replaceAll("\t", "") + " is not equal to expected value '" + Utils.objectToPrint(expectedValue) + "'";
				Logger.print(message);
				return new Error(message);
			}
		}
		catch (err)
		{
			let caller = err.stack.split("\n").filter(str => str.includes("TestLib.js")).at(1).split("/res/").at(-1).replace(")", "").trim();
			let message = "Error:  " + testName + " at " + caller + ", message: " + err.toString()
				+ ", stack: \n\t\t" + err.stack.replaceAll("\n", "\n\t\t");
			Logger.print(message);
			err.message = message;
			return err;
		}
	}
}