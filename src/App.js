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
          //Everytime the database is read it resets the array
          setList([]);
          //The data from the database
          const data = snapshot.val();
          //ensuring that there is data 
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
  // deleting from the database "db" using the user's uid and removing the product with the uidd
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

const HandleKeyPress = (event) => {
  // Checking if the key pressed was enter
  if(event.key === "Enter"){
    //If the key pressed was enter then go to the WriteDataBase function
    WriteToDatabase();
  }

}

  return(
<div className="App" >
<title>Shopping List</title>

<div className="Header">

{/* The title which has a google logo and the words "Shopping List" */}
<h1 id="Title"><img id="GoogleLogo" alt="#" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png"/> Shopping List</h1>
{/* The image which allows users to sign into their google account */}
<img id="GoogleSignIn" alt="#" src="https://www.oncrashreboot.com/images/create-apple-google-signin-buttons-quick-dirty-way-google.png" height="50" 
width = "210" onClick={SignInWithGoogle}/>
{/* The text which displays the users name when logged in */}
<h3 id="UserName">Signed in as: {localStorage.getItem("name")}</h3>
</div>


{/* The button that removes every item from the list */}
<input type = "button" id="RemoveAll" value="Delete Entire List" onClick={() => handleRemoveAll()} />


{/* The div container which surronds the add feature and the displayed elements from the list */}
<div className="EntireList">

<div className = "input-field">
  {/* The input field which allows users to add items to the list */}
  <input id="Add-Item" placeholder=" Add item" type="text" value={inputData} onKeyPress={HandleKeyPress} onChange = {(event) => setInputData(event.target.value)}/>
  
</div>
<div className="list-items">
  {/* this maps the array into individual items */}
   {list.map((inputData) => {
    return (
      <div>
       {/* each paragraph container contains an individual element from the array */}
       {/* If the element is clicked it removes that item from the array and database */}
        <p id="item" onClick={() => handleRemoveItem(inputData.uidd)}>{inputData.inputData}</p>
        
      </div>
    )

   })}

</div>

</div>





  
</div>
  );
}

export default App;
