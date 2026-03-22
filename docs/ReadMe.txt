Wichtigste Änderungen in LeMoS-1.1.0:
- Kompatibilität: abwärtskompatibel zu Version 1.0.0, wenn folgende Maßnahmen getroffen werden
  - In bestehdenen Lernmodulkonfigurationen muss der Feldtyp "SELECTOR" durch "SELECT" ersetzt werden
- Strukturell
  - Dokumentation der Systemfunktionen erstellt
- Generierung
  - LeMoS-Skripte für Windows erstellt
  - SelectorField zur Vereinheitlichung in SelectField umbenannt
- Lernmodul
  - Automatisches Scrollen nach Klick auf Buttons eingebaut
  - Darstellung von Infotexten überarbeitet
  - setEnabled()-Methode ergänzt
  - setDisplayed() und setEnabled() in Historie (für Rückschritte) aufgenommen
  - Letzter Eintrag von Listen/Tabellen wird nun unsichtbar, wenn er entfernt werden soll (vorher blieb der letzte Eintrag immer bestehen und sichtbar)
  - Systemfunktionen der Module-Klasse in mehrere Klassen aufgespalten, um eine bessere Trennung der Funktionen zu erreichen
- Konfigurationen
  - Konfiguration eines Moduls zum Testen aller Systemfunktionen hinzugefügt

Ausstehende Arbeiten:
  - Anpassung der Dateinamen (kein Camel-Case wie "LeMoS")
  - Erweiterung der Konfigurationen um Protokolausgaben

Allgemeine Hinweise:
- Zum Ausführen der Lernmodule wird ein aktueller Browser benötigt
- Falls der Browser 'Mozilla Firefox' verwendet wird, darf dieser nicht via Snap instaliert sein

Informationen zum Umgang mit dem LeMoS finden sich in folgenden Dateien:
- "ReadMe-Lernmodulersteller.txt" für Informationen zur Verwendung des LeMoS
- "ReadMe-Plattformverwalter.txt" für Informationen zur Bereitstellung der Lernmodule
- "ReadMe-Softwareentwickler.txt" für Informationen zu Installation, Weitergabe und Funktionsweise des LeMoS

Testen des LeMoS:
- Für einen vollständigen Test ist zunächst die Anleitung für Verwalter der Lernplattform ("ReadMe-Softwareentwickler.txt") zu befolgen
- Anschließend kann das Testen bliebig oft entsprechend der Anleitung für Ersteller von Lernmodulen ("ReadMe-Lernmodulersteller.txt") ab Schritt 3 erfolgen
- Exemplarische Testdaten finden sich in der mitgelieferten Datei "Lernmodulkonfigurationen.tar"
- Zusätzlich können auch neue Lernmodule erstellt und getestet werden, hierfür ist die Anleitung für Ersteller von Lernmodulen ("ReadMe-Lernmodulersteller.txt") ab Schritt 1 zu befolgen
- Folgende Lernmodule sind konfiguiert:
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
  - "7-Freispeicherverwaltung" auf Basis von Lösung 2 (+ 1 Szenario)
  - Hinweis-1: die Konfigurationen der Lernmodule decken sich nicht mehr mit den Darstellungen aus der Anforderungsanalyse, sie sind eher daran angelehnt
  - Hinweis-2: für die Protokollfeldern der Lernmodule sind aktuell nur in den Testmodulen Ausgaben konfiguriert, in allen anderen Modulen bleibt das Protokoll somit korrekterweise leer solange kein Fehler auftritt
- Folgende Funktionalitäten des LeMoS sind umgesetzt und sollten funktionieren:
  - Kompilieren und Ausführen des LeMoS unter Linux (.bat-Dateien für Windows aktuell noch nicht implementiert)
  - Berücksichtigung aller konfigurierbaren Eigenschaften
  - Konfiguration und Verwendung aller Feldtypen (INFO, TEXT, SPLIT, CHECK, SELECT, LIST, TABLE) in allen Varianten (z.B. multiline, horizontal/vertikal)
  - Verwendung aller Vorwärts- und Rückwärts-Schritte und des Resets (|<, <<, <, O, >, >>, >|)
  - Verwendung aller Systemfunktionen (bilden einen Großteil der jeweils passenden JavaScript-Objektfunktionen ab, haben aber zusätzlich noch einige weitere)
    Folgende Feldtypen untersützen im Allgemeinen die Funktionen folgender JavaScript-Objekte:
    - Textfield: String-Klasse
    - SplitField, ListField, TableField: Array-Klasse
    - ObjectField (Einträge von TableField): Map-Klasse
    - InfoField, CheckField und SelectField: keine ähnliche JavaScript-Klasse
