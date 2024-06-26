const Router = ReactRouterDOM.BrowserRouter
const { Route, Routes } = ReactRouterDOM

import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { Home } from './pages/Home.jsx'
import { BugIndex } from './pages/BugIndex.jsx'
import { BugDetails } from './pages/BugDetails.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { BugEdit } from './pages/BugEdit.jsx'
import { UserDetails } from './pages/UserDetails.jsx'
import { UserIndex } from './pages/UserIndex.jsx'

export function App() {
  return (
    <Router>
      <div>
        <AppHeader />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/bug" element={<BugIndex />} />
            <Route path="/bug/edit" element={<BugEdit />} />
            <Route path="/bug/edit/:bugId" element={<BugEdit />} />
            <Route path="/bug/:bugId" element={<BugDetails />} />
            <Route path="/bug/user" element={<UserIndex />} />
            <Route path="/bug/user/:userId" element={<UserDetails />} />
          </Routes>
        </main>
        <AppFooter />
      </div>
    </Router>
  )
}
