package org.hs_coburg.lemos.field;

public enum FieldDatatype
{
	INTEGER("Integer"),
	NUMBER("Number"),
	STRING("String");

	private final String name;

	FieldDatatype(String name)
	{
		this.name = name;
	}

	public String asName()
	{
		return name;
	}
}
