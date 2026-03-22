#! /bin/bash
echo Compiling LeMoS

# Arbeitsverzeichnis auf den Speicherort des Skripts wechseln
cd "$(dirname "$0")"

# Kompilieren des LeMoS
./mvnw clean package

# Abbruch bei erfolgloser Kompilierung
if [ $? != 0 ]; then
	exit 1
fi

# Ermitteln des Namens der jar-Datei
name=$(ls target/LeMoS*.jar)	# Ermitteln des konkreten Pfades zur  LeMoS*.jar
name="${name##*/}"		# Pfad entfernen, um Namen der Datei (inkl. Endung) zu erhalten
echo Generated LeMoS-Version: $name

# Verschieben der jar-Datei in den Oberordner (praktischer für spätere Auslieferung des fertigen LeMoS)
mv target/LeMoS*.jar "$name"

exit 0