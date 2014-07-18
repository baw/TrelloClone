/*global TrelloClone */
TrelloClone.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "boardsIndex",
    "board/:id": "boardShow"
  },
  
  initialize: function (options) {
    this.$main = $(options.mainAreaSelector);
  },
  
  boardsIndex: function () {
    console.log("index");
    TrelloClone.Collections.boards.fetch();
    
    var boardsIndexView = new TrelloClone.Views.BoardsIndex({
      collection: TrelloClone.Collections.boards
    });
    
    this.$main.html(boardsIndexView.render().$el);
  },
  
  boardShow: function (id) {
    console.log("show: " + id);
    var board = TrelloClone.Collections.boards.getOrFetch(id);
    
    var boardShowView = new TrelloClone.Views.BoardShow({
      model: board
    });
    
    this.$main.html(boardShowView.render().$el);
  }
});