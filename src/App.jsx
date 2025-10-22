import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { Footer } from './components/Footer'
import PledgePage from './pages/PledgePage'
import SignupPage from './pages/SignUp'
import LoginPage from './pages/Login'
import Species from './pages/Species'
import About from './pages/About'
import Contact from './pages/ContactUs'
import Profile from './pages/Profile'
import Donation from './pages/Donation'
import SpeciesShowcase from './pages/SpeciesShowCase'
import ResearchArticles from './pages/ResearchArticles'
import PartnerOrganizations from './pages/PartnerOrganizations'
// import IUCNRedList from './pages/IUCNRedList'
import EducationalResources from './pages/EducationalResources'
import ConservationTips from './pages/ConservationTips'
import AdminDashboard from './pages/AdminDashBoard'
function App() {

  return (
    
    <>
    
    <BrowserRouter>
    <Navbar />
    <Routes>
<Route path='/' element={<Home />} />
<Route path='/pledge' element={<PledgePage />} />
<Route path='/signup' element={<SignupPage />} />
<Route path='/login' element={<LoginPage />} />
<Route path='/explore' element={<Species />} />
<Route path='/about' element={<About />} />
<Route path='/contact' element={<Contact />} />
<Route path='/profile' element={<Profile />} />
<Route path='/donation' element={<Donation />} /> 
<Route path='/learnmore' element={<SpeciesShowcase />} /> 
<Route path='/resources' element={<EducationalResources />} /> 
{/* <Route path='/iucn' element={<IUCNRedList />} />  */}
<Route path='/partners' element={<PartnerOrganizations />} /> 
<Route path='/research' element={<ResearchArticles />} /> 
<Route path='/tips' element={<ConservationTips />} /> 
<Route path='/admin' element={<AdminDashboard />} /> 
    </Routes>
    <Footer />
    </BrowserRouter>
    </>
  )
}

export default App
