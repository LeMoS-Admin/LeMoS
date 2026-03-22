package lemos.state;

public enum StateType
{
    ENTRY("Entry"),
    STATE("State"),
    JUNCTION("Junction");

    private final String normalCase;

    StateType(String normalCase)
    {
        this.normalCase = normalCase;
    }

    public String asName()
    {
        return normalCase;
    }
}
