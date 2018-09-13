import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

//here i am requiring the image from pic folder in put it into array.. 
const newsArticles = [
  {id: "1", uri: require('././pix/pic1.jpg')},
  {id: "2", uri: require('././pix/pic2.jpg')},
  {id: "3", uri: require('././pix/pic3.png')},
  {id: "4", uri: require('././pix/pic4.jpg')},
  {id: "5", uri: require('././pix/pic5.jpg')},
]

class News extends React.Component {
//here i am animating and also keeping track which index is active
  constructor(props) {
    super(props)

    this.position = new Animated.ValueXY()
    this.swipedCardPosition = new Animated.ValueXY({ x: 0, y: -SCREEN_HEIGHT})
    this.state = {
      currentIndex: 0
    }
  }

  componentWillMount() {

    this.PanResponder =PanResponder.create({

      onStartShouldSetPanResponder: (e, gestureState) => true,
      onPanResponderMove: (evt,gestureState) => {

        if(gestureState.dy > 0 && (this.state.currentIndex > 0)) {
          this.swipedCardPosition.setValue({
            x: 0, y: -SCREEN_HEIGHT + gestureState.dy
          })
        }
        else {

        this.position.setValue({ y: gestureState.dy 
        })

        }
      },

      onPanResponderRelease:(evt,gestureState) => {

        if (this.state.currentIndex > 0 && gestureState.dy > 50 && gestureState.vy > 0.7)
        {
          Animated.timing(this.swipedCardPosition,{
            toValue: ({x: 0, y: 0}),
            duration: 400
          }).start(() => {

            this.setState({currentIndex:this.state.currentIndex - 1 })
            this.swipedCardPosition.setValue({ x: 0, y: -SCREEN_HEIGHT })

          })
        }
        else if (-gestureState.dy > 50 && -gestureState.vy > 0.7){

          Animated.timing(this.position, {
            toValue:({x: 0, y:-SCREEN_HEIGHT}),
            duration:400
          }).start(() => {

            this.setState({currentIndex: this.state.currentIndex + 1 })
            this.position.setValue({ x: 0, y: 0 })

          })
        }
        else {
          Animated.parallel([
            Animated.spring(this.position, {
              toValue: ({ x: 0, y: 0})
            }),
            Animated.spring(this.swipedCardPosition, {
              toValue: ({ x: 0, y: -SCREEN_HEIGHT })
            })
          ]).start()
      }
    }
    })


  }
//this rendering the array
// on the first view its wrapped with animated
//todo i need to put Animated.View into his own components 
  rendernewsArticles = () => {
    return newsArticles.map((item, i)  => {

      if( i == this.state.currentIndex -1 )
      {
        return ( 

        <Animated.View key={item.id} style={this.swipedCardPosition.getLayout()}
        {...this.PanResponder.panHandlers}
        
        >
        <View style={{ flex: 1, position: 'absolute', height: 
          SCREEN_HEIGHT, width: SCREEN_WIDTH, backgroundColor: 'white' }}>
  
          <View style={{ flex: 2, backgroundColor: 'black' }}>
          <Image source={newsArticles[i].uri}
          style={{ flex: 1, height: null, width: null, resizeMode: 'center' }}
          ></Image>
          </View>
            <View style={{flex: 3, padding: 20 }}>
            <Text>
            Exercitation irure fugiat consequat quis ex amet irure ut id. 
            Quis deserunt proident id duis in officia reprehenderit officia laboris. 
            Cupidatat esse incididunt ut deserunt sunt laboris qui cupidatat voluptate sit. 
            Exercitation exercitation eiusmod Lorem eu esse occaecat quis.
            Exercitation irure fugiat consequat quis ex amet irure ut id. 
            Quis deserunt proident id duis in officia reprehenderit officia laboris. 
            Cupidatat esse incididunt ut deserunt sunt laboris qui cupidatat voluptate sit. 
            Exercitation exercitation eiusmod Lorem eu esse occaecat quis.
            Exercitation irure fugiat consequat quis ex amet irure ut.
  
            Exercitation irure fugiat consequat quis ex amet irure ut id. 
            Quis deserunt proident id duis in officia reprehenderit officia laboris. 
            Cupidatat esse incididunt ut deserunt sunt laboris qui cupidatat voluptate sit. 
            Exercitation exercitation eiusmod Lorem eu esse occaecat quis.
            Exercitation irure fugiat consequat quis ex amet irure ut id. 
            Quis deserunt proident id duis in officia reprehenderit officia laboris. 
            Cupidatat esse incididunt ut deserunt sunt laboris qui cupidatat voluptate sit. 
            Exercitation exercitation eiusmod Lorem eu esse occaecat quis.
            Exercitation irure fugiat consequat quis ex amet irure ut.
  
            Exercitation irure fugiat consequat quis ex amet irure ut id. 
            Quis deserunt proident id duis in officia reprehenderit officia laboris. 
            Cupidatat esse incididunt ut deserunt sunt laboris qui cupidatat voluptate sit. 
            Exercitation exercitation eiusmod Lorem eu esse occaecat quis.
            Exercitation irure fugiat consequat quis ex amet irure ut id. 
            Quis deserunt proident id duis in officia reprehenderit officia laboris. 
            Cupidatat esse incididunt ut deserunt sunt laboris qui cupidatat voluptate sit. 
            Exercitation exercitation eiusmod Lorem eu esse occaecat quis.
            Exercitation irure fugiat consequat quis ex amet irure ut.
  
            Exercitation irure fugiat consequat quis ex amet irure ut id. 
            Quis deserunt proident id duis in officia reprehenderit officia laboris. 
            Cupidatat esse incididunt ut deserunt sunt laboris qui cupidatat voluptate sit. 
            Exercitation exercitation eiusmod Lorem eu esse occaecat quis.
            Exercitation irure fugiat consequat quis ex amet irure ut id. 
            Quis deserunt proident id duis in officia reprehenderit officia laboris. 
            Cupidatat esse incididunt ut deserunt sunt laboris qui cupidatat voluptate sit. 
            Exercitation exercitation eiusmod Lorem eu esse occaecat quis.
            Exercitation irure fugiat consequat quis ex amet irure ut.
            </Text>
          </View>
          </View>
        </Animated.View> 
        )
      }

      else if (i < this.state.currentIndex ) {
        return null
      }
      if (i== this.state.currentIndex)
      {

    return (
      <Animated.View key={item.id} style={this.position.getLayout()}
      {...this.PanResponder.panHandlers}
      
      >
      <View style={{ flex: 1, position: 'absolute', height: 
        SCREEN_HEIGHT, width: SCREEN_WIDTH, backgroundColor: 'white' }}>

        <View style={{ flex: 2, backgroundColor: 'black' }}>
        <Image source={newsArticles[i].uri}
        style={{ flex: 1, height: null, width: null, resizeMode: 'center' }}
        ></Image>
        </View>
          <View style={{flex: 3, padding: 20 }}>
          <Text>
          Exercitation irure fugiat consequat quis ex amet irure ut id. 
          Quis deserunt proident id duis in officia reprehenderit officia laboris. 
          Cupidatat esse incididunt ut deserunt sunt laboris qui cupidatat voluptate sit. 
          Exercitation exercitation eiusmod Lorem eu esse occaecat quis.
          Exercitation irure fugiat consequat quis ex amet irure ut id. 
          Quis deserunt proident id duis in officia reprehenderit officia laboris. 
          Cupidatat esse incididunt ut deserunt sunt laboris qui cupidatat voluptate sit. 
          Exercitation exercitation eiusmod Lorem eu esse occaecat quis.
          Exercitation irure fugiat consequat quis ex amet irure ut.

          Exercitation irure fugiat consequat quis ex amet irure ut id. 
          Quis deserunt proident id duis in officia reprehenderit officia laboris. 
          Cupidatat esse incididunt ut deserunt sunt laboris qui cupidatat voluptate sit. 
          Exercitation exercitation eiusmod Lorem eu esse occaecat quis.
          Exercitation irure fugiat consequat quis ex amet irure ut id. 
          Quis deserunt proident id duis in officia reprehenderit officia laboris. 
          Cupidatat esse incididunt ut deserunt sunt laboris qui cupidatat voluptate sit. 
          Exercitation exercitation eiusmod Lorem eu esse occaecat quis.
          Exercitation irure fugiat consequat quis ex amet irure ut.

          Exercitation irure fugiat consequat quis ex amet irure ut id. 
          Quis deserunt proident id duis in officia reprehenderit officia laboris. 
          Cupidatat esse incididunt ut deserunt sunt laboris qui cupidatat voluptate sit. 
          Exercitation exercitation eiusmod Lorem eu esse occaecat quis.
          Exercitation irure fugiat consequat quis ex amet irure ut id. 
          Quis deserunt proident id duis in officia reprehenderit officia laboris. 
          Cupidatat esse incididunt ut deserunt sunt laboris qui cupidatat voluptate sit. 
          Exercitation exercitation eiusmod Lorem eu esse occaecat quis.
          Exercitation irure fugiat consequat quis ex amet irure ut.

          Exercitation irure fugiat consequat quis ex amet irure ut id. 
          Quis deserunt proident id duis in officia reprehenderit officia laboris. 
          Cupidatat esse incididunt ut deserunt sunt laboris qui cupidatat voluptate sit. 
          Exercitation exercitation eiusmod Lorem eu esse occaecat quis.
          Exercitation irure fugiat consequat quis ex amet irure ut id. 
          Quis deserunt proident id duis in officia reprehenderit officia laboris. 
          Cupidatat esse incididunt ut deserunt sunt laboris qui cupidatat voluptate sit. 
          Exercitation exercitation eiusmod Lorem eu esse occaecat quis.
          Exercitation irure fugiat consequat quis ex amet irure ut.
          </Text>
        </View>
        </View>
      </Animated.View>
    )
  }
  else{
    return (
      <Animated.View key={item.id}
      
      >
      <View style={{ flex: 1, position: 'absolute', height: 
        SCREEN_HEIGHT, width: SCREEN_WIDTH, backgroundColor: 'white' }}>

        <View style={{ flex: 2, backgroundColor: 'black' }}>
        <Image source={newsArticles[i].uri}
        style={{ flex: 1, height: null, width: null, resizeMode: 'center' }}
        ></Image>
        </View>
          <View style={{flex: 3, padding: 20 }}>
          <Text>
          Exercitation irure fugiat consequat quis ex amet irure ut id. 
          Quis deserunt proident id duis in officia reprehenderit officia laboris. 
          Cupidatat esse incididunt ut deserunt sunt laboris qui cupidatat voluptate sit. 
          Exercitation exercitation eiusmod Lorem eu esse occaecat quis.
          Exercitation irure fugiat consequat quis ex amet irure ut id. 
          Quis deserunt proident id duis in officia reprehenderit officia laboris. 
          Cupidatat esse incididunt ut deserunt sunt laboris qui cupidatat voluptate sit. 
          Exercitation exercitation eiusmod Lorem eu esse occaecat quis.
          Exercitation irure fugiat consequat quis ex amet irure ut.

          Exercitation irure fugiat consequat quis ex amet irure ut id. 
          Quis deserunt proident id duis in officia reprehenderit officia laboris. 
          Cupidatat esse incididunt ut deserunt sunt laboris qui cupidatat voluptate sit. 
          Exercitation exercitation eiusmod Lorem eu esse occaecat quis.
          Exercitation irure fugiat consequat quis ex amet irure ut id. 
          Quis deserunt proident id duis in officia reprehenderit officia laboris. 
          Cupidatat esse incididunt ut deserunt sunt laboris qui cupidatat voluptate sit. 
          Exercitation exercitation eiusmod Lorem eu esse occaecat quis.
          Exercitation irure fugiat consequat quis ex amet irure ut.

          Exercitation irure fugiat consequat quis ex amet irure ut id. 
          Quis deserunt proident id duis in officia reprehenderit officia laboris. 
          Cupidatat esse incididunt ut deserunt sunt laboris qui cupidatat voluptate sit. 
          Exercitation exercitation eiusmod Lorem eu esse occaecat quis.
          Exercitation irure fugiat consequat quis ex amet irure ut id. 
          Quis deserunt proident id duis in officia reprehenderit officia laboris. 
          Cupidatat esse incididunt ut deserunt sunt laboris qui cupidatat voluptate sit. 
          Exercitation exercitation eiusmod Lorem eu esse occaecat quis.
          Exercitation irure fugiat consequat quis ex amet irure ut.

          Exercitation irure fugiat consequat quis ex amet irure ut id. 
          Quis deserunt proident id duis in officia reprehenderit officia laboris. 
          Cupidatat esse incididunt ut deserunt sunt laboris qui cupidatat voluptate sit. 
          Exercitation exercitation eiusmod Lorem eu esse occaecat quis.
          Exercitation irure fugiat consequat quis ex amet irure ut id. 
          Quis deserunt proident id duis in officia reprehenderit officia laboris. 
          Cupidatat esse incididunt ut deserunt sunt laboris qui cupidatat voluptate sit. 
          Exercitation exercitation eiusmod Lorem eu esse occaecat quis.
          Exercitation irure fugiat consequat quis ex amet irure ut.
          </Text>
        </View>
        </View>
      </Animated.View>
    )
  }
  }).reverse()
  }

  render() {
    return (
      <View style={{flex: 1}}>
      {this.rendernewsArticles()}
      </View>
    );
  }
}
export default News;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
