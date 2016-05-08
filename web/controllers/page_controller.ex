defmodule Demo.PageController do
  use Demo.Web, :controller
  alias Demo.Endpoint

  def session_uuid(conn) do
    case get_session(conn, :player_uuid) do
      nil ->
        uuid = UUID.uuid4
        put_session(conn, :player_uuid, uuid)
        uuid
      existent_uuid -> existent_uuid
    end
  end

  def token(conn) do
    Phoenix.Token.sign(Endpoint, "token", session_uuid(conn))
  end

  def index(conn, _params) do
    render conn, "index.html", %{token: token(conn)}
  end
end
