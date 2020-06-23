/*
 *  Makes a component have a isLoading prop
 *  Displays a loader or the component
 *  Depending on the state of the isLoading flag
 */

import React from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner, { LoadingContainer } from '../LoadingSpinner';

const defaultLoaderWithHeight = (height = 50) => () => (
  <LoadingContainer>
    <LoadingSpinner height={`${height}px`} />
  </LoadingContainer>
);

export default CustomLoaderArg => (Component) => {
  // If the argument passed is a react element
  // Use it as loader, else use the argument to create
  // The default loader
  const Loader = React.isValidElement(CustomLoaderArg)
    ? CustomLoaderArg
    : defaultLoaderWithHeight(CustomLoaderArg);

  return class extends React.PureComponent {
    static propTypes = {
      isLoading: PropTypes.bool,
    };

    static defaultProps = {
      // If isLoading prop is not defined
      // The component should never display a loader
      isLoading: false,
    };

    render() {
      const {
        isLoading,
        ...props
      } = this.props;

      if (isLoading) {
        return <Loader />;
      }

      return <Component {...props} />;
    }
  };
};

