/*global TrelloClone, JST */
TrelloClone.Views.CardNew = Backbone.View.extend({
  tagName: "form",
  template: JST["cards/new"],
  events: {
    "click .addCard": "addCard"
  },
  
  initialize: function (options) {
    this.list = options.list;
  },
  
  addCard: function (event) {
    event.preventDefault();
    
    var data = this.$el.serializeJSON();
    
    this.list.cards().create({
      "title": data.card.title,
      "list_id": this.list.escape("id"),
      "ord": this.list.cards().length
    });
    
    this.$(".cardTitle").val("");
  },
  
  render: function () {
    var renderContent = this.template();
    
    this.$el.html(renderContent);
    
    return this;
  }
});