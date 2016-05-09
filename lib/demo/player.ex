defmodule Demo.Player do
  use GenServer
  alias Demo.{Endpoint, Randomise}

  defmodule State do
    defstruct id: nil,
              position: %{x: 0, y: 0},
              type: "square"
  end

  ### PUBLIC API ###

  def inspect(pid) do
    GenServer.call(pid, :inspect)
  end

  def set_position(process, position) do
    GenServer.call(process, {:set_position, position})
  end

  def start_link([id]) do
    state = %State{id: id,
                   position: random_position()}
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

  def handle_call({:set_position, position}, from, state) do
    Endpoint.broadcast_from!(from, "games:play", "player:update", state)
    {:reply, :ok, %{state | position: position}}
  end

  defp random_position(width \\ 800, height \\ 600) do
    %{x: Randomise.random(width),
      y: Randomise.random(height)}
  end
end
