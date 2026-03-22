package org.hs_coburg.lemos.state;

public enum StateImportance
{
    ZERO(0),
    LOW(1),
    HIGH(2);

    private final int importance;

    StateImportance(int importance)
    {
        this.importance = importance;
    }

    public int asNumber()
    {
        return importance;
    }
}
