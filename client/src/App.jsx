
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import MeetingRequest from './Visitors/MeetingRequest';
import QRCodeScanner from './QRCodeScanner';

import QRCodeDisplay from './QRCodeDisplay';
import VisitorDetails from './Users/VisitorDetails';
import Users from './Visitors/users';
import UserMettings from './Users/UserMettings';
import Login from './Users/Login';

// import Navbar from './Navbar';
import VisitorSignup from './Visitors/VisitorSignup';
import VisitorLogin from './Visitors/VisitorLogin';
import VisitorMeetings from './Visitors/VisitorMettings';
import SingleMeeting from './Visitors/SingleMeeting';
import TodayMeeting from './Visitors/TodayMeetings';
import UserTodayMeet from './Users/UserTodayMeet';
import ResetPassword from './ResetPassword';
import PendingMetings from './Users/PendingMetings';
import SecurityGard from './Users/SecurityGard';
import Profile from './Profile';
import UpdateProfile from './UpdateProfile';
import PageNotFound from './PageNotFound';
import Calendar from './Users/Calendar';
import RegistrationForm from './RegistrationForm';

function App() {

  const QRCodeDisplayWithId = () => {
    const { id } = useParams();
    return <QRCodeDisplay visitorId={id} />;
  };
  return (

    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/my-meetings" element={<UserMettings />} />
        <Route path='/mettings' element={<VisitorMeetings />} />
        <Route path='/signup' element={<VisitorSignup />} />
        <Route path="/scan" element={<QRCodeScanner />} />
        <Route path="/QR/:id" element={<QRCodeDisplayWithId />} />
        <Route path="/visitor-details" element={<VisitorDetails />} />
        <Route path='/users' element={<Users />} />
        <Route path="/meeting-request" element={<MeetingRequest />} />
        <Route path='/login' element={<Login />} />
        <Route path='/Visitorlogin' element={<VisitorLogin />} />
        <Route path='/meeting/:id' element={<SingleMeeting />} />
        <Route path='/todayMeetings' element={<TodayMeeting />} />
        <Route path='/today-meetings' element={<UserTodayMeet />} />
        <Route path='/today-all-meetings' element={<SecurityGard />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/pending' element={<PendingMetings />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/UpdateProfile' element={<UpdateProfile />} />
        <Route path='*' element={<RegistrationForm />} />
        <Route path='/celender' element={<Calendar />} />
      </Routes>
    </Router>
  );
}

export default App;


