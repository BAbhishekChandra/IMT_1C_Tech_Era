import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import CourseDetails from './components/CourseDetails'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/courses/:id" component={CourseDetails} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App
