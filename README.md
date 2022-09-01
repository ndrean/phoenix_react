# PhoenixReact

npm create vite@latest frontend -- --template react

SECRET_KEY_BASE
DATABASE_URL=
PHX_HOST=4000
PHX_SERVER=true

mix deps.get --only prod
MIX_ENV=prod mix compile
mix webapp
MIX_ENV=prod mix assets.deploy
MIX_ENV=prod mix release

PHX_SERVER=true PHX_PORT=4000 PHX_HOST=localhost \_build/prod/rel/phoenix_react/bin/phoenix_react start
