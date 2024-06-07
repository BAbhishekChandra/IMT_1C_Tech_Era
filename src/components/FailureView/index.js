import './index.css'

const FailureView = props => {
  const {reFetchCoursesListApi, reFetchCourseDetails} = props

  const handleRetry = () => {
    if (reFetchCoursesListApi) {
      console.log('Home Component retry for Course List')
      reFetchCoursesListApi()
    }
    if (reFetchCourseDetails) {
      console.log('Course Details Component for Course Details')
      reFetchCourseDetails()
    }
  }

  return (
    <div className="failure-view-container">
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />

      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="retry-button" onClick={handleRetry}>
        Retry
      </button>
    </div>
  )
}

export default FailureView
