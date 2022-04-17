import {createContext,useRef,useState} from 'react';


const myContext=createContext();



export function ContextProvider({children}){
  
  // const server="10.0.0.169";
  const server="localhost";

  
  
  const appRef=useRef();
  
  const updateCursor=(e)=>{
    console.log("update cursor from context");
    
  }


  const [page,setPage]=useState("");

  return(
    <myContext.Provider value={{server,page,setPage,appRef}}>
        {children}
    </myContext.Provider>

  )
}

export default myContext;

