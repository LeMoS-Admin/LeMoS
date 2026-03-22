package org.hs_coburg.lemos.field;

public enum FieldType
{
    INFO("InfoField"),
    TEXT("TextField"),
    SPLIT("SplitField"),
    CHECK("CheckField"),
    SELECT("SelectField"),
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
