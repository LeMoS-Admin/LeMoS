Wichtigste Änderungen in LeMoS-1.2.2:
- Kompatibilität: abwärtskompatibel zu Version 1.2.1
- Strukturell
  - Umbenennung des LeMoS-Installationsordners von LeMoSystem zu LeMoS
  - Umbenennung der ReadMe-Dateien in readme-Dateien (keine Großbuchstaben mehr)
- Generierung
  - Anpassung der Skripte zur Generierung (run-Skripte), um stets den letzten Treffer (die aktuellste LeMoS-Version) zu verwenden
- Lernmodul
  - Vorwärts-Buttons in Schrittnavigation werden nun deaktiviert, wenn es keine weiteren Schritte gibt
  - Rückwärts-Buttons in Schrittnavigation werden nun deaktiviert, wenn es keine vorherigen Schritte gibt
- Konfigurationen
  - Konfigurationen der Lernmodule "WT-SpezifitaetBerechnen", "WT-SelektorenBilden" und "WT-BoxmodelleVergleichen" entsprechend dem Feedback angepasst

Allgemeine Hinweise:
- Zum Ausführen der Lernmodule wird ein aktueller Browser mit mindestens ECMAScript-Version es2022 benötigt
- Falls der Browser 'Mozilla Firefox' verwendet wird, darf dieser nicht via Snap installiert sein

Informationen zum Umgang mit dem LeMoS finden sich in folgenden Dateien:
- "readme-lernmodulersteller.txt" für Informationen zur Verwendung des LeMoS
- "readme-plattformverwalter.txt" für Informationen zur Bereitstellung der Lernmodule
- "readme-softwareentwickler.txt" für Informationen zu Installation, Weitergabe und Funktionsweise des LeMoS

Fragen und Antworten aus dem Feedback zur letzten Version:
- Frage: Welche JS-Version wird mindestens benötigt?
  --> Antwort: ECMAScript-Version es2022
- Frage: Könnte Schrittnavigation die Anzahl der Schritte anzeigen?
  --> Antwort: Nein, da dieser Wert auch dem System vorher nicht bekannt ist.
- Frage: Warum schlägt die Generierung eines weiteren Szenarios aufgrund der Dateiendung ".swp" fehl?
  --> Antwort: Das liegt an der Fallunterscheidung zwischen XML, JSON und YAML, die für zukünftige Erweiterungen des LeMoS weiterhin enthalten ist.
  --> Gegenfrage: Woher kam die Endung ".swp" und wie wäre in dem Fall der vollständige Dateiname?
- Frage: Wozu braucht ein Szenario eine ID?
  --> Antwort: Die ID wird zu eindeutigen Unterscheidung der Szenarien beim Laden der Werte benötigt.
- Frage: Warum wird nicht der Szenario-Dateiname als ID verwendet?
  --> Antwort: Das wäre aus meiner Sicht unsauber, da an keiner anderen Stelle der Dateiname für das fertige Lernmodul verwendet wird.
               Außerdem weiß man beim Dateinamen nie, was man bekommt, er wäre in der Regel deutlich länger als eine ID und könnte auch Sonderzeichen enthalten, was potenziell zu Problemen führen würde.

Testen des LeMoS:
- Für einen vollständigen Test ist zunächst die Anleitung für Verwalter der Lernplattform ("readme-softwareentwickler.txt") zu befolgen
- Anschließend kann das Testen beliebig oft entsprechend der Anleitung für Ersteller von Lernmodulen ("readme-lernmodulersteller.txt") ab Schritt 3 erfolgen
- Exemplarische Testdaten finden sich in der mitgelieferten Datei "Lernmodulkonfigurationen.tar"
- Zusätzlich können auch neue Lernmodule erstellt und getestet werden, hierfür ist die Anleitung für Ersteller von Lernmodulen ("readme-lernmodulersteller.txt") ab Schritt 1 zu befolgen
- Folgende Lernmodule sind konfiguriert:
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
    - "WT-BoxmodelleVergleichen" (+ 3 Szenarien)
    - "WT-ImpliziteTypumwandlung" (+ 9 Szenarien)
    - "WT-SelektorenBilden" (+ 5 Szenarien)
    - "WT-SpezifitaetBerechnen" (+ 5 Szenarien)
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
