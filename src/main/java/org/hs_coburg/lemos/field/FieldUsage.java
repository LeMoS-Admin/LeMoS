package org.hs_coburg.lemos.field;

public enum FieldUsage
{
    INPUT("InputField"),
    TEMP("TempField"),
    OUTPUT("OutputField");

    private final String name;

    FieldUsage(String name)
    {
        this.name = name;
    }

    public String asName()
    {
        return name;
    }
}
