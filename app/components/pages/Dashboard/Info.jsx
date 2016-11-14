import React from 'react';
import {Card, CardTitle, CardHeader, CardActions, CardText} from 'material-ui/Card';
import {MuiThemeProvider, getMuiTheme } from 'material-ui/styles';


const div1 = {
  width: '36%',
  height: '25%',
  float: 'right',
  'marginTop': '2%',
  'marginRight': '5%'
}
const docManTheme = getMuiTheme({
  palette: {
    primary1Color: '#9C27B0',
    primary2Color: '#7B1FA2',
    primary3Color: '#B66CF8',
    accent1Color: '#4CAF50',
    accent2Color: '#8BC34A',
    textColor: '#fff',
    secondaryTextColor: '#757575',
    canvasColor: '#9c27b0',
    borderColor: '#BDBDBD'
  }
});
export default class Info extends React.Component{
  render(){
    return (
      <div>
      <MuiThemeProvider >
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
        </MuiThemeProvider>
        <MuiThemeProvider >
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
          </MuiThemeProvider>
      </div>
    )
  }
};
