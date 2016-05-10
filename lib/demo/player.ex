defmodule Demo.Player do
  use GenServer
  alias Demo.{Endpoint, Randomise}
  require Logger

  defmodule State do
    defstruct id: nil,
              position: %{x: 0, y: 0},
              shape: ""
  end

  ### PUBLIC API ###

  def inspect(pid) do
    GenServer.call(pid, :inspect)
  end

  def set_position(process, position) do
    GenServer.call(process, {:set_position, position})
  end

  def start_link([id, shape_id]) do
    state = %State{id: id,
                   position: random_position(),
                   shape: shape(shape_id)}
    GenServer.start_link(__MODULE__, state, [name: {:global, id}])
  end

  ### GENSERVER CALLBACKS ###

  def init(state) do
    Endpoint.broadcast!("games:play", "player:join", state)
    {:ok, state}
  end

  def handle_call(:inspect, _from, state) do
    {:reply, state, state}
  end

  def handle_call({:set_position, position}, _from, state) do
    # Endpoint.broadcast_from!(from, "games:play", "position", position)
    Endpoint.broadcast!("games:play", "position", position)
    {:reply, :ok, %{state | position: position}}
  end

  defp random_position(width \\ 800, height \\ 350) do
    Randomise.reseed_generator
    %{x: Randomise.random(width),
      y: Randomise.random(height)}
  end

  defp shape(1), do: "triangle"
  defp shape(2), do: "square"
  defp shape(3), do: "circle"

end
