defmodule MemoryWeb.GamesChannel do
  use MemoryWeb, :channel

  alias Memory.Game
  #Based on Nat Tucks's notes
  def join("games:" <> name, payload, socket) do
    if authorized?(payload) do
      game = Memory.Agent.get(name) || Game.new()
      socket = socket
      |> assign(:game, game)
      |> assign(:name, name)
      {:ok, %{"join" => name, "game" => game}, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("guess", %{"card" => card}, socket) do
    game = Game.flipcard(socket.assigns[:game], card)
    Memory.Agent.put(socket.assigns[:name], game)
    socket = assign(socket, :game, game)
    {:reply, {:ok, %{"game" => game}}, socket}
  end

  def handle_in("guess", %{"c1" => c1, "c2" => c2}, socket) do
    game = Game.guess(socket.assigns[:game], c1, c2)
    Memory.Agent.put(socket.assigns[:name], game)
    socket = assign(socket, :game, game)
    {:reply, {:ok, %{"game" => game}}, socket}
  end

  def handle_in("reset", _, socket) do
    game = Game.new()
    Memory.Agent.put(socket.assigns[:name], game)
    socket = assign(socket, :game, game)
    {:reply, {:ok, %{"game" => game}}, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
