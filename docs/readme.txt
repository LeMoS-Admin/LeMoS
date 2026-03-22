Wichtigste Änderungen in LeMoS-2.1.0:
- Kompatibilität: abwärtskompatibel zu Version 2.0.0
- Strukturell
  - Attribut "value" von Objekt "Variable" wird nun stets als Zeichenkette (String) interpretiert
  - Attribut "initialisation" in Objekt "Variable" hinzugefügt, um Variablen weiterhin durch eine Operation oder mit einem anderen Datentyp als String zu initialisieren
  - Attribut "numberedOutput" in Objekt "Settings" hinzugefügt, um nummerierte Ausgaben im Protokollfeld zu aktivieren
  - Benutzerhandbuch entsprechend dem Feedback angepasst, unter anderem Vorüberlegungen zu Szenarien ergänzt
  - Kompilier-Skripte löschen nun alte Versionen (jar-Dateien) des LeMoS, um die Verwechslungsgefahr zu reduzieren
- Generierung
- Lernmodul
  - Ausgaben über Protokollfeld können nun nummeriert werden
  - Funktion "clearOutputs()" in Klasse "Module" ergänzt
- Konfigurationen
  - LeMoS-Version in allen Konfigurationen auf 2.1.0 angepasst

Allgemeine Hinweise:
- Zum Ausführen der Lernmodule wird ein aktueller Browser mit mindestens ECMAScript-Version es2022 benötigt
- Falls der Browser 'Mozilla Firefox' verwendet wird, darf dieser nicht via Snap installiert sein

Informationen zum Umgang mit dem LeMoS finden sich in folgenden Dateien:
- "readme-plattformverwalter.txt" für Informationen zur Bereitstellung der Lernmodule
- "readme-softwareentwickler.txt" für Informationen zu Installation, Weitergabe und Funktionsweise des LeMoS
- "Benutzerhandbuch.pdf" für Informationen zur Verwendung des LeMoS

Anmerkungen zum Feedback zu LeMoS-Version 2.0.0:
- Problem bezüglich der Konfiguration von Doppelpunkten in Freitexten (Punkt 1 und 3.1):
  - Ursache: Doppelpunkte werden von YAML als Teil der Syntax interpretiert, weswegen es zu Syntaxfehlern kommt
  - Das Schema sollte solche Fehler eigentlich erkennen und dementsprechend bemängeln, war das bei Ihnen nicht der Fall?
  - Lösung: Der gesamte Inhalt des Eintrags sollte in Anführungszeichen (einfache oder doppelte, darf nur nicht mit den weiteren kollidieren) eingefasst werden
            --> Die Syntax-Zeichen von YAML werden ignoriert und der Eintrag einfach direkt als Text interpretiert
            --> Zur Klarstellung habe ich in den Grundlagen des Benutzerhandbuchs ergänzt, dass Aktionen etc. als Zeichenketten in JavaScript-Syntax zu definieren sind (die Beispiele im Kaptiel "Erste Schritte" zeigten das ohnehin schon so)
  - Beispiel anhand einer gesammten Zeile:
    - Vorher:  - msg.value=msg.value+" Erklaerung: "+States.getCurrentStateExplanation();
    - Nachher: - 'msg.value=msg.value+" Erklaerung: "+States.getCurrentStateExplanation();'
- Frage nach Beispielen zu globalen Variablen (Punkt 2):
  - Im Benutzerhandbuch gibt es kein Beispiel zu globalen Variablen, da dieses Feature aus meiner Sicht zu komplex für die ersten Schritte ist
  - Für spätere Verwendungen dieses Feature gehe ich davon aus, dass es auch ohne Beispiel in der Spezifikation verständlich ist (wie bei den anderen, nicht mit Beispiel erläuterten, Objekten auch)
  - Der von Ihnen festgestellte "Fehler" war tatsächlich eigentlich ein Feature: die Variablen sollten auch durch Aktionen initialisiert werden können
  - Leider war dadurch das einfache initialisieren mit einer Zeichenkette nur über Umwege möglich, da ich Zeichenketten syntaktisch nicht von Aktionen unterscheiden kann (in YAML sind beide ein String)
  - Das Verhalten ist nun so angepasst, dass "value" immer als Zeichenkette interpretiert wird, für die bisherige Funktionalität ist daher das Attribut "initialisation" zu verwenden
  - Ich hoffe, dass das Verhalten somit wieder dem intuitv erwarteten entspricht (zumindest in den meisten Fällen)
- Wunsch nach nummerierten Ausgaben (Punkt 3):
  - Kann nun über das Attribut "numberedOutput" des Objekts "Settings" aktiviert werden
- Wunsch nach Hervorhebung von Texten und Textteilen (Punkt 4):
  - Tatsächlich können seit der letzten Version ganze Felder via Konfiguration oder Systemfunktion hervorgehoben werden (Attribut "highlighted" bzw. Funktion "setHighlighted(...)")
  - Um nur Textausschnitte hervorzuheben, kann in Attributen wie "explanation" von "General" und "Field" direkt HTML-Code verwendet werden
  - Im InfoField kann im Attribut "text" ebenso HTML-Code verwendet werden, um einzelne Teile hervorzuheben (diesen Hinweis habe ich nun auch im Benutzerhandbuch ergänzt)
  - Lediglich bei der Ausgabe im Ausgabefeld ist keine Hervorhebung möglich, da dies nach meiner Erkenntnis in Input-Feldern von HTML nicht vorgesehen ist
