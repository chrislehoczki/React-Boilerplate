
var React = require('react');

var Profile = require("./Profile.js")

var ContentContainer = React.createClass({

    getInitialState: function() {
    return { 
    };
    },

    render: function() {

      var h1Style = {marginTop: "150px"}

       return (
       	  <div className="content-container">
          
          
            	{this.props.tab === "Tab1" ?
                          <h1 style={h1Style}> Tab1 </h1>
                          :null}
              {this.props.tab === "Tab2" ?
                          
                          <h1 style={h1Style}> Tab2 </h1>
                          :null}
              {this.props.tab === "Tab3" ?
                          
                          <h1 style={h1Style}> Tab3 </h1>
                          :null}
              {this.props.tab === "Tab4" ?
                          
                          <Profile />
                          :null}
  			</div>
  );
     }  




});
module.exports=ContentContainer