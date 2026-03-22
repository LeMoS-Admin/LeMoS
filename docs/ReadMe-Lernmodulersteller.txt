Verwendung des LeMoS

Vorbedingungen:
- Java JDK21 installiert und unter der Pfad-Variable "java" erreichbar
- Die vom Softwareentwickler gelieferten Dateien liegen entpackt im Dateisystem vor (siehe exemplarische Ordnerstruktur unter Punkt 3)

Allgemeine Hinweise:
- Zum Ausführen der Lernmodule wird ein aktueller Browser benötigt
- Falls der Browser 'Mozilla Firefox' verwendet wird, darf dieser nicht via Snap installiert sein

Ablauf zur Erstellung eines Lernmoduls mithilfe des LeMoS:
1. Konzeptionieren des Lernmoduls
   - Definieren, was vom Lernmodul vermittelt werden soll
   - Definieren, welche Werte im Lernmodul eingegeben und ausgegeben werden sollen
   - Definieren, wie das Lernmodul zu dem gewünschten Ergebnis kommen soll (als Zustandsgraph)
2. Modellieren des Lernmoduls
   - Übertragen des Konzepts in eine strukturierte Sprache (XML, YAML oder JSON)
   - Dokumentation der Struktur nachlesbar in: Modellierungssprache.pdf
   - Dokumentation der zur Verfügung stehenden Systemfunktionen nachlesbar in: Systemfunktionen.pdf
   - Zur Unterstützung können außerdem folgende Schemata verwendet werden:
     - "LeMoS-Modul-Schema.json" für die Konfiguration des Lernmodul
     - "LeMoS-Szenario-Schema.json" für die Konfiguration der Lernmodul-Szenarien
   - Hinweis: das LeMoS validiert nicht gegen diese Schemata, daraus ergibt sich folgendes:
     - Sollte ein Fehler im Schema vorliegen, sodass etwas fälschlicherweise als inkorrekt klassifiziert wird, kann das LeMoS die Konfiguration ggf. dennoch verarbeiten
     - Das LeMoS kann auch Fehler erkennen, die das Schema nicht erkennt, etwa wenn es nicht genau einen ENTRY-State gibt, es ist daher ratsam auch die Ausgabe des LeMoS zu betrachten
3. Generieren des Lernmoduls
   - Ausführen des mitgelieferten Skripts "run-lemos.sh" (Linux) bzw. "run-lemos.bat" (Windows) an beliebiger Stelle
   - Parameter beim Aufruf des Skripts: absoluter oder relativer Pfad der Lernmodulkonfiguration (Angabe mehrerer Lernmodulkonfigurationen möglich)
   - Ergebnis des Skripts: ZIP-Archiv mit dem Namen der Lernmodulkonfiguration, abgelegt am Ausführungsort des Skripts
   - Beispiel:
     - Ordnerstruktur:
       - Lernmodule
         - LeMoSystem
           - lemos-<version>.jar (z.B. lemos-1.0.0.jar)	// Vom Softwareentwickler des LeMoS bereitzustellen
           - run-lemos.sh				// Vom Softwareentwickler des LeMoS bereitzustellen
           - run-lemos.bat				// Vom Softwareentwickler des LeMoS bereitzustellen
         - Lernmodulkonfigurationen
           - Modellierungssprache.pdf			// Vom Softwareentwickler des LeMoS bereitzustellen
           - Systemfunktionen.pdf			// Vom Softwareentwickler des LeMoS bereitzustellen
           - LeMoS-Modul-Schema.json			// Vom Softwareentwickler des LeMoS bereitzustellen
           - LeMoS-Szenario-Schema.json			// Vom Softwareentwickler des LeMoS bereitzustellen
           - 1-Theorem_von_Little_V1
             - 1-Theorem_von_Little_V1.yaml
             - scenarios (Optional)
               - 1-Theorem_von_Little_V1-S1.yaml
               - 1-Theorem_von_Little_V1-S2.yaml
               - 1-Theorem_von_Little_V1-S3.yaml
               - ...
             - resources (Optional)
               - ...
           - ...
         - Zielordner
     - Aufruf im Zielordner: ../LeMoSystem/run-lemos.sh ../Lernmodulkonfigurationen/1-Theorem_von_Little_V1/1-Theorem_von_Little_V1.yaml
     - Ergebnis im Zielordner: 1-Theorem_von_Little_V1.zip
   - Für weitere Informationen zur Verwendung des LeMoS: Skript ohne Parameter aufrufen
4. Bereitstellen des Lernmoduls
   - Lokales Testen des generierten Lernmoduls in mindestens einer der folgenden Varianten:
     - Via Apache:
       - Verschieben der entpackten ZIP-Datei an den gewünschten Document-Root
       - Apache entsprechend des Document-Root konfigurieren
     - Via Tomcat: 
       - Verschieben der entpackten ZIP-Datei in den webapps-Ordner von Tomcat
       - Alternativ: Umbenennen der ZIP-Datei zu einer WAR-Datei und verschieben in den webapps-Ordner von Tomcat
       - URL des Lernmoduls: <Webserver-URL>/<Lernmodul-Dateiname> --> Beispiel:
         - URL des Webservers: http://localhost:8080
         - Name des entpackten Ordners bzw. der Verknüpfung im webapps-Ordner: 1-Theorem_von_Little_V1
         - URL des Lernmoduls: http://localhost:8080/1-Theorem_von_Little_V1
     - Via Tomcat GUI: 
       - Öffnen der Seite http://localhost:8080/manager in einem Webbrowser
       - Unter "Lokale WAR Datei zur Installation hochladen" auf "Durchsuchen" klicken und ZIP-Datei auswählen
       - Unter "Lokale WAR Datei zur Installation hochladen" auf "Installieren" klicken
       - Unter "Anwendungen" auf Kontext-Pfad (entspricht /<Lernmodul-Dateiname>) des Lernmoduls klicken --> Beispiel:
         - Name der ZIP-Datei: 1-Theorem_von_Little_V1.zip
         - Kontext-Pfad des Lernmoduls: /1-Theorem_von_Little_V1
   - Weiterleiten des generierten und erfolgreich getesteten ZIP-Archivs an den Verwalter der Lernplattform