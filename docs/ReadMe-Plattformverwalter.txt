Weitergabe des LeMoS

Zur reinen Verwendung des LeMoS weiterzugebende Dateien:
- ReadMe-Lernmodulersteller.txt (Name beliebig anpassbar, sollte aber ggf. in "ReadMe.txt" ebenfalls geändert werden)
- Modellierungssprache.pdf (Name beliebig anpassbar, sollte aber ggf. in "ReadMe-Lernmodulersteller.txt" ebenfalls geändert werden)
- runLeMoS.bat (Name beliebig anpassbar, sollte aber in "ReadMe-Lernmodulersteller.txt" ebenfalls geändert werden)
- runLeMoS.sh (Name beliebig anpassbar, sollte aber in "ReadMe-Lernmodulersteller.txt" ebenfalls geändert werden)
- LeMoS-<version>.jar (Name anpassbar, muss aber weiterhin dem Muster "LeMoS*.jar" entsprechen)
- LeMoS-Modul-Schema.json (Name anpassbar, sollte aber konsistent gehalten werden, da er in den Szenario-Konfigurationen erwähnt wird)
- LeMoS-Szenario-Schema.json (Name anpassbar, sollte aber konsistent gehalten werden, da er in den Szenario-Konfigurationen erwähnt wird)

Vorbedingungen zum Kompilieren des LeMoS (zur Generierung der LeMoS-<version>.jar):
- Internetzugang (zum Herunterladen der Abhängigkeiten)
- Java JDK21 installiert und unter der Pfad-Variable "java" erreichbar

Kompilieren des LeMoS (zur Generierung der LeMoS-<version>.jar):
1. Entpacken der mitgelieferten Datei "LeMoSystem.tar"
2. Ausführen des Skripts "compileLeMoS.sh" (Linux) bzw. "compileLeMoS.bat" (Windows) im Ordner "LeMoSystem"

Bereitstellen der Lernmodule
- ZIP-Dateien der Lernmodule sind von den Lernmodulerstellern zu liefern
- Lernmodule des LeMoS können sowohl mit Apache als auch mit Tomcat den Lernmodulnutzern bereitgestellt werden
- URL eines Lernmoduls: <Webserver-URL>/<Lernmodul-Dateiname> --> Beispiel:
  - URL des Webservers: http://localhost:8080
  - Name des entpackten Ordners bzw. der Verknüpfung im webapps-Ordner: 1-Theorem_von_Little_V1
  - URL des Lernmoduls: http://localhost:8080/1-Theorem_von_Little_V1
- Weitere Informationen zum Testen eines Lernmoduls finden sich in der Anleitung für Ersteller von Lernmodulen ("ReadMe-Lernmodulersteller.txt") unter Schritt 4