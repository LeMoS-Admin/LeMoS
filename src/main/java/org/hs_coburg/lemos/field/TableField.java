package org.hs_coburg.lemos.field;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hs_coburg.lemos.module.Condition;
import org.hs_coburg.lemos.util.StringHelper;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

public class TableField extends ExpandableField
{
	public final List<Field>   innerFields;
	public final Integer       minColumnWidth;
	public final List<Integer> minColumnWidths;
	public final List<Integer> relativeColumnWidths;

	@JsonCreator
	public TableField(@JsonProperty("id") String id,
					  @JsonProperty("name") String name,
					  @JsonProperty("explanation") String explanation,
					  @JsonProperty("usage") FieldUsage usage,
					  @JsonProperty("type") FieldType type,
					  @JsonProperty("style") Style style,
					  @JsonProperty("allowEmpty") Boolean allowEmpty,
					  @JsonProperty("datatype") FieldDatatype datatype,
					  @JsonProperty("restrictions") List<Condition> restrictions,
					  @JsonProperty("growthDirection") FieldOrientation growthDirection,
					  @JsonProperty("initialEntries") Integer initialEntries,
					  @JsonProperty("maxEntries") Integer maxEntries,
					  @JsonProperty("innerFields") List<Field> innerFields,
					  @JsonProperty("minColumnWidth") Integer minColumnWidth,
					  @JsonProperty("minColumnWidths") List<Integer> minColumnWidths,
					  @JsonProperty("relativeColumnWidths") List<Integer> relativeColumnWidths)
	{
		super(id, name, explanation, usage, type, style, allowEmpty, FieldDatatype.STRING, restrictions, growthDirection, initialEntries, maxEntries);
		this.innerFields     = Objects.requireNonNull(innerFields, "Missing required attribute 'innerFields'");
		this.minColumnWidth  = Objects.requireNonNullElse(minColumnWidth, -1);
		this.minColumnWidths = Objects.requireNonNullElse(minColumnWidths, Collections.emptyList());

		if (growthDirection == FieldOrientation.HORIZONTAL)
		{
			// Bei horizontal wachsenden Tabellen wird die relative Spaltenbreite ignoriert, da der Kopf immer minimal und alle anderen Spalten gleich sind
			this.relativeColumnWidths = Collections.emptyList();
		}
		else
		{
			this.relativeColumnWidths = Objects.requireNonNullElse(relativeColumnWidths, Collections.emptyList());
		}
		validate();
	}

	private void validate()
	{
		if (minColumnWidth != -1 && !minColumnWidths.isEmpty())
		{
			throw new RuntimeException("Kombination of attributes 'minColumnWidth' and 'minColumnWidths' is not allowed");
		}
		if (growthDirection == FieldOrientation.VERTICAL)
		{
			if (!minColumnWidths.isEmpty() && minColumnWidths.size() != innerFields.size())
			{
				throw new RuntimeException("Entries in 'minColumnWidths' must have same amount as entries in 'innerFields'");
			}
			if (!relativeColumnWidths.isEmpty() && relativeColumnWidths.size() != innerFields.size())
			{
				throw new RuntimeException("Entries in 'relativeColumnWidths' must have same amount as entries in 'innerFields'");
			}
		}
		else
		{
			if (!minColumnWidths.isEmpty() && minColumnWidths.size() != 2)
			{
				throw new RuntimeException("Attribute 'minColumnWidths' must have exact 2 entries (for head and content columns)");
			}
			if (!relativeColumnWidths.isEmpty() && relativeColumnWidths.size() != 2)
			{
				throw new RuntimeException("Attribute 'relativeColumnWidths' must have exact 2 entries (for head and content columns)");
			}
		}
	}

	@Override
	protected String getFieldTagTemplateHTML()
	{
		String template = """
						  <div id='{{id}}' class='fieldContainer {{usage}} {{type}} {{growthDirection}}' style='{{style}}'>
						    {{label}}
						    <div class='table' style='{{tableStyle}}'>
						      {{header}}
						      {{innerFields}}
						    </div>
						    <div class='buttons'>
						      <button class='removeEntryButton' name='removeEntry' {{enabledState}}>-</button>
						      <button class='addEntryButton' name='addEntry' {{enabledState}}>+</button>
						    </div>
						  </div>
						  """;
		return template.replace("{{header}}\n", generateHeaderHTML())
					   .replace("{{innerFields}}\n", generateInnerFieldsHTML());
	}

	private String generateHeaderHTML()
	{
		StringBuilder headerHTML = new StringBuilder();
		String template = """
						  <div class='header' style='min-width: {{minWidth}};'>
						    {{innerFieldLabel}}
						  </div>
						  """;
		for (int k = 0; k < innerFields.size(); k++)
		{
			headerHTML.append(template.replace("{{minWidth}}", getMinWidth(k, true))
									  .replace("{{innerFieldLabel}}\n", getInnerFieldLabelHTML(innerFields.get(k))));
		}
		return headerHTML.toString();
	}

	private String getInnerFieldLabelHTML(Field innerField)
	{
		return innerField.performReplacements(innerField.getFieldLabelTemplateHTML());
	}

	private String generateInnerFieldsHTML()
	{
		StringBuilder innerFieldsHTML = new StringBuilder();
		String template = """
						  <div class='entry entry0' style='min-width: {{minWidth}};'>
						    {{innerField}}
						  </div>
						  """;
		for (int k = 0; k < innerFields.size(); k++)
		{
			innerFieldsHTML.append(template.replace("{{minWidth}}", getMinWidth(k, false))
										   .replace("{{innerField}}\n", getInnerFieldTagHTML(innerFields.get(k))));
		}
		return innerFieldsHTML.toString();
	}

