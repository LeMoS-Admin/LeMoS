Wichtigste Änderungen in LeMoS-0.3.0:
- Strukturell
  - Umstellung auf Generierung einer ZIP-Datei als Ausgabe
  - Umbennenung der ReadMe-Dateien für klarere Zuordnung
  - Ergänzung der Anleitungen um Informationen zur Bereitstellung der Lernmodule
  - Hinzufügen von JSON-Schemata (LeMoS-Modul-Schema.json, LeMoS-Szenario-Schema.json) zur einfacheren Erstellung und Validierung von YAML- und JSON-Lernmodulen
  - Aktuallisierung der LeMoS-Dokumentation (Modellierungssprache.pdf)
- Generierung
  - Vollständige Implementierung aller Feldtypen
  - Erweiterung von mehrzeiligen Feldern der Typen PLAIN und SPLIT (via Attribut multiline erreichbar)
  - Ergänzung des Feldtypen "Textfeld" (statischer Text)
  - Ergänzung von Erklärungstexten im Lernmodul
  - Ergänzung der Berücksichtigung aller konfigurierbaren Eigenschaften eines Lernmoduls
- Lernmodul
  - Überarbeitung der Bedienoberfläche, um sie reaktiv (responsive) zu machen
  - Implementierung einer umfangreichen Validuerung der Eingabewerte
  - Implementierung einer Historie, um auch Schritte rückwärts zu ermöglichen
  - Übersetzung von Fehlermeldungen, die dem Lernmodulnutzer als Modal erscheinen (soll dadurch konsistenter zu konfigurierten Fehlermeldungen sein)
- Konfigurationen
  - Erweiterung der Konfiguration für 1-Theorem_von_Little_V1 um das Feld "Aufgabentyp"
  - Ergänzung einer Konfiguration für 1-Theorem_von_Little_V2 und 2-Dreisatz (jeweils inklusive eines Szenarios)
  - Ergänzung von Konfigurationen zum Testen aller Feldtypen (0-FeldtypenTestmodul_Locker und 0-FeldtypenTestmodul_Restriktiv)

Allgemeine Hinweise:
- Zum Ausführen der Lernmodule wird ein aktueller Browser benötigt
- Falls der Browser 'Mozilla Firefox' verwendet wird, darf dieser nicht via Snap instaliert sein

Informationen zum Umgang mit dem LeMoS finden sich in folgenden Dateien:
- "ReadMe-Lernmodulersteller.txt" für Informationen zur Verwendung des LeMoS
- "ReadMe-Plattformverwalter.txt" für Informationen zu Installation und Weitergabe des LeMoS sowie zur Bereitstellung der Lernmodule
- "ReadMe-Softwareentwickler.txt" für Informationen zu Bestandteilen und Funktionsweise des LeMoS

Testen des LeMoS:
- Für einen vollständigen Test ist zunächst die Anleitung für Verwalter der Lernplattform ("ReadMe-Plattformverwalter.txt") zu befolgen
- Anschließend kann das Testen bliebig oft entsprechend der Anleitung für Ersteller von Lernmodulen ("ReadMe-Lernmodulersteller.txt") ab Schritt 3 erfolgen
- Exemplarische Testdaten finden sich in der mitgelieferten Datei "Lernmodulkonfigurationen.tar"
- Zusätzlich können auch neue Lernmodule erstellt und getestet werden, hierfür ist die Anleitung für Ersteller von Lernmodulen ("ReadMe-Lernmodulersteller.txt") ab Schritt 1 zu befolgen
- Folgende Lernmodule sind aktuell konfiguiert (die weiteren Einträge sind Platzhalter):
  - "0-FeldtypenTestmodul_Locker" (+ 1 Szenario)
  - "0-FeldtypenTestmodul_Restriktiv" (+ 1 Szenario)
  - "1-Theorem_von_Little_V1" (+ 3 Szenarien)
  - "1-Theorem_von_Little_V2" (+ 1 Szenario)
  - "2-Dreisatz" (+ 1 Szenario)
- Folgende Funktionalitäten des LeMoS sind aktuell umgesetzt und sollten funktionieren
  (Gründsätzlich sollten abgesehen von den Systemfunktionen alle spezifizierten Anforderungen erfüllt sein):
  - Kompilieren und Ausführen des LeMoS unter Linux (.bat-Dateien für Windows aktuell noch nicht implementiert)
  - Berücksichtigung aller konfigurierbaren Eigenschaften
  - Konfiguration und Verwendung aller Feldtypen (TEXT, PLAIN, SPLIT, LIST, TABLE) in allen Varianten (z.B. multiline, horizontal/vertikal)
  - Verwendung aller Vorwärts- und Rückwärts-Schritte und des Resets (|<, <<, <, O, >, >>, >|)
