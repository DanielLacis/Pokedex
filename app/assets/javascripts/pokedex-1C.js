Pokedex.RootView.prototype.createPokemon = function (attrs, callback) {
  var rootView = this;
  var pokemon = new Pokedex.Models.Pokemon(attrs);
  pokemon.save([], { success: function (pokemon, response, options) {
    rootView.pokes.add(pokemon);
    rootView.addPokemonToList(pokemon);
    callback(pokemon);
  }});
};

Pokedex.RootView.prototype.submitPokemonForm = function (event) {
  var pokemonPOJO = $(event.currentTarget).serializeJSON();
  this.createPokemon(pokemonPOJO.pokemon, this.renderPokemonDetail.bind(this));
};
