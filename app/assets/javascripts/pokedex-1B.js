Pokedex.RootView.prototype.renderPokemonDetail = function (pokemon) {
  var $detail = $('<div class="detail">');
  pokemon.fetch({
    success: function () {
      this.renderToysList(pokemon.toys());
    }.bind(this)
  });
  for (var k in pokemon.attributes) {
    if (k === 'image_url') {
      $detail.append($('<img src="' + pokemon.escape('image_url') + '">'));
    } else { // TA: RENDER THE k part too
      $detail.append($('<p>' + k + ': ' + pokemon.attributes[k] + '</p>'));
    }
  }
  this.$pokeDetail.html($detail);
  $detail.append($('<ul class="toys"></ul>'));
};

Pokedex.RootView.prototype.selectPokemonFromList = function (event) {
  var id = $(event.currentTarget).data('id');

  this.renderPokemonDetail(this.pokes.get(id));
};
