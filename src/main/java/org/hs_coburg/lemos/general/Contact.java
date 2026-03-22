package org.hs_coburg.lemos.general;

import com.fasterxml.jackson.annotation.JsonCreator;
import org.hs_coburg.lemos.StringHelper;

import java.util.Collections;
import java.util.Map;
import java.util.Objects;

public class Contact
{
    public final Map<String, String> data;

    @JsonCreator
    public Contact(Map<String, String> data)
    {
        this.data = Objects.requireNonNullElse(data, Collections.emptyMap());
    }

    @Override
    public String toString()
    {
        return "Contact:" +
               "\n\t" + "data: " + StringHelper.get(data);
    }
}
