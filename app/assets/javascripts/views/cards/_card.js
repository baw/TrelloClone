/*global TrelloClone, JST */
TrelloClone.Views.CardView = Backbone.View.extend({
  template: JST["cards/_card"],
  
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },
  
  render: function () {
    var renderContent = this.template({
      card: this.model
    });
    
    this.$el.html(renderContent);
    
    return this;
  }
});