// Generated by CoffeeScript 1.6.3
(function() {
  Namespace('Materia.MyWidgets').Statistics = (function() {
    var clearGraphs, createGraph, createTable, searchScores, tableOrder, _curTableOrder, _plots;
    _curTableOrder = 'desc';
    _plots = [];
    createGraph = function(elementId, data) {
      var i, jqOptions, plot, series, seriesData, _i, _len;
      if (_plots[elementId] == null) {
        jqOptions = {
          animate: true,
          animateReplot: true,
          series: [
            {
              renderer: $.jqplot.BarRenderer,
              shadow: false,
              rendererOptions: {
                animation: {
                  speed: 500
                }
              }
            }
          ],
          title: {
            text: 'Score Distribution',
            fontFamily: 'Lato, Lucida Grande, Arial, sans'
          },
          axesDefaults: {
            tickRenderer: $.jqplot.CanvasAxisTickRenderer,
            tickOptions: {
              angle: 0,
              fontSize: '8pt'
            }
          },
          axes: {
            xaxis: {
              renderer: $.jqplot.CategoryAxisRenderer,
              ticks: ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '80-89', '90-100']
            }
          },
          highlighter: {
            show: true,
            showMarker: false,
            sizeAdjust: 7.5,
            tooltipAxes: 'y',
            formatString: '%s scores'
          },
          cursor: {
            show: false
          },
          grid: {
            background: '#FFFFFF',
            shadow: false
          },
          seriesColors: ['#1e91e1']
        };
        plot = $.jqplot(elementId, [data], jqOptions);
        return _plots[elementId] = plot;
      } else {
        plot = _plots[elementId];
        seriesData = [];
        for (i = _i = 0, _len = data.length; _i < _len; i = ++_i) {
          series = data[i];
          seriesData.push([i + 1, series]);
        }
        plot.series[0].data = seriesData;
        return plot.replot({
          resetAxes: true
        });
      }
    };
    clearGraphs = function() {
      return _plots = [];
    };
    createTable = function($tableContainer, log, sort) {
      var $table, $userTable, $userTableBox, gameId, tableBody, userCount, users, usersFound;
      if (sort == null) {
        sort = 'dec';
      }
      _curTableOrder = sort;
      gameId = $('.gameSelected').attr('id');
      $table = $tableContainer.find('.scoreListTable');
      $userTable = $tableContainer.find('.scoreTable');
      $userTableBox = $tableContainer.find('.scoreTableContainer');
      $table.html('');
      $userTableBox.css('opacity', 0);
      $userTable.html('');
      tableBody = $('<tbody>');
      $table.append(tableBody);
      if (log) {
        users = [];
        userCount = 0;
        usersFound = {};
        $.each(log, function(i, playLog) {
          var name, uid;
          uid = playLog.user_id;
          name = playLog.last + ", " + playLog.first;
          if (usersFound[uid] == null) {
            usersFound[uid] = users.length;
            users.push({
              uid: uid,
              name: name,
              scores: {}
            });
          }
          return users[usersFound[uid]].scores[playLog.time.toString()] = {
            date: new Date(playLog.time * 1000).toDateString(),
            percent: playLog.perc,
            elapsed: playLog.elapsed,
            complete: playLog.done
          };
        });
        switch (sort) {
          case 'desc':
            users.sort(function(a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              }
            });
            break;
          case 'asc':
            users.sort(function(a, b) {
              if (a.name < b.name) {
                return 1;
              }
              if (a.name > b.name) {
                return -1;
              }
            });
        }
        return $.each(users, function(index, user) {
          var $tr;
          $tr = $("<tr id='" + index + "'></tr>");
          $tr.append($("<td class='listName'>" + user.name + "</td>"));
          tableBody.append($tr);
          return $tr.click(function() {
            var $userTableBody;
            $('.rowSelected').removeClass('rowSelected');
            $(this).addClass('rowSelected');
            $userTableBox.stop();
            $userTableBox.css({
              opacity: 0,
              right: '0px'
            });
            $userTable.html('');
            $userTableBody = $('<tbody>');
            $userTable.append($userTableBody);
            $.each(user.scores, function(j, score) {
              var $userDateTd, $userElapsedTd, $userPctTd, $userTr, scoreMins, scoreSecs;
              scoreMins = (score.elapsed - score.elapsed % 60) / 60;
              scoreSecs = score.elapsed % 60;
              $userTr = $('<tr>');
              $userDateTd = $('<td>').html(score.date.substring(0, 10));
              $userPctTd = score.complete === '1' ? $('<td>').html("" + (parseFloat(score.percent).toFixed(2).replace('.00', '')) + "%") : $('<td>').html("---");
              $userElapsedTd = scoreMins !== 0 ? $('<td>').html("" + scoreMins + "m " + scoreSecs + "s") : $('<td>').html("" + scoreSecs + "s");
              $userTr.append($userDateTd);
              $userTr.append($userPctTd);
              $userTr.append($userElapsedTd.addClass('elapsed'));
              return $userTableBody.append($userTr);
            });
            return $userTableBox.css({
              opacity: 1.00,
              right: '12px'
            });
          });
        });
      }
    };
    tableOrder = function() {
      return _curTableOrder;
    };
    searchScores = function(search) {
      var $hits, $names, hits, i, match, misses, term, terms, _i, _j, _len, _ref;
      $names = $('.listName');
      search = $.trim(search.toLowerCase().replace(/,/g, ' '));
      hits = [];
      misses = [];
      terms = search.split(' ');
      for (i = _i = 0, _ref = $names.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        match = false;
        for (_j = 0, _len = terms.length; _j < _len; _j++) {
          term = terms[_j];
          if ($names.eq(i).html().toLowerCase().indexOf(term) > -1) {
            match = true;
          } else {
            match = false;
            break;
          }
        }
        if (match) {
          hits.push($names.eq(i)[0]);
        } else {
          misses.push($names.eq(i)[0]);
        }
      }
      $hits = $(hits);
      Materia.TextFilter.renderSearch($hits, $(misses), 'nozebra');
      Materia.TextFilter.clearHighlights($('.listName'));
      return $hits.each(function() {
        return Materia.TextFilter.highlight(search, $(this));
      });
    };
    return {
      createGraph: createGraph,
      clearGraphs: clearGraphs,
      createTable: createTable,
      tableOrder: tableOrder,
      searchScores: searchScores
    };
  })();

}).call(this);
