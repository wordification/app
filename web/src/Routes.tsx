// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set, Private } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import AdministratorLayout from 'src/layouts/AdministratorLayout/AdministratorLayout'
import AuthLayout from 'src/layouts/AuthLayout/AuthLayout'
import GlobalLayout from 'src/layouts/GlobalLayout/GlobalLayout'

import LandingPageLayout from './layouts/LandingPageLayout/LandingPageLayout'
import SuperuserLayout from './layouts/SuperuserLayout/SuperuserLayout'
import TeacherLayout from './layouts/TeacherLayout/TeacherLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Set wrap={LandingPageLayout}>
        <Route path="/view-more" page={LandingPresentationPage} name="presentation" />
        <Route path="/try-it" page={LandingDemonstrationPage} name="demonstration" />
        <Route path="/contributors" page={LandingContributorsPage} name="contributors" />
        <Route path="/supporters" page={LandingSupportersPage} name="supporters" />
        <Route path="/" page={LandingPage} name="landing" />
      </Set>
      <Set wrap={AuthLayout}>
        <Route path="/login" page={AuthLoginPage} name="login" />
        <Route path="/forgot-password" page={AuthForgotPasswordPage} name="forgotPassword" />
        <Route path="/reset-password" page={AuthResetPasswordPage} name="resetPassword" />
      </Set>
      <Private unauthenticated="login">
        <Set wrap={GlobalLayout}>
          <Set>
            <Route path="/games/matching/{id:Int}" page={MatchingGameIndividualGamePage} name="matchingGameIndividual" />
            <Route path="/games/matching/resume" page={MatchingGameIncompleteGamesPage} name="matchingGameIncomplete" />
            <Route path="/games/matching/scores" page={MatchingGameCompleteGamesPage} name="matchingGameComplete" />
            <Route path="/games/matching/setup" page={MatchingGameSetupGamePage} name="matchingGameSetup" />
            <Route path="/games/matching" page={MatchingGameMenuPage} name="matchingGame" />
          </Set>
          <Set>
            <Route path="/games/sorting/{id:Int}" page={SortingGameIndividualGamePage} name="sortingGameIndividual" />
            <Route path="/games/sorting/resume" page={SortingGameIncompleteGamesPage} name="sortingGameIncomplete" />
            <Route path="/games/sorting/scores" page={SortingGameCompleteGamesPage} name="sortingGameComplete" />
            <Route path="/games/sorting/setup" page={SortingGameSetupGamePage} name="sortingGameSetup" />
            <Route path="/games/sorting" page={SortingGameMenuPage} name="sortingGame" />
          </Set>
          <Route path="/games" page={GamesPage} name="games" />
          <Route path="/profile" page={ProfilePage} name="profile" />
        </Set>
      </Private>
      <Private unauthenticated="login" roles={['TEACHER', 'SUPERUSER']}>
        <Set wrap={TeacherLayout}>
          <Route path="/dashboard/reset-password" page={ResetPasswordPage} name="resetPasswordTeacher" />
          <Route path="/dashboard/class-game-setup" page={DashboardClassGameSetupPage} name="classGameSetup" />
          <Route path="/dashboard/students/{id:Int}/games" page={DashboardStudentGamesPage} name="studentGames" />
          <Route path="/dashboard/students/{id:Int}" page={DashboardStudentProfilePage} name="studentProfile" />
          <Route path="/dashboard/students" page={DashboardStudentsPage} name="students" />
          <Route path="/dashboard" page={DashboardPage} name="dashboard" />
        </Set>
      </Private>
      <Private unauthenticated="login" roles={['ADMINISTRATOR', 'SUPERUSER']}>
        <Set wrap={AdministratorLayout}>
          <Route path="/admin/reset-password" page={ResetPasswordPage} name="resetPasswordAdmin" />
          <Route path="/admin/update-user/{id:Int}" page={AdminUpdateUserPage} name="updateUser" />
          <Route path="/admin/modify-user" page={AdminModifyUserPage} name="modifyUser" />
          <Route path="/admin/create-user" page={AdminCreateUserPage} name="createUser" />
          <Route path="/admin" page={AdminDashboardPage} name="adminDashboard" />
        </Set>
      </Private>
      <Private unauthenticated="login" roles="SUPERUSER">
        <Set wrap={SuperuserLayout}>
          <Route path="/demo/about" page={AboutPage} name="about" />
          <Route path="/demo" page={HomePage} name="superuserDashboard" />
        </Set>
      </Private>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
