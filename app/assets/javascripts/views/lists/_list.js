/*global TrelloClone, JST */
TrelloClone.Views.ListView = Backbone.View.extend({
  template: JST["lists/_list"],
  
  initialize: function (options) {
    this.boardId = options.boardId;
    
    this.listenTo(this.model, "sync", this.render);
  },
  
  render: function () {
    var renderContent = this.template({
      list: this.model,
      boardId: this.boardId
    });
    this.$el.html(renderContent);
    
    return this;
  }
});