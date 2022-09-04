defmodule PhoenixReactWeb.PageController do
  use PhoenixReactWeb, :controller

  @doc """
  Renders the Github login
  """
  def index(conn, _params) do
    oauth_github_url = ElixirAuthGithub.login_url(%{scopes: ["user:email"]})

    case get_session(conn) do
      %{"profile" => profile} ->
        conn
        |> put_view(PhoenixReactWeb.PageView)
        |> render(:welcome, profile: profile)

      _ ->
        render(conn, "index.html", oauth_github_url: oauth_github_url)
    end
  end
end
