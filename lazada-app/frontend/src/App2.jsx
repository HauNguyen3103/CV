import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from './routes/index.js'
import { useState, Fragment } from 'react'
import Loading from './components/LoadingComponent/Loading'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'

function App2 () {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <div className=''>
        <Loading isLoading={isLoading}>
          {/* SET UP FOR ROUTES */}
          <Router>
            <Routes>
              {routes.map(route => {
                const Page = route.page
                const Layout = route.isShowHeader ? DefaultComponent : Fragment
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  />
                )
              })}
            </Routes>
          </Router>
        </Loading>
      </div>
    </div>
  )
}

export default App2;
