defmodule PhoenixReactWeb.GithubAuthController do
  use PhoenixReactWeb, :controller
  require Logger

  @doc """
  `index/2` handles the callback from GitHub Auth API redirect.
  """
  def index(conn, %{"code" => code}) do
    {:ok, profile} = ElixirAuthGithub.github_auth(code)
    user_token = Phoenix.Token.sign(PhoenixReactWeb.Endpoint, "user token", profile.name)

    conn
    |> put_resp_cookie("user_token", %{user_token: user_token}, sign: true)
    |> put_session(:user_token, user_token)
    |> put_session(:profile, profile)
    |> put_view(PhoenixReactWeb.PageView)
    |> tap(fn conn -> Logger.info(conn) end)
    |> render(:welcome, profile: profile)
  end
end
