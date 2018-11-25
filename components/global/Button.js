import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../resources/Colors';

type Props = {
  text: String,
  icon?: String,
  buttonStyle?: StyleSheet.Styles,
  textStyle?: StyleSheet.Styles,
};

const Button = (props: Props) => {
  const {
    text, buttonStyle, textStyle, icon,
  } = props;

  return (
    <TouchableOpacity style={[styles.button, buttonStyle]}>
      {!!icon && <Icon name={icon} size={30} color={Colors.black} />}
      {text && (
        <Text style={[styles.innerText, textStyle]}>
          {text.toUpperCase()}
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
  icon: null,
};

export default Button;
