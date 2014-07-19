/*global TrelloClone */
TrelloClone.Models.Board = Backbone.Model.extend({
  urlRoot: "api/boards",
  
  parse: function (jsonResponse) {
    if (jsonResponse.lists) {
      this.lists().set(jsonResponse.lists, { parse: true });
      delete jsonResponse.lists;
    }
    
    return jsonResponse;
  },
  
  lists: function () {
    if (this._lists === undefined) {
      this._lists = new TrelloClone.Collections.Lists();
    }
    
    return this._lists;
  }
});