"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n\n    width:100%;\n    height:40px;\n    ul ,&{\n      display:inline-block;\n      list-style-type: none;\n      text-align:center;\n    }\n    ul li {\n      display: inline-block;\n      line-height:24px;\n      margin-left:6px;\n      line-height:20px;\n    }\n    ul li:first-child{\n      margin-left:0px;\n    }\n    ul li a{\n      border-radius:6px;\n      background:rgb(250 249 247 / 88%);\n      font-weight:bold;\n      padding:10px 15px;\n      color:#00000096;\n      font-family:Roboto;\n\n    }\n    ul li a i{\n      margin-right: 12px;\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var BookingNav = _styledComponents["default"].div(_templateObject());

var _default = BookingNav;
exports["default"] = _default;