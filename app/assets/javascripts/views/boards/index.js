/*global TrelloClone, JST */
TrelloClone.Views.BoardsIndex = Backbone.CompositeView.extend({
  template: JST["boards/index"],
  events: {
    "click .deleteBoard": "deleteBoard"
  },
  
  initialize: function () {
    this.listenTo(this.collection, "sync remove", this.render);
  },
  
  deleteBoard: function (event) {
    console.log("delete");
    var $button = $(event.target);
    var boardId = $button.data("boardid");
    console.log(boardId);
    var board = this.collection.getOrFetch(boardId);
    board.destroy();
  },
  
  render: function () {
    var renderContent = this.template({
      boards: this.collection.models
    });
    this.$el.html(renderContent);
    
    this.renderAddBoardView();
    
    return this;
  },
  
  renderAddBoardView: function () {
    var addBoardView = new TrelloClone.Views.BoardNew({
      collection: TrelloClone.Collections.boards
    });
    
    this.addSubview(".newBoard", addBoardView);
  }
});