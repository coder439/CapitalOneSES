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
        <div>
          <h4>{name}</h4>
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
        <div>
          <h4> {fullName}</h4>
          <button
            onClick={() => {
              console.log(fullName);
              viewParkDetails(fullName);
            }}
          >
            {" "}
            view park details
          </button>
          <button
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
    let parkDetailsData = parkDetails.data
    console.log(parkDetailsData)
    var returnArr = []
    if (parkDetailsData){
      if (parkDetailsData.length>0){
        console.log(parkDetailsData.length)
        parkDetailsData.map((parkDatailsDataObj)=>{
          console.log(parkDatailsDataObj)
          const {activities, addresses, contacts, description, designation, directionsInfo, directionsUrl, entranceFees, entrancePasses, fees, fullName, id, images, latLong, latitude, longitude, name, operatingHours, parkCode, states, topic, url, weatherInfo} = parkDatailsDataObj
          console.log(weatherInfo)
          returnArr.push(
            <div>
              <h1> {fullName}</h1>
              <p>{description}</p>
              




            </div>


          )
        })


      }
    }
    return returnArr
      // {parkDetailsData.map((parkDetailsDataObj)=>{
      //   console.log(parkDetailsDataObj)
      // })}



    

    // console.log(parkDetails)
    // var returnArr = [];
    // for (let i = 0; i < parkDetails.length; i++) {
    //   const parkDetail = parkDetails[i];
    //   console.log(parkDetail);
    //   const { designation, fullName, name, parkCode, states, url } =
    //     parkDetail[0];
    //   console.log(designation);
    //   returnArr.push(
    //     <div>
    //       <h1>{fullName}</h1>
    //       <h2>Designation: {designation}</h2>
    //       <h4>Location: {states}</h4>
    //       <h4>Park Code: {parkCode}</h4>
    //       <h4>Link to park's webpage where you can learn more: {url}</h4>
    //     </div>
    //   );
    // }
    // return returnArr;
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
          <h1>Search through all available activities!!</h1>
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
          <h1> View All available parks below</h1>
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
          <h1> View All park details data below</h1>
        </div>
      );
      return returnArr;
    }
  };

  async function createsReload() {
    console.log("in reload");
    const Url =
      "https://developer.nps.gov/api/v1/activities/parks?&api_key=EHqD6lQUXiVN62N3hVIQzyCITN4z8RpAjTh5fu01";
    var copyList = [];
    fetch(Url)
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        var activitiesList = res.data;
        setActivities(activitiesList);
        console.log(activitiesList.length);
        for (let i = 0; i < activitiesList.length; i++) {
          copyList.push(activitiesList[i]);
        }
      });
    //   .then(setParks([]), setWebCams([]), setParkDetails([]));
  }

  console.log("halfway");
  return (
    <div className="background-green">
      <button
        id="reloadButton"
        onClick={() => {
          createsReload();
        }}
      >
        {" "}
        reload
      </button>
      <h6 id="reloadText">
        {" "}
        Please use above reload button instead of the actual reload button
      </h6>

      {viewHeader()}
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
