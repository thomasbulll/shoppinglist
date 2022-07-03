import './App.css';
import React , {useState} from 'react';


const App = () => {
  const [list, setList] = useState([]);
  const [inputData, setInputData] = useState('');

const handleAddIten = () => {
  //checking if the string doesnt contain anything
  if(inputData === ""){
    alert("Please type something")
  }else{
    //using the inputData we add the new data to the existing list in a new array
    const newList = [...list, {title: inputData}];
    //set the list to equal the new array
    setList(newList);
    //reset the inputdata
    setInputData('');
  }
  
}

//paramater set to the index of the item we want to remove
const handleRemoveItem = (index) => {
  // defining a new empty array
  const newList = [];
  //using a for loop to go around the first array and populating it with every element apart from the one we want to remove
  for(let i=0; i<list.length; i++){
    if(index !== i){
      newList.push(list[i]);
    }
  }
  //setting the list to equal the new array
  setList(newList);

}


const handleRemoveAll = () => {
  //creating a new empty array
  const newList = [];
  //setting the list to equal the empty array thus deleting everything
  setList(newList);
}

  return(
<div className="App" >
<title>Shopping List</title>


<h1>Google Shopping List</h1>

<input type = "button" value="Delete Entire List" onClick={() => handleRemoveAll()} />

<div className = "input">
  <input type="text" value={inputData} onChange = {(event) => setInputData(event.target.value)}/>
  <input type ="button" value="Add to list" onClick={() => handleAddIten()}/>

</div>
<div className="list">
   {list.map((item, index) => {
    return (
      <div>
        <p id="item" onClick={() => handleRemoveItem(index)}>{index + 1}. {item.title}</p>
        
      </div>
    )

   })}

</div>



  
</div>
  );
}

export default App;
