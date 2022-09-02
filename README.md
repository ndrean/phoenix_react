# PhoenixReact

npm create vite@latest frontend -- --template react

mix phx.gen.secret

export SECRET_KEY_BASE=B41pUFgfTJeEUpt+6TwSkbrxlAb9uibgIemaYbm1Oq+XdZ3Q96LcaW9sarbGfMhy
export DATABASE_URL=ecto://postgres:postgres@localhost/phoenix_react_dev
PHX_HOST=4000
PHX_SERVER=true

mix deps.get --only prod
MIX_ENV=prod mix compile
mix webapp
MIX_ENV=prod mix assets.deploy
MIX_ENV=prod mix release

PHX_SERVER=true PHX_PORT=4000 PHX_HOST=localhost \_build/prod/rel/phoenix_react/bin/phoenix_react start

## Compression:

- config endpoint http:[comporess: true]
- Plug.Static, gzip: Mix.evn == :prod

## Black hole

`du -hc -s node_modules`
