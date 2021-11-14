import { act } from "react-dom/cjs/react-dom-test-utils.production.min"
import React from 'react'
import { PLACEHOLDERS_FLIPPED_ALIAS } from "@babel/types"
const Header = () => {
    console.log("rerender")
    const Url = "https://developer.nps.gov/api/v1/activities/parks?&api_key=cNYkhRqddA3vLnK07hZ8gSh3XDabrHArxZ8hz5Xc"
    var copyList = []
    fetch(Url)
    .then(data=>{return data.json()})
    .then(res=>{
        var activitiesList = (res.data)
        for (let i = 0; i <activitiesList.length; i++){
            copyList.push(activitiesList[i])
        }

    }).then(console.log(copyList))
    console.log(copyList.length)
    const [activities , setActivities] = React.useState(copyList);
    const [parks, setParks] = React.useState([]);
    const [parkDetails, setParkDetails] = React.useState([]);
    const [webCams, setWebCams] = React.useState([]);
    
    // this.forceUpdate();



    const Url1 = "https://developer.nps.gov/api/v1/activities/parks?&api_key=cNYkhRqddA3vLnK07hZ8gSh3XDabrHArxZ8hz5Xc"
    var copyList = []
    fetch(Url1)
    .then(data=>{return data.json()})
    .then(res=>{
        var activitiesList = (res.data)
        for (let i = 0; i <activitiesList.length; i++){
            copyList.push(activitiesList[i])
        }

    }).
    then(console.log(copyList.length))








   
    React.useEffect(() => {

        setParkDetails(parkDetails)
        setActivities(activities)
        setParks(parks)
        setWebCams(webCams)

    }, [parkDetails, parks, webCams, activities])


    
    const viewImages = (parkCode)=>{
        console.log("inside view Images")
        const URL  ='https://developer.nps.gov/api/v1/webcams?parkCode=' + parkCode + '&&api_key=dNX918hslulco1WPSr7Vcgc8pDFklxHQXVvQvcvk'
        fetch(URL)
        .then(data=> {return data.json()})
        .then(res=>{
            setWebCams(res.data)
            console.log(webCams)
        })
        

    }
    const viewParks = (id)=> {
        let park = activities.filter((activity)=> activity.id == id)
        let parkArray = park[0].parks
        setActivities([])
        setParks(parkArray)
        setParkDetails([])
        parkArray.map((park)=> {
            return (
                <div>
                <p> yoooo</p>
                </div>
            );
        })

    } 
    const viewParkDetails = (fullName)=> {
        const myPromise = new Promise(()=> {
            console.log("in park details")
            const parkDetailObj = parks.filter((park)=> park.fullName == fullName)
            const parkDetailsArr = []
            parkDetailsArr.push(parkDetailObj)
            setParkDetails(parkDetailsArr)
            // console.log(parkDetailsArr)
            setParks([])
            setActivities([])
            

        })

    }
    const viewActivity1 = (activities)=> {
        console.log("activites from activity method")
        console.log(activities)
        var returnArr = []
        for (let i =0; i < activities.length; i++ )
        {
        const activity = activities[i]
        const {id, name, parks} = activity;

        returnArr.push(

            <div >
            <h4>{name}</h4>
            <button onClick = {()=> viewParks(id)}>views for activity</button>
            </div>
        )
        }
        // console.log(parks)
            return returnArr

    }
    const viewAllParks = (parks)=>{
        var returnArr = []
        for (let i  =0; i < parks.length; i++){
            const park = parks[i]
            const {designation, fullName, name, parkCode, states, url} = park;
            returnArr.push(
                    <div >
                        <h4> {fullName}</h4>
                        <button onClick = {()=> {
                            console.log(fullName)
                            viewParkDetails(fullName)  
                            }}> viw parketails</button>
                        <button onClick = {()=> {
                            viewImages(parkCode)
                            
                            }}> view images</button>
                        </div>

                )
        }
        // console.log(returnArr)
        return returnArr
    }
    const viewAllParkDetails = (parkDetails) =>{
        var returnArr = []
        for (let i = 0; i < parkDetails.length; i++){
            const parkDetail = parkDetails[i]
            const {designation, fullName, name, parkCode, states, url} = parkDetail[0];
            returnArr.push(
                <div>
                        <h1>{fullName}</h1>
                        <h2>Designation: {designation}</h2>
                        <h4>Location: {states}</h4>
                        <h4>Park Code: {parkCode}</h4>
                        <h4>Link to park's webpage where you can learn more: {url}</h4>                 
                </div>



            )


        }
        // console.log(returnArr)
        return returnArr
    }
    const viewWebCams = (webCams) => {
        console.log("from webcam method")
        console.log(activities)
        console.log(activities.length)
        var returnArr = []
        for (let i  = 0; i < webCams.length; i++){
            const webCam = webCams[i]

            const {description, images, isStreaming, latitude, longitude, relatedParks, status, statusMessage, tags, title, url} = webCam
            returnArr.push (

                <div>
                    <h1>{description}</h1>
                    <h3>{isStreaming}</h3>

                </div>
            )
        }
        if (returnArr.length == 0 && activities.length == 0 && parks.length == 0 && parkDetails.length == 0){
            return <div> No web cam data available, sorry</div>
        }
        else{
        return returnArr
        }
    }
    const viewHomePage = () =>{


        // const Url = "https://developer.nps.gov/api/v1/activities/parks?&api_key=cNYkhRqddA3vLnK07hZ8gSh3XDabrHArxZ8hz5Xc"
        // var copyList = []
        // console.log("home page")
        // fetch(Url)
        // .then(data=>{return data.json()})
        // .then(res=>{
        //     var activitiesList = (res.data)
        //     for (let i = 0; i <activitiesList.length; i++){
        //         copyList.push(activitiesList[i])
        //     }
        // }).then(setActivities(copyList)).then(
        //     console.log("1"),
        //     setParkDetails([]),
        //     setParks([]),
        //     setWebCams([]),
        //     console.log(activities.length),
        //     console.log("5"),

        //     )


    }




    return (
        <div>
                       <button onClick = {()=> {   
                            viewHomePage() 
                            }}> Refresh/View Activities</button>
            <h1>set activities</h1>
            <h3>Piity</h3>

            
            <h5> whyyy</h5>
            {console.log("before return")}
            
            {viewActivity1(activities)}
        
            {viewAllParks(parks)}
            {viewAllParkDetails(parkDetails)}
            {
            
        
            viewWebCams(webCams)
            
            
            }
            {/* { */}
            </div>
    );

              

            // activities.map((activity) => {
            //     const {id, name, parks} = activity;
            //     console.log(viewActivity1(activity))
            //     // return (
            //     //     viewActivity1(activity)
            //     // )
                
            //     // return (
            //     // <div >
            //     //     <h4>plz help</h4>
            //     //     <h4>{name}</h4>
            //     //     {/* <button onClick = {()=> viewParks(id)}>views for activity</button> */}
            //     //     </div>
            //     // );
            // }),

            
            // parks.map((park)=> {
            //     const {designation, fullName, name, parkCode, states, url} = park;
            //     return (
            //         <div >
            //             <h4> {fullName}</h4>
            //             <button onClick = {()=> {
            //                 console.log(fullName)
            //                 viewParkDetails(fullName)  
            //                 }}> viw parketails</button>
            //             <button onClick = {()=> {
            //                 viewImages(parkCode)
                            
            //                 }}> view images</button>
            //             </div>
            //     );
            // }) ,
            // parkDetails.map((parkDetail)=> {
            //     const {designation, fullName, name, parkCode, states, url} = parkDetail[0];
            //     console.log(parkDetail[0])
            //     return (
            //         <div>
            //             <h1>{fullName}</h1>
            //             <h2>Designation: {designation}</h2>
            //             <h4>Location: {states}</h4>
            //             <h4>Park Code: {parkCode}</h4>
            //             <h4>Link to park's webpage where you can learn more: {url}</h4>
                        
            //             </div>
            //     );
                
            // }),
            // webCams.map((webCam)=> {
            //     const {description, images, isStreaming, latitude, longitude, relatedParks, status, statusMessage, tags, title, url} = webCam
            //     return (

            //         <div>
            //             <h1>{description}</h1>
            //             <h3>{isStreaming}</h3>

            //         </div>
            //     )
            // })}
       
    
        // </div>
    // );

};


// so what we want to do is have an if else for one state (hook)
// two states 
// one would haev curr data one has whole data
// check whats in curr data, using if else, and return accordingly 
// have one backup state w everything  
// create new back button that would set state to default state 



//  {/* <p> dNX918hslulco1WPSr7Vcgc8pDFklxHQXVvQvcvk</p>
//             <p>https://developer.nps.gov/api/v1//activities&api_key=dNX918hslulco1WPSr7Vcgc8pDFklxHQXVvQvcvk</p> */}
//             {/* <button onClick = {() => setActivities([copyList])}>button to click</button> */}

export default Header
