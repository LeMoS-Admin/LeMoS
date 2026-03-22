package org.hs_coburg.lemos.field;

public enum FieldType
{
	TEXT("TextField"),
	PLAIN("PlainField"),
	SPLIT("SplitField"),
	SELECTOR("SelectorField"),
	LIST("ListField"),
	TABLE("TableField");

	private final String name;

	FieldType(String name)
	{
		this.name = name;
	}

	public String asName()
	{
		return name;
	}
}
