defmodule PhoenixReactWeb.WebAppController do
  use PhoenixReactWeb, :controller

  def index(conn, _params) do
    IO.inspect(Application.app_dir(:phoenix_react), label: "app_dir :")
    IO.inspect(Path.expand("priv/static"), label: "expand")

    conn
    |> send_resp(
      200,
      Application.app_dir(:phoenix_react, "priv/static/webapp/index.html")
      |> File.read!()
    )
  end

  # Serve the index.html file as-is and let React
  # take care of the rendering and client-side rounting.
  #
  # Potential improvement: Cache the file contents here
  # in an ETS table so we don't read from the disk for every request.
end
