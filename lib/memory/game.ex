defmodule Memory.Game do
  def new do 
    %{
      guess1: 17,
      guess2: 17,
      cards: shuffle_cards(),
      score: 0
    }
  end

  def shuffle_cards do
    l = "A A B B C C D D E E F F G G H H"
    l = String.split(l, " ")
    letters = Enum.shuffle(l)
    make_deck(letters, [])
  end

  def make_deck([], cards) do
    cards
  end

  def make_deck(letters, cards) do
    card = %{val: hd(letters), flipped: false, matched: false, display: "?"}
    cards = cards ++ [card]
    make_deck(tl(letters), cards)
  end

  def flipcard(game, card) do
    score = game.score
    score = score + 1
    cards = game.cards
    c = Enum.at(cards, card)
    c = Map.replace!(c, :flipped, true)
    c = Map.replace!(c, :display, c.val)
    cards = List.replace_at(cards, card, c)
    game = Map.replace!(game, :cards, cards)
    game =  Map.replace!(game, :score, score)
    if game.guess1 == 17 do
      Map.replace!(game, :guess1, card)
    else
      Map.replace!(game, :guess2, card)
    end
  end

  def guess(game, c1, c2) do
    cards = game.cards
    card1 = Enum.at(cards, c1)
    card2 = Enum.at(cards, c2)
    if card1.val == card2.val do
      card1 = Map.replace!(card1, :matched, true)
      card2 = Map.replace!(card2, :matched, true)
    else 
      card1 = Map.replace!(card1, :flipped, false)
      card1 = Map.replace!(card1, :display, "?") 
      card2 = Map.replace!(card2, :flipped, false)
      card2 = Map.replace!(card2, :display, "?")
    end
    cards = List.replace_at(cards, c1, card1)
    cards = List.replace_at(cards, c2, card2)
    Map.replace!(game, :cards, cards)
    |> Map.replace!(:guess1, 17)
    |> Map.replace!(:guess2, 17)
  end
end
