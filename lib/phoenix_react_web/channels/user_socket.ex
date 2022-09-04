defmodule PhoenixReactWeb.UserSocket do
  use Phoenix.Socket
  require Logger

  # A Socket handler
  #
  # It's possible to control the websocket connection and
  # assign values that can be accessed by your channel topics.

  ## Channels

  channel "counter:lobby", PhoenixReactWeb.CounterChannel

  # Socket params are passed from the client and can
  # be used to verify and authenticate a user. After
  # verification, you can put default assigns into
  # the socket that will be set for all channels, ie
  #
  #     {:ok, assign(socket, :user_id, verified_user_id)}
  #
  # To deny connection, return `:error`.
  #
  # See `Phoenix.Token` documentation for examples in
  # performing token verification on connect.
  # def connect(_, socket, _) do
  #   {:ok, socket}
  # end

  @impl true
  def connect(%{"token" => token} = _params, socket, _info) do
    case verify(socket, token) do
      {:ok, user_name} ->
        socket = assign(socket, user_name: user_name, user_token: token)
        {:ok, socket}

      {:error, err} ->
        Logger.error("#{__MODULE__}: error: #{inspect(err)}")
        :error
    end
  end

  @impl true
  def connect(_, _socket, _) do
    Logger.error("#{__MODULE__}: missing params")
    :error
  end

  defp verify(_socket, token) do
    Phoenix.Token.verify(PhoenixReactWeb.Endpoint, "user token", token, max_age: 86_400)
  end

  # Socket id's are topics that allow you to identify all sockets for a given user:
  #
  #     def id(socket), do: "user_socket:#{socket.assigns.user_id}"
  #
  # Would allow you to broadcast a "disconnect" event and terminate
  # all active sockets and channels for a given user:
  #
  #     Elixir.PhoenixReactWeb.Endpoint.broadcast("user_socket:#{user.id}", "disconnect", %{})
  #
  # Returning `nil` makes this socket anonymous.
  @impl true
  def id(_socket), do: nil
end
