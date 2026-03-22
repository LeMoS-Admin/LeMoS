export default class CSS_Utils
{
	static handleFunctionalPseudoClasses(selector)
	{
		selector = CSS_Utils.#removeFunctionalPseudoClass(selector, ":where", true);
		selector = CSS_Utils.#removeFunctionalPseudoClass(selector, ":is", false);
		selector = CSS_Utils.#removeFunctionalPseudoClass(selector, ":not", false);
		selector = CSS_Utils.#removeFunctionalPseudoClass(selector, ":has", false);
		return selector;
	}

	static #removeFunctionalPseudoClass(selector, fpClass, fully)
	{
		while (selector.includes(fpClass))
		{
			let fpClassIndex = selector.indexOf(fpClass);
			let openingBracketIndex = selector.indexOf("(", fpClassIndex);
			let closingBracketIndex = CSS_Utils.#findCorrespondingBracket(selector, openingBracketIndex);
			if(fully)
			{
				selector = selector.remove(fpClassIndex, closingBracketIndex + 1);
			}
			else
			{
				// Nur Pseudo-Klasse inkl. Klammern entfernen (von hinten nach vorne, damit sich die Indizes nicht verschieben)
				selector = selector.remove(closingBracketIndex);
				selector = selector.remove(fpClassIndex, openingBracketIndex + 1);
			}
		}
		return selector;
	}

	static #findCorrespondingBracket(selector, openingBracketIndex)
	{
		let openingBracketCount = 1;
		for (let k = openingBracketIndex + 1; k < selector.length; k++)
		{
			let char = selector.charAt(k);
			if (char === "(")
			{
				openingBracketCount++;
			}
			else if (char === ")")
			{
				openingBracketCount--;
			}

			if (openingBracketCount === 0)
			{
				return k;
			}
		}
		return selector.length;
	}

	static normalizeSelector(selector)
	{
		// Einfassen aller Kombinatoren-Zeichen in mindestens einem Leerzeichen
		selector = selector.replaceAll("+", " + ")
						   .replaceAll(">", " > ")
						   .replaceAll("~", " ~ ")
						   .replaceAll("=", " = ")
						   .replaceAll("||", " || ")
						   .replaceAll("&", " & ")
						   .replaceAll("(", "( ")    // Bei Klammern sind nur die inneren Leerzeichen optional, die umliegenden können auch ein Kombinator sein
						   .replaceAll("[", "[ ")
						   .replaceAll(")", " )")
						   .replaceAll("]", " ]");

		// Entfernen aller mehrfachen Leerzeichen (--> Kombinatoren-Zeichen sind von genau einem Leerzeichen umgeben)
		while (selector.includes("  "))
		{
			selector = selector.replaceAll("  ", " ")
		}

		// Entfernen aller Leerzeichen um Kombinatoren-Zeichen
		selector = selector.replaceAll(" + ", "+")
						   .replaceAll(" > ", ">")
						   .replaceAll(" ~ ", "~")
						   .replaceAll(" = ", "=")
						   .replaceAll(" || ", "||")
						   .replaceAll(" & ", "&")
						   .replaceAll("( ", "(") // Bei Klammern sind nur die inneren Leerzeichen optional, die umliegenden können auch ein Kombinator sein
						   .replaceAll("[ ", "[")
						   .replaceAll(" )", ")")
						   .replaceAll(" ]", "]");

		// Ergebnis: alle Leerzeichen sollten tatsächlich selber ein Kombinator sein
		return selector.trim();
	}

	static splitSelector(selector)
	{
		// Aufteilen des Selektors
		let firstCharIndex = 0;
		let parts = [];
		for (let k = 1; k < selector.length; k++)
		{
			let char = selector.charAt(k);
			switch (char)
			{
				case " ":
				case "+":
				case ">":
				case "~":
				case "&":
					parts.push(selector.substring(firstCharIndex, k));
					firstCharIndex = k + 1;
					break;
				case "#":
				case ".":
				case "[":
					parts.push(selector.substring(firstCharIndex, k));
					firstCharIndex = k; // Eckige Klammern, Hashtags und Punkte sollen behalten werden
					break;
				case "]":
					parts.push(selector.substring(firstCharIndex, k + 1)); // Eckige Klammern sollen behalten werden
					firstCharIndex = k + 1;
					break;
				case ":":
					parts.push(selector.substring(firstCharIndex, k));
					firstCharIndex = k; // Doppelpunkte sollen behalten werden
					k++; 				// Nächstes Zeichen wird übersprungen, um Probleme durch zweiten Doppelpunkt zu vermeiden
					break;
				case "|":
					if (selector.charAt(k + 1) === "|")
					{
						parts.push(selector.substring(firstCharIndex, k));
						firstCharIndex = k + 1;
						k++; // Nächstes Zeichen ist zweiter Strich und wird daher übersprungen
					}
					break;
			}
		}
		parts.push(selector.substring(firstCharIndex));
		return parts.filter(str => str !== "");
	}
}