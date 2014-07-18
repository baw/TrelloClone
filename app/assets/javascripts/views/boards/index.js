/*global TrelloClone, JST */
TrelloClone.Views.BoardsIndex = Backbone.View.extend({
  template: JST["boards/index"],
  
  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
  },
  
  render: function () {
    var renderContent = this.template({
      boards: this.collection.models
    });
    this.$el.html(renderContent);
    
    return this;
  }
});