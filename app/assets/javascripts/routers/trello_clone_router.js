/*global TrelloClone */
TrelloClone.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "boardsIndex"
  },
  
  initialize: function (options) {
    this.$main = $(options.mainAreaSelector);
  },
  
  boardsIndex: function () {
    TrelloClone.Collections.boards.fetch();
    
    var boardsIndexView = new TrelloClone.Views.BoardsIndex({
      collection: TrelloClone.Collections.boards
    });
    
    this.$main.html(boardsIndexView.render().$el);
  }
});