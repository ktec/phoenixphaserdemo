defmodule Demo.LobbyChannel do
  use Demo.Web, :channel
  require Logger

  def join("games:lobby", payload, socket) do
    if authorized?(payload) do
      Logger.debug "#{socket.assigns.user_id} joined the Lobby channel"
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def terminate(_reason, socket) do
    Logger.debug "#{socket.assigns.user_id} left the Lobby channel"
    socket
  end

  # broadcast position data to everyone else
  def handle_in("position", payload, socket) do
    broadcast_from socket, "position", payload
    {:noreply, socket}
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (games:lobby).
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end

  # This is invoked every time a notification is being broadcast
  # to the client. The default implementation is just to push it
  # downstream but one could filter or change the event.
  def handle_out(event, payload, socket) do
    push socket, event, payload
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
