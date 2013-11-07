// Generated by CoffeeScript 1.6.3
(function() {
  Namespace('Materia.Profile.Activity').Load = (function() {
    var getLogs, init, _offset, _showPlayActivity, _user_id;
    _offset = 0;
    _user_id = null;
    init = function(gateway) {};
    getLogs = function(callback) {
      $('#activity_logs_loading').show();
      return Materia.Coms.Json.send('user_get', null, function(user) {
        if (_user_id != null) {
          _user_id = user.id;
        }
        return Materia.Coms.Json.send('play_activity_get', [_offset], function(data) {
          _showPlayActivity(data);
          if (callback != null) {
            return callback();
          }
        });
      });
    };
    _showPlayActivity = function(data) {
      var $activityLink, play, _i, _len, _ref, _results;
      $('.activity > ul').show();
      $('#activity_logs_loading').hide();
      if (data.activity.length === 0) {
        $('.no_logs').show();
      } else {
        $('#show_more_activity').show();
      }
      if (data.more !== true) {
        $('#show_more_activity').hide();
      }
      _ref = data.activity;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        play = _ref[_i];
        $activityLink = $('#activity_logs_template').clone();
        $activityLink.removeAttr('id').removeClass('activity_logs_template').addClass(play.percent === '100' ? 'perfect_score' : '').addClass(play.is_complete === '1' ? 'complete' : 'incomplete').find('.title').html(play.inst_name).end().find('.date').html(Materia.Set.DateTime.parseObjectToDateString(play.created_at) + ' at ' + Materia.Set.DateTime.fixTime(parseInt(play.created_at, 10) * 1000, DATE)).end().find('.score').html(play.is_complete === '1' ? Math.round(parseFloat(play.percent)) : '--').end().find('.widget').html(play.widget_name).end().find('.status').html(play.is_complete === '1' ? '' : 'No Score Recorded');
        if (play.is_complete === '0') {
          $activityLink.find('.score-link').removeAttr('href');
        } else {
          $activityLink.find('.score-link').attr('href', "" + BASE_URL + "scores/" + play.inst_id + "#play-" + play.play_id);
        }
        $activityLink.appendTo($('.activity > ul'));
        _results.push(_offset++);
      }
      return _results;
    };
    return {
      init: init,
      getLogs: getLogs
    };
  })();

}).call(this);
