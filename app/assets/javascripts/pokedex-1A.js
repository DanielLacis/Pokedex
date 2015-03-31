Pokedex.RootView.prototype.addPokemonToList = function (pokemon) {
  var $newElement = $('<li class="poke-list-item">' + pokemon.escape('name') + ', ' +
      pokemon.escape('poke_type') + '</li>');
  $newElement.attr('data-id', pokemon.escape('id'));
  this.$pokeList.append($newElement);
};

Pokedex.RootView.prototype.refreshPokemon = function () {
  var rootView = this;
  this.pokes.fetch({
    success: function() {
      rootView.pokes.each(function(el) {
        rootView.addPokemonToList(el);
      });
    }
  });
};
