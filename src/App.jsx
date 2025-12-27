
import { Route, Routes } from 'react-router-dom'
import QueueForm from './QueueForm'
import NotFound from './NotFound'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import JoinDecoder from './JoinDecoder';
import TrackToken from './TrackToken';
import PrivacyPolicy from './PrivacyPolicy';
import ContactUs from './ContactUs';

function App() {

  return (
    <>
      <Routes>
        {/* <Route path="/joinQueue" Component={JoinDecoder} /> */}
        <Route path="/joinQueue" Component={QueueForm} />
        <Route path='/tokenstatus/:tokenId' Component={TrackToken}/>
        <Route path='/privacy-policy' Component={PrivacyPolicy}/>
        <Route path='/contactus' Component={ContactUs}/>
        <Route path="/*" Component={NotFound} />
      </Routes>
      <ToastContainer position="top-center" autoClose={5000} />

    </>
  )
}

export default App
