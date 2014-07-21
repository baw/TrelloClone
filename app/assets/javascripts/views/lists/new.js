/*global TrelloClone, JST */
TrelloClone.Views.ListNew = Backbone.View.extend({
  events: {
    "click .addList": "addList"
  },
  
  template: JST["lists/new"],
  
  addList: function (events) {
    events.preventDefault();
    var data = this.$("form").serializeJSON();
    var board = this.model;
    
    board.lists().create({
      "title": data.list.title,
      "board_id": board.escape("id"),
      "ord": board.lists().models.length
    });
    
    this.$(".listTitle").val("");
  },
  
  render: function () {
    var renderContent = this.template();
    
    this.$el.html(renderContent);
    
    return this;
  }
});