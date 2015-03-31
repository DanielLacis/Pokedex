Pokedex.RootView.prototype.reassignToy = function (event) {
  var oldPokemonId = $(event.currentTarget).data('pokemon-id');
  var toyId = $(event.currentTarget).data('toy-id');
  var newPokemonId = event.currentTarget.value;
  var oldPokemon = this.pokes.get(oldPokemonId);
  var toy = oldPokemon.toys().get(toyId);
  toy.set('pokemon_id', newPokemonId);
  toy.save([], {success:
    function() {
      oldPokemon.toys().remove(toy);
      this.renderToysList(oldPokemon.toys());
      this.$toyDetail.empty();
    }.bind(this)
  });
};

Pokedex.RootView.prototype.renderToysList = function (toys) {
  this.$pokeDetail.find(".toys").empty();
  toys.each(function (toy) {
    this.addToyToList(toy);
  }.bind(this));
};
