/*global TrelloClone */
TrelloClone.Collections.Lists = Backbone.Collection.extend({
  model: TrelloClone.Models.List,
  url: "api/lists",
  comparator: function (model) {
    return model.escape("ord");
  }
});