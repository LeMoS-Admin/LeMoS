# LeMoS (Lernstoff-Modellierungs-System)
Diese Software ermöglicht es, webbasierte Lernmodule für algorithmische Lerninhalte zu konfigurieren, anstatt sie auszuprogrammieren.
Zur Konfiguration der Lernmodule ist YAML als Sprache empfohlen, alternativ können aber auch XML und JSON verwendet werden.
Die Lernmodule werden als eigenständig funktionsfähige ZIP-Dateien gespeichert, die anschließend als Webanwendung bereitgestellt werden können.

## Bestandteile dieses Projekts
- Dokumentation in Form eines Benutzerhandbuchs unter LeMoS/docs
- Einige Beispiele von Lernmodulen, die auch zum Testen des LeMoS verwendet werden unter LeMoS/samples
- Skripte zum Kompilieren und Ausführen des LeMoS unter LeMoS/scripts
- Quellcode des LeMoS unter LeMoS/src

## Konfigurieren von Lernmodulen
- Lernmodule können als YAML (empfohlen), XML oder JSON konfiguriert werden
- Zur Unterstützung bei der Konfiguration können die Schemata unter LeMoS/samples eingebunden werden
    - LeMoS-Modul-Schema.json für das Lernmodul selbst
    - LeMoS-Szenario-Schema.json für Szenarien des Lernmoduls
- Erste Schritte, Spezifikation der Modellierungsmöglichkeiten und Funktionen des LeMoS: siehe Benutzerhandbuch unter LeMoS/docs
- Beispielkonfigurationen: siehe LeMoS/samples

## Generierung von Lernmodulen
- Vorbedingung: Java muss mindestens in Version JDK21 installiert und über die Umgebungsvariable "java" erreichbar sein
- Herunterladen des LeMoS
- Ausführen des passenden Compile-Skripts (zu finden unter LeMoS/scripts)
    - Windows: compile-lemos.bat
    - Linux: compile-lemos.sh
- Ausführen des passenden Run-Skripts (zu finden unter LeMoS/scripts)
    - Windows: run-lemos.bat
    - Linux: run-lemos.sh
    - Parameter: Pfad/Pfade (absolut oder relativ) zu Lernmodul-Konfigurationen
    - Hinweis: Szenario-Konfigurationen und hinterlegten Ressourcen werden nicht explizit angegeben, sondern am Speicherort der zugehörigen Lernmodul-Konfigurationen erwartet
        - Szenario-Konfigurationen im Ordner "scenarios"
        - Hinterlegte Ressourcen im Ordner "resources"
- Ergebnis: eine ZIP-Datei pro Lernmodul am Aufrufort (nicht Speicherort) des Run-Skripts

## Bereitstellung von Lernmodulen
- LeMoS-Lernmodule müssen ihren Benutzern über einen Webserver, beispielsweise via Apache oder Tomcat, bereitgestellt werden
- Zur Bereitstellung kann die ZIP-Datei sowohl entpackt als auch zu einer WAR-Datei umbenannt werden
- Hinweis: die generierten Lernmodule (ZIP-Dateien) sind eigenständig funktionsfähig, das bedeutet:
    - Jedes Lernmodul beinhaltet alle benötigten Komponenten des LeMoS
    - Außer dem generierten Lernmodul selbst ist nichts Weiteres bereitzustellen
- URL eines Lernmoduls: <Webserver-URL>/<Lernmodul-Dateiname> --> Beispiel:
    - URL des Webservers: http://localhost:8080
    - Name des entpackten Ordners bzw. der Verknüpfung im webapps-Ordner: 1-Theorem_von_Little_V1
    - URL des Lernmoduls: http://localhost:8080/1-Theorem_von_Little_V1

## Verwenden der Lernmodule
- Die Lernmodule müssen über einen Webserver bereitgestellt werden, das einfach Öffnen der index.html liefert kein funktionsfähiges Lernmodul
- Zum Zugriff auf die Lernmodule kann ein beliebiger Browser verwendet werden, Einschränkung:
    - Der verwendete Browser muss mindestens die ECMAScript-Version es2022 unterstützen
    - Falls 'Mozilla Firefox' verwendet wird, darf dieser nicht via Snap installiert sein, da hier der Funktionsumfang ungenügend ist

## Lizenzierung
- Das LeMoS darf kostenlos verwendet werden und erhebt keine Ansprüche auf damit erstellte Lernmodule.
- Änderungen am LeMoS sowie das Verbreiten von angepassten Versionen des LeMoS sind nicht gestattet.
- Frei zugängliche Veröffentlichungen des LeMoS sind ebenfalls nicht gestattet.
- Der interne Austausch des LeMoS, z.B. innerhalb der Hochschule, gilt ausdrücklich nicht als Veröffentlichungen und ist somit gestattet.
- Verbesserungsvorschläge und Erweiterungswünsche können gerne als Issue in GitHub (https://github.com/LeMoS-Admin/LeMoS) eingestellt werden.