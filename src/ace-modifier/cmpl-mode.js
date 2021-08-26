import * as ace from 'ace-builds';


ace.define("ace/mode/cmpl_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports) {
  
  var oop = require("../lib/oop");
  var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
  
  var CmplHighlightRules = function() {
  
      const sectionMarkers = '(parameters|variables|objectives|constraints|par|var|obj|const):';
      const variables = ('real|integer|binary|string|set');
      const functionParameter = ('max|min|count|format|type|in|len|defset|sum');
      const mathematicalFunctions = ('sqrt|exp|ln|lg|ld|srand|rand|'+
        'sin|cos|tan|acos|asin|atan|sinh|'+
        'cosh|tanh|abs|ceil|floor|round');
      const controlStructure = ('continue|break|default|repeat');

      var keywordMapper = this.createKeywordMapper({
          "support.function": mathematicalFunctions,
          "variable.language": variables,
          "variable.other": functionParameter,
          "keyword.control": controlStructure,
        }, "identifier", true);
        
  
      this.$rules = {
          "start" : [ {
              token : "comment",
              regex : "//.*$"
          },  {
              token : "comment",
              start : "/\\*",
              end : "\\*/"
          }, {
              token : "string",          
              regex : '".*?"'
          }, {
            token: "storage.type",
            regex: "%\\w*",
          }, {
              token : "string",           
              regex : "'.*?'"
          }, {
              token : "string",           
              regex : "`.*?`"
          }, {
              token : "constant.numeric", // float
              regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
          }, {
            token : 'entity.name.tag',
            regex : sectionMarkers,
            caseInsensitive: true,
          }, {
            token : keywordMapper,
            regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b",
          }, /*{
            token : "keyword.operator",
            regex : "\\+|\\-|\\/|\\/\\/|%|<@>|@>|<@|&|\\^|~|<|>|<=|=>|==|!=|<>|="
          }*/]
      };
      this.normalizeRules();
  };
  
  oop.inherits(CmplHighlightRules, TextHighlightRules);
  
  exports.CmplHighlightRules = CmplHighlightRules;
  });
  
  ace.define("ace/mode/cmpl",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/sql_highlight_rules"], function(require, exports) {
  
  var oop = require("../lib/oop");
  var TextMode = require("./text").Mode;
  var CmplHighlightRules = require("./cmpl_highlight_rules").CmplHighlightRules;
  
  var Mode = function() {
      this.HighlightRules = CmplHighlightRules;
      this.$behaviour = this.$defaultBehaviour;
  };
  oop.inherits(Mode, TextMode);
  
  (function() {
  
      this.lineCommentStart = "--";
  
      this.$id = "ace/mode/cmpl";
      this.snippetFileId = "ace/snippets/cmpl";
  }).call(Mode.prototype);
  
  exports.Mode = Mode;
  
});
(function() {
  ace.require(["ace/mode/cmpl"], function(m) {
      if (typeof module == "object" && typeof exports == "object" && module) {
          module.exports = m;
      }
  });
})();
              