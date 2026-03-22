@echo off
echo Compiling LeMoS

set "oldDir=%cd%"			& :: Arbeitsverzeichnis auf den Speicherort des Skripts wechseln
cd /d "%~dp0"

:: Kompilieren des LeMoS
call mvnw.cmd clean package

:: Abbruch bei erfolgloser Kompilierung
if %errorlevel% neq 0 (
	cd /d "%oldDir%"
	exit /b 1
)

:: Ermitteln des Namens der jar-Datei (via for-Schleife)
for %%f in (target\LeMoS*.jar) do (
	:: Pfad entfernen, um Namen der Datei inkl. Endung zu erhalten
	set "name=%%~nxf"
)
echo Generated LeMoS-Version: %name%

:: Verschieben der jar-Datei in den Oberordner (praktischer für spätere Auslieferung des fertigen LeMoS)
move target\LeMoS*.jar %name% >nul

cd /d %oldDir%
exit /b 0
