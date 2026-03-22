package org.hs_coburg.lemos.field;

public enum FieldUsage
{
    INPUT("InputField"),
    OUTPUT_TEMP("TempField"),
    OUTPUT_FINAL("OutputField"),
    HIDDEN("HiddenField");

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
