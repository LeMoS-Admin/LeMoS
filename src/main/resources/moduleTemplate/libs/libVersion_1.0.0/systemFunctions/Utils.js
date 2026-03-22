import FieldManager from "../fieldManager/FieldManager.js";
import FieldInteractor from "../fieldInteractors/FieldInteractor.js";

export default class Utils
{
	// Die Array-Klasse von JavaScript nutzt für interne vergleiche stets den ===-Operator.
	// Dieser Vergleich ergibt auch bei Objekt-Instanzen mit gleichem Inhalt stets eine Ungleichheit.
	// In Java würde dieses Problem durch Überschreiben der equals-Methode behoben, in JavaScript gibt es keine äquivalente Methode.
	// Um Verwirrung durch gleichnamige aber nicht gleichfunktionale Methoden von JS-Objekten und LeMoS-Objekten zu vermeiden
	// wurde daher beschlossen, die Methoden direkt in den JS-Objekten anzupassen. Das umzusetzen ist einzige Aufgabe dieser Klasse,
	// weswegen sie auch nur einmalig beim Aufruf des Lernmoduls zu verwenden ist.
	// Hinweis: zusätzlich zu den zu überschreibenden Methoden werden an dieser Stelle auch einige weitere Methoden ergänzt.

	static _performOverwrite()
	{
		Utils.#overwriteArray();
		Utils.#extendArray();
		Utils.#extendMap();
		Utils.#extendString();
	}

	static #overwriteArray()
	{
		Array.prototype.includes = function (searchElement, fromIndex)
		{
			return this.indexOf(searchElement, fromIndex) !== -1;
		};

		Array.prototype.indexOf = function (searchElement, fromIndex)
		{
			// Übernommen aus Dokumentation von Array.indexOf()
			if (-this.length <= fromIndex < 0)
			{
				fromIndex = fromIndex + this.length;
			}
			else if (fromIndex < -this.length || fromIndex === undefined)
			{
				fromIndex = 0;
			}
			else if (fromIndex >= this.length)
			{
				return -1;
			}
			// Ende des Übernommenen

			for (let index = fromIndex; index < this.length; index++)
			{
				if (Utils.equals(this.at(index), searchElement))
				{
					return index;
				}
			}
			return -1;
		};

		Array.prototype.lastIndexOf = function (searchElement, fromIndex)
		{
			// Übernommen aus Dokumentation von Array.indexOf()
			if (-this.length <= fromIndex < 0)
			{
				fromIndex = fromIndex + this.length;
			}
			else if (fromIndex < -this.length)
			{
				return -1;
			}
			else if (fromIndex >= this.length || fromIndex === undefined)
			{
				fromIndex = this.length - 1;
			}
			// Ende des Übernommenen

			for (let index = fromIndex; index >= 0; index--)
			{
				if (Utils.equals(this.at(index), searchElement))
				{
					return index;
				}
			}
			return -1;
		};
	}

	static #extendArray()
	{
		Array.prototype.first = function ()
		{
			return this.at(0);
		};

		Array.prototype.last = function ()
		{
			return this.at(this.length - 1);
		};

		Array.prototype.contains = function (entry)
		{
			return this.includes(entry);
		};

		Array.prototype.add = function (...entries)
		{
			return this.push(...entries);
		};

		Array.prototype.set = function (index, ...entries)
		{
			return this.splice(index, 1, ...entries);
		};

		Array.prototype.insert = function (index, ...entries)
		{
			return this.splice(index, 0, ...entries);
		};

		Array.prototype.remove = function (value)
		{
			let index = this.indexOf(value);
			return this.removeIndex(index);
		};

		Array.prototype.removeIndex = function (start, end = start + 1)
		{
			return this.splice(start, end - start);
		};

		Array.prototype.replace = function (searchValue, ...replacementValues)
		{
			let index = this.indexOf(searchValue);
			this.set(index, ...replacementValues);
			return this;
		};

		Array.prototype.replaceAll = function (searchValue, ...replacementValues)
		{
			for (let index of this.keys())
			{
				if (Utils.equals(this.at(index), searchValue))
				{
					this.set(index, ...replacementValues);
				}
			}
			return this;
		};

		Array.prototype.unify = function ()
		{
			let oldValue = Array.from(this);
			this.length = 0;
			for (let value of oldValue)
			{
				if (!this.some(entry => Utils.equals(entry, value)))
				{
					this.push(value);
				}
			}
			return this;
		};

	}

	static #extendMap()
	{
		Map.prototype.remove = function (key)
		{
			return this.delete(key);
		};
	}

	static #extendString()
	{
		String.prototype.asNumber = function () {
			return Number(this);
		};

		String.prototype.insert = function (index, strings)
		{
			let newString = this.slice(0, index);
			newString.concat(strings);
			newString.concat(this.slice(index + 1, this.length));
			return newString;
		};

		String.prototype.remove = function (start, end = start)
		{
			return this.slice(0, start) + this.slice(end);
		};
	}

	static equals(obj1, obj2)
	{
		if (obj1 instanceof FieldInteractor)
		{
			// Direkter Zugriff auf getValue()-Methode des FieldManagers, um Überschreibungen durch FieldInteractors zu umgehen
			obj1 = obj1._fieldManager.getValue();
		}
		else if (obj1 instanceof FieldManager)
		{
			obj1 = obj1.getValue();
		}
		else if (typeof obj1 === "boolean" || typeof obj1 === "number" || typeof obj1 === "bigint")
		{
			// Konvertierung in String wird insbesondere bei Zahlen benötigt, da beispielsweise "0" === 0 sonst nicht wahr ist
			obj1 = obj1.toString();
		}
		if (obj2 instanceof FieldInteractor)
		{
			// Direkter Zugriff auf getValue()-Methode des FieldManagers, um Überschreibungen durch FieldInteractors zu umgehen
			obj2 = obj2._fieldManager.getValue();
		}
		else if (obj2 instanceof FieldManager)
		{
			obj2 = obj2.getValue();
		}
		else if (typeof obj2 === "boolean" || typeof obj2 === "number" || typeof obj2 === "bigint")
		{
			// Konvertierung in String wird insbesondere bei Zahlen benötigt, da beispielsweise "0" === 0 sonst nicht wahr ist
			obj2 = obj2.toString();
		}

		// Verschiedene JS-Datentypen rekursiv prüfen
		if (obj1 instanceof Map && obj2 instanceof Map)
		{
			for (let key of obj1.keys())
			{
				if (!Utils.equals(obj1.get(key), obj2.get(key)))
				{
					return false;
				}
			}
			return true;
		}
		else if (obj1 instanceof Array && obj2 instanceof Array)
		{
			for (let index of obj1.keys())
			{
				if (!Utils.equals(obj1.at(index), obj2.at(index)))
				{
					return false;
				}
			}
			return true;
		}
		else
		{
			return obj1 === obj2;
		}
	}
}