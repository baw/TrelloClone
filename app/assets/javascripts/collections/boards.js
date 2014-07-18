/*global TrelloClone */
TrelloClone.Collections.Boards = Backbone.Collection.extend({
  model: TrelloClone.Models.Board,
  url: "api/boards",
  
  getOrFetch: function (id) {
    var board = this.get(id);
    if (board) {
      board.fetch();
    } else {
      board = new this.model({ "id": id });
      board.fetch();
    }
    
    return board;
  }
});