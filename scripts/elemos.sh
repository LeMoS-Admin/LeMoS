#! /bin/bash
# Last modified: wss 2024-11-12
# Created:       wss 2024-11-12
#
# elemos = execute lemos
set -u

# Program package of Lemos
LEMOS_JAR=LeMoSystemV1/target/Lemos-1.0-SNAPSHOT.jar
# Configure the entry point to the program
START_CLASS=LeMoS

# Define the needed JAR-files
MAVEN_REPO=/home/dieter/.m2/repository
JARS=( 
com/fasterxml/jackson/datatype/jackson-datatype-jsr310/2.13.0/jackson-datatype-jsr310-2.13.0.jar
com/fasterxml/jackson/core/jackson-core/2.18.1/jackson-core-2.18.1.jar
com/fasterxml/jackson/dataformat/jackson-dataformat-xml/2.18.1/jackson-dataformat-xml-2.18.1.jar
com/fasterxml/jackson/dataformat/jackson-dataformat-yaml/2.18.1/jackson-dataformat-yaml-2.18.1.jar
com/fasterxml/jackson/core/jackson-databind/2.18.1/jackson-databind-2.18.1.jar
com/fasterxml/jackson/core/jackson-annotations/2.18.1/jackson-annotations-2.18.1.jar
org/yaml/snakeyaml/2.3/snakeyaml-2.3.jar
org/codehaus/woodstox/stax2-api/4.2.2/stax2-api-4.2.2.jar
)
# Build classpath
CPVAL=$LEMOS_JAR
for jarfile in "${JARS[@]}"; do
  CPVAL=$CPVAL:$MAVEN_REPO/$jarfile
done

# Preconfigured samples
# The filenames must be specified including the extensions
SAMPLES=(
samples/1-Theorem_von_Little_V1.json
samples/1-Theorem_von_Little_V1.xml
samples/1-Theorem_von_Little_V1.yaml
)
#params="${SAMPLES[0]} ${SAMPLES[1]}"
params=""
#-------------------------------------------------------------------------------
usage () {
  echo "Usage: $0 [samples ...]"
  echo "  samples ... : a list of numbers corrsponding to samples."
  local nb=0
  for sample in "${SAMPLES[@]}"; do
    echo "    $nb: $sample"
    nb=$(expr $nb + 1)
  done 
  echo "Description: Reads the samples defined in the sample list and prints the transformed content."
  echo "Sample Call: $0 1 0 # process the samples 1 and 0."
  exit 1
}

#-------------------------------------------------------------------------------
parseargs(){
  for nb in "$@"; do
    if [ "$nb" -ge 0 -a "$nb" -lt "${#SAMPLES[@]}" ]; then
      params="$params ${SAMPLES[$nb]}"
    else
      echo "==>Fehler: \$?=$?. Found parameter '$nb'"
      usage
    fi
  done
}
#-------------------------------------------------------------------------------
# Main
#-------------------------------------------------------------------------------
parseargs "$@"
if [ -z "$params" ]; then
  echo "==> ERROR: no valid parameters found. Found '$@'."
  usage
fi
# Build command to be executed
cmd="java -cp ${CPVAL} ${START_CLASS} ${params}"
echo "==> cmd='$cmd'."
echo "==> Weiter mit RETURN"
read
# Execute the command
$cmd
