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

- config endpoint http:[compress: true]
- Plug.Static, gzip: Mix.evn == :prod

## Black hole

`du -hc -s node_modules`

## Github pages CDN

<https://ndrean.github.io/phoenix_react_static/>

## GIT TIP

## Chart.js

chartRef = React.createRef()
return (

<div className={classes.graphContainer}>
<canvas id="myChart" ref={this.chartRef}/>
</div>
)

Origin of the request: http://localhost:4000
phx_1 |
phx_1 | This happens when you are attempting a socket connection to
phx_1 | a different host than the one configured in your config/
phx_1 | files. For example, in development the host is configured
phx_1 | to "localhost" but you may be trying to access it from
phx_1 | "127.0.0.1". To fix this issue, you may either:
phx_1 |
phx_1 | 1. update [url: [host: ...]] to your actual host in the
phx_1 | config file for your current environment (recommended)
phx_1 |
phx_1 | 2. pass the :check_origin option when configuring your
phx_1 | endpoint or when configuring the transport in your
phx_1 | UserSocket module, explicitly outlining which origins
phx_1 | are allowed:
phx_1 |
phx_1 | check_origin: ["https://example.com",
phx_1 | "//another.com:888", "//other.com"]
phx_1 |
phx_1 |
phx_1 | 08:36:50.559 [error] Could not check origin for Phoenix.Socket transport.
