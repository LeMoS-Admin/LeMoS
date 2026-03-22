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
lemos=$(ls target/lemos*.jar)	# Ermitteln des konkreten Pfades zur  lemos*.jar
lemos="${lemos##*/}"		# Pfad entfernen, um Namen der Datei (inkl. Endung) zu erhalten
echo Generated LeMoS-Version: "$lemos"

# Verschieben der jar-Datei in den Oberordner (praktischer für spätere Auslieferung des fertigen LeMoS)
mv "target/$lemos" "$lemos"

exit 0