var React = require('react');
var HeaderButtons = require("./HeaderButtons.js")
var ContentContainer = require("./ContentContainer.js")

var Header = React.createClass({

    getInitialState: function() {
    return { 
      tab: "Tab1"
    };
    },



    changeTab: function(tabName) {
      if (tabName !== "Sign Out") {
          this.setState({tab: tabName});
        }
        
      
    },

    render: function() {

       return (
          <div>
            <div id="rct-header" className="header">
              <div id="title-bundle">
                <img id="rct-title-img" className="title-img" src="public/img/leaflet.png"/>
                <p id="rct-title" className="title"> {this.props.title} </p>
              </div>
              <div id="button-bundle">
                <HeaderButtons changeTab={this.changeTab} links={["Sign Out", "Tab4", "Tab3", "Tab2", "Tab1"]}/>
              </div>
            </div>
            <ContentContainer tab={this.state.tab} />
          </div>
        );
  
  
      }
});

module.exports=Header