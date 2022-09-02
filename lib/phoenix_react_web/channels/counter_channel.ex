defmodule PhoenixReactWeb.CounterChannel do
  use PhoenixReactWeb, :channel
  require Logger
  alias PhoenixReact.Counter

  @impl true
  def join("counter:lobby", _p, socket) do
    send(self(), :after_join)

    {:ok, socket}
  end

  @impl true
  def handle_info(:after_join, socket) do
    broadcast!(socket, "shout", %{count: Counter.current()})
    {:noreply, socket}
  end

  @impl true
  def handle_in("count", %{"count" => _count} = _payload, socket) do
    send(PhoenixReact.Counter, {:shout, 1})
    {:noreply, socket}
  end

  def handle_in("shout", %{count: count}, socket) do
    broadcast!(socket, "shout", %{count: count})
    {:noreply, socket}
  end
end
