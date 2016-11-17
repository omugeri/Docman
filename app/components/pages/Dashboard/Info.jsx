import React from 'react';
import {Card, CardTitle, CardHeader, CardActions, CardText} from 'material-ui/Card';
import {MuiThemeProvider } from 'material-ui/styles';


const div1 = {
  width: '36%',
  height: '25%',
  float: 'right',
  'marginTop': '2%',
  'marginRight': '5%'
}

export default class Info extends React.Component{
  render(){
    return (
      <div>
      <Card style={div1}>
        <CardHeader
          title="Total Users"
          subtitle="Subtitle"
        />
        <CardText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
      </Card>
        <Card style={div1}>
          <CardHeader
            title="Total Documents"
            subtitle="Both Private n Public"
          />
          <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
        </Card>
      </div>
    )
  }
};
