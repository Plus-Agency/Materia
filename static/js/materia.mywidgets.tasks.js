// Generated by CoffeeScript 1.6.3
(function() {
  Namespace('Materia.MyWidgets').Tasks = (function() {
    var copyWidget, deleteWidget, init;
    init = function(gateway) {};
    copyWidget = function(inst_id, newName) {
      return Materia.Coms.Json.send('widget_instance_copy', [inst_id, newName], function(inst_id) {
        return Materia.Widget.addWidget(inst_id);
      });
    };
    deleteWidget = function(inst_id) {
      return Materia.Coms.Json.send('widget_instance_delete', [inst_id], function(results) {
        if (results) {
          return Materia.Widget.removeWidget(inst_id);
        }
      });
    };
    return {
      init: init,
      copyWidget: copyWidget,
      deleteWidget: deleteWidget
    };
  })();

}).call(this);
