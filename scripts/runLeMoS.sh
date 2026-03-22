#! /bin/bash

lemosDirectory=$(dirname "$BASH_SOURCE")

modules=()
for arg in "$@"; do
	if [[ $arg =~ ^/.* ]]
	then
		modules+=("$arg")
	else
		modules+=("$PWD/$arg")
	fi
done

#echo "${modules[@]}"
#echo $lemosDirectory

java -jar $lemosDirectory/target/LeMoS*.jar "${modules[@]}"
