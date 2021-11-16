import React from "react";
import "./BodyContent.css";
const BodyContent = () => {
  // setting up useState hooks
  const [activities, setActivities] = React.useState([]);
  const [parks, setParks] = React.useState([]);
  const [parkDetails, setParkDetails] = React.useState([]);
  const [webCams, setWebCams] = React.useState([]);
  // if all state arrays are empty, fetch activities and use them to set the activities state
  const fetchActivitiesUrl = "https://developer.nps.gov/api/v1/activities/parks?&api_key=q8GWnNoCUOR2WCSbRcNAmBKYbIcN9Qy4zqbcz1JN";
  if (activities.length <= 0  && parks.length <= 0 && parkDetails.length == 0 && webCams.length == 0) {
    fetch(fetchActivitiesUrl)
      .then((data) => 
      {
        return data.json();
      })
      .then((res) => 
      {
        let activitiesList = res.data;
        return setActivities(activitiesList);
      });
  }
  // set up useEffect hook
  React.useEffect(() => {}, [parkDetails, parks, webCams, activities]);
  // below are the functions that fetch data and set the state data accordingly
  // function to fetch webCam data and setWebCams state
  const viewWebCams = (parkCode) => 
  {
    const webCamUrl = "https://developer.nps.gov/api/v1/webcams?parkCode=" + parkCode + "&&api_key=EHqD6lQUXiVN62N3hVIQzyCITN4z8RpAjTh5fu01";
    fetch(webCamUrl)
      .then((data) => 
      {
        return data.json();
      })
      .then((res) => 
      {
        if (res.data.length == 0)
        {
          res.data.push(5)
        }
        setWebCams(res.data); setParks([]); setActivities([]); setParkDetails([])
      });
  };
  // function to access the parks specific to an activity selected by an user and set parks state accordingly
  const viewParks = (id) => 
  {
    let parksData = activities.filter((activity) => activity.id == id);
    let parkArray = parksData[0].parks;
    setActivities([]);
    setParks(parkArray);
    setParkDetails([]);
    setWebCams([])
  };
  // function to retrieve additional information for park and set parksDetails state accordingly
  const viewParkDetails = (fullName) => 
  {
    const myPromise = new Promise(() => 
    {
      const parkDetailObj = parks.filter((park) => park.fullName == fullName);
      const {designation, fName, name, parkCode, states, url} = parkDetailObj[0]
      const parkDetailsUrl = "https://developer.nps.gov/api/v1/parks?parkCode=" + parkCode + "&api_key=q8GWnNoCUOR2WCSbRcNAmBKYbIcN9Qy4zqbcz1JN"
      fetch(parkDetailsUrl)
      .then((data)=> 
      {
        return data.json()
      })
      .then((res)=> 
      {
         setParkDetails(res); setParks([]); setActivities([]); setWebCams([])
      })
    });
  };
  // below are the functions that use the data in the current state to populate the DOM
  // below function populates the DOM with a list of all activities
  const viewAllActivities = (activities) => 
  {
    let allActivitiesArray = [];
    for (let i = 0; i < activities.length; i++) 
    {
      const activity = activities[i];
      const { id, name, parks } = activity;
      let stringKey = i.toString()
      allActivitiesArray.push
      (
        <div className="activities" key={stringKey}>
          <h2 className="tileTitle">{name}</h2>
          <button onClick={() => viewParks(id)}>view parks</button>
        </div>
      );
    }
    return allActivitiesArray;
  };
  // below function populates the DOM with a list of all parks
  const viewAllParks = (parks) => 
  {
    let parkArray = [];
    for (let i = 0; i < parks.length; i++) 
    {
      const park = parks[i];
      const { designation, fullName, name, parkCode, states, url } = park;
      parkArray.push
      (
        <div className="parks">
          <h2 className="tileTitle"> {fullName}</h2>
          <button className="button"
            onClick={() => {
              viewParkDetails(fullName);
            }}>
            view park details
          </button>
          <button className="button"
            onClick={() => {
              viewWebCams(parkCode);
              }}>
              view images
          </button>
        </div>
      );
    }
    return parkArray;
  };
  // below function populates the DOM with all the park details information
  const viewAllParkDetails = (parkDetails) => 
  {
    // below is a helper function used by viewAllParkDetails to access a string of all available activities for a specific park
    const viewParkActivities = (parkActivities)=>
    {
      let activitiesStr = ""
      let parkActivitiesArray = []
      parkActivities.map((parkActivity)=> {
         const {id, name} = parkActivity
         activitiesStr  = activitiesStr + ", " + name
      })
      activitiesStr = activitiesStr.substring(1)
       parkActivitiesArray.push(activitiesStr)
       return parkActivitiesArray
    };
    // below is a helper function used by viewAllParkDetails to parse through the list of all operating hours for a specific park
    const viewOperatingHours = (operatingHours)=>
    {
      let operatingHoursArray = []
      operatingHours.map((operatingHour)=>
      {
        const {description, exceptions, name, standardHours} = operatingHour;
        operatingHoursArray.push( <p> {description}</p>)
      })
      return operatingHoursArray 
    }
    // below is a helper function used by viewAllParkDetails to parse through the list of all fees for a specific park
    const viewFees = (fees)=>
    {
      let feesArray = []
      fees.map((fee)=> 
      {
        const {cost, description, title} = fee
        feesArray.push
        (
          <div>
              <h4> {title}</h4>
              <p>{description}</p>
              <p> Cost: ${cost}</p>
          </div>
        )
      })
    return feesArray
    }
    // below is a helper function used by viewAllParkDetails to parse through the list of all emails for a specific park
    const viewEmails = (emails)=> 
    {
      let emailsArray = []
      emails.map((email)=> 
      {
        const {descrption, emailAddress} = email
        emailsArray.push
        (
          <p> {emailAddress}</p>
        )
      })
      return emailsArray 
    }
    // below is a helpful function used by viewAllParkDetails to parse through a list of all phone numbers for a specific park
    const viewPhoneNumbers = (phoneNumbers)=>
    {
      let phoneNumbersArray = []
      phoneNumbers.map((phoneNumberObj)=>
      {
        const {desciption, extension, phoneNumber, type} = phoneNumberObj
        phoneNumbersArray.push
        (
          <div>
            <p> {type}: {phoneNumber}</p>
          </div>
        )
      })
      return phoneNumbersArray
    }
    let parkDetailsData = parkDetails.data
    let parkDetailsArray = []
    if (parkDetailsData)
    {
      if (parkDetailsData.length>0)
      {
        parkDetailsData.map((parkDatailsDataObj)=>
        {
          const {activities, addresses, contacts, description, designation, directionsInfo, directionsUrl, entranceFees, entrancePasses, fees, fullName, id, images, latLong, latitude, longitude, name, operatingHours, parkCode, states, topic, url, weatherInfo} = parkDatailsDataObj
          const {emailAddresses, phoneNumbers} = contacts;
          // adding all the parkDetails as a jsx element to the parkDetailsArray (which is returned by the function)
          parkDetailsArray.push
          (
            <div>
              <div className="detailsContent">
              <h1> {fullName}</h1>
              </div>
              <div className="detailsContent">
              <h3> Operating Hours</h3>
              {viewOperatingHours(operatingHours)}
              </div>
              <div className="detailsContent">
              <h3> Contact Information</h3>
              <h4> {viewEmails(emailAddresses)}</h4>
              <h4> {viewPhoneNumbers(phoneNumbers)}</h4>
              </div>
              <div className="detailsContent">
              <h3> Description: </h3>
              <p>{description}</p>
              </div>
              <div className="detailsContent">              
                <h3> Weather Information</h3>
              <p> {weatherInfo}</p>
              </div>
              <div className="detailsContent">
                <h3> Location</h3>
              <p>Latitude Longitude : {latLong}</p>
              <p> State: {states}</p>
              </div>
              <div className="detailsContent">
              <h3> Fees</h3>
              {viewFees(entranceFees)}
              </div>
              <div className="detailsContent">
              <h3> Direction Information</h3>
              <p>{directionsInfo}</p>
              </div>
              <div  className="detailsContent">
              <h3> Directions Link</h3>
              <p>{directionsUrl}</p>
              </div>
              <div  className="detailsContent">
              <h3> Activities available</h3>
                {viewParkActivities(activities)}
              </div>
            </div>
          )
        })
      }
    }
    return parkDetailsArray
  };
  // below function populates the DOM with all the web cam information
  const viewAllWebCamDetails = (webCams) => 
  {
    let webCamDetailsArr = [];
    if ( webCams.length >0  && webCams[0] === 5) 
    {
      webCamDetailsArr.push
      (
        <div>
          <h3>
            Unfortunately, no web cam data is available for this park. 
          </h3>
          <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br> <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
          <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br> <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
          <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br> <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>    
        </div>
      );
      return webCamDetailsArr;
    }
    // below function is a helper function used by viewAllWebCamDetails to parse through a list of images specific to the webcam
    const getImages = (images) => {
      let imagesArray = [];
      if (images.length == 0) {
        return (
          <div>
            <h4>
              Unfortunately no images are currently available from this specific
              webcam.
            </h4>
          </div>
        );
      } 
      else 
      {
        for (let i = 0; i < images.length; i++) {
          const {imageUrl, altText, caption, credit, crops, description,title, url,} = images[i];
          imagesArray.push
          (
            <div>
              <img src={url} width="240" height="180" />
            </div>
          );
        }
      }
      return imagesArray;
    };
    // below is a helper function used by viewAllWebCamDetails to parse through a list of all tags specific to a webcam
    const getTags = ((tags)=> 
    {
      let tagsArray = []
      let tagsString   = ""
      for (let i = 0; i <tags.length; i++)
      {
        tagsString = tagsString + ", " + tags[i]
      }
      tagsString = tagsString.substring(1)
      tagsArray.push(tagsString)
      return tagsArray
    })
    for (let i = 0; i < webCams.length; i++) 
    {
      const webCam = webCams[i];
      const {description,id,images,isStreaming,latitude,longitude,relatedParks,status,statusMessage,tags,title,url,} = webCam;
      webCamDetailsArr.push(
        <div className="imageTile">
          <h2>{title}</h2>
          <h5> Status: {status}</h5>
          {getImages(images)}
          <h6>
            Coordinates of park camera: {latitude} , {longitude}
          </h6>
          <p className="descriptionText"> Description: {description}</p>
          <p className="descriptionText"> Related tags: {getTags(tags)}</p>
          <p className="descriptionText">  Site Link: {url}</p>
        </div>
      );
    }
    return webCamDetailsArr;
  };
  // below is a function that populates the title based on the current state of the app
  const viewTitle = () => 
  {
    let titleArray = [];
    if (activities.length != 0 &&parks.length == 0 &&webCams.length == 0 &&parkDetails.length == 0) 
    {
      titleArray.push
      (
        <div>
          <h1 className="tileTitle">Search Through Popular Activities!</h1>
        </div>
      );
      return titleArray;
    } else if (activities.length == 0 && parks.length != 0 && webCams.length == 0 && parkDetails.length == 0) 
    {
      titleArray.push
      (
        <div>
          <h1 className="tileTitle"> View Parks That Offer Your Selected Activity</h1>
        </div>
      );
      return titleArray;
    } else if (activities.length == 0 && parks.length == 0 && webCams.length != 0 && parkDetails.length == 0) 
    {
      titleArray.push
      (
        <div>
          <h1 className="tileTitle"> View Images From Our Web Cams</h1>
        </div>
      );
      return titleArray;
    } 
    else if (activities.length == 0 && parks.length == 0 && webCams.length == 0 && parkDetails.length != 0) 
    {
      titleArray.push
      (
        <div>
          <h1 className="tileTitle">View Details of Selected Park</h1>
        </div>
      );
      return titleArray;
    }
  };
  // below is the return statement for the component which assists in returning the data for the component
  return (
    <div className="background-green">
      <div className="header">{viewTitle()}</div>
      {viewAllActivities(activities)}

      {viewAllParks(parks)}
      {viewAllParkDetails(parkDetails)}
      {viewAllWebCamDetails(webCams)}
    </div>
  );
};
export default BodyContent;