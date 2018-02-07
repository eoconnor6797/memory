#!/bin/bash
export PORT=5100
export MIX_ENV=prod

mkdir -p ~/www
mkdir -p ~/old

NOW=`date +%s`
if [ -d ~/www/memory ]; then
	echo mv ~/www/memory ~/old/$NOW
	mv ~/www/memory ~/old/$NOW
fi

(cd ~/www/memory && tar xzvf memory.tar.gz)


