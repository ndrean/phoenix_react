# PhoenixReact

npm create vite@latest front -- --template react

mix phx.gen.secret

MIX "dotenv": just put secrets in ".env" and it works :)

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

## Test Websocket

In terminal:

```bash
$ wscat -c 'ws://localhost:4000/socket/websocket?vsn=2.0.0&test=1'
The server listen and responds:
info] CONNECTED TO PhoenixReactWeb.UserSocket in 1ms
Transport: :websocket
Serializer: Phoenix.Socket.V2.JSONSerializer
Parameters: %{"test" => "1", "vsn" => "2.0.0"}
```

We add signed token verification with `Phoenix.Token`:

```bash
iex> Phoenix.Token.sign(PhoenixReactWeb.Endpoint, "user token", "Neven Drean")
"sfkmskfsmfksmldfk"
```

With a bad token:

```bash
$ wscat -c 'ws://localhost:4000/socket/websocket?vsn=2.0.0&token=x'
[error] Elixir.PhoenixReactWeb.UserSocket connect error :invalid
[info] REFUSED CONNECTION TO PhoenixReactWeb.UserSocket in 3ms
```

With the good token:

```bash
$ wscat -c 'ws://localhost:4000/socket/websocket?vsn=2.0.0&token=sfkmskfsmfksmldf'
[info] CONNECTED TO PhoenixReactWeb.UserSocket in 657µs
Transport: :websocket
Serializer: Phoenix.Socket.V2.JSONSerializer
Parameters: %{"token" => "sfkmskfsmfksmldf"
> ["1","1","counter:lobby","phx_join",{}]
< ["1","1","counter:lobby","phx_reply",{"response":{},"status":"ok"}]
< [null,null,"counter:lobby","shout",{"count":12}]
```

- Alternative with JWT is [Joken](https://github.com/joken-elixir/joken)

## Compression:

- config endpoint http:[comporess: true]
- Plug.Static, gzip: Mix.evn == :prod

## Black hole

`du -hc -s node_modules`

## Github pages CDN

<https://ndrean.github.io/phoenix_react_static/>

<https://github.com/gitname/react-gh-pages>
