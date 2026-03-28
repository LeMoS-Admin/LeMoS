package lemos.state;

public enum StateImportance
{
    ZERO(0),
    LOW(1),
    HIGH(2);

    private final int stepSize;

    StateImportance(int stepSize)
    {
        this.stepSize = stepSize;
    }

    public int asStepSize()
    {
        return stepSize;
    }
}
