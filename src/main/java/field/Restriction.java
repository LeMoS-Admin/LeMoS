package field;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import util.Operation;
import util.StringHelper;

import java.util.List;
import java.util.Objects;

public class Restriction
{
    public final String          message;
    public final List<Operation> terms;

    @JsonCreator
    public Restriction(@JsonProperty("message") String message,
                       @JsonProperty("terms") List<Operation> terms)
    {
        this.message = Objects.requireNonNullElse(message, "");
        this.terms   = Objects.requireNonNull(terms, "Missing required attribute 'terms'");
    }

    @Override
    public String toString()
    {
        return "Restriction:" +
               "\n\t" + "message: '" + StringHelper.get(message) + '\'' +
               "\n\t" + "terms: " + StringHelper.get(terms);
    }
}
