package field;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import util.StringHelper;

import java.util.Objects;

public class Position
{
    public final Integer xAxis;
    public final Integer yAxis;

    @JsonCreator
    public Position(@JsonProperty("xAxis") Integer xAxis,
                    @JsonProperty("yAxis") Integer yAxis)
    {
        this.xAxis = Objects.requireNonNullElse(xAxis, -1);
        this.yAxis = Objects.requireNonNullElse(yAxis, -1);
    }

    @Override
    public String toString()
    {
        return "Position:" +
               "\n\t" + "xAxis: " + StringHelper.get(xAxis) +
               "\n\t" + "yAxis: " + StringHelper.get(yAxis);
    }
}
