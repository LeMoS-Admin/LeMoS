Weitergabe des LeMoS

Zur reinen Verwendung des LeMoS weiterzugebende Dateien:
- Benutzerhandbuch.pdf (Name beliebig anpassbar, sollte aber ggf. in "readme.txt" ebenfalls geändert werden)
- Beispielmodul.zip (Name beliebig anpassbar, sollte aber ggf. in "Benutzerhandbuch.pdf" ebenfalls geändert werden)
- run-lemos.bat (Name beliebig anpassbar, sollte aber in "Benutzerhandbuch.pdf" ebenfalls geändert werden)
- run-lemos.sh (Name beliebig anpassbar, sollte aber in "Benutzerhandbuch.pdf" ebenfalls geändert werden)
- lemos-<version>.jar (Name anpassbar, muss aber weiterhin dem Muster "lemos*.jar" entsprechen)
- LeMoS-Modul-Schema.json (Name anpassbar, sollte aber in "Benutzerhandbuch.pdf" ebenfalls geändert und dann konsistent gehalten werden, da er in den Lernmodulkonfigurationen erwähnt wird)
- LeMoS-Szenario-Schema.json (Name anpassbar, sollte aber in "Benutzerhandbuch.pdf" ebenfalls geändert und dann konsistent gehalten werden, da er in den Szenariokonfigurationen erwähnt wird)

Vorbedingungen zum Kompilieren des LeMoS (zur Generierung der lemos-<version>.jar):
- Internetzugang (zum Herunterladen der Abhängigkeiten)
- Java JDK21 installiert und unter der Pfad-Variable "java" erreichbar

Kompilieren des LeMoS (zur Generierung der lemos-<version>.jar):
- Ausführen des Skripts "compile-lemos.sh" (Linux) bzw. "compile-lemos.bat" (Windows) im Verzeichnis des "src"-Ordners
- Beispiel: Pfad des "src"-Ordners: "LeMoS/src" --> ausführen des Kompilier-Skripts im Ordner "LeMoS"


__________________________


Funktionsweise der Generierung von Lernmodulen im LeMoS

Bestandteile:
- LeMoS-Skript (Bash-/Batch-Datei)
- LeMoS-Generator (Java-Programm)

Interner Ablauf:
0. Aufruf des LeMoS-Skripts mit Liste der zu verarbeitenden Lernmodulkonfiguration (jeweils als absoluter oder relativer Pfad zu einer YAML-, JSON- oder XML-Datei)
1. LeMoS-Skript: Erstellen einer Kopie der Vorlage für Lernmodule (moduleTemplate), damit diese anschließend mit den Daten des Lernmoduls ausgefüllt werden kann
2. LeMoS-Skript: Übernehmen der hinterlegten Ressourcen in das Verzeichnis des Lernmoduls
3. LeMoS-Skript: Aufruf des LeMoS-Generators zur Verarbeitung der Lernmodulkonfiguration (Parameter: Lernmodulkonfigurationsdatei, Zielordner)
3.1. LeMoS-Generator: Validieren der korrekten LeMoS-Version (Kompatibilitätslogik, sollte bei jeder neuen Version ergänzt werden, siehe "TODO" in ModuleReader.java)
3.2. LeMoS-Generator: Einlesen der Lernmodulkonfiguration in Objektstruktur (siehe Benutzerhandbuch.pdf)
3.3. LeMoS-Generator: Einlesen der Szenario-Konfigurationen (erwartet im Unterordner "scenarios" unter dem Pfad der Lernmodulkonfiguration) und Ergänzung in Objektstruktur
3.4. LeMoS-Generator: Generieren des Inhalts der web.xml auf Basis der gleichnamigen Vorlage mit entsprechenden Platzhaltern
3.5. LeMoS-Generator: Generieren des Inhalts der module.html auf Basis der gleichnamigen Vorlage mit entsprechenden Platzhaltern (module.html enthält bis auf Systemfunktionen das gesamte Lernmodul)
3.6. LeMoS-Generator: Überschreiben der Datei web.xml mit dem für sie generierten Inhalt
3.7. LeMoS-Generator: Überschreiben der Datei module.html mit dem für sie generierten Inhalt
4. LeMoS-Skript: Packen des fertigen Lernmoduls zu einem Webarchiv (war-Datei), bereinigen der ausgefüllten Kopie der Vorlage


__________________________


Funktionsweise der Laufzeitumgebung des LeMoS
- index.html fungiert als Antrieb/Engine des Systems, enthält
  - alle konfigurierten Variablen- und Feld-Definitionen
  - alle konfigurierten Zustände als Funktionen beginnend mit "_state_"
  - alle konfigurierten Ressourcen (werden an Resource-Klasse übergeben)
  - Logik für Vor- und Rückschritte
- package fieldManager
  - enthält alle sogenannten "Manager-Klassen"
  - zuständig für interne Verwaltung der einzelnen Felder
- package internalFunctions
  - enthält alle Klassen für interne statische Funktionen
- package fieldInteractor
  - enthält alle sogenannten "Interactor-Klassen"
  - zuständig für die Bereitstellung der Systemfunktionen der einzelnen Felder
- package systemFunctions
  - enthält alle Klassen für statische Systemfunktionen

