defmodule Demo.PlayChannel do
  use Demo.Web, :channel
  require Logger

  def join("games:play", payload, socket) do
    if authorized?(payload) do
      Logger.debug "#{socket.assigns.user_id} joined the Play channel"
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def terminate(_reason, socket) do
    Logger.debug "#{socket.assigns.user_id} left the Play channel"
    socket
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (lobby).
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end

  # broadcast position data to everyone else
  def handle_in("position", payload, socket) do
    broadcast_from socket, "position", payload
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
