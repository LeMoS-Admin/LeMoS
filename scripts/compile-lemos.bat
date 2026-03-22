@echo off
echo Compiling LeMoS

:: Arbeitsverzeichnis auf den Speicherort des Skripts wechseln
set "oldDir=%cd%"
cd /d "%~dp0"

:: Bereinigen der alten LeMoS-Versionen
for %%f in (lemos*.jar) do (
	del "%%f"
)

:: Kompilieren des LeMoS
call mvnw.cmd clean package

:: Abbruch bei erfolgloser Kompilierung
if %errorlevel% neq 0 (
	cd /d "%oldDir%"
	exit /b 1
)

:: Ermitteln des Namens der jar-Datei (via for-Schleife)
for %%f in (target\lemos*.jar) do (
	:: Pfad entfernen, um Namen der Datei inkl. Endung zu erhalten
	set "lemos=%%~nxf"
)
echo Generated LeMoS-Version: %lemos%

:: Verschieben der jar-Datei in den Oberordner (praktischer für spätere Auslieferung des fertigen LeMoS)
move target\%lemos% %lemos% >nul

cd /d %oldDir%
exit /b 0
