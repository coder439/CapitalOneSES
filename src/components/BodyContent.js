import { act } from "react-dom/cjs/react-dom-test-utils.production.min";
import React from "react";
import "./BodyContent.css";
const BodyContent = () => {
  const [activities, setActivities] = React.useState([]);
  const [parks, setParks] = React.useState([]);
  const [parkDetails, setParkDetails] = React.useState([]);
  const [webCams, setWebCams] = React.useState([]);

  const fetchActivitiesUrl = "https://developer.nps.gov/api/v1/activities/parks?&api_key=q8GWnNoCUOR2WCSbRcNAmBKYbIcN9Qy4zqbcz1JN";
  if (activities.length <= 0  && parks.length <= 0 && parkDetails.length == 0 && webCams.length == 0) {
    fetch(fetchActivitiesUrl)
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        var activitiesList = res.data;
        return setActivities(activitiesList);
      });
  }
  React.useEffect(() => {
  }, [parkDetails, parks, webCams, activities]);

  const viewImages = (parkCode) => {
    const imagesUrl = "https://developer.nps.gov/api/v1/webcams?parkCode=" + parkCode + "&&api_key=EHqD6lQUXiVN62N3hVIQzyCITN4z8RpAjTh5fu01";
    fetch(imagesUrl)
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        if (res.data.length == 0){
          console.log("empty res")
          // res.data.push(
          //   <div> empty</div>
          // )
        }
        setWebCams(res.data); setParks([]); setActivities([]); setParkDetails([])
      });
  };
  const viewParks = (id) => {
    let park = activities.filter((activity) => activity.id == id);
    let parkArray = park[0].parks;
    setActivities([]);
    setParks(parkArray);
    setParkDetails([]);
    setWebCams([])
  };
  const viewParkDetails = (fullName) => {
    const myPromise = new Promise(() => {
      const parkDetailObj = parks.filter((park) => park.fullName == fullName);
      const {designation, fName, name, parkCode, states, url} = parkDetailObj[0]
      const parkDetailsUrl = "https://developer.nps.gov/api/v1/parks?parkCode=" + parkCode + "&api_key=q8GWnNoCUOR2WCSbRcNAmBKYbIcN9Qy4zqbcz1JN"
      fetch(parkDetailsUrl)
      .then((data)=> {
        return data.json()
      })
      .then((res)=> {
         setParkDetails(res); setParks([]); setActivities([]); setWebCams([])
      })
    });
  };

  const viewAllActivities = (activities) => {
    var returnArr = [];
    for (let i = 0; i < activities.length; i++) {
      const activity = activities[i];
      const { id, name, parks } = activity;
      returnArr.push(
        <div className="activities">
          <h2>{name}</h2>
          <button onClick={() => viewParks(id)}>view parks</button>
        </div>
      );
    }
    return returnArr;
  };
  const viewAllParks = (parks) => {
    var parkArray = [];
    for (let i = 0; i < parks.length; i++) {
      const park = parks[i];
      const { designation, fullName, name, parkCode, states, url } = park;
      parkArray.push(
        <div className="parks">
          <h2> {fullName}</h2>
          <button className="button"
            onClick={() => {
              viewParkDetails(fullName);
            }}>
            view park details
          </button>
          <button className="button"
            onClick={() => {
              viewImages(parkCode);
              }}>
              view images
          </button>
        </div>
      );
    }
    return parkArray;
  };
  const viewAllParkDetails = (parkDetails) => {

    const viewParkActivities = (parkActivities)=>{
      var activityStr = ""
       var parkActivitiesArray = []
       parkActivities.map((parkActivity)=> {
         const {id, name} = parkActivity
         activityStr  = activityStr + ", " + name
       })
       activityStr = activityStr.substring(1)
       parkActivitiesArray.push(activityStr)
       return parkActivitiesArray
    };

    const viewOperatingHours = (operatingHours)=>{
      var operatingHoursArray = []
      operatingHours.map((operatingHour)=>
      {
        const {description, exceptions, name, standardHours} = operatingHour;
        operatingHoursArray.push( <p> {description}</p>)
      })
      return operatingHoursArray 
    }
    const viewFees = (fees)=>{
      var feesArray = []
      fees.map((fee)=> {
        const {cost, description, title  } = fee
        feesArray.push
        (
          <div>
              <h6> {title}</h6>
              <h6>{description}</h6>
              <p> Cost: ${cost}</p>
          </div>
        )
      })
    return feesArray
    }
    const viewEmails = (emails)=> {
      var emailsArray = []
      emails.map((email)=> {
        const {descrption, emailAddress} = email
        emailsArray.push
        (
          <p> {emailAddress}</p>
        )
      })
      return emailsArray 
    }
    const viewPhoneNumbers = (phoneNumbers)=>{
      var phoneNumbersArray = []
      phoneNumbers.map((phoneNumberObj)=>{
        const {desciption, extension, phoneNumber, type} = phoneNumberObj
        phoneNumbersArray.push(
          <div>
            <p> {type}: {phoneNumber}</p>
          </div>
        )
      })
      return phoneNumbersArray
    }
    let parkDetailsData = parkDetails.data
    var parkDetailsArray = []
    if (parkDetailsData){
      if (parkDetailsData.length>0){
        console.log(parkDetailsData.length)
        parkDetailsData.map((parkDatailsDataObj)=>{
          console.log(parkDatailsDataObj)
          const {activities, addresses, contacts, description, designation, directionsInfo, directionsUrl, entranceFees, entrancePasses, fees, fullName, id, images, latLong, latitude, longitude, name, operatingHours, parkCode, states, topic, url, weatherInfo} = parkDatailsDataObj
          const {emailAddresses, phoneNumbers} = contacts;
          console.log(latLong)
          parkDetailsArray.push(
            <div>
              <h1> {fullName}</h1>
              <h3> Operating Hours</h3>
              {viewOperatingHours(operatingHours)}
              <h3> Contact Information</h3>
              <h4> {viewEmails(emailAddresses)}</h4>
              <h4> {viewPhoneNumbers(phoneNumbers)}</h4>
              <h3> Description: </h3>
              <p>{description}</p>
              <h3> Weather Information</h3>
              <p> {weatherInfo}</p>
              <h3> Location</h3>
              <p>Latitude Longitude : {latLong}</p>
              <p> State: {states}</p>
              <h3> Fees</h3>
              {viewFees(entranceFees)}
              <h3> Direction Information</h3>
              <p>{directionsInfo}</p>
              <h3> Directions information</h3>
              <p>{directionsUrl}</p>
              <h3> Activities available</h3>
                {viewParkActivities(activities)}
            </div>

          )
        })


      }
    }
    return parkDetailsArray
     
  };
  const viewAllWebCamDetails = (webCams) => {
    var returnArr = [];
    console.log(webCams);
    if (
      activities.length == 0 &&
      parks.length == 0 &&
      webCams.length == 0 &&
      parkDetails.length == 0
    ) {
      console.log("yo yo yo all empty");
      returnArr.push(
        <div>
          <h3>
            {" "}
            Unfortunately, no web cam data is available for this park. Please
            use the reload button above to navigate back to the home page
          </h3>
        </div>
      );
      return returnArr;
    }
    const getImages = (images) => {
      var returnArr1 = [];
      if (images.length == 0) {
        return (
          <div>
            <h4>
              {" "}
              Unfortunately no images are currently available from this specific
              webcam
            </h4>
          </div>
        );
      } else {
        for (let i = 0; i < images.length; i++) {
          console.log(images[i]);
          const {
            imageUrl,
            altText,
            caption,
            credit,
            crops,
            description,
            title,
            url,
          } = images[i];
          console.log(url);
          returnArr1.push(
            <div>
              <h6> image below</h6>
              <img src={url} width="240" height="180" />
            </div>
          );
        }
      }
      return returnArr1;
    };

    for (let i = 0; i < webCams.length; i++) {
      const webCam = webCams[i];
      const {description,id,images,isStreaming,latitude,longitude,relatedParks,status,statusMessage,tags,title,url,} = webCam;

      returnArr.push(
        <div>
          <h2>{title}</h2>
          {getImages(images)}
          <h5> Status: {status}</h5>
          <h6>
            Coordinates of park camera: {latitude} , {longitude}
          </h6>
          <p> Description: {description}</p>
          <p> Related tags: {tags}</p>
          <p> url to site: {url}</p>
        </div>
      );
    }
    return returnArr;
  };
  const viewHeader = () => {
    var returnArr = [];
    console.log(activities.length);
    console.log(parks.length);
    console.log(parkDetails.length);
    console.log(webCams.length);
    if (activities.length != 0 &&parks.length == 0 &&webCams.length == 0 &&parkDetails.length == 0) {
      returnArr.push(
        <div>
          <h1>Search through popular outdoor activities!</h1>
        </div>
      );
      return returnArr;
    } else if (
      activities.length == 0 &&
      parks.length != 0 &&
      webCams.length == 0 &&
      parkDetails.length == 0
    ) {
      returnArr.push(
        <div>
          <h1> View Parks that offer your selected activity</h1>
        </div>
      );
      return returnArr;
    } else if (
      activities.length == 0 &&
      parks.length == 0 &&
      webCams.length != 0 &&
      parkDetails.length == 0
    ) {
      returnArr.push(
        <div>
          <h1> View All web cam data below</h1>
        </div>
      );
      return returnArr;
    } else if (
      activities.length == 0 &&
      parks.length == 0 &&
      webCams.length == 0 &&
      parkDetails.length != 0
    ) {
      returnArr.push(
        <div>
          <h1> View Details of Selected Park</h1>
        </div>
      );
      return returnArr;
    }
  };



  console.log("halfway");
  return (
    <div className="background-green">
      <div className="header">{viewHeader()}</div>
      {viewAllActivities(activities)}

      {viewAllParks(parks)}
      {viewAllParkDetails(parkDetails)}
      {viewAllWebCamDetails(webCams)}
    </div>
  );
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

export default BodyContent;
