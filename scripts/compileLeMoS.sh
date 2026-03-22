#! /bin/bash

# Kompilieren des LeMoS
./mvnw clean package

# Verschieben der jar-Datei in den Oberordner (praktischer für spätere Auslieferung des fertigen LeMoS)
name=$(ls target/LeMoS*.jar)	# Ermitteln des konkreten Pfades zur  LeMoS*.jar
name="${name##*/}"		# Pfad entfernen, um Namen der Datei (inkl. Endung) zu erhalten
echo $name
mv target/LeMoS*.jar "$name"

exit 0