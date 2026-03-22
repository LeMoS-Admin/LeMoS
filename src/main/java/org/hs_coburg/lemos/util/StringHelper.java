package org.hs_coburg.lemos.util;

import java.util.List;
import java.util.Map;

public final class StringHelper
{
	public static String escape(String string)
	{
		// Standard-Verhalten zur Vermeidung von null soll nicht gestört werden, daher wird auch wieder null zurückgegeben
		if (string == null)
		{
			return null;
		}
		// Anführungszeichen und Zeilenumbrüche in eingelesenen Strings maskieren, um Syntax-Fehler zu vermeiden
		// Hinweis: um keine Zeichen doppelt zu maskieren, müssen zunächst die bestehenden Maskierungen entfernt werden
		return string.replace("\\'", "'")		// Einfache Anführungszeichen
					 .replace("'", "\\'")
					 .replace("\\\"", "\"")	// Doppelte Anführungszeichen
					 .replace("\"", "\\\"")
					 .replace("\\n", "\n")		// Zeilenumbrüche
					 .replace("\n", "\\n");
	}

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
		if (map.isEmpty())
		{
			return "";
		}
		else
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
}
