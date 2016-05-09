defmodule Demo.Randomise do
  @on_load :reseed_generator

  def reseed_generator do
    {_, sec, micro} = :os.timestamp()
    hash = :erlang.phash2({self(), make_ref()})
    :random.seed(hash, sec, micro)
    :ok
  end

  def random(number) do
    :random.uniform(number)
  end
end
