(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//var appUrl = window.location.origin;

var ajaxFunctions = {
   ready: function ready(fn) {
      if (typeof fn !== 'function') {
         return;
      }

      if (document.readyState === 'complete') {
         return fn();
      }

      document.addEventListener('DOMContentLoaded', fn, false);
   },
   ajaxRequest: function ajaxRequest(method, url, callback) {
      var xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function () {
         if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            callback(xmlhttp.response);
         }
      };

      xmlhttp.open(method, url, true);
      xmlhttp.send();
   }
};

module.exports = ajaxFunctions;

},{}],2:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var Profile = require("./Profile.js");

var ContentContainer = React.createClass({
            displayName: "ContentContainer",

            getInitialState: function getInitialState() {
                        return {};
            },

            render: function render() {

                        var h1Style = { marginTop: "150px" };

                        return React.createElement(
                                    "div",
                                    { className: "content-container" },
                                    this.props.tab === "Tab1" ? React.createElement(
                                                "h1",
                                                { style: h1Style },
                                                " Tab1 "
                                    ) : null,
                                    this.props.tab === "Tab2" ? React.createElement(
                                                "h1",
                                                { style: h1Style },
                                                " Tab2 "
                                    ) : null,
                                    this.props.tab === "Tab3" ? React.createElement(
                                                "h1",
                                                { style: h1Style },
                                                " Tab3 "
                                    ) : null,
                                    this.props.tab === "Tab4" ? React.createElement(Profile, null) : null
                        );
            }

});
module.exports = ContentContainer;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Profile.js":6}],3:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var HeaderButtons = require("./HeaderButtons.js");
var ContentContainer = require("./ContentContainer.js");

var Header = React.createClass({
  displayName: "Header",

  getInitialState: function getInitialState() {
    return {
      tab: "Tab1"
    };
  },

  changeTab: function changeTab(tabName) {
    if (tabName !== "Sign Out") {
      this.setState({ tab: tabName });
    }
  },

  render: function render() {

    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { id: "rct-header", className: "header" },
        React.createElement(
          "div",
          { id: "title-bundle" },
          React.createElement("img", { id: "rct-title-img", className: "title-img", src: "public/img/leaflet.png" }),
          React.createElement(
            "p",
            { id: "rct-title", className: "title" },
            " ",
            this.props.title,
            " "
          )
        ),
        React.createElement(
          "div",
          { id: "button-bundle" },
          React.createElement(HeaderButtons, { changeTab: this.changeTab, links: ["Sign Out", "Tab4", "Tab3", "Tab2", "Tab1"] })
        )
      ),
      React.createElement(ContentContainer, { tab: this.state.tab })
    );
  }
});

module.exports = Header;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./ContentContainer.js":2,"./HeaderButtons.js":5}],4:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var HeaderButton = React.createClass({
    displayName: "HeaderButton",

    getInitialState: function getInitialState() {
        return {};
    },

    changeTab: function changeTab() {

        this.props.changeTab(this.props.name);
    },

    render: function render() {

        return React.createElement(
            "button",
            { onClick: this.changeTab, id: "rct-btn", className: "btn-header  btn btn-primary" },
            " ",
            React.createElement(
                "a",
                { href: this.props.href },
                this.props.name,
                " "
            )
        );
    }
});
module.exports = HeaderButton;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var HeaderButton = require("./HeaderButton.js");

var HeaderButtons = React.createClass({
  displayName: "HeaderButtons",

  getInitialState: function getInitialState() {
    return {};
  },

  changeTab: function changeTab(tabName) {
    this.props.changeTab(tabName);
  },

  render: function render() {

    var component = this;
    return React.createElement(
      "div",
      null,
      this.props.links.map(function (link) {
        var href = "#";
        if (link === "Sign Out") {
          href = "/logout";
        }

        return React.createElement(HeaderButton, { changeTab: component.changeTab, href: href, key: link, name: link });
      })
    );
  }
});

