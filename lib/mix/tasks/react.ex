defmodule Mix.Tasks.React do
  use Mix.Task

  @spa_path "priv/static/react"

  @shortdoc "Compile and bundle React frontend for production"

  @impl Mix.Task
  def run(_) do
    System.cmd("npm", ["run", "predeploy"], cd: "./react")
    System.cmd("rm", ["-rf", @spa_path])
    System.cmd("cp", ["-R", "./react/dist", @spa_path])
    Mix.shell().info(":ok React")
  end
end
