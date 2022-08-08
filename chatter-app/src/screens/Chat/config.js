import React from 'react';
import {bubbleCommonStyle} from "./styles";
import {VideoMessage} from "../../components";

function getBubbleProps(theme) {
  return {
    wrapperStyle: {
      left: {
        ...bubbleCommonStyle,
        backgroundColor: theme.mode === 'dark' ? theme.bg2 : '#f4f7fe',
        borderBottomRightRadius: 25,
        borderTopRightRadius: 25,
        borderBottomLeftRadius: 0,
      },
      right: {
        ...bubbleCommonStyle,
        backgroundColor: theme.primary,
        borderBottomLeftRadius: 25,
        borderTopLeftRadius: 25,
        borderBottomRightRadius: 0,
      }
    },
    textStyle: {
      left: {
        color: theme.txt,
        marginBottom: 13,
        fontSize: 14.5,
      },
      right: {marginBottom: 10, fontSize: 14.5}
    }
  }
}

function renderVideoMessage(props) {
  return <VideoMessage {...props} />
}

export {getBubbleProps, renderVideoMessage};
