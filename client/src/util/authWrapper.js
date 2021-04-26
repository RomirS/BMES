import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

const authWrapper = (AuthenticatedComponent) => (props) => {
  const { isAuthenticated, history } = props;

  useEffect(() => {
    if (!isAuthenticated) history.push('/login');
  }, [isAuthenticated, history]);

  return (
    <AuthenticatedComponent {...props} />
  );
}

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.isAuthenticated
})

export default compose(
  connect(mapStateToProps, null),
  authWrapper
);