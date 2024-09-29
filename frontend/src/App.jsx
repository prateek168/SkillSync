import { useState, useEffect } from 'react'
import Login from './auth/Login'
import Signup from './auth/Signup'
import LandingPage from './components/LandingPage'
import Dashboard from './components/Dashboard'
import UserDashboard from './components/UserDashboard'
import AddJob from './components/AddJob'
import ApplyJobs from './components/ApplyJobs'
import AppliedCandidates from './components/AppliedCandidates'
import PythonQuiz from './components/PythonQuiz'
import JavaScriptQuiz from './components/JavaScriptQuiz'
import {  Route,  Routes  } from 'react-router-dom'
import TestEnded from './components/TestEnded'
import AllCandidatesApplied from './components/AllCandidatesApplied'
import JobsAppliedByCandidates from './components/JobsAppliedByCandidates'
import Profile from './components/Profile'
import Contact from './components/Contact'
import FAQ from './components/FAQ'
import ScoresRecorded from './components/ScoresRecorded'

function App() {
  const [token, setToken] = useState(false)


  if(token) {
    sessionStorage.setItem('token', JSON.stringify(token))
  }

  useEffect(() => {
    if(sessionStorage.getItem('token'))
   {
      let data = JSON.parse(sessionStorage.getItem('token'))
      setToken(data)
      
    }
  },[] )
  

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path={'/python'} element={<PythonQuiz />} />
        <Route path={'/testended'} element={<TestEnded />} />
        <Route path={'/scoreRecorded'} element={<ScoresRecorded/>} />

        {token ? (
        <>
          <Route path={'/dashboard'} element={<Dashboard token={token}/>} />
          <Route path={'/userdashboard'} element={<UserDashboard token={token}/>} />
          <Route path={'/addjob'} element={<AddJob token={token}/>} />
          <Route path={'/jobs/:id'} element={<ApplyJobs token={token}/>} />
          <Route path={'/appliedcandidates/:id'} element={<AppliedCandidates token={token}/>} />
          <Route path={'/allJobsAppliedCandidates'} element={<AllCandidatesApplied token={token}/>} />
          <Route path={'/JavaScriptQuestion'} element={<JavaScriptQuiz token={token}/>} />
          <Route path={'/jobAppliedbyUser'} element={<JobsAppliedByCandidates token={token}/>} />
          <Route path={'/profile'} element={<Profile token={token}/>} />
          <Route path={'/contactUs'} element={<Contact token={token}/>} />
          <Route path={'/faq'} element={<FAQ token={token}/>} />
        
        </>
      ) : (
         <>
        
        </> 
      )} 
      </Routes>
    </>
  )
}

export default App
