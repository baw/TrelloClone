/*global TrelloClone */
TrelloClone.Collections.Cards = Backbone.Collection.extend({
  model: TrelloClone.Models.Card,
  url: "api/cards",
  
  comparator: function (model) {
    console.log(model.escape("ord"));
    return model.escape("ord");
  }
});