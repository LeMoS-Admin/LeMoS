import Module from "../lib/systemFunctions/Module.js";

export class Objekt00 // ohne valueOf() und ohne toString()
{
	constructor(value, name)
	{
		this.value = value;
		this.name = name;
	}

	toSuperString()
	{
		// Allgemeine Umgehung für überschriebene toString()-Methode, um Problem beim Vergleich mit == bzw. === nachvollziehbarer darstellen zu können
		return super.toString();
	}
}

export class Objekt01 // ohne valueOf() aber mit toString()
{
	constructor(value, name)
	{
		this.value = value;
		this.name = name;
	}

	toString()
	{
		return String(this.value);
	}

	toSuperString()
	{
		// Allgemeine Umgehung für überschriebene toString()-Methode, um Problem beim Vergleich mit == bzw. === nachvollziehbarer darstellen zu können
		return super.toString();
	}
}

export class Objekt10 // mit valueOf() aber ohne toString()
{
	constructor(value, name)
	{
		this.value = value;
		this.name = name;
	}

	valueOf()
	{
		return this.value;
	}

	toSuperString()
	{
		// Allgemeine Umgehung für überschriebene toString()-Methode, um Problem beim Vergleich mit == bzw. === nachvollziehbarer darstellen zu können
		return super.toString();
	}
}

export class Objekt11 // mit valueOf() und mit toString()
{
	constructor(value, name)
	{
		this.value = value;
		this.name = name;
	}

	valueOf()
	{
		// Module.print("Log: valueOf()-Methode " + this.name + " aufgerufen");
		return this.value;
	}

	toString()
	{
		// Module.print("Log: toString()-Methode " + this.name + " aufgerufen");
		return String(this.value);
	}

	toSuperString()
	{
		// Allgemeine Umgehung für überschriebene toString()-Methode, um Problem beim Vergleich mit == bzw. === nachvollziehbarer darstellen zu können
		return super.toString();
	}
}