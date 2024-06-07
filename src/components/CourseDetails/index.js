import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Header from '../Header'
import Loading from '../Loading'
import FailureView from '../FailureView'
import './index.css'

class CourseDetails extends Component {
  state = {courseDetails: null, loading: false, error: false}

  componentDidMount() {
    this.getCourseDetailsFromApi()
  }

  getCourseDetailsFromApi = async () => {
    const {match} = this.props
    const {id} = match.params
    this.setState({loading: true, error: false})
    const courseDetailsApiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }
    try {
      const response = await fetch(courseDetailsApiUrl, options)
      if (response.ok) {
        const fetchedData = await response.json()
        const courseDetails = {
          id: fetchedData.course_details.id,
          name: fetchedData.course_details.name,
          imageUrl: fetchedData.course_details.image_url,
          description: fetchedData.course_details.description,
        }
        this.setState({courseDetails, loading: false})
      } else {
        console.error('Fetch Failed No Details Fetched')
        this.setState({error: true, loading: false})
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      this.setState({error: true, loading: false})
    }
  }

  fetchFailureRetry = () => {
    this.getCourseDetailsFromApi()
  }

  render() {
    const {courseDetails, loading, error} = this.state

    return (
      <>
        <Header />
        <div className="course-details-main-container">
          {loading && <Loading />}
          {error && (
            <FailureView reFetchCourseDetails={this.fetchFailureRetry} />
          )}
          {courseDetails && (
            <div className="course-details-display-container">
              <div className="course-image-container">
                <img
                  className="course-image"
                  src={courseDetails.imageUrl}
                  alt={courseDetails.name}
                />
              </div>
              <div className="course-inner-div-container">
                <h1 className="course-name">{courseDetails.name}</h1>
                <p className="course-description">
                  {courseDetails.description}
                </p>
              </div>
            </div>
          )}
        </div>
      </>
    )
  }
}

export default withRouter(CourseDetails)
