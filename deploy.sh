#!/bin/bash
export PORT=5100
export MIX_ENV=prod

mkdir -p ~/www
mkdir -p ~/old
mkdir -p ~/www/memory
NOW=`date +%s`
if [ -d ~/www/memory ]; then
	echo mv ~/www/memory ~/old/$NOW
	mv ~/www/memory ~/old/$NOW
fi

mkdir -p ~/www/memory

cd (~/www/memory && tar xzvf ~/memory.tar.gz)


