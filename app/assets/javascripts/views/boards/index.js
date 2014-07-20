/*global TrelloClone, JST */
TrelloClone.Views.BoardsIndex = Backbone.CompositeView.extend({
  template: JST["boards/index"],
  
  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
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