// @flow
import * as React from 'react';
import {
  View, StyleSheet, FlatList, Text,
} from 'react-native';
import Colors from '../../resources/Colors';
import { categories } from '../../resources/data';
import Button from '../global/Button';
import OptionModal from '../modal/OptionModal';

type Props = {
  navigation: {
    navigate: Function,
    goBack: Function,
  },
};

type State = {
  isOptionModalVisible: boolean,
  categorySelected: string,
};

/**
 * Menu where to choose the category to play
 */
export default class Menu extends React.Component <Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isOptionModalVisible: false,
      categorySelected: 'any',
    };
  }

  /**
   * Toggle advanced options modal
   */
  toggleOptionModal = () : void => {
    const { isOptionModalVisible } = this.state;
    return this.setState({ isOptionModalVisible: !isOptionModalVisible });
  };

  /**
   * Set the selected categorie in the state.
   * @param  {string} categorySelected
   */
  setCategorySelected = (categorySelected: string) : void => this.setState({ categorySelected });

  /**
   * Handler of the category pressed.
   * @param  {string} value
   */
  handleCategorySelection = (value: string): void => {
    this.setCategorySelected(value);
    this.toggleOptionModal();
  }

  /**
   * Shows categories in buttons.
   * @param  {string} value - Value of the category
   * @param  {string} label - Name of the category
   */
  renderCategories = ({ value, label } : { value: string, label: string}): React.Node => (
    <Button
      buttonStyle={styles.menuButton}
      textStyle={styles.menuButtonText}
      text={label}
      action={() => this.handleCategorySelection(value)}
    />
  );

  render(): React.Node {
    const { navigation } = this.props;
    const { isOptionModalVisible, categorySelected } = this.state;

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
        <OptionModal
          isVisible={isOptionModalVisible}
          toggleModal={this.toggleOptionModal}
          categorySelected={categorySelected}
          navigation={navigation}
        />
      </View>
    );
  }
}

const styles: StyleSheet.styles = StyleSheet.create({
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
