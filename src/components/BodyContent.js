import { act } from "react-dom/cjs/react-dom-test-utils.production.min";
import React from "react";
import "./BodyContent.css";
const BodyContent = () => {
  var copyList = [];
  const [activities, setActivities] = React.useState([]);
  const [parks, setParks] = React.useState([]);
  const [parkDetails, setParkDetails] = React.useState([]);
  const [webCams, setWebCams] = React.useState([]);

  console.log("rerender");
  const Url =
    "https://developer.nps.gov/api/v1/activities/parks?&api_key=q8GWnNoCUOR2WCSbRcNAmBKYbIcN9Qy4zqbcz1JN";

  if (activities.length <= 0  && parks.length <= 0 && parkDetails.length == 0 && webCams.length == 0) {
    fetch(Url)
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        //   console.log(res);
        var activitiesList = res.data;
        console.log("ASDFSDF");
        console.log(activitiesList);

        for (let i = 0; i < activitiesList.length; i++) {
          copyList.push(activitiesList[i]);
        }
        return setActivities(activitiesList);
      });
  }

  React.useEffect(() => {
    console.log("Hi");
    // setParkDetails(parkDetails)
  }, [parkDetails, parks, webCams, activities]);

  const viewImages = (parkCode) => {
    console.log("inside view Images");
    console.log(parkCode);
    const URL =
      "https://developer.nps.gov/api/v1/webcams?parkCode=" +
      parkCode +
      "&&api_key=EHqD6lQUXiVN62N3hVIQzyCITN4z8RpAjTh5fu01";
    fetch(URL)
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        setWebCams(res.data);
        setParks([])
        setActivities([])
        setParkDetails([])
        console.log(webCams);
      });
    //   .then(setActivities([]), setParks([]), setParkDetails([]));
  };
  const viewParks = (id) => {
    let park = activities.filter((activity) => activity.id == id);
    let parkArray = park[0].parks;
    setActivities([]);
    setParks(parkArray);
    setParkDetails([]);
    parkArray.map((park) => {
      return (
        <div>
          <p> yoooo</p>
        </div>
      );
    });
  };
  const viewParkDetails = (fullName) => {
    const myPromise = new Promise(() => {
      console.log("in park details");
      const parkDetailObj = parks.filter((park) => park.fullName == fullName);
      console.log(parkDetailObj[0])
      const {designation, fName, name, parkCode, states, url} = parkDetailObj[0]
      console.log(parkCode)
      
      const parkDetailsUrl = "https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=q8GWnNoCUOR2WCSbRcNAmBKYbIcN9Qy4zqbcz1JN"
      fetch(parkDetailsUrl)
      .then((data)=> {
        return data.json()
      })
      .then((res)=> {
        console.log(res)
         setParkDetails(res)
         setParks([])
         setActivities([])
         setWebCams([])
      })
      // const parkDetailsArr = [];
      // parkDetailsArr.push(parkDetailObj);
      // setParkDetails(parkDetailsArr);

      // console.log(parkDetailsArr);
    });
  };

  const viewActivity1 = (activities) => {
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
    console.log(parks);
    return returnArr;
  };
  const viewAllParks = (parks) => {
    console.log("park data below");
    console.log(parks);
    var returnArr = [];
    for (let i = 0; i < parks.length; i++) {
      const park = parks[i];
      const { designation, fullName, name, parkCode, states, url } = park;
      returnArr.push(
        <div className="parks">
          <h2> {fullName}</h2>
          <button className="button"
            onClick={() => {
              console.log(fullName);
              viewParkDetails(fullName);
            }}
          >
            view park details
          </button>
          <button className="button"
            onClick={() => {
              viewImages(parkCode);
            }}
          >
            {" "}
            view images
          </button>
        </div>
      );
    }

    console.log(returnArr);
    return returnArr;
  };
  const viewAllParkDetails = (parkDetails) => {
    const viewParkActivities = (parkActivities)=>{
      //  console.log("here")
      var activityStr = ""
       var returnArr1 = []
       parkActivities.map((parkActivity)=> {
         const {id, name} = parkActivity
         activityStr  = activityStr + ", " + name
       })
       console.log(returnArr1)
       activityStr = activityStr.substring(1)
       returnArr1.push(activityStr)

       return returnArr1

    };
    const viewOperatingHours = (operatingHours)=>{
      console.log("here")
      var returnArr2 = []
      
      operatingHours.map((operatingHour)=>{
        const {description, exceptions, name, standardHours} = operatingHour;
        returnArr2.push(
          <p> {description}</p>
  
        )

      })


      return returnArr2 

    }
    const viewFees = (fees)=>{
      var returnArr3 = []
    fees.map((fee)=> {
      const {cost, description, title  } = fee
      returnArr3.push(
        <div>
            <h6> {title}</h6>
            <h6>{description}</h6>
            <p> Cost: ${cost}</p>
        </div>

      )

    })
    return returnArr3
    }
    const viewEmails = (emails)=> {
      var returnArr4 = []
      emails.map((email)=> {
        const {descrption, emailAddress} = email
        returnArr4.push(
          <p> {emailAddress}</p>
        )

      })
      return returnArr4
    }
    const viewPhoneNumbers = (phoneNumbers)=>{
      var returnArr5 = []
      phoneNumbers.map((phoneNumberObj)=>{
        const {desciption, extension, phoneNumber, type} = phoneNumberObj
        returnArr5.push(
          <div>
            <p> {type}: {phoneNumber}</p>
          </div>
        )
      })
      return returnArr5

    }
    
    let parkDetailsData = parkDetails.data
    console.log(parkDetailsData)
    var returnArr = []
    if (parkDetailsData){
      if (parkDetailsData.length>0){
        console.log(parkDetailsData.length)
        parkDetailsData.map((parkDatailsDataObj)=>{
          console.log(parkDatailsDataObj)
          const {activities, addresses, contacts, description, designation, directionsInfo, directionsUrl, entranceFees, entrancePasses, fees, fullName, id, images, latLong, latitude, longitude, name, operatingHours, parkCode, states, topic, url, weatherInfo} = parkDatailsDataObj
          const {emailAddresses, phoneNumbers} = contacts;
          console.log(latLong)
          returnArr.push(
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
    return returnArr
     
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
      const {
        description,
        id,
        images,
        isStreaming,
        latitude,
        longitude,
        relatedParks,
        status,
        statusMessage,
        tags,
        title,
        url,
      } = webCam;
      console.log(description);
      console.log(images);
      console.log(isStreaming);
      console.log(longitude);
      console.log(latitude);
      console.log(relatedParks);
      console.log(status);
      console.log(statusMessage);
      console.log(tags);
      console.log(title);
      console.log(url);
      returnArr.push(
        <div>
          <h2>{title}</h2>
          {/* var img = document.createElement('img') */}
          {/* img.src = {images[0]} */}
          {/* document.getElementById('root').appendChild(img) */}
          {getImages(images)}

          <h5> Status: {status}</h5>
          <h6>
            {" "}
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
    if (
      activities.length != 0 &&
      parks.length == 0 &&
      webCams.length == 0 &&
      parkDetails.length == 0
    ) {
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
      {viewActivity1(activities)}

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