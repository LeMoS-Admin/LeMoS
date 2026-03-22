package org.hs_coburg.lemos.state;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hs_coburg.lemos.module.Operation;
import org.hs_coburg.lemos.util.StringHelper;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

public class State
{
	public final String           id;
	public final String           name;
	public final String           explanation;
	public final StateImportance  importance;
	public final StateType        type;
	public final List<Operation>  actions;
	public final List<Transition> transitions;

	@JsonCreator
	public State(@JsonProperty("id") String id,
				 @JsonProperty("name") String name,
				 @JsonProperty("explanation") String explanation,
				 @JsonProperty("type") StateType type,
				 @JsonProperty("importance") StateImportance importance,
				 @JsonProperty("actions") List<Operation> actions,
				 @JsonProperty("transitions") List<Transition> transitions)
	{
		this.id          = Objects.requireNonNull(id, "Missing required attribute 'id'");
		this.name        = Objects.requireNonNullElse(name, id);
		this.explanation = Objects.requireNonNullElse(explanation, "");
		this.type        = Objects.requireNonNullElse(type, StateType.STATE);
		this.actions     = Objects.requireNonNullElse(actions, Collections.emptyList());
		this.transitions = Objects.requireNonNullElse(transitions, Collections.emptyList());
		if (this.type == StateType.ENTRY)
		{
			this.importance = StateImportance.HIGH;
		}
		else if (this.type == StateType.JUNCTION)
		{
			this.importance = StateImportance.ZERO;
		}
		else
		{
			this.importance = Objects.requireNonNullElse(importance, StateImportance.HIGH);

		}
		validate();
	}

	// Statische Generierung des Funktionsnamens, da er in anderen Klassen zur Generierung eines Aufrufs benötigt wird
	public static String generateStateFunctionCallJS(String stateID)
	{
		return String.format("_state_%s()", StringHelper.escape(stateID));
	}

	private void validate()
	{
		if (!transitions.isEmpty() &&
			transitions.stream()
					   .filter(t -> t.conditions.isEmpty())
					   .count() > 1)
		{
			throw new RuntimeException("Only one transition per state can be unconditionally");
		}
	}

	public String generateStateFunctionJS()
	{
		String template = """
						  function {{functionName}}
						  {
						    console.log("Reached state {{id}}{{name}}{{explanation}}");
						    {{actions}}
						    _nextTransition = () => {
						      {{transitions}}
						    }
						    return {{importance}};
						  }
						  """;
		return performReplacements(template);
	}

	private String performReplacements(String string)
	{
		return string.replace("{{id}}", StringHelper.escape(id))
					 .replace("{{name}}", StringHelper.escape(getName()))
					 .replace("{{explanation}}", StringHelper.escape(getExplanation()))
					 .replace("{{type}}", type.asName())
					 .replace("{{importance}}", Integer.toString(importance.asNumber()))
					 .replace("{{actions}}", Operation.generateActionJS(actions))
					 .replace("{{transitions}}", generateTransitionsJS())
					 .replace("{{functionName}}", generateStateFunctionCallJS(id));
	}

	private String getName()
	{
		if (name.isEmpty())
		{
			return "";
		}
		else
		{
			return ": " + name;
		}
	}

	private String getExplanation()
	{
		if (explanation.isEmpty())
		{
			return "";
		}
		else
		{
			return " (" + explanation + ")";
		}
	}

	private String generateTransitionsJS()
	{
		if (transitions.isEmpty())
		{
			return """
				   console.log("No further transitions, learning module is completed");
				   return -1;
				   """;
		}

		StringBuilder transitionsJS     = new StringBuilder();
		Transition    defaultTransition = null;
		for (Transition transition : transitions)
		{
			if (transition.conditions.isEmpty())
			{
				// Unbedingter Übergang muss am Schluss stehen
				defaultTransition = transition;
				break;
			}
			transitionsJS.append(transition.generateTransitionJS());
		}

		// Festlegen des Verhaltens im Fall, dass keiner der bedingten Übergänge (Transitions) erfolgen konnte (ELSE-Fall)
		if (defaultTransition != null)
		{
			// Falls ein unbedingter Übergang definiert wurde, wird er nun ELSE-Fall ergänzt
			transitionsJS.append(defaultTransition.generateTransitionJS());
		}
		else
		{
			// Falls kein unbedingter Übergang definiert wurde, wird als ELSE-Fall '-1' zurückgegeben (kein Übergang möglich)
			transitionsJS.append("""
								 console.log("No suitable transition, staying in current state");
								 return -1;
								 """);
		}
		return transitionsJS.toString();
	}

	@Override
	public String toString()
	{
		return type.asName() +
			   "\n\t" + "id: '" + StringHelper.get(id) + '\'' +
			   "\n\t" + "name: '" + StringHelper.get(name) + '\'' +
			   "\n\t" + "explanation: '" + StringHelper.get(explanation) + '\'' +
			   "\n\t" + "importance: " + StringHelper.get(importance) +
			   "\n\t" + "action: " + StringHelper.get(actions) +
			   "\n\t" + "transitions: " + StringHelper.get(transitions);
	}
}
