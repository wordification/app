// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set, Private } from '@redwoodjs/router'

import GlobalLayout from 'src/layouts/GlobalLayout/GlobalLayout'
import SortingGameLayout from 'src/layouts/SortingGameLayout/SortingGameLayout'

import { useAuth } from './auth'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Route path="/login" page={AuthLoginPage} name="login" />
      <Route path="/signup" page={AuthSignupPage} name="signup" />
      <Route path="/forgot-password" page={AuthForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={AuthResetPasswordPage} name="resetPassword" />
      <Private unauthenticated="login">
        <Set wrap={GlobalLayout}>
          <Set wrap={SortingGameLayout}>
            <Route path="/games/sorting/setup" page={SortingSetupPage} name="sortingSetup" />
            <Route path="/games/sorting" page={SortingGamePage} name="sortingGame" />
          </Set>
          <Route path="/games/matching" page={MatchingGamePage} name="matchingGame" />
          <Route path="/games" page={GamesPage} name="games" />
          <Route path="/profile" page={ProfilePage} name="profile" />
          <Route path="/about" page={AboutPage} name="about" />
          <Route path="/" page={HomePage} name="home" />
        </Set>
      </Private>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
