package org.hs_coburg.lemos.field;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hs_coburg.lemos.StringHelper;

import java.util.Objects;

public class Position implements Comparable<Position>
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

    @Override
    public int compareTo(Position position)
    {
        if (this.yAxis.equals(position.yAxis))
        {
            return this.xAxis.compareTo(position.xAxis);
        }
        else
        {
            return this.yAxis.compareTo(position.yAxis);
        }
    }


}
