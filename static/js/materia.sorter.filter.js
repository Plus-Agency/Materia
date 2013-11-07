// Generated by CoffeeScript 1.6.3
(function() {
  Namespace('Materia.Sorter').Filter = (function() {
    var appendWidgets, filter, sort, textSearch, widgetSearch;
    filter = function(programSort) {
      var contains, defaultProgram, notcontains, programName;
      contains = '.widget';
      notcontains = '';
      programName = programSort.val();
      defaultProgram = programSort.children("option:first-child").val();
      $('.features dt input[type="checkbox"]:checked').each(function(event) {
        contains += ":.widget:contains('" + $(this).val() + "')";
        return notcontains += ".widget:not(:contains('" + $(this).val() + "')), ";
      });
      $('.features .supported-data input[type="checkbox"]:checked').each(function(event) {
        contains += ":.widget:contains('" + $(this).val() + "')";
        return notcontains += ".widget:not(:contains('" + $(this).val() + "')), ";
      });
      if (programName !== defaultProgram) {
        contains += ":.widget:contains(" + programName + ")";
        notcontains += ".widget:not(:contains(" + programName + ")), ";
      }
      $(notcontains).fadeTo('fast', 0.2);
      return $(contains).fadeTo('fast', 1);
    };
    sort = function(widgets, sortType, callback) {
      var sortedData;
      if (widgets == null) {
        widgets = $('.widgets .widget');
      }
      sortedData = widgets.sorted({
        'by': function(v) {
          return $(v).find('h1').text().toLowerCase();
        }
      });
      return appendWidgets(sortedData);
    };
    appendWidgets = function(sortedData) {
      var $widgets, data, _i, _len;
      $widgets = $('.widgets');
      for (_i = 0, _len = sortedData.length; _i < _len; _i++) {
        data = sortedData[_i];
        $widgets.append(data);
      }
      return $('.widget').mouseenter(function() {
        var card, pos;
        pos = $(this).index('.widget');
        card = Materia.Widget.Catalog.showInfocard(pos);
        if (card != null) {
          return card.mouseleave(function() {
            return Materia.Widget.Catalog.removeInfocard();
          });
        }
      });
    };
    widgetSearch = function(searchValue, section) {
      var found, pattern;
      found = false;
      pattern = new RegExp(searchValue, "i");
      $(section).find(".searchable").each(function() {
        var matches, repl;
        repl = /<span class=[\'|\"]{1}highlighted[\'|\"]>([^<]*)<\/span>/i;
        if ($(this).html().match(repl) !== null) {
          $(this).html($(this).html().replace(repl, '$1'));
        }
        matches = $(this).html().match(pattern);
        if ($(this).html().match(pattern) !== null && searchValue !== '') {
          $(this).html($(this).html().replace(pattern, "<span class='highlighted'>" + matches + "</span>"));
          return found = true;
        } else if (searchValue === '') {
          return found = true;
        }
      });
      return found;
    };
    textSearch = function(searchValue) {
      return $(".widgets").children('section').each(function() {
        var found;
        found = testSearch(searchValue, $(this));
        if (found === false) {
          return $(this).fadeTo(1, .2);
        } else {
          return $(this).fadeTo(1, 1);
        }
      });
    };
    return {
      filter: filter,
      sort: sort
    };
  })();

}).call(this);
