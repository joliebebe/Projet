import  React, {Component} from 'react';
import { Button, View, Text, Image } from 'react-native';

export default class ButtonUi extends Component <any, any> {
    render() {
      return (
        <View>
            <Button
          title={this.props.label}
          onPress={() => (console.log('pressed button'))}
        />
        {/* <Text >{this.props.title}</Text>
            <Image source={this.props.url} style = {{width: 300, height : 250}}/> */}
        </View>
      );
    }
  }