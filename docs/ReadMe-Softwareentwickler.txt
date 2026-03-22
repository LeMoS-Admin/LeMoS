Weitergabe des LeMoS

Zur reinen Verwendung des LeMoS weiterzugebende Dateien:
- ReadMe-Lernmodulersteller.txt (Name beliebig anpassbar, sollte aber ggf. in "ReadMe.txt" ebenfalls geändert werden)
- Modellierungssprache.pdf (Name beliebig anpassbar, sollte aber ggf. in "ReadMe-Lernmodulersteller.txt" ebenfalls geändert werden)
- Systemfunktionen.pdf (Name beliebig anpassbar, sollte aber ggf. in "ReadMe-Lernmodulersteller.txt" ebenfalls geändert werden)
- runLeMoS.bat (Name beliebig anpassbar, sollte aber in "ReadMe-Lernmodulersteller.txt" ebenfalls geändert werden)
- runLeMoS.sh (Name beliebig anpassbar, sollte aber in "ReadMe-Lernmodulersteller.txt" ebenfalls geändert werden)
- LeMoS-<version>.jar (Name anpassbar, muss aber weiterhin dem Muster "LeMoS*.jar" entsprechen)
- LeMoS-Modul-Schema.json (Name anpassbar, sollte aber konsistent gehalten werden, da er in den Szenario-Konfigurationen erwähnt wird)
- LeMoS-Szenario-Schema.json (Name anpassbar, sollte aber konsistent gehalten werden, da er in den Szenario-Konfigurationen erwähnt wird)

Vorbedingungen zum Kompilieren des LeMoS (zur Generierung der LeMoS-<version>.jar):
- Internetzugang (zum Herunterladen der Abhängigkeiten)
- Java JDK21 installiert und unter der Pfad-Variable "java" erreichbar

Kompilieren des LeMoS (zur Generierung der LeMoS-<version>.jar):
- Ausführen des Skripts "compileLeMoS.sh" (Linux) bzw. "compileLeMoS.bat" (Windows) im Verzeichnis des "src"-Ordners
- Beispiel: Pfad des "src"-Ordners: "LeMoSystem/src" --> ausführen des Kompilier-Skripts im Ordner "LeMoSystem"


__________________________


Funktionsweise des LeMoS

Bestandteile:
- LeMoS-Skript (Bash-/Batch-Datei)
- LeMoS-Generator (Java-Programm)

Interner Ablauf:
0. Aufruf des LeMoS-Skripts mit Liste der zu verarbeitenden Lernmodul-Konfiguration (jeweils als absoluter oder relativer Pfad zu einer YAML-, JSON- oder XML-Datei)
1. LeMoS-Skript: Erstellen einer Kopie der Vorlage, damit diese anschließend mit den Daten des Lernmodul ausgefüllt werden kann
2. Übernehmen der hinterlegten Resourcen in das Verzeichnis des Lernmoduls
3. LeMoS-Skript: Aufruf des LeMoS-Generators zur Verarbeitung der Lernmodul-Konfiguration (Parameter: Lernmodul-Konfigurationsdatei, Zielordner)
3.1. LeMoS-Generator: Einlesen der Lernmodul-Konfiguration in Objektstruktur (siehe Modellierungssprache.pdf)
3.2. LeMoS-Generator: Einlesen der Szenario-Konfiguartionen (erwartet im Unterodner "scenarios" unter dem Pfad der Lernmodulkonfiguration) und Ergänzung in Objektstruktur
3.3. LeMoS-Generator: Generieren des Inhalts der web.xml auf Basis der gleichnamigen Vorlage mit entsprechenden Platzhaltern
3.4. LeMoS-Generator: Generieren des Inhalts der module.html auf Basis der gleichnamigen Vorlage mit entsprechenden Platzhaltern (module.html enthält bis auf Systemfunktionen das gesamte Lernmodul)
3.5. LeMoS-Generator: Umbennenen der benötigten Version der Systembibliothek in "lib", um später vom LeMoS-Skript verschoben zu werden
3.6. LeMoS-Generator: Überschreiben der Datei web.xml mit dem für sie generierten Inhalt
3.6. LeMoS-Generator: Überschreiben der Datei module.html mit dem für sie generierten Inhalt
4. LeMoS-Skript: Verschieben der gewählten Systembibliothek, bereinigen aller anderen (Gewünschte Version der Bibliothek wurde vorher im LeMoS-Generator zu "lib" umbenannt)
5. LeMoS-Skript: Packen des fertigen Lernmoduls zu einem Webarchiv (war-Datei), bereinigen der ausgefüllten Kopie der Vorlage