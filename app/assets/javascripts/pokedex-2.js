Pokedex.RootView.prototype.addToyToList = function (toy) {
  var $ul = this.$pokeDetail.find('ul.toys');
  var $li = $('<li>' + toy.escape('name') + toy.escape('happiness') + toy.escape('price') + '</li>');
  $li.attr('data-toy-id', toy.escape('id'));
  $li.attr('data-pokemon-id', toy.escape('pokemon_id'));
  $ul.append($li);
};

Pokedex.RootView.prototype.renderToyDetail = function (toy) {
  var $toyDiv = $('<div class="detail">');

  for (var k in toy.attributes) {
    if (k === 'image_url') {
      $toyDiv.append($('<img src="' + toy.escape('image_url') + '">'));
    } else {
      $toyDiv.append($('<p>' + k + ': ' + toy.attributes[k] + '</p>'));
    }
  }

  var $select = $('<select class="owner-select-box">');
  $select.attr('data-pokemon-id', toy.escape('pokemon_id'));
  $select.attr('data-toy-id', toy.escape('id'));
  
  this.pokes.each(function(pokemon) {
    var $option = $('<option>');
    $option.attr('value', pokemon.get('id'));
    if(toy.escape('pokemon_id') === pokemon.escape('id')) {
      $option.attr('selected', 'selected');
    }
    $option.html(pokemon.get('name'));
    $select.append($option);
  });

  $toyDiv.append($select);

  this.$toyDetail.html($toyDiv);
};

Pokedex.RootView.prototype.selectToyFromList = function (event) {
  var id = $(event.currentTarget).data('toy-id');
  var pokemonId = $(event.currentTarget).data('pokemon-id');
  console.log('this');
  this.renderToyDetail(this.pokes.get(pokemonId).toys().get(id));
};
