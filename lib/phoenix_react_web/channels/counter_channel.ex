defmodule PhoenixReactWeb.CounterChannel do
  use PhoenixReactWeb, :channel
  require Logger
  alias PhoenixReact.Counter

  @topic "counter:lobby"
  @event "shout"

  @impl true
  def join(@topic, _p, socket) do
    send(self(), :after_join)

    {:ok, socket}
  end

  @impl true
  def handle_info(:after_join, socket) do
    broadcast!(socket, @event, %{count: Counter.current()})
    {:noreply, socket}
  end

  @impl true
  def handle_in("count", %{"count" => _count} = _payload, socket) do
    send(PhoenixReact.Counter, {@event, 1})
    {:noreply, socket}
  end

  def handle_in(@event, %{count: count}, socket) do
    broadcast!(socket, @event, %{count: count})
    {:noreply, socket}
  end
end
