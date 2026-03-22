package org.hs_coburg.lemos;

import java.util.List;
import java.util.Map;

public final class StringHelper
{
    public static String get(Object object)
    {
        return object.toString().replace("\n", "\n\t");
    }

    public static String get(List<?> list)
    {
        StringBuilder result = new StringBuilder();
        for (Object object : list)
        {
            result.append("\n\t\t")
                  .append(object.toString().replace("\n", "\n\t\t"));
        }
        return result.toString();
    }

    public static String get(Map<?, ?> map)
    {
        StringBuilder result = new StringBuilder();
        for (Map.Entry<?, ?> entry : map.entrySet())
        {
            result.append("\n\t\t")
                  .append(entry.getKey().toString().replace("\n", "\n\t\t"))
                  .append(": '")
                  .append(entry.getValue().toString().replace("\n", "\n\t\t"))
                  .append("', ");
        }
        result.delete(result.length() - 2, result.length());
        return result.toString();
    }
}
