ExUnit.start

Mix.Task.run "ecto.create", ~w(-r Demo.Repo --quiet)
Mix.Task.run "ecto.migrate", ~w(-r Demo.Repo --quiet)
Ecto.Adapters.SQL.begin_test_transaction(Demo.Repo)

