Inhalt der Abgabe:
- LeMoS (Lernstoff-Modellierungs-System)
- LernplattformDummy
- Dokumentation "Modelierungssprache"

Wichtigste Änderungen:
- Ergänzung von Skripten zum Kompilieren und Verwenden des LeMoS
- Strukturierung der (künfitgen) Lernmodule als einheitliche Ordnerstruktur (LernplattformDummy)
- Auslagerung der Modellierung der Szenarien in Einzeldateien (in Unterordner "scenarios")
- Verbesserung der Darstellung der Modelierungssprache

Installieren des LeMoS:
- Entpacken von "LeMoSystem.tar"
- Ausführen des enthaltenen Skripts "compileLeMoS.sh" im Ordner "LeMoSystem"

Verwenden des LeMoS:
- Ausführen des enthaltenen Skripts "runLeMoS.sh" an beliebiger Stelle
-- Skript befindet sich ebenfalls im Ordner "LeMoSystem" und darf nicht verschoben werden
-- Parameter bei Skriptaufruf: zu verarbeitende Lernmodulkonfigurationen (jeweils als absoluter Pfad oder relativ zum Ausführungspunkt des Skripts)
-- Hinweise:
--- Es ist lediglich die "Hauptkonfiguration" anzugeben, die Szenarien eines Moduls werden jeweils im Unterordner "scenarios" erwartet und automatisch mit verarbeitet
--- Ein eigenständiges Verarbeiten oder eine manuelle Angabe der Szenarien eines Moduls ist nicht vorgesehen, da die Szenarien im fertigen Lernmodul enthalten sind 

Testen der Lernmodule:
- Entpacken von "LernplattformDummy.tar"
- Generieren der gewünschten Lernmodule (verwenden des LeMoS)
- Starten des LernplattformDummys als lokaler Webserver, z.B. mit Hilfe von Visual Studio Code (VS-Code):
-- Öffnen des Ordners "LernplattformDummy" mit  VS-Code
-- Installieren der Erweiterung "Live Preview"
-- Öffnen des Previews von LernplattformDummy.html
-- Kopieren der URL in beliebigen Browser
-- Auswählen des gewünschten Lernmoduls
- Hinweis: aktuell ist lediglich das Lernmodul "1-Theorem_von_Little_V1" konfiguriert, die weiteren Einträge sind Platzhalter