- Frage bezüglich unbedingten/bedingungslosen Übergängen (Punkt 3.2):
  - Bedingungslose Übergänge können durch einfaches Weglassen des Attributs "conditions" im Objekt "Transition" erreicht werden (natürlich nur einmal pro Zustand)
    (Dieser Hinweis war bisher nur im Kapitel "Modellierungssprache" zu finden, ich habe ihn daher nun auch im Kapitel "Erste Schritte" ergänzt)
  - Dass der Term "true" bzw. "True" nicht funktionierte, liegt am falschen Datentyp: YAML erkennt "true" und "True" als Boolean, das LeMoS erwartet aber einen String
    (Dieser Fehler müsste aber eigentlich auch vom Schema erkannt werden, war das bei Ihnen nicht der Fall?)
  - Um einen bedingungslosen Übergang über den Term "true" zu definieren, wären somit Anführungszeichen notwendig (Bsp. einer gesammten Zeile: - "true") 

Testen des LeMoS:
- Für einen vollständigen Test ist zunächst die Anleitung für Verwalter der Lernplattform ("readme-softwareentwickler.txt") zu befolgen
- Anschließend kann das Testen beliebig oft entsprechend der Anleitung für Ersteller von Lernmodulen ("readme-lernmodulersteller.txt") ab Schritt 3 erfolgen
- Exemplarische Testdaten finden sich in der mitgelieferten Datei "Lernmodulkonfigurationen.tar"
- Zusätzlich können auch neue Lernmodule erstellt und getestet werden, hierfür ist die Anleitung für Ersteller von Lernmodulen ("readme-lernmodulersteller.txt") ab Schritt 1 zu befolgen
- Folgende Lernmodule sind konfiguriert:
  - "0-Subtraktion" (+ 1 Szenario)
  - "0-FeldtypenTestmodul_Locker" (+ 1 Szenario und einige Ressourcen)
  - "0-FeldtypenTestmodul_Restriktiv" (+ 1 Szenario und einige Ressourcen)
  - "1-Theorem_von_Little_V1" in YAML, XML und JSON (+ 3 Szenarien)
  - "1-Theorem_von_Little_V2" (+ 1 Szenario)
  - "2-Dreisatz" (+ 1 Szenario)
  - "3-Schriftliches_Teilen" (+ 1 Szenario)
  - "4-Sortieralgorithmus_V1" (+ 1 Szenario)
  - "4-Sortieralgorithmus_V2" (+ 1 Szenario)
  - "5-FAT_Dateisystem" (+ 1 Szenario)
  - "6-Servlet_Mapping" (+ 2 Szenarien)
  - "7-Freispeicherverwaltung_L1" auf Basis von Lösung 1 (+ 1 Szenario)
  - "7-Freispeicherverwaltung_L2" auf Basis von Lösung 2 (+ 1 Szenario)
  - Im Unterordner "X-Webtechnologien":
    - "WT-BoxmodelleVergleichen" (+ 3 Szenarien, + 1 Ressource)
    - "WT-ImpliziteTypumwandlung" (+ 9 Szenarien, + 1 Ressource)
    - "WT-SelektorenBilden" (+ 5 Szenarien)
    - "WT-SpezifitaetBerechnen" (+ 5 Szenarien, + 1 Ressource)
    - "WT-UriBilden" (+ 3 Szenarien)
    - "WT-ZeichenKodieren" (+ 2 Szenarien)
  - Hinweis-1: die Konfigurationen der Lernmodule decken sich nicht mehr mit den Darstellungen aus der Anforderungsanalyse, sie sind eher daran angelehnt
  - Hinweis-2: für die Protokollfelder der Lernmodule sind aktuell nur in den WT- und Testmodulen Ausgaben konfiguriert, in den Modulen der Anforderungsanalyse bleibt das Protokoll somit korrekterweise leer, solange kein Fehler auftritt
- Folgende Funktionalitäten des LeMoS sind umgesetzt und sollten funktionieren:
  - Kompilieren und Ausführen des LeMoS unter Linux und Windows
  - Berücksichtigung aller konfigurierbaren Eigenschaften
  - Konfiguration und Verwendung aller Feldtypen (INFO, TEXT, SPLIT, CHECK, SELECT, LIST, TABLE) in allen Varianten (z.B. multiline, horizontal/vertikal)
  - Verwendung aller Vorwärts- und Rückwärts-Schritte und des Resets (|<, <<, <, O, >, >>, >|)
  - Verwendung aller Systemfunktionen (bilden einen Großteil der jeweils passenden JavaScript-Objektfunktionen ab, haben aber zusätzlich noch einige weitere)
  - Folgende Feldtypen unterstützen im Allgemeinen die Funktionen folgender JavaScript-Objekte:
    - TextField: String-Klasse
    - SplitField, ListField, TableField: Array-Klasse
    - ObjectField (Einträge von TableField): Map-Klasse
    - InfoField, CheckField und SelectField: keine ähnliche JavaScript-Klasse
