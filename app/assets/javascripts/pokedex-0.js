window.Pokedex = (window.Pokedex || {});
window.Pokedex.Models = {};
window.Pokedex.Collections = {};

Pokedex.Models.Pokemon = Backbone.Model.extend({
  urlRoot: '/pokemon',
  parse: function (jsonResp) {
    if (jsonResp.toys) {
      this.toys().set(jsonResp.toys);
      delete jsonResp.toys;
    }
    return jsonResp;
  },

  toys: function () {
    if (!this._toys) {
      this._toys = new Pokedex.Collections.PokemonToys([], { pokemon: this });
    }
    return this._toys;
  }
}); // WRITE ME

Pokedex.Models.Toy = Backbone.Model.extend({ urlRoot: '/toys'}); // WRITE ME IN PHASE 2

Pokedex.Collections.Pokemon = Backbone.Collection.extend({
  url: '/pokemon',
  model: Pokedex.Models.Pokemon
}); // WRITE ME

Pokedex.Collections.PokemonToys = Backbone.Collection.extend({
  url: '/toys',
  model: Pokedex.Models.Toy
});

window.Pokedex.Test = {
  testShow: function (id) {
    var pokemon = new Pokedex.Models.Pokemon({ id: id });
    pokemon.fetch({
      success: function () {
        console.log(pokemon.toJSON());
      }
    });
  },

  testIndex: function () {
    var pokemon = new Pokedex.Collections.Pokemon();
    pokemon.fetch({
      success: function () {
        console.log(pokemon.toJSON());
      }
    });
  }
};

window.Pokedex.RootView = function ($el) {
  this.$el = $el;
  this.pokes = new Pokedex.Collections.Pokemon();
  this.$pokeList = this.$el.find('.pokemon-list');
  this.$pokeDetail = this.$el.find('.pokemon-detail');
  this.$newPoke = this.$el.find('.new-pokemon');
  this.$toyDetail = this.$el.find('.toy-detail');

  // Click handlers go here.
  this.$pokeList.on('click', 'li', function(event) {
    this.selectPokemonFromList(event);
  }.bind(this));

  this.$newPoke.on('submit', function(event) {
    event.preventDefault();
    this.submitPokemonForm(event);
  }.bind(this));

  this.$pokeDetail.on('click', 'li', function(event) {
    this.selectToyFromList(event);
  }.bind(this));

  this.$toyDetail.on('change', 'select', function(event) {
    this.reassignToy(event);
  }.bind(this));
};

$(function() {
  var $rootEl = $('#pokedex');
	window.Pokedex.rootView = new Pokedex.RootView($rootEl);
  window.Pokedex.rootView.refreshPokemon();
});
