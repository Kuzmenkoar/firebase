import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import Header from './common/header'
import SignInForm from './authorization/SignInForm'
import SignUpForm from './authorization/SignUpForm'

import { signIn, signUp } from '../ducks/authorization'
import ProtectedRoute from './common/protectedRoute'
import PeopleModule from './people/PeopleModule'
import Loader from './common/loader'

class Root extends Component {
  render() {
    if (!this.props.firstContact) {
      return (
        <div style={{ height: '200px', position: 'relative' }}>
          <Loader />
        </div>
      )
    }

    return (
      <div>
        <Header />
        <Switch>
          <ProtectedRoute path="/people" component={PeopleModule} />
          <Route path="/signIn" render={() => <SignInForm onSubmit={this.props.signIn} />} />
          <Route path="/signUp" render={() => <SignUpForm onSubmit={this.props.signUp} />} />
          <Redirect exact from="/" to="/people" />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = ({ router, authorization: { firstContact } }) => {
  return {
    firstContact,
    router, // pure: false
  }
}

export default connect(
  mapStateToProps,
  { signIn, signUp },
)(Root)
