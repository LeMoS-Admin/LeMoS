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

	static _performOverwriteAndExtension()
	{
		Utils.#overwriteArray();
		Utils.#extendArray();
		Utils.#extendMap();
		Utils.#extendString();
	}

	static #overwriteArray()
	{
		Array.prototype.includes = function (searchElement, fromIndex) {
			return this.indexOf(searchElement, fromIndex) !== -1;
		};

		Array.prototype.indexOf = function (searchElement, fromIndex) {
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

			// Anwenden der eigenen equals()-Funktion
			for (let index = fromIndex; index < this.length; index++)
			{
				if (Utils.equals(this.at(index), searchElement))
				{
					return index;
				}
			}
			return -1;
		};

		Array.prototype.lastIndexOf = function (searchElement, fromIndex) {
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

			// Anwenden der eigenen equals()-Funktion
			for (let index = fromIndex; index >= 0; index--)
			{
				if (Utils.equals(this.at(index), searchElement))
				{
					return index;
				}
			}
			return -1;
		};

		Array.prototype.toString = function () {
			return "[" + this.map(value => Utils.objectToPrint(value)).join(", ") + "]";
		}
	}

	static #extendArray()
	{
		Array.prototype.getLength = function () {
			return this.length;
		};

		Array.prototype.first = function () {
			return this.at(0);
		};

		Array.prototype.last = function () {
			return this.at(this.length - 1);
		};

		Array.prototype.contains = function (searchElement, fromIndex) {
			return this.includes(searchElement, fromIndex);
		};

		Array.prototype.add = function (...element) {
			return this.push(...element);
		};

		Array.prototype.set = function (index, ...item) {
			return this.splice(index, 1, ...item);
		};

		Array.prototype.insert = function (index, ...item) {
			return this.splice(index, 0, ...item);
		};

		Array.prototype.remove = function (searchElement) {
			let index = this.indexOf(searchElement);
			if (index !== -1)
			{
				return this.removeIndex(index);
			}
		};

		Array.prototype.removeIndex = function (start, end = start + 1) {
			return this.splice(start, end - start);
		};

		Array.prototype.unify = function () {
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

		Array.prototype.minimum = function () {
			return this.map(val => Number(val)).sort((a, b) => a - b).at(0);
		};

		Array.prototype.maximum = function () {
			return this.map(val => Number(val)).sort((a, b) => a - b).at(-1);
		};

		Array.prototype.average = function () {
			return this.sum() / this.length;
		};

		Array.prototype.median = function () {
			let middle = Math.round((this.length - 1) / 2);
			return this.map(val => Number(val)).sort((a, b) => a - b).at(middle);
		};

		Array.prototype.sum = function () {
			let sum = 0;
			for (let value of this)
			{
				sum += Number(value);
			}
			return sum;
		};
	}

	static #extendMap()
	{
		Map.prototype.getLength = function () {
			return this.size;
		};

		Map.prototype.remove = function (key) {
			return this.delete(key);
		};

		Map.prototype.toString = function () {
			let pairs = [];
			for (let [key, value] of this.entries())
			{
				pairs.push("'" + key + "': " + Utils.objectToPrint(value));
			}
			return "{" + pairs.join(", ") + "}";
		};
	}

	static #extendString()
	{
		String.prototype.getLength = function () {
			return this.length;
		};

		String.prototype.asNumber = function () {
			if (this.trim() === "") // "" würde zu 0 konvertiert und wäre somit nicht mehr leer
			{
				return NaN;
			}
			else
			{
				return Number(this.replace(",", ".")); // Dezimaltrennzeichen anpassen (Dezimalkomma durch Dezimalpunkt ersetzen)
			}
		};

		String.prototype.insert = function (index, ...str) {
			return this.slice(0, index)
					   .concat(...str)
					   .concat(this.slice(index, this.length));
		};

		String.prototype.remove = function (indexStart, indexEnd = indexStart + 1) {
			return this.slice(0, indexStart) + this.slice(indexEnd);
		};

		String.prototype.replaceAt = function (index, ...str) {
			return this.slice(0, index)
					   .concat(...str)
					   .concat(this.slice(index + 1, this.length));
		};
	}

	static equals(obj1, obj2)
	{
		obj1 = Utils.#convertToComparable(obj1);
		obj2 = Utils.#convertToComparable(obj2);

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

	static #convertToComparable(obj)
	{
		if (obj instanceof FieldInteractor)
		{
			// Direkter Zugriff auf getValue()-Methode des FieldManagers, um Überschreibungen durch FieldInteractors zu umgehen
			obj = obj._fieldManager.getValue();
			if (typeof obj === "number")
			{
				// Falls das Feld eine Zahl zurückgeliefert hat, muss diese zum Vergleich wieder zu einem String umgewandelt werden
				obj = obj.toString();
			}
		}
		else if (obj instanceof FieldManager)
		{
			obj = obj.getValue();
			if (typeof obj === "number")
			{
				// Falls das Feld eine Zahl zurückgeliefert hat, muss diese zum Vergleich wieder zu einem String umgewandelt werden
				obj = obj.toString();
			}
		}
		else if (typeof obj === "object" && Object.getPrototypeOf(obj) === Object.prototype)
		{
			// Objekte, die via {}-Operator initialisiert wurden, werden zu Maps umgewandelt
			// Hinweis: die Bedingung ist bei allen Objekten wahr, die eine direkte Instanz (ohne Vererbung) von Object sind
			obj = new Map(Object.entries(obj));
		}
		else if (typeof obj === "boolean" || typeof obj === "number" || typeof obj === "bigint")
		{
			// Konvertierung in String wird insbesondere bei Zahlen benötigt, da beispielsweise "0" === 0 sonst nicht wahr ist
			obj = obj.toString();
		}
		return obj;
	}

	static objectToPrint(obj)
	{
		if (obj instanceof FieldInteractor || obj instanceof FieldManager)
		{
			return obj.getPrint();
		}
		else if (obj instanceof Array || obj instanceof Map)
		{
			return obj.toString();
		}
		else if (typeof obj === "object" && Object.getPrototypeOf(obj) === Object.prototype)
		{
			// Objekte, die via {}-Operator initialisiert wurden, werden zu Maps umgewandelt
			// Hinweis: die Bedingung ist bei allen Objekten wahr, die eine direkte Instanz (ohne Vererbung) von Object sind
			return Utils.objectToPrint(new Map(Object.entries(obj)));
		}
		else
		{
			return "'" + String(obj) + "'";
		}
	}
}