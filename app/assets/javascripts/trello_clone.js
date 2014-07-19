/*global TrelloClone */
window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    TrelloClone.Collections.boards = new TrelloClone.Collections.Boards();
    TrelloClone.Collections.cards  = new TrelloClone.Collections.Cards();
    TrelloClone.Collections.lists  = new TrelloClone.Collections.Lists();
    
    var routerOptions = {
      mainAreaSelector: "#main"
    };
    new TrelloClone.Routers.Router(routerOptions);
    Backbone.history.start();
  }
};
