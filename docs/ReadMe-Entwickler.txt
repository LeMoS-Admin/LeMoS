Funktionsweise des LeMoS

Bestandteile:
- LeMoS-Skript (Bash-/Batch-Datei)
- LeMoS-Generator (Java-Programm)

Ablauf:
0. Aufruf des LeMoS-Skripts mit Liste der zu verarbeitenden Lernmodul-Konfiguration (jeweils als absoluter oder relativer Pfad zu einer YAML-, JSON- oder XML-Datei)
1. LeMoS-Skript: Erstellen einer Kopie der Vorlage, damit diese anschließend mit den Daten des Lernmodul ausgefüllt werden kann
2. LeMoS-Skript: Aufruf des LeMoS-Generators zur Verarbeitung der Lernmodul-Konfiguration (Parameter: Lernmodul-Konfigurationsdatei, Zielordner)
2.1. LeMoS-Generator: Einlesen der Lernmodul-Konfiguration in Objektstruktur (siehe Modellierungssprache.pdf)
2.2. LeMoS-Generator: Einlesen der Szenario-Konfiguartionen (erwartet im Unterodner "scenarios" unter dem Pfad der Lernmodulkonfiguration) und Ergänzung in Objektstruktur
2.3. LeMoS-Generator: Generieren des Inhalts der web.xml auf Basis der gleichnamigen Vorlage mit entsprechenden Platzhaltern
2.4. LeMoS-Generator: Generieren des Inhalts der module.html auf Basis der gleichnamigen Vorlage mit entsprechenden Platzhaltern (module.html enthält bis auf Systemfunktionen das gesamte Lernmodul)
2.5. LeMoS-Generator: Umbennenen der benötigten Version der Systembibliothek in "lib", um später vom LeMoS-Skript verschoben zu werden
2.6. LeMoS-Generator: Überschreiben der Datei web.xml mit dem für sie generierten Inhalt
2.6. LeMoS-Generator: Überschreiben der Datei module.html mit dem für sie generierten Inhalt
3. LeMoS-Skript: Verschieben der gewählten Systembibliothek, bereinigen aller anderen (Gewünschte Version der Bibliothek wurde vorher im LeMoS-Generator zu "lib" umbenannt)
4. LeMoS-Skript: Packen des fertigen Lernmoduls zu einem Webarchiv (war-Datei), bereinigen der ausgefüllten Kopie der Vorlage