import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native'
import Color from './Color'

const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: 'center',
    marginRight:14,
    marginLeft:14,
  },
  text: {
    color: Color.defaultBlue,
    fontWeight: '600',
    fontSize: 17,
    backgroundColor: Color.backgroundTransparent,
    marginBottom: 12,
    marginLeft: 10,
    marginRight: 10,
  },
})

export interface SendProps {
  text?: string
  label?: string
  containerStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  children?: React.ReactNode
  alwaysShowSend?: boolean
  disabled?: boolean
  sendButtonProps?: Partial<TouchableOpacityProps>
  onSend?({ text }: { text: string }, b: boolean): void
}

export default class Send extends Component<SendProps> {
  static defaultProps = {
    text: '',
    onSend: () => {},
    label: 'Send',
    containerStyle: {},
    textStyle: {},
    children: null,
    alwaysShowSend: false,
    disabled: false,
    sendButtonProps: null,
  }

  static propTypes = {
    text: PropTypes.string,
    onSend: PropTypes.func,
    label: PropTypes.string,
    containerStyle: {},
    textStyle: PropTypes.any,
    children: PropTypes.element,
    alwaysShowSend: PropTypes.bool,
    disabled: PropTypes.bool,
    sendButtonProps: PropTypes.object,
  }

  render() {
    const {
      text,
      containerStyle,
      onSend,
      children,
      textStyle,
      label,
      alwaysShowSend,
      disabled,
      sendButtonProps,
    } = this.props
    if (alwaysShowSend || (text && text.trim().length > 0)) {
      return (
        <TouchableOpacity
          testID='send'
          accessible
          accessibilityLabel='send'
          style={[styles.container, containerStyle]}
          onPress={() => {
            if (text && onSend) {
              onSend({ text: text.trim() }, true)
            }
          }}
          accessibilityTraits='button'
          disabled={disabled}
          {...sendButtonProps}
        >
          <View>
            {children || <Text style={[styles.text, textStyle]}>{label}</Text>}
          </View>
        </TouchableOpacity>
      )
    }
    return <View />
  }
}
