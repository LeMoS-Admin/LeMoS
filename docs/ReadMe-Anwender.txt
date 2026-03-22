Verwendung des LeMoS

Vorbedingungen:
- Java JDK21 installiert und unter der Pfad-Variable "java" erreichbar

Ablauf zur Erstellung eines Lernmoduls mit Hilfe des LeMoS:
1. Konzeptionieren des Lernmoduls
   - Definieren, was vom Lernmodul vermittelt werden soll
   - Definieren, welche Werte im Lernmodul eingegeben und ausgegeben werden sollen
   - Definieren, wie das Lernmodul zu dem gewünschten Ergebnis kommen soll (als Zustandsgraph)
2. Modellieren des Lernmoduls
   - Übertragen des Konzepts in eine strukturierte Sprache (XML, YAML oder JSON)
   - Dokumenation der Struktur ist nachzulesen im mitgelieferten Dokument: Modellierungssprache.pdf
3. Generieren des Lernmoduls
   - Ausführen des mitgelieferten Skripts "runLeMoS.sh" (Linux) bzw. "runLeMoS.bat" (Windows) an beliebiger Stelle
   - Parameter beim Aufruf des Skripts: absoluter oder relativer Pfad der Lernmodul-Konfiguration (angabe mehrerer Lernmodul-Konfiguration möglich)
   - Ergebnis des Skripts: Webarchiv (war-Datei) mit dem Namen der Lernmodul-Konfiguration, abgelegt am Ausführungsort des Skrips
   - Beispiel:
     - Aufruf:   ../LeMoSystem/runLeMoS.sh ../Lernmodulkonfigurationen/1-Theorem_von_Little_V1/1-Theorem_von_Little_V1_YAML.yaml
     - Ergebnis: 1-Theorem_von_Little_V1_YAML.war
   - Für Weitere Informationen zur Verwendung des LeMoS: Skript ohne Parameter aufrufen
4. Bereitstellen des Lernmoduls
   - Installieren der war-Datei des Lernmoduls auf einem Webserver wie Tomcat