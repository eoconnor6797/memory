#!/bin/bash

export PORT=5100
export MIX_ENV=prod

mix deps.get
(cd assets && npm install)
(cd assets && ./node_modules/brunch/bin/brunch b -p)
mix phx.digest
mix release --env=prod

