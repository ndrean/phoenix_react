defmodule PhoenixReactWeb.ReactController do
  use PhoenixReactWeb, :controller

  @react_dir "priv/static/react/"

  def index(conn, _params) do
    %{"user_token" => user_token, "name" => name} = get_session(conn)

    #!! in the release
    # path = Application.app_dir(:phoenix_react) <> @react_dir <> "index_html"

    (@react_dir <> "index.html")
    |> File.read!()
    |> String.split("\n")
    |> then(
      &List.replace_at(
        &1,
        length(&1) - 4,
        "<script>window.userToken = \"#{user_token}\";</script>"
      )
    )
    |> List.to_string()
    |> then(fn file -> html(conn, file) end)
  end
end
