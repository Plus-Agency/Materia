// Generated by CoffeeScript 1.6.3
(function() {
  Namespace('Materia').CreatorCore = (function() {
    var alert, cancelSave, disableResizeInterval, escapeScriptTags, getMediaUrl, save, setHeight, showMediaImporter, start, _baseurl, _creatorClass, _initExistingWidget, _initNewWidget, _lastHeight, _onPostMessage, _resizeInterval, _sendPostMessage, _tellCreator;
    _baseurl = null;
    _creatorClass = null;
    _resizeInterval = null;
    _lastHeight = -1;
    _onPostMessage = function(e) {
      var msg;
      msg = JSON.parse(e.data);
      switch (msg.type) {
        case 'initNewWidget':
          return _initNewWidget(msg.data[0], msg.data[1]);
        case 'initExistingWidget':
          return _initExistingWidget(msg.data[0], msg.data[1], msg.data[2], msg.data[3], msg.data[4]);
        case 'onRequestSave':
          return _tellCreator('onSaveClicked', [msg.data[0]]);
        case 'onSaveComplete':
          return _tellCreator('onSaveComplete', [msg.data[0], msg.data[1], msg.data[2], msg.data[3]]);
        case 'onMediaImportComplete':
          return _tellCreator('onMediaImportComplete', [msg.data[0]]);
        case 'onQuestionImportComplete':
          return _tellCreator('onQuestionImportComplete', [msg.data[0]]);
        default:
          return alert('Error, unknown message sent to creator core: ' + msg.type);
      }
    };
    _tellCreator = function(method, args) {
      if (typeof _creatorClass[method] === 'function') {
        return _creatorClass[method].apply(void 0, args);
      } else {
        return alert('Error, missing creator ' + method + ' called.');
      }
    };
    _sendPostMessage = function(type, data) {
      return parent.postMessage(JSON.stringify({
        type: type,
        data: data
      }), '*');
    };
    _initNewWidget = function(widget, baseUrl) {
      _baseurl = baseUrl;
      return _tellCreator('initNewWidget', [widget]);
    };
    _initExistingWidget = function(widget, title, qset, qsetVersion, baseUrl) {
      _baseurl = baseUrl;
      return _tellCreator('initExistingWidget', [widget, title, qset, qsetVersion]);
    };
    start = function(creatorClass) {
      if (typeof addEventListener !== "undefined" && addEventListener !== null) {
        addEventListener('message', _onPostMessage, false);
      } else if (typeof attachEvent !== "undefined" && attachEvent !== null) {
        attachEvent('onmessage', _onPostMessage);
      }
      if ((creatorClass.manualResize != null) && creatorClass.manualResize === false) {
        _resizeInterval = setInterval(function() {
          return setHeight();
        }, 300);
      }
      _creatorClass = creatorClass;
      return _sendPostMessage('start', null);
    };
    alert = function(title, msg, type) {
      if (type == null) {
        type = 1;
      }
      return _sendPostMessage('alert', {
        title: title,
        msg: msg,
        type: type
      });
    };
    getMediaUrl = function(mediaId) {
      return _baseurl + 'media/' + mediaId;
    };
    showMediaImporter = function() {
      return _sendPostMessage('showMediaImporter', null);
    };
    save = function(title, qset, version) {
      if (version == null) {
        version = '1';
      }
      return _sendPostMessage('save', [title, qset, version]);
    };
    cancelSave = function(msg) {
      return _sendPostMessage('cancelSave', [msg]);
    };
    setHeight = function(h) {
      if (!h) {
        h = $('html').height();
      }
      if (h !== _lastHeight) {
        _sendPostMessage('setHeight', [h]);
        return _lastHeight = h;
      }
    };
    escapeScriptTags = function(text) {
      return text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    };
    disableResizeInterval = function() {
      return clearInterval(_resizeInterval);
    };
    return {
      start: start,
      alert: alert,
      getMediaUrl: getMediaUrl,
      showMediaImporter: showMediaImporter,
      cancelSave: cancelSave,
      save: save,
      disableResizeInterval: disableResizeInterval,
      setHeight: setHeight,
      escapeScriptTags: escapeScriptTags
    };
  })();

}).call(this);
