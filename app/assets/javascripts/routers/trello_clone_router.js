/*global TrelloClone */
TrelloClone.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "boardsIndex",
    "board/new": "boardNew",
    "board/:id": "boardShow"
  },
  
  initialize: function (options) {
    this.$main = $(options.mainAreaSelector);
  },
  
  boardsIndex: function () {
    TrelloClone.Collections.boards.fetch();
    
    var boardsIndexView = new TrelloClone.Views.BoardsIndex({
      collection: TrelloClone.Collections.boards
    });
    
    this._swapViews(boardsIndexView);
  },
  
  boardNew: function () {
    var boardNewView = new TrelloClone.Views.BoardNew({
      collection: TrelloClone.Collections.boards
    });
    
    this._swapViews(boardNewView);
  },
  
  boardShow: function (id) {
    var board = TrelloClone.Collections.boards.getOrFetch(id);
    
    var boardShowView = new TrelloClone.Views.BoardShow({
      model: board
    });
    
    this._swapViews(boardShowView);
  },
  
  _swapViews: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$main.html(view.render().$el);
  }
});