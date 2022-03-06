import React from 'react';
import { getStyle } from '../css/Styles';
import Input from './Input';

const TextBox = ({ value, setValue }) => {
  return (
    <Input
      multiline
      inputStyle={getStyle(
          'width-100p flex border border-color-deepSupport margin-bottom-3p',
      )}
      textStyle={getStyle(
          'font-size-14 width-100p padding-left-6p padding-right-6p padding-top-3p', { lineHeight: 21 },
      )}
      value={value}
      onChange={(text) => setValue(text)}
    />
  );
};

export default TextBox;
