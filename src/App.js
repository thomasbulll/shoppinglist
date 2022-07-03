import './App.css';
import React , {useEffect, useState} from 'react';
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import {auth, db} from './Firebase'
import {uid} from "uid";
import {set, ref, onValue, remove} from "firebase/database";


const App = () => {
  // Allows us to change and set the list as an array throughout the program
  const [list, setList] = useState([]);
  // Allows us to change and set the list as an array throughout the program
  const [inputData, setInputData] = useState("");

  //using use effect to show what the users list looks like live
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      //checking if the user is logged in to their google account
      if (user) { 
        //load the contents of the users list from the database to the application
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          //setting the list to an empty array
          setList([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((inputData) => {
              //populating the array with the input data
              setList((oldArray) => [...oldArray, inputData]);
            });
          }
        });
      } 
    });
  }, []);
 


//using the remove operation to go into the users database and remove said item using it's ID
const handleRemoveItem = (uidd) => {
  remove(ref(db, `/${auth.currentUser.uid}/${uidd}`));
}


const handleRemoveAll = () => {
  //using a for loop to go arount the array called list
  for(let i=0; i<list.length; i ++){
    //we remove every value by finding its ID
    remove(ref(db, `/${auth.currentUser.uid}/${list[i].uidd}`));
  }
   
}



const SignInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  //using a popup to sign into google account
    signInWithPopup(auth, provider).then(result => {
        //storing the users name to be displayed on the page
        const name = result.user.displayName;
        localStorage.setItem("name", name);
        //catching and displaying errors 
    }).catch((error) => {
        alert(error);
    });
}

//Writing to the database
const WriteToDatabase = () => {
  //checking there is a valid input
  if(inputData === ""){
    alert("Please type something")
  }else{
    //creating an id for the data about to be entered into the database
    const uidd = uid();
    //inputting the data into the database using the users ID (uid)
      set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
        inputData: inputData, //the data we want to put into the database
        uidd: uidd,  //the data's ID
    
      });
    
      // setting the data inputted to be blank 
      setInputData("");
  }
  
  
};

  return(
<div className="App" >
<title>Shopping List</title>


<h1>Google Shopping List</h1>
<button onClick={SignInWithGoogle}>Sign in with Google</button>
<h3>User: {localStorage.getItem("name")}</h3>

<input type = "button" id="RemoveAll" value="Delete Entire List" onClick={() => handleRemoveAll()} />

<div className = "input">
  <input type="text" value={inputData} onChange = {(event) => setInputData(event.target.value)}/>
  <input type ="button" value="Add to list" onClick={WriteToDatabase}/>

</div>
<div className="list">
   {list.map((inputData) => {
    return (
      <div>
        <p id="item" onClick={() => handleRemoveItem(inputData.uidd)}>. {inputData.inputData}</p>
        
      </div>
    )

   })}

</div>



  
</div>
  );
}

export default App;
