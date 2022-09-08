# defmodule PhoenixReactWeb.ReactController do
#   use PhoenixReactWeb, :controller
#   require Logger

#   @react_dir "priv/static/react/"

#   @doc """
#   Reads the index.html generated by react and appends the user token for socket.js to collect it
#   """
#   def index(conn, _params) do
#     case Map.has_key?(get_session(conn), "user_token") do
#       true ->
#         %{"user_token" => user_token} = get_session(conn)

#         # (@react_dir <> "index.html")
#         # release mode
#         (Application.app_dir(:phoenix_react) <> "/" <> @react_dir <> "index.html")
#         |> File.read!()
#         |> String.split("\n")
#         |> then(
#           &List.replace_at(
#             &1,
#             length(&1) - 4,
#             "<script>window.userToken = \"#{user_token}\"</script>"
#           )
#         )
#         |> List.to_string()
#         |> then(fn file -> html(conn, file) end)

#       false ->
#         Logger.error("Need to login to access here")

#         conn
#         |> put_flash(:error, "You need to login to access here")
#         |> redirect(to: Routes.page_path(conn, :index))
#         |> halt()
#     end
#   end
# end

# #!! in the release
# # path = Application.app_dir(:phoenix_react) <> @react_dir <> "index_html"
