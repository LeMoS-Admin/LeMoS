@echo off
setlocal EnableDelayedExpansion	& :: Variablen sollen nicht bereits vor Beginn einer Schleife durch ihre Werte ersetzt werden, sondern auf die Veränderungen der Werte während des Schleifendurchlaufs reagieren können
echo Executing LeMoS

set "SWD=%cd%"			& :: SWD = Start Working Directory
cd /d "%~dp0"			& :: Auflösen des ggf. relativen Pfades zum Skript, um absoluten Pfad des Skripts zu erhalten
set "LWD=%cd%"			& :: LWD = LeMoS Working Directory
set "TEMPLATE=moduleTemplate" 	& :: TEMPLATE = Vorlage für Webarchiv eines Lernmoduls
set "OPTIONS="                  & :: OPTIONS = Optionen für LeMoS-Aufruf, folgende sind möglich: -PaS bzw. -PrintAsStructure, -PaL bzw. -PrintAsLine (siehe Aufruf des LeMoS-Generators ohne Parameter)

:: LeMoS-Dateinamen ermitteln, indem über alle passenden Dateien iteriert wird (es sollte nur einen Eintrag geben, ggf. werden aber auch alte Versionen gefunden)
:: Schleife stellt sicher, dass der letzte Eintrag genommen wird (für den Fall, dass es mehr als einen Eintrag gibt, ist der Letzte vermutlich der Aktuellste)
for %%f in (lemos*.jar) do (
	set "lemos=%%f"
)
echo Found LeMoS-Version: %lemos%
echo.

:: Wenn keine Parameter übergeben: Erklärung der Funktionsweise des LeMoS
if %1 equ "" (
	echo "Bitte mindestens eine Lernmodulkonfiguration (YAML-, JSON- oder XML-Datei) als absoluten oder relativen Pfad angeben."
	echo "Konfigurationen von Lernmodul-Szenarien (YAML-, JSON- oder XML-Datei) sind nicht anzugeben, sie werden am Speicherort der Lernmodulkonfiguration im Unterordner 'scenarios' erwartet."
	echo "Bei erfolgreicher Ausführung werden die generierten Lernmodule am Aufrufort dieses Skripts als ZIP-Datei unter dem Namen der Lernmodulkonfiguration abgelegt."
	cd /d "%SWD%"
	exit /b 1
)

set failedGeneration=false
for %%x in (%*) do (
	:: Endung und Pfad entfernen, um Namen des Lernmoduls zu bestimmen
	set "name=%%~nx"

	:: Dateinamen entfernen, um Pfad des Lernmoduls zu bestimmen
	set "pfad=%%~dpx"

	:: Erstellen einer Kopie der Vorlage, damit diese anschließend mit den Daten des Lernmodul ausgefüllt werden kann
	echo !name!: preparing template
	cd /d "%LWD%"
	tar -xf "%lemos%" "%TEMPLATE%"

	:: Übernehmen der hinterlegten Resourcen (falls vorhanden) in das Verzeichnis des Lernmoduls
	echo !name!: preparing resources
	if exist "!pfad!\resources\" (
		xcopy "!pfad!\resources" "%LWD%\%TEMPLATE%\res" /e /i /q /y >nul
	)
	
	:: Aufruf des LeMoS-Generators zur Verarbeitung der Lernmodulkonfiguration (Parameter: Lernmodulkonfigurationsdatei, Zielordner)
	echo !name!: starting generator
	cd /d "%SWD%"					& :: LeMoS muss in Startverzeichnis aufgerufen werden, damit es etwaige relative Pfade korrekt auflösen kann
	java -jar "%LWD%\%lemos%" %%x "%LWD%\%TEMPLATE%" %OPTIONS%"

	:: Behandeln von erfolglosen Generierungen (über einen vom LeMoS-Generator zurückgegebenen Statuscode, der ungleich 0 ist)
	if %errorlevel% neq 0 (
		set failedGeneration=true
		rmdir "%LWD%\%TEMPLATE%" /s /q
		goto :continue
	)

	:: Verschieben der gewählten Systembibliothek, bereinigen aller anderen (Gewünschte Version der Bibliothek wurde vorher im LeMoS-Generator zu "lib" umbenannt)
	echo !name!: moving library
	cd /d "%LWD%\%TEMPLATE%"
	move libs\lib lib >nul
	rmdir libs /s /q

	:: Packen des fertigen Lernmoduls zu einer ZIP-Datei
	echo !name!: packing archive
	if exist "%SWD%\!name!.zip" (
		del "%SWD%\!name!.zip" /f /q
	)
	tar -caf "%SWD%\!name!.zip" *

	:: Bereinigen der temporären Kopie der Vorlage
	echo !name!: deleting template
	cd ..
	rmdir %TEMPLATE% /s /q

	:: Erfolgsausgabe
	echo !name!: finished "%SWD%\!name!.zip"

	:continue
	echo.
)

cd /d "%SWD%"
if %failedGeneration% equ "true" (
	echo Failed with at least one generation
	exit /b 1
) else (
	echo All generations successful
	exit /b 0
)