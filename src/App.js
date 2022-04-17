import React, { useRef } from "react";
import Pages from "./pages/Pages";
import SvgBack from "./components/SvgBack";
import Home from "./pages/Home";

import {ContextProvider} from "./Context"
import Navigation from "./components/header/Navigation"
import {BrowserRouter} from 'react-router-dom'



function App() {

  const appref=useRef();
    return (
        <div className='App' ref={appref}>
            <SvgBack/>
            <BrowserRouter>
            <ContextProvider> 
              <Navigation appref={appref}/>
              {/* Header */}
                <Pages appref={appref}/>
                {/* <Home ></Home> */}
                
              {/* Footer */} 
            </ContextProvider>
            </BrowserRouter>
            </div>
    );
}






// (e)=>{clickHandler(e,".page","/p2")}

//       return(
//         <div className="App" ref={appref}>
//           <BrowserRouter>
//           <Nav appref={appref}/>
//           <Routes>
//             <Route path="/" element={<Page1 appref={appref}/>}/>
//             <Route path="/p2"element={<Page2 appref={appref}/>}/>
//             <Route path="/p3"element={<Page3 appref={appref}/>}/>
//             </Routes>
//           </BrowserRouter>
//         </div>
// )
// }
export default App;

