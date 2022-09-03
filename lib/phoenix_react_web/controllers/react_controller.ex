defmodule PhoenixReactWeb.ReactController do
  use PhoenixReactWeb, :controller

  @react_dir "priv/static/react/"

  def index(conn, _params) do
    # path = Application.app_dir(:phoenix_react) <> @react_dir <> "index_html"
    path = @react_dir <> "index.html"
    file = File.read!(path)
    html(conn, file)
  end
end
