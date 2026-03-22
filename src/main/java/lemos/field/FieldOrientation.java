package lemos.field;

public enum FieldOrientation
{
    HORIZONTAL("Horizontal"),
    VERTICAL("Vertical");

    private final String name;

    FieldOrientation(String name)
    {
        this.name = name;
    }

    public String asName()
    {
        return name;
    }
}
