import './App.css';
import OneProduct from './components/OneProduct';
import  UpdateProduct from './components/UpdateProduct';
import Main from './Main/View';
import { Route,Routes,BrowserRouter } from 'react-router-dom';
function App() {
  return (
     
          <div className="App">
              {/* Everything inside of our Routes component needs a path */}
              <Routes>
                  {/* Now both components can display from the same path */}
                  <Route path="/" element={<Main />} />
                  {/* :id is a variable added to our path that needs a unique value. We can access and destructure it from the useParams hook */}
                  <Route path="/product/:id" element={<OneProduct />}  />
                  <Route path="/product/edit/:id" element={<UpdateProduct />} />
              </Routes>
          </div>
      
  );
}

export default App;
