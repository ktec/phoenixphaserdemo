defmodule Demo.Game do
  use GenServer
  alias Demo.{Endpoint, Player, PlayerSupervisor}
  require Logger

  def join(user_id) do
    PlayerSupervisor.start(user_id)
    {:ok, %{id: user_id, players: PlayerSupervisor.get_all}}
  end

  def leave(user_id) do
    Endpoint.broadcast!("games:play", "player:leave", %{id: user_id})
    PlayerSupervisor.stop(user_id)
  end

  def set_position(user_id, position) do
    pid = PlayerSupervisor.get_pid(user_id)
    if (pid) do
      Player.set_position(pid, position)
    end
  end

  def collision(user_id, enemy_id) do
    pid1 = PlayerSupervisor.get_pid(user_id)
    pid2 = PlayerSupervisor.get_pid(enemy_id)
    player1 = Player.inspect(pid1)
    player2 = Player.inspect(pid2)

    case loser(player1, player2) do
      %{id: id} -> leave(id)
      nil -> nil
    end
  end

  defp loser(%{shape: "triangle"} = id1, %{shape: "square"} = id2), do: id1
  defp loser(%{shape: "triangle"} = id1, %{shape: "circle"} = id2), do: id2
  defp loser(%{shape: "square"} = id1, %{shape: "circle"} = id2), do: id1
  defp loser(%{shape: "square"} = id1, %{shape: "triangle"} = id2), do: id2
  defp loser(%{shape: "circle"} = id1, %{shape: "triangle"} = id2), do: id1
  defp loser(%{shape: "circle"} = id1, %{shape: "square"} = id2), do: id2
  defp loser(%{shape: a} = id1, %{shape: a} = id2), do: nil
end
