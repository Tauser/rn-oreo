import * as React from 'react';
import {ThemedView} from "src/components";
import {borderRadius} from 'src/components/config/spacing';

function ItemLoading(props) {
  const {style} = props;
  return (
    <ThemedView colorSecondary style={[
      {
        width: 135,
        height: 150,
        borderRadius: borderRadius.large
      },
      style && style
    ]}/>
  );
}

export default ItemLoading;
