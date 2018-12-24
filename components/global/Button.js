// @flow
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../resources/Colors';

type Props = {
  text?:? string,
  icon?:? string,
  iconColor?:? string,
  buttonStyle?: StyleSheet.Styles,
  textStyle?: StyleSheet.Styles,
  action: Function,
};

const Button = (props: Props) => {
  const {
    text, buttonStyle, textStyle, icon, iconColor,
    action, noUpperCase,
  } = props;

  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={action}>
      {!!icon && <Icon name={icon} size={30} color={iconColor || Colors.black} />}
      {text && (
        <Text style={[styles.innerText, textStyle]}>
          { noUpperCase ? text : text.toUpperCase() }
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.red,
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerText: {
    color: 'white',
    letterSpacing: 2,
    fontWeight: 'bold',
    fontSize: 14,
  },
});

Button.defaultProps = {
  buttonStyle: {},
  textStyle: {},
  text: null,
  icon: null,
  iconColor: null,
};

export default Button;
