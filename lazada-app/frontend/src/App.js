import { RouterProvider } from 'react-router-dom'
import { routes } from './router/router'
import App2 from "./App2.jsx"
import { AuthProvider } from './context/AuthContext'
const authData = JSON.parse(localStorage.getItem('authData')) || {}

function App () {
  return (
    <div className='App'>
      <RouterProvider router={routes} />
      <AuthProvider initialAuthData={authData}>
      <App2 />
      </AuthProvider>
    </div>
  )
}

export default App