module.exports = HeaderButtons;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./HeaderButton.js":4}],6:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ajaxFunctions = require("../common/ajax-functions.js");
var Profile = React.createClass({
  displayName: "Profile",

  getInitialState: function getInitialState() {
    return {
      city: "",
      state: "",
      name: "",
      message: ""
    };
  },

  componentDidMount: function componentDidMount() {
    this.getDetails();
  },

  getDetails: function getDetails() {
    console.log("this should get user details");
    /*
    var component = this;
        var apiUrl = "/api/userdata"
      ajaxFunctions.ajaxRequest('GET', apiUrl, function(data) {
        console.log(data)
        data = JSON.parse(data)
        component.setState({name: data.name, city: data.city, country: data.country}, function() {
          console.log(component.state)
        })
      })
      */
  },

  addNewPass: function addNewPass(e) {

    this.setState({ newPass: e.target.value }, console.log(this.state.newPass));
  },

  addNewPassConfirmed: function addNewPassConfirmed(e) {

    this.setState({ newPassConfirmed: e.target.value }, function () {

      if (this.state.newPassConfirmed !== this.state.newPass) {
        this.setState({ message: "New passwords do not match." });
      } else {
        this.setState({ message: "" });
      }
    });
  },

  sendUserData: function sendUserData(e) {

    e.preventDefault();
    var component = this;
    $.ajax({
      contentType: 'application/json',
      data: JSON.stringify({ "city": this.state.newCountry, "country": this.state.newCity, "fullName": this.state.newName }),
      dataType: 'json',
      success: function success(data) {
        component.getDetails();
      },
      error: function error() {
        console.log("It failed");
      },
      processData: false,
      type: 'POST',
      url: '/api/userinfo'
    });
  },

  setNewCountry: function setNewCountry(e) {
    this.setState({ newCountry: e.target.value });
  },

  setNewCity: function setNewCity(e) {
    this.setState({ newCity: e.target.value });
  },

  setNewName: function setNewName(e) {
    this.setState({ newName: e.target.value });
  },

  render: function render() {

    var welcomeText = "Welcome " + this.state.name;

    if (this.state.city && this.state.country) {
      welcomeText += " from " + this.state.city + ", " + this.state.country;
    }

    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "user-details" },
        React.createElement(
          "h4",
          null,
          " ",
          welcomeText,
          " "
        ),
        React.createElement("br", null),
        React.createElement(
          "h4",
          null,
          " Add Location Details "
        ),
        React.createElement(
          "form",
          { className: "form", action: "/api/userinfo", method: "POST" },
          React.createElement(
            "div",
            { className: "form form-group" },
            React.createElement(
              "label",
              null,
              " Name "
            ),
            React.createElement("input", { onChange: this.setNewName, className: "form-control", type: "text", placeholder: "Add your full name", name: "name" })
          ),
          React.createElement(
            "div",
            { className: "form form-group" },
            React.createElement(
              "label",
              null,
              " Country "
            ),
            React.createElement("input", { onChange: this.setNewCountry, className: "form-control", type: "text", placeholder: "Add your country", name: "city" })
          ),
          React.createElement(
            "div",
            { className: "form form-group" },
            React.createElement(
              "label",
              null,
              " City "
            ),
            React.createElement("input", { onChange: this.setNewCity, className: "form-control", type: "text", placeholder: "Add your city", name: "country" })
          ),
          React.createElement(
            "button",
            { onClick: this.sendUserData, className: "btn btn-primary", type: "submit" },
            " Submit "
          )
        )
      ),
      React.createElement(
        "div",
        { className: "user-details" },
        React.createElement(
          "h4",
          null,
          " Change Password "
        ),
        React.createElement(
          "form",
          { className: "form", action: "/changepass", method: "POST" },
          React.createElement(
            "div",
            { className: "alert alert-warning" },
            " ",
            this.state.message,
            " "
          ),
          React.createElement(
            "div",
            { className: "form form-group" },
            React.createElement(
              "label",
              null,
              " Current Password "
            ),
            React.createElement("input", { className: "form-control", type: "password", name: "password" })
          ),
          React.createElement(
            "div",
            { className: "form form-group" },
            React.createElement(
              "label",
              null,
              " New Password "
            ),
            React.createElement("input", { className: "form-control", type: "password", name: "newpass", onChange: this.addNewPass })
          ),
          React.createElement(
            "div",
            { className: "form form-group" },
            React.createElement(
              "label",
              null,
              " Confirm New Password "
            ),
            React.createElement("input", { className: "form-control", type: "password", name: "newpassconfirmed", onChange: this.addNewPassConfirmed })
          ),
          React.createElement(
            "button",
            { className: "btn btn-primary", type: "submit" },
            " Submit "
          )
        )
      )
    );
  }

});
module.exports = Profile;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../common/ajax-functions.js":1}],7:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var Header = require("./Header.js");
var ReactDOM = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);

//GET PROPS
//var props = JSON.parse(document.getElementById("props").innerHTML)

//RENDER CONTAINER
ReactDOM.render(React.createElement(Header /*books={props}*/, { title: "Title" }), document.getElementById("react-holder"));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Header.js":3}]},{},[7]);
