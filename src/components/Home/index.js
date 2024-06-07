import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import Loading from '../Loading'
import FailureView from '../FailureView'
import './index.css'

class Home extends Component {
  state = {coursesList: [], loading: false, error: false}

  componentDidMount() {
    this.getCoursesListFromApi()
  }

  getCoursesListFromApi = async () => {
    this.setState({loading: true, error: false})
    const coursesApiUrl = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }

    try {
      const response = await fetch(coursesApiUrl, options)
      if (response.ok) {
        const fetchedData = await response.json()
        const updatedData = fetchedData.courses.map(eachCourse => ({
          id: eachCourse.id,
          logoUrl: eachCourse.logo_url,
          name: eachCourse.name,
        }))
        this.setState({coursesList: updatedData, loading: false})
      } else {
        console.error('Failed to fetch data')
        this.setState({error: true, loading: false})
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      this.setState({error: true, loading: false})
    }
  }

  fetchFailureRetry = () => {
    this.getCoursesListFromApi()
  }

  render() {
    const {coursesList, loading, error} = this.state

    return (
      <>
        <Header />
        {loading && <Loading />}
        {!loading && error && (
          <FailureView reFetchCoursesListApi={this.fetchFailureRetry} />
        )}
        {!loading && !error && (
          <div className="home-container">
            <h1 className="courses-heading">Courses</h1>

            <ul className="courses-list">
              {coursesList.map(eachCourse => (
                <li className="course-item" key={eachCourse.id}>
                  <Link
                    to={`/courses/${eachCourse.id}`}
                    className="course-list-link-item"
                  >
                    <img
                      src={eachCourse.logoUrl}
                      alt={eachCourse.name}
                      className="course-logo"
                    />
                    <p className="course-name">{eachCourse.name}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </>
    )
  }
}

export default Home
