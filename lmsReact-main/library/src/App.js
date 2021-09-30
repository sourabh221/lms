import './App.css'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import SigninScreen from './screens/SignInScreen'
import SignUpScreen from './screens/SignUpScreen'
import Header from './components/header'
import HomeScreen from './screens/HomeScreen'
import UpdateProfileScreen from './screens/UpdateProfileScreen'
import LibrarianScreen from './screens/LibrarianScreen'
import BookScreen from './screens/BookScreen'
import ForgetPasswordScreen from './screens/ForgetPasswordScreen'

function App() {
  return (
    <div>
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/signin" />} />
            <Route path="/home" component={HomeScreen} />
            <Route path="/edit-profile" component={UpdateProfileScreen} />
            <Route path="/librarian" component={LibrarianScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/signup" component={SignUpScreen} />
            <Route path="/forget-password" component={ForgetPasswordScreen} />
            <Route path="/book" component={BookScreen} />
            <Route exact path="*" render={() => <Redirect to="/signin" />} />
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App
