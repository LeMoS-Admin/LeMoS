package state;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import util.Operation;
import util.StringHelper;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

public class Condition
{
    public final String          name;
    public final List<Operation> terms;

    @JsonCreator
    public Condition(@JsonProperty("name") String name,
                     @JsonProperty("terms") List<Operation> terms)
    {
        this.name  = Objects.requireNonNullElse(name, "");
        this.terms = Objects.requireNonNullElse(terms, Collections.emptyList());
    }

    @Override
    public String toString()
    {
        return "Condition:" +
               "\n\t" + "name: '" + StringHelper.get(name) + '\'' +
               "\n\t" + "terms: " + StringHelper.get(terms);
    }
}
