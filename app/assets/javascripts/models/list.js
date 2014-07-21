/*global TrelloClone */
TrelloClone.Models.List = Backbone.Model.extend({
  urlRoot: "api/lists",
  
  parse: function (jsonResponse) {
    if (jsonResponse.cards) {
      this.cards().set(jsonResponse.cards, { parse: true });
      delete jsonResponse.cards;
    }
    
    return jsonResponse;
  },
  
  cards: function () {
    if (this._cards === undefined) {
      this._cards = new TrelloClone.Collections.Cards();
    }
    
    return this._cards;
  }
});