package state;

public enum StateType
{
    ENTRY_POINT("EntryPoint"),
    STATE("State"),
    JUNCTION("Junction");

    final String normalCase;

    StateType(String normalCase)
    {
        this.normalCase = normalCase;
    }
}
