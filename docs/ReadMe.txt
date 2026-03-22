Wichtigste Änderungen in LeMoS-1.2.1:
- Kompatibilität: abwärtskompatibel zu Version 1.2.0
- Strukturell
- Generierung
- Lernmodul
  - Einbau eines vertikalen Scrollbalkens für überbreite Felder (insbesondere für das Protokollfeld relevant)
  - Automatisches Anfügen eines Semikolons an jede Aktion entfernt (JS braucht Semikolons nicht zwingend, es stets anzufügen kann aber Probleme machen)
  - Restriktionen werden nun auch bei leeren Feldern ausgeführt, um Felder zu ermöglichen, die nur unter bestimmten Bedingungen leer sein dürfen
  - Kleinere Fehlerbehebungen, u.a. in der getValue()-Methode vom SplitFieldManager
- Konfigurationen
  - Durch Restriktions-Änderung entstandene Fehler in den Konfigurationen zu Theorem von Little und Freispeicherverwaltung behoben
  - Ungenutzten Code in der Konfiguration "WT-SelektorenBilden" entfernt
  - Konfigurationen der Lernmodule "WT-ImpliziteTypumwandlung", "WT-ZeichenKodieren" und "WT-UriBilden" ergänzt

Allgemeine Hinweise:
- Zum Ausführen der Lernmodule wird ein aktueller Browser benötigt
- Falls der Browser 'Mozilla Firefox' verwendet wird, darf dieser nicht via Snap installiert sein

Informationen zum Umgang mit dem LeMoS finden sich in folgenden Dateien:
- "ReadMe-Lernmodulersteller.txt" für Informationen zur Verwendung des LeMoS
- "ReadMe-Plattformverwalter.txt" für Informationen zur Bereitstellung der Lernmodule
- "ReadMe-Softwareentwickler.txt" für Informationen zu Installation, Weitergabe und Funktionsweise des LeMoS

Testen des LeMoS:
- Für einen vollständigen Test ist zunächst die Anleitung für Verwalter der Lernplattform ("ReadMe-Softwareentwickler.txt") zu befolgen
- Anschließend kann das Testen beliebig oft entsprechend der Anleitung für Ersteller von Lernmodulen ("ReadMe-Lernmodulersteller.txt") ab Schritt 3 erfolgen
- Exemplarische Testdaten finden sich in der mitgelieferten Datei "Lernmodulkonfigurationen.tar"
- Zusätzlich können auch neue Lernmodule erstellt und getestet werden, hierfür ist die Anleitung für Ersteller von Lernmodulen ("ReadMe-Lernmodulersteller.txt") ab Schritt 1 zu befolgen
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
