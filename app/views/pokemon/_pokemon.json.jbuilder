json.extract! pokemon, :image_url, :attack, :defense, :name, :poke_type, :moves, :id
if show_toys
  json.toys pokemon.toys do |toy|
    json.partial! '/toys/toy', toy: toy
  end
end
