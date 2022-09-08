defmodule PhoenixReactWeb.ReactController do
  use PhoenixReactWeb, :controller
  require Logger

  @react_dir "./priv/static/react/"
  @title "    <title>React</title>\n"

  defp read_line(:eof, file, _token), do: file

  defp read_line(@title, file, token) do
    file <> @title <> token
  end

  defp read_line(curr, file, _token), do: file <> curr

  @doc """
  Reads the index.html generated by react and appends the user token for socket.js to collect it
  """
  def index(conn, _params) do
    case Map.has_key?(get_session(conn), "user_token") do
      true ->
        %{"user_token" => user_token} = get_session(conn)

        token = "<script>window.userToken = \"#{user_token}\"</script>\n"

        # (@react_dir <> "index.html")
        (Application.app_dir(:phoenix_react) <> "/" <> @react_dir <> "index.html")
        |> File.stream!([], :line)
        |> Enum.reduce("", fn l, file ->
          read_line(l, file, token)
        end)
        |> then(fn file -> html(conn, file) end)

      false ->
        Logger.error("Need to login to access here")
        conn |> redirect(to: Routes.page_path(conn, :index)) |> halt()
    end
  end
end