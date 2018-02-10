defmodule Memory.Game do
  def new do
    %{
      prevTile: "*",
      letters: ["A10","B10","C10","D10","E10","F10","G10","H10","A20","B20","C20","D20","E20","F20","G20","H20"],
      display: ["","","","","","","","","","","","","","","",""],
      clicks: 0,
      board: "boardOn",
    }
  end

  def client_view(game) do
    game
  end

  def updateDisplay(game, t1) do
    t1 = String.to_integer(t1)
    if !(game.prevTile==t1) do
      t2=Enum.at(game.letters,t1)
      display2 = List.replace_at(game.display, t1, String.at(t2,0))
      c1 = game.clicks+1
      Map.merge(game,
      %{
        clicks: c1,
        display: display2,
        board: "boardOff"
        })
      else
        game
      end
    end

    def inclicks(game, t1) do
      t1 = String.to_integer(t1)
      letters2 = game.letters
      curr = Enum.at(letters2,t1)
      if !(game.prevTile==t1) do
        cond do
          game.prevTile=="*" -> Map.merge(game,%{ prevTile: t1, board: "boardOn" })
          String.at(Enum.at(letters2,game.prevTile),0)==String.at(curr,0) ->
            pt = game.prevTile
            prev = Enum.at(letters2,pt)
            letters2 = List.replace_at(letters2,pt,String.replace_suffix(prev,"0","1"))
            letters2 = List.replace_at(letters2,t1,String.replace_suffix(curr,"0","1"))
            display2 = List.replace_at(game.display, t1, "")
            display2 = List.replace_at(display2, pt, "")
            :timer.sleep(1000)
            Map.merge(game,
            %{
              prevTile: "*",
              letters: letters2,
              display: display2,
              board: "boardOn"
              })
          true ->
            pt = game.prevTile
            display2 = List.replace_at(game.display, t1, "")
            display2 = List.replace_at(display2, pt, "")
            :timer.sleep(1000)
            Map.merge(game,
            %{
              prevTile: "*",
              display: display2,
              board: "boardOn"
              })
        end
      else
        game
      end
    end

    def reset(game) do
      new_letters = Enum.shuffle(game.letters)
      Map.merge(game, %{
        letters: new_letters,
        })
      end
end
