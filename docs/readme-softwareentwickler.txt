Weitergabe des LeMoS

Zur reinen Verwendung des LeMoS weiterzugebende Dateien:
- readme-lernmodulersteller.txt (Name beliebig anpassbar, sollte aber ggf. in "readme.txt" ebenfalls geändert werden)
- ErsteSchritte.pdf (Name beliebig anpassbar, sollte aber ggf. in "readme-lernmodulersteller.txt" ebenfalls geändert werden)
- Modellierungssprache.pdf (Name beliebig anpassbar, sollte aber ggf. in "readme-lernmodulersteller.txt" ebenfalls geändert werden)
- Systemfunktionen.pdf (Name beliebig anpassbar, sollte aber ggf. in "readme-lernmodulersteller.txt" ebenfalls geändert werden)
- run-lemos.bat (Name beliebig anpassbar, sollte aber in "readme-lernmodulersteller.txt" ebenfalls geändert werden)
- run-lemos.sh (Name beliebig anpassbar, sollte aber in "readme-lernmodulersteller.txt" ebenfalls geändert werden)
- lemos-<version>.jar (Name anpassbar, muss aber weiterhin dem Muster "lemos*.jar" entsprechen)
- LeMoS-Modul-Schema.json (Name anpassbar, sollte aber konsistent gehalten werden, da er in den Szenariokonfigurationen erwähnt wird)
- LeMoS-Szenario-Schema.json (Name anpassbar, sollte aber konsistent gehalten werden, da er in den Szenariokonfigurationen erwähnt wird)

Vorbedingungen zum Kompilieren des LeMoS (zur Generierung der lemos-<version>.jar):
- Internetzugang (zum Herunterladen der Abhängigkeiten)
- Java JDK21 installiert und unter der Pfad-Variable "java" erreichbar

Kompilieren des LeMoS (zur Generierung der lemos-<version>.jar):
- Ausführen des Skripts "compile-lemos.sh" (Linux) bzw. "compile-lemos.bat" (Windows) im Verzeichnis des "src"-Ordners
- Beispiel: Pfad des "src"-Ordners: "LeMoS/src" --> ausführen des Kompilier-Skripts im Ordner "LeMoS"


__________________________


Funktionsweise des LeMoS

Bestandteile:
- LeMoS-Skript (Bash-/Batch-Datei)
- LeMoS-Generator (Java-Programm)

Interner Ablauf:
0. Aufruf des LeMoS-Skripts mit Liste der zu verarbeitenden Lernmodulkonfiguration (jeweils als absoluter oder relativer Pfad zu einer YAML-, JSON- oder XML-Datei)
1. LeMoS-Skript: Erstellen einer Kopie der Vorlage, damit diese anschließend mit den Daten des Lernmoduls ausgefüllt werden kann
2. Übernehmen der hinterlegten Ressourcen in das Verzeichnis des Lernmoduls
3. LeMoS-Skript: Aufruf des LeMoS-Generators zur Verarbeitung der Lernmodulkonfiguration (Parameter: Lernmodulkonfigurationsdatei, Zielordner)
3.1. LeMoS-Generator: Einlesen der Lernmodulkonfiguration in Objektstruktur (siehe Modellierungssprache.pdf)
3.2. LeMoS-Generator: Einlesen der Szenario-Konfigurationen (erwartet im Unterordner "scenarios" unter dem Pfad der Lernmodulkonfiguration) und Ergänzung in Objektstruktur
3.3. LeMoS-Generator: Generieren des Inhalts der web.xml auf Basis der gleichnamigen Vorlage mit entsprechenden Platzhaltern
3.4. LeMoS-Generator: Generieren des Inhalts der module.html auf Basis der gleichnamigen Vorlage mit entsprechenden Platzhaltern (module.html enthält bis auf Systemfunktionen das gesamte Lernmodul)
3.5. LeMoS-Generator: Umbenennen der benötigten Version der Systembibliothek in "lib", um später vom LeMoS-Skript verschoben zu werden
3.6. LeMoS-Generator: Überschreiben der Datei web.xml mit dem für sie generierten Inhalt
3.6. LeMoS-Generator: Überschreiben der Datei module.html mit dem für sie generierten Inhalt
4. LeMoS-Skript: Verschieben der gewählten Systembibliothek, bereinigen aller anderen (Gewünschte Version der Bibliothek wurde vorher im LeMoS-Generator zu "lib" umbenannt)
5. LeMoS-Skript: Packen des fertigen Lernmoduls zu einem Webarchiv (war-Datei), bereinigen der ausgefüllten Kopie der Vorlage