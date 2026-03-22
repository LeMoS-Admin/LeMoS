#! /bin/bash
echo Executing LeMoS

SWD=$PWD                        # SWD = Start Working Directory
cd $(dirname "$BASH_SOURCE")    # Auflösen des ggf. relativen Pfades zum Skript, um absoluten Pfad des Skripts zu erhalten
cd ..                           # In den Überordner des Skripts wechseln (entspricht dem LeMoS-Ordner)
LWD=$PWD                        # LWD = LeMoS Working Directory
TEMPLATE="moduleTemplate"       # TEMPLATE = Vorlage für Webarchiv eines Lernmoduls
OPTIONS=""                      # OPTIONS = Optionen für LeMoS-Aufruf, folgende sind möglich: -PaS bzw. -PrintAsStructure, -PaL bzw. -PrintAsLine (siehe Aufruf des LeMoS-Generators ohne Parameter)

# LeMoS-Dateinamen ermitteln
lemos=(lemos*.jar)             # Liefert Array mit allen passenden Dateien (es sollte nur einen Eintrag geben, ggf. werden aber auch alte Versionen gefunden)
lemos=${lemos[-1]}             # Letzten Eintrag nehmen (für den Fall, dass es mehr als einen Eintrag gibt, ist der Letzte vermutlich der Aktuellste)
echo Found LeMoS-Version: $lemos
echo

# Wenn keine Parameter übergeben: Erklärung der Funktionsweise des LeMoS
if [[ $# == 0 ]]; then
	echo "Bitte mindestens eine Lernmodulkonfiguration (YAML-, JSON- oder XML-Datei) als absoluten oder relativen Pfad angeben."
	echo "Konfigurationen von Lernmodul-Szenarien (YAML-, JSON- oder XML-Datei) sind nicht anzugeben, sie werden am Speicherort der Lernmodulkonfiguration im Unterordner 'scenarios' erwartet."
	echo "Bei erfolgreicher Ausführung werden die generierten Lernmodule am Aufrufort dieses Skripts als ZIP-Datei unter dem Namen der Lernmodulkonfiguration abgelegt."
	exit 1
fi

failedGeneration=false
for arg in "$@"; do
	# Endung und Pfad entfernen, um Namen des Lernmoduls zu bestimmen
	name="${arg##*/}"
	name="${name%.*}"

	# Dateinamen entfernen, um Pfad des Lernmoduls zu bestimmen
	pfad=${arg%/*}
	
	# Erstellen einer Kopie der Vorlage für Lernmodule (moduleTemplate), damit diese anschließend mit den Daten des Lernmodul ausgefüllt werden kann
	echo $name: preparing template
	cd "$LWD"
	unzip -q $lemos "$TEMPLATE/*"
	
	# Übernehmen der hinterlegten Ressourcen (falls vorhanden) in das Verzeichnis des Lernmoduls
	echo $name: preparing resources
	if [ -d "$pfad/resources" ]; then
		cp -r "$pfad/resources" "$LWD/$TEMPLATE/res"
	fi

	# Aufruf des LeMoS-Generators zur Verarbeitung der Lernmodulkonfiguration (Parameter: Lernmodulkonfigurationsdatei, Zielordner)
	echo $name: starting generator
	cd "$SWD"	# LeMoS muss in Startverzeichnis aufgerufen werden, damit es etwaige relative Pfade korrekt auflösen kann
	java -jar "$LWD"/$lemos "$arg" "$LWD/$TEMPLATE" $OPTIONS
	
	# Behandeln von erfolglosen Generierungen (über einen vom LeMoS-Generator zurückgegebenen Statuscode, der ungleich 0 ist)
	if [ $? != 0 ]; then
		failedGeneration=true
		rm -r "$LWD/$TEMPLATE"
		echo
		continue
	fi
	
	# Packen des fertigen Lernmoduls zu einer ZIP-Datei, bereinigen der ausgefüllten Kopie der Vorlage
	echo $name: packing archive
	cd "$LWD/$TEMPLATE"
	if [ -d "$SWD/$name.zip" ]; then
		rm -f "$SWD/$name.zip"
	fi
	zip -r -q "$SWD/$name.zip" *

	# Bereinigen der temporären Kopie der Vorlage
	echo $name: deleting template
	rm -r "$LWD/$TEMPLATE"

	# Erfolgsausgabe
	echo $name: finished "$SWD/$name.zip"

	echo
done

if $failedGeneration; then
	echo Failed with at least one generation
	exit 1
else
	echo All generations successful
	exit 0
fi