import './App.css'
import Homepage from './Pages/Homepage'
import Loginpage from './Pages/Loginpage'
import Profile from './Pages/Profile'

function App() {


  return (
    <>
      <Homepage/>
      <Loginpage/>
      <Profile/>
    </>
  )
}

export default App


// <div className="grid grid-cols-12 grid-rows-5 gap-0">
//     <div className="col-span-6 row-span-5">1</div>
//     <div className="col-span-6 row-span-5 col-start-7">2</div>
// </div>
