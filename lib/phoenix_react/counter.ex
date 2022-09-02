defmodule PhoenixReact.Counter do
  @moduledoc """
  Store and increment the counter to broadcast
  """
  use GenServer
  # alias PhoenixReact.PubSub

  def start_link(_opts) do
    GenServer.start_link(__MODULE__, 0, name: __MODULE__)
    # PhoenixReactWeb.Endpoint.subscribe("counter:lobby")
  end

  def current() do
    GenServer.call(__MODULE__, :current)
  end

  @impl true
  def init(state) do
    {:ok, state}
  end

  @impl true
  def handle_call(:current, _from, state) do
    {:reply, state, state}
  end

  # this response: to send msg from GS to a channel, use the channel topic
  # https://elixirforum.com/t/connecting-to-channel-from-within-application/37133
  @impl true
  def handle_info({:shout, 1}, state) do
    state = state + 1
    PhoenixReactWeb.Endpoint.broadcast_from(self(), "counter:lobby", "shout", %{count: state})
    {:noreply, state}
  end
end
