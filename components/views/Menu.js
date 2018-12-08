// @flow
import React, { Component } from 'react';
import {
  View, StyleSheet, FlatList, Text,
} from 'react-native';
import Colors from '../../resources/Colors';
import categories from '../global/categories';
import Button from '../global/Button';

type Props = {
  navigation: {
    navigate: Function,
    goBack: Function,
  },
};

type State = {
  categories: Array<{ value: string, name: string }>
};

export default class Menu extends Component <Props, State> {
  handleCategorySelection = (value: string) => {
    console.log(value);
  }

  renderCategories = ({ value, name } : { value: string, name: string}) => (
    <Button
      buttonStyle={styles.menuButton}
      textStyle={styles.menuButtonText}
      text={name}
      action={() => this.handleCategorySelection(value)}
    />
  );

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.wrapper}>
        <View style={styles.titleWrapper}>
          <Button
            buttonStyle={styles.backButton}
            icon="md-arrow-back"
            iconColor={Colors.gray}
            action={() => navigation.goBack()}
          />
          <Text style={styles.title}>Choose one category</Text>
        </View>
        <FlatList
          data={categories}
          extraData={this.state}
          keyExtractor={item => item.value}
          renderItem={({ item }) => this.renderCategories(item)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  titleWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 5,
    marginVertical: 5,
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    fontFamily: 'BreeSerif',
    fontSize: 26,
    color: Colors.gray,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: 'transparent',
  },
  menuButton: {
    flex: 1,
    width: '90%',
    height: 60,
    marginHorizontal: 5,
    marginVertical: 10,
    alignSelf: 'center',
    padding: 5,
  },
  menuButtonText: {
    fontFamily: 'BreeSerif',
    letterSpacing: 0,
    textAlign: 'center',
    fontSize: 16,
  },
});
