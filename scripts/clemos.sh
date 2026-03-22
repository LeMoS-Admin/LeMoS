#! /bin/bash
# Last modified: wss 2024-11-12
# Created:       wss 2024-11-12
#
# clemos = compile (and package) lemos
set -u

#-------------------------------------------------------------------------------
#-------------------------------------------------------------------------------
# Main
#-------------------------------------------------------------------------------
# change to source folder
cmd="cd LeMoSystemV1"
echo "==> cmd='$cmd'."
$cmd
# Build command to be executed
MVN_BIN="/home/dieter/netbeans-23/netbeans/java/maven/bin"
MVN_CMD="mvn"
cmd="$MVN_BIN/$MVN_CMD clean compile package"
echo "==> Going to build project  ..."
echo "==> cmd='$cmd'."
echo "==> Weiter mit RETURN"
read
# Execute the command
$cmd