	private String getInnerFieldTagHTML(Field innerField)
	{
		String template = innerField.getFieldTagTemplateHTML()
									.replace("id='{{id}}'", "")                            // ID würde beim Vervielfältigen der Einträge mehrfach vorkommen
									.replace("fieldContainer", "{{id}} fieldContainer")    // Wiedereinfügen der ID als Klasse
									.replace("{{style}}", "")                              // Style würde versuchen, sich in ein Grid einzusortieren, dass es auf seiner Ebene nicht gibt
									.replace("{{label}}\n", "")                            // Labels werden nur einmalig im Header der Tabelle eingetragen
									.replace("{{enabledState}}", "{{tableEnabledState}}"); // Innere Felder sollen enabledState der Tabelle erben
		return innerField.performReplacements(template)
						 .replace("{{tableEnabledState}}", "{{enabledState}}");            // Zurücktauschen des Platzhalters (sollte nur vor der Ersetzung in innerField.performReplacements schützen)
	}

	private String getMinWidth(int index, boolean isHeader)
	{
		// Jeweils addieren eines weiteren Zeichens, damit die konfigurierten Zeilen sicher in das Feld passen
		if (minColumnWidth != -1)
		{
			if (growthDirection == FieldOrientation.VERTICAL && isHeader)
			{
				return "min-content";
			}
			return minColumnWidth + 1 + "ch";
		}
		else if (!minColumnWidths.isEmpty())
		{
			if (growthDirection == FieldOrientation.VERTICAL)
			{
				if (isHeader)
				{
					return "min-content";
				}
				else
				{
					return minColumnWidths.get(index) + 1 + "ch";
				}
			}
			else
			{
				if (isHeader)
				{
					return minColumnWidths.get(0) + 1 + "ch";
				}
				else
				{
					return minColumnWidths.get(1) + 1 + "ch";
				}
			}
		}
		else
		{
			return "min-content";
		}
	}

	@Override
	protected String getFieldVariableTemplateJS()
	{
		String template = "let {{id}} = new TableField('#{{id}}', '{{name}}', {{initialEntries}}, {{maxEntries}}, {{allowEmpty}}, (entry) => {\n{{restrictions}}}, {\n{{innerFieldObjects}}});";
		return template.replace("{{innerFieldObjects}}", generateInnerFieldObjectsJS());
	}

	private String generateInnerFieldObjectsJS()
	{
		if (innerFields.isEmpty())
		{
			return "";
		}
		else
		{
			StringBuilder innerFieldObjectsJS = new StringBuilder();
			for (Field innerField : innerFields)
			{
				String innerFieldObjectJS = innerField.getFieldVariableTemplateJS()
													  .replace("let {{id}} =", "{{id}}:")                                // Entfernen der Variablendeklaration durch Objektattributdeklaration
													  .replace("#{{id}}", "#{{tableID}} > .table > .entry0 > .{{id}}")   // Anpassen des Selektors als inneres Element der Tabelle
													  .replace("() =>", "({{id}}) =>")                                   // Innere Felder können nicht referenziert werden, den Restriktionen muss daher explizit ihr zugehöriges Feld mitgegeben werden
													  .replace("(entry) =>", "(entry, {{id}}) =>")                       // Auch bei Feldern, die den aktuellen Eintrag ('entry') mitgeben, soll das gesamte zugehörige Feld referenziert werden können
													  // Hinweis: Referenz auf inneres Feld muss als letztes übergeben werden, um Kompatibilität zu nicht-inneren Feldern zu erhalten
													  .replace(";", "");                                                 // Semikolon am Ende des Konstruktoraufrufs entfernen

				innerFieldObjectsJS.append(innerField.performReplacements(innerFieldObjectJS)
													 .replace("{{tableID}}", "{{id}}"));    // Zurücktauschen des Platzhalters (sollte nur vor der Ersetzung in innerField.performReplacements schützen)
				innerFieldObjectsJS.append(",\n");
			}
			innerFieldObjectsJS.delete(innerFieldObjectsJS.length() - 2, innerFieldObjectsJS.length());
			return innerFieldObjectsJS.toString();
		}
	}

	@Override
	protected String performReplacements(String string)
	{
		return super.performReplacements(string)
					.replace("{{tableStyle}}", generateTableStyleCSS());
	}

	private String generateTableStyleCSS()
	{
		String tableStyleCSS;
		if (growthDirection == FieldOrientation.VERTICAL)
		{
			StringBuilder columnStylesCSS = new StringBuilder();
			for (int k = 0; k < innerFields.size(); k++)
			{
				columnStylesCSS.append(getRelativeWidth(k)).append(" ");
			}
			tableStyleCSS = "grid-template-columns: " + columnStylesCSS + ";";
		}
		else
		{
			String template = "grid-template-rows: repeat({{attributesCount}}, auto);";
			tableStyleCSS = template.replace("{{attributesCount}}", Integer.toString(innerFields.size()));
		}
		return tableStyleCSS;
	}

	private String getRelativeWidth(int index)
	{
		if (!relativeColumnWidths.isEmpty())
		{
			return relativeColumnWidths.get(index) + "fr";
		}
		else
		{
			return "1fr";
		}
	}

	@Override
	public String toString()
	{
		return super.toString() +
			   "\n\t" + "innerFields: " + StringHelper.get(innerFields) +
			   "\n\t" + "minColumnWidth: " + StringHelper.get(minColumnWidth) +
			   "\n\t" + "minColumnWidths: " + StringHelper.get(minColumnWidths) +
			   "\n\t" + "relativeColumnWidths: " + StringHelper.get(relativeColumnWidths);
	}
}
