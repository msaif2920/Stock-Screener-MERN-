import React, { useState } from "react";
import { useDispatch } from "react-redux";
import addValues from "../actions/addValues";
import { useHistory } from "react-router-dom";
import { Multiselect } from 'multiselect-react-dropdown';

function MarketCap() {
  /*
    *we need useHistory() so when we are moving from compnent
     the redux store state is also passed

     *Dispatch allows us to run the actions
    */
  const history = useHistory();
  const dispatch = useDispatch();

  /*
   *This is our usestate hook
   *It allows us to dynamically change the input values
   */
  const [marketValues, setMarketVals] = useState({
    MarketCapMin: 0,
    MarketCapMax: 5000000,
    PEMin: 0,
    PEMax: 1000,
    OpenMin: 0,
    OpenMax: 10000,
    CloseMin: 0,
    CloseMax: 10000,
    VolumeMin: 0,
    VolumeMax: 100000000,
    ProfitMarginMin: 0,
    ProfitMarginMax: 1,
    ReturnOnEquityMin:0,
    ReturnOnEquityMax: 5,
    DividendShareMin: 0,
    DividendShareMax:10,
    ReturnOnAssestsMin: 0,
    ReturnOnAssestsMax: 5,
    EpsCurrYearMin: 0,
    EpsCurrYearMax: 100,
    PriceBookMin: 0,
    PriceBookMax: 100,
    FiftyTwoWeekHighMin: 0,
    FiftyTwoWeekHighMax: 10000,
    FiftyTwoWeekLowMin: 0,
    FiftyTwoWeekLowMax: 10000

  });

  
  //This array includes all the filtering options we have

  const filterList = [ {name: "Open"}, {name: "ProfitMargin"} , {name:"ReturnOnEquity"},
                       {name: "DividendShare"}, {name: "ReturnOnAssests"}, {name:"EpsCurrYear"},
                       {name: "PriceBook"}, {name: "FiftyTwoWeekHigh"}, {name: "FiftyTwoWeekLow"},
                       {name: "MarketCap"}, {name: "PE"} , {name:"Close"},{name: "Volume"}]


  //This is our intially selected Criteria and won't be shown in the list of filter
  //unless its x'ed out                       
  const initialyAdded = [{name: "MarketCap"}, {name: "PE"} , {name:"Close"},
                         {name: "Volume"}]


  //This contains all our filters lists
   const [filters, setFilter] = useState({
         values: [...filterList]
    })

   /*
   * This UseState does all the magic
   * This hold information on which value is currently selected
   * It helps us update the elements in the screen
   * We can remove or add and its handled by this state 
   */
   const [selected, setSelected] = useState({
     values:[...initialyAdded]
   });




  /*Callback Functions for our dropdown options
   *This basically has a parameter with currenly seleted value
   *Those values are stored as an array in selectedList
   *So we basically put that in our selected state
   *Thus it automatically updates our state
  */
  
  function onSelect(selectedList, selectedItem){
    setSelected({values: [...selectedList]});
  }

  //Kind of does the same thing
  function onRemove(selectedList, RemovedItem){
    setSelected({values: [...selectedList]});
  }

  /*
  *Callback for all state Management system
  *Basically it takes care of holding info for the search
  *It has been reduced to very small function
  */
  function capChange(event){
    let name = event.target.name;
    let id = event.target.id;
    let value = event.target.value;
    let stateMin = name+"Min";
    let stateMax = name+"Max"
    
    
    if(id === "min"){
      setMarketVals((prevValue) => ({...prevValue, [stateMin]: value}))

    }else{
      setMarketVals((prevValue) => ({...prevValue, [stateMax]: value}))
    }
    console.log(marketValues);
  }


  /*
  * We use this to create a field each time
  * In the render we map through and pass values
  * The values are selected values from UseState
  * Then we pass the name of the field
  * We use concatination to make it controlled component
  */
  function createFilters(value){
    let minName = value.name+"Min"
    let maxName = value.name+"Max"

 
    return (
      <div key= {value.name} className="filterTweak">
      <h6>{value.name}</h6>
       <label for="min">Min:  </label>
       <input
         className="filterTweak"
         onChange={capChange}
         id="min"
         type="number"
         name={value.name}
        value={marketValues[minName]}
       ></input>
       <label for="max">Max: </label>
       <input
         className="filterTweak" 
         onChange={capChange}
         id="max"
         type="number"
         name={value.name}
        value={marketValues[maxName]}
       ></input>
      </div>
    );
  }

   //From here we move to next component which returns the results
   function submit(event) {
    event.preventDefault();
    console.log("Hello");

    dispatch(addValues(marketValues));
    history.push("/returnedCompanies");
  }

  //All the rendering happens here
  return (
    <div>

      <form onSubmit={submit}>
         <div>
           {selected.values.map(createFilters)}

           </div>


        <input type="submit" value="Search" className="search btn btn-primary" ></input>
      </form>
      {/* Multiselect is a npm library */}
      <Multiselect
      className="filterTweak"
      options={filters.values} // Options to display in the dropdown
      selectedValues={selected.values} // Preselected value to persist in dropdown
      onSelect={onSelect} // Function will trigger on select event
      onRemove={onRemove} // Function will trigger on remove event
      displayValue="name" // Property name to display in the dropdown options
/>
    </div>
  );
}

export default MarketCap;
