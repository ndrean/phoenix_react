defmodule Mix.Tasks.React do
  require Logger
  use Mix.Task

  @spa_path "./priv/static/react"

  @shortdoc "Compile and bundle React frontend for production"

  @impl Mix.Task
  def run(_) do
    System.cmd("npm", ["run", "build"], cd: "./react")
    System.cmd("rm", ["-rf", @spa_path])
    System.cmd("cp", ["-R", "./react/dist", @spa_path])
    Logger.info(":ok, React")
  end
end
