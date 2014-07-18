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
    console.log("submit");
    var data = $(event.target).serializeJSON();
    console.log(this);
    var view = this;
    var board = this.collection.create(data, {
      success: function () {
        console.log("success");
        view.collection.add(board);
        
        Backbone.history.navigate("/", { trigger: true });
      }
    });
  }
});