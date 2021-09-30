import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import './App.css'
import Header from './components/header'
import BookDisplayScreen from './screen/BookDIsplayScreen'
import CheckOutBookScreen from './screen/CheckOutBookScreen'
import ForgetPasswordScreen from './screen/ForgetPasswordScreen'
import HomeScreen from './screen/HomeScreen'
import PayFineScreen from './screen/PayFineScreen'
import ReservationScreen from './screen/ReservationScreen'
import ReturnBookScreen from './screen/ReturnBookScreen'
import SigninScreen from './screen/SignInScreen'
import SignUpScreen from './screen/SignUpScreen'
import UpdateProfileScreen from './screen/UpdateProfileScreen'

function App() {
  return (
    <div>
      <Router>
        <Header />
        <div>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/signin" />} />
            <Route path="/home" component={HomeScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/signup" component={SignUpScreen} />
            <Route path="/forget-password" component={ForgetPasswordScreen} />
            <Route path="/edit-profile" component={UpdateProfileScreen} />
            <Route path="/display-books" component={BookDisplayScreen} />
            <Route path="/reservation" component={ReservationScreen} />
            <Route path="/checkout" component={CheckOutBookScreen} />
            <Route path="/return-book" component={ReturnBookScreen} />
            <Route path="/pay-fine" component={PayFineScreen} />
            <Route exact path="*" render={() => <Redirect to="/signin" />} />
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App
