defmodule PhoenixReactWeb.PageControllerTest do
  use PhoenixReactWeb.ConnCase

  test "GET /", %{conn: conn} do
    conn = get(conn, "/")
    assert html_response(conn, 200) =~ "Welcome to Phoenix and React!"
  end
end
