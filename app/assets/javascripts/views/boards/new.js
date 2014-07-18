/*global TrelloClone, JST */
TrelloClone.Views.BoardNew = Backbone.View.extend({
  events: {
    "submit form#addBoard": "submitForm"
  },
  template: JST["boards/new"],
  
  render: function () {
    var renderContent = this.template();
    this.$el.html(renderContent);
    
    return this;
  },
  
  submitForm: function (event) {
    event.preventDefault();
    var data = $(event.target).serializeJSON();
    
    var view = this;
    var board = this.collection.create(data, {
      success: function () {
        view.collection.add(board);
        
        Backbone.history.navigate("/", { trigger: true });
      }
    });
  }
});