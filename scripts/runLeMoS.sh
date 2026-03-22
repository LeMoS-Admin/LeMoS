#! /bin/bash

SWD=$PWD			# SWD = Start Working Directory
cd $(dirname "$BASH_SOURCE")	# Auflösen des ggf. relativen Pfades zum Skript, um absoluten Pfad des Skripts zu erhalten
LWD=$PWD			# LWD = LeMoS Working Directory
TEMPLATE="moduleTemplate"	# TEMPLATE = Vorlage für Webarchiv eines Lernmoduls

# Wenn keine Parameter übergeben: Erklärung der Funktionsweise des LeMoS
if [[ $# == 0 ]]
then
	echo "Bitte mindestens eine Lernmodul-Konfiguration (YAML-, JSON- oder XML-Datei) als absoluten oder relativen Pfad angeben."
	echo "Konfigurationen von Lernmodul-Szenarien (YAML-, JSON- oder XML-Datei) sind nicht anzugeben, sie werden am Speicherort der Lernmodul-Konfiguration im Unterordner 'scenarios' erwartet."
	echo "Bei erfolgreicher Ausführung werden die generierten Lernmodule wird am Aufrufort dieses Skripts als ZIP-Datei unter dem Namen der Lernmodul-Konfiguration abgelegt."
	exit 1
fi

failedGeneration=false
for arg in "$@"; do
	# Endung und Pfad entfernen, um Namen des Lernmoduls zu bestimmen
	name="${arg##*/}"
	name="${name%.*}"

	# Dateinamen entfernen, um Pfad des Lernmoduls zu bestimmen
	pfad=${arg%/*}
	
	# Erstellen einer Kopie der Vorlage, damit diese anschließend mit den Daten des Lernmodul ausgefüllt werden kann
	echo $name: preparing template
	cd "$LWD"
	unzip -q LeMoS*.jar "$TEMPLATE/*"
	
	# Übernehmen der hinterlegten Resourcen in das Verzeichnis des Lernmoduls
	echo $name: preparing resources
	cp -r "$pfad/resource" "$LWD/$TEMPLATE/res"

	# Aufruf des LeMoS-Generators zur Verarbeitung der Lernmodul-Konfiguration (Parameter: Lernmodul-Konfigurationsdatei, Zielordner)
	echo $name: starting generator
	cd "$SWD"	# LeMoS muss in Startverzeichnis aufgerufen werden, damit es etwaige relative Pfade korrekt auflösen kann
	java -jar "$LWD"/LeMoS*.jar "$arg" "$LWD/$TEMPLATE"
	
	# Behandeln von erfolglosen Generierungen (über einen vom LeMoS-Generator zurückgegebenen Statuscode, der ungleich 0 ist)
	if [ $? != 0 ]
	then
		failedGeneration=true
		rm -r "$LWD/$TEMPLATE"
		continue
	fi
	
	# Verschieben der gewählten Systembibliothek, bereinigen aller anderen (Gewünschte Version der Bibliothek wurde vorher im LeMoS-Generator zu "lib" umbenannt)
	echo $name: moving library
	cd "$LWD/$TEMPLATE"
	mv libs/lib lib
	rm -r libs
	
	# Packen des fertigen Lernmoduls zu einer ZIP-Datei, bereinigen der ausgefüllten Kopie der Vorlage
	echo $name: packing archive
	rm -f "$SWD/$name.zip"
	zip -r -q "$SWD/$name.zip" *
	cd ..
	rm -r "$TEMPLATE"

	echo $name: finished "$SWD/$name.zip"
done

if $failedGeneration
then
	exit 1
else
	exit 0
fi