var userEmailReg,userPasswordReg,userAddressReg,userCompanyNameReg,userLicenseNumberReg,userPhoneReg,userDistanceReg;
var garageBrands=[],currentUserUid,directionsArr =[],checks=[],marker,currGarageName,supportUnitsUid = [];
var userProblemType=['puncture','battery','gas','breakage','towing'],employeersNameFirebase=[];
var  userInfo={},latitude,longitude,directionsDisplay, infoBox,problemaKey;
var snapAll = {},distanceValue,markersArr=[],markersPoints=[],currGarageDistance,circle;
let arr = [],infoWindowPoints,markerWithProblem;
var imgpath2 = "../Images/car.png";
var image2 = {
    url: imgpath2,
   // size: new google.maps.Size(100, 60),
    scaledSize: new google.maps.Size(35, 35),
     //origin: new google.maps.Point(-35, 0)
};

var imageCarService ={url:"../Images/pointsOnMap/workshop.png", scaledSize: new google.maps.Size(40, 35)};
var imageCarInsurance = {url:"../Images/pointsOnMap/carrinsurance.png", scaledSize: new google.maps.Size(35, 35),};
var imageCarWashes = {url:"../Images/pointsOnMap/carwash.png", scaledSize: new google.maps.Size(35, 35),};
var imageCarRental = {url:"../Images/pointsOnMap/carrental.png", scaledSize: new google.maps.Size(35, 35),};
var  image ={url:"../Images/marker.png"};

initilizationEmpty();

searchLocation();
authOnStateChanged();
function initilizationEmpty() {
    console.log("initilization without marker is started");
    map2 = new google.maps.Map(document.getElementById('gmaps'), {
        zoom: 9,
        center: {lat: 31.7683, lng: 35.2137},
        mapTypeControl: true,
        mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
    });
    showTraffic()

}

function initilizationMarker(lat, lng) {
    console.log('initilization Main is started');
    var start = {lat: lat, lng: lng};

        map2 = new google.maps.Map(document.getElementById('gmaps'), {
            zoom: 11,
            center: start,
            mapTypeControl: true,
            mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
        });


        marker = new  MarkerWithLabel({
            map: map2,
            position: start,
            icon: image,
            labelContent: 'My Garage', // подтянуть название гаража
            labelAnchor: new google.maps.Point(43, 0),
            labelClass: "label my-custom-class-for-label-garage", // your desired CSS class
            labelInBackground: true
        });
    zoomListenerChangeMarkerSize();
        showTraffic()
        animateMarker();
    drawCirclefromDistance(currGarageDistance);
    }

    function searchLocation() {
        var positionOptions = { timeout: 10000 };
        window.onload = function () {
            // Если функциональность геолокации доступна,
            // пытаемся определить координаты посетителя
            if (navigator.geolocation) {
                // Передаем две функции
                navigator.geolocation.getCurrentPosition(
                    geolocationSuccess, geolocationFailure,positionOptions)
            }
            else {
                // Выводим результат\
                console.log("локация не определяется")
            }
        }
    }
function geolocationSuccess(position) {
    latitude = position.coords.latitude;
        longitude = position.coords.longitude;
    initilizationMarker(latitude,longitude);
}
function geolocationFailure(positionError) {
   console.log('Ошибка определения геолокации');
    console.log(positionError);
    searchLocation()
}

function authOnStateChanged() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {

            deleteDirectionsAndMarkers();

            $(document).ready(function () {
                $("#box1-1").hide();
                $("#box1-2").show();
            });
            user = firebase.auth().currentUser;
            console.log("user signed = " + user.email);
            if (user != null) {
                currentUserUid = firebase.auth().currentUser.uid;
                console.log(currentUserUid);
                firebaseProblemsAddedListener();
                listenerChanged();
                listenerRemoved();


                var ref = firebase.database().ref('Services/' + currentUserUid); // запрашиваю данные гаража
                ref.once("value").then(function (snapshot) {
                    currGarageDistance = (+snapshot.val().distance) *1000;
                    currGarageName = snapshot.val().name;
                    console.log('currGarageName = '+ currGarageName);
                })}}
        else
        {
            $(document).ready(function () {
                $("#box1-2").hide();
                $("#box1-1").show();
            });
            if(circle === undefined){
            } else  circle.setMap(null);
            deleteDirectionsAndMarkers();
            console.log("No user signed");
        }
    });
}

    function firebaseProblemsAddedListener(){

            let reqUserUid,snapGetProblems ={},snapGetProblemsKey;
            const ref = firebase.database().ref('Problems/New');//слушатель проблем
            ref.on('child_added', function (snapshot) {
                   snapGetProblems = snapshot.val();
                snapGetProblemsKey = snapshot.key;
              //  console.log(snapGetProblems)
                reqUserUid = snapGetProblems.requestingUser;
                arr.push(reqUserUid);
                let problemType = snapGetProblems.problemType, description = snapGetProblems.description, lat = snapGetProblems.lat, lng = snapGetProblems.lng;
                snapAll[snapGetProblemsKey] = {description, lat, lng, reqUserUid,problemType};
                console.log(snapAll);

                arr.forEach(function (i) {
                    firebase.database().ref("Users/" + i).once('value').then(function (snapshot) {
                        let snap = snapshot.val();
                        let name = snap.name + " " + snap.surname;
                        let phone = snap.phone;
                        let userCar = snap.car;
                        userInfo[i] = {name, phone, userCar}
                        console.log(userInfo)
                    });

                })
            });
    }

    function listenerChanged() {
        let reqUserUid;
        try {
            const ref = firebase.database().ref('Problems/New');//слушатель проблем
            ref.on('child_changed', function (snapshot) {
                reqUserUid = snapshot.val().requestingUser;
                arr.push(reqUserUid);
                let problemType = snapshot.val().problemType;
                let description = snapshot.val().description;
                let lat = snapshot.val().lat;
                let lng = snapshot.val().lng;
                snapAll[snapshot.key] = {description, lat, lng, reqUserUid,problemType};
                console.log("changed");
                console.log(snapshot.val());
                deleteDirectionsAndMarkers();
               searchClientsProblem()
            });
        } catch (e) {
        }
    }

    function listenerRemoved() {
        let reqUserUid;
        try {
            const ref = firebase.database().ref('Problems/New');//слушатель проблем
            ref.on('child_removed', function (snapshot) {
                reqUserUid = snapshot.val().requestingUser;
                // arr.push(reqUserUid);
                // let description = snapshot.val().description;
                // let lat = snapshot.val().lat;
                // let lng = snapshot.val().lng
                delete  snapAll[snapshot.key];
                console.log("removed");
                console.log(snapAll);
                deleteDirectionsAndMarkers();
               searchClientsProblem()
            });
        } catch (e) {
        }
    }










function zoomListenerChangeMarkerSize() {
    google.maps.event.addListener(map2, 'zoom_changed', function () {

        var pixelSizeAtZoom0 = 10; //the size of the icon at zoom level 0
        var maxPixelSize = 30; //restricts the maximum size of the icon, otherwise the browser will choke at higher zoom levels trying to scale an image to millions of pixels

        var zoom = map2.getZoom(),relativePixelSize = Math.round(pixelSizeAtZoom0 * Math.pow(2, zoom)); // use 2 to the power of current zoom to calculate relative pixel size.  Base of exponent is 2 because relative size should double every time you zoom in

        if (relativePixelSize > maxPixelSize) //restrict the maximum size of the icon
            relativePixelSize = maxPixelSize;

        marker.setIcon(
            new google.maps.MarkerImage(
                marker.getIcon().url, //marker's same icon graphic
                null,//size
                null,//origin
                null, //anchor
                new google.maps.Size(relativePixelSize, relativePixelSize) //changes the scale
            )
        );
        setMarkersIconSize(markersArr) // listener для Гаражей
        setMarkersIconSize(markersPoints);// listener для Points On Map

        function setMarkersIconSize (array){
            for(let i=0;i<array.length;i++){
                array[i].setIcon(
                    new google.maps.MarkerImage(
                        array[i].getIcon().url, //marker's same icon graphic
                        null,//size
                        null,//origin
                        null, //anchor
                        new google.maps.Size(relativePixelSize, relativePixelSize) //changes the scale
                    )
                );
            }
        }
    });
}

function showTraffic(){
        var trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map2);
}

function login() {
     let   userEmailLog = document.getElementById("email_log").value , userPasswordLog = document.getElementById("password_log").value;
        firebase.auth().signInWithEmailAndPassword(userEmailLog, userPasswordLog).catch(function (error) {
            console.log("Error : " + error.message);
        });
    }

    function registration1() {
        userEmailReg = document.getElementById("emailReg").value;
        userPasswordReg = document.getElementById("passwordReg").value;
        userAddressReg = document.getElementById("addressReg").value;
        userCompanyNameReg = document.getElementById("nameReg").value;
        userLicenseNumberReg = document.getElementById("licenseReg").value;
        userPhoneReg = document.getElementById("phoneReg").value;
        userDistanceReg = +document.getElementById("distanceWork").value;

        drawCirclefromDistance(userDistanceReg);

        firebase.auth().createUserWithEmailAndPassword(userEmailReg, userPasswordReg).catch(function (error) {
            console.log(error.message);
            console.log(error.code)
        });
    }
    function registration2() {
         checks = document.getElementsByClassName("checks");
        console.log(checks);
        for (let i = 0; i < checks.length; i++) {
           if (checks[i].checked === true) {
                console.log(checks[i].checked.value);
                garageBrands.push(checks[i].value);
            }
        }
        firebase.database().ref('Services/' + currentUserUid).set({
            "name": userCompanyNameReg,
            "email": userEmailReg,
            "address": userAddressReg,
            "phone": userPhoneReg,
            "rate": "0",
            "distance": userDistanceReg,
            "works": garageBrands,
            "license": userLicenseNumberReg,
        });

        firebase.database().ref('PlacesOnMap/CarService/' + userCompanyNameReg).set({
            "name": userCompanyNameReg,
            "email": userEmailReg,
            "address": userAddressReg,
            "phone": userPhoneReg,
            "rate": "0",
            "works": garageBrands,
            "license": userLicenseNumberReg,
            'shabbat': false,
            'lat':latitude,
            'lng':longitude
        });
    }

    function logout() {
        firebase.auth().signOut().then(function () {
            $(document).ready(function () {
                $("#box1-2").hide();
                $("#box1-1").show();
                circle.setMap(null)
            })
        }).catch(function (error) {
            window.alert(error.message);
            console.log(error.message);
        });
    }

    function searchClientsProblem() {
        deleteDirectionsAndMarkers();
        //  console.log(snapAll)// здесь лежат инфа о проблемах
        //   console.log(arr) // здесь userUid
        //    for (let t = 0; t < arr.length; t++) { // запрашиваю данные юзера
        //        let userTmp = arr[t];
        //        firebase.database().ref("Users/" + userTmp).once('value').then(function (snapshot) {
        //            let name = snapshot.val().name + " " + snapshot.val().surname;
        //            let phone = snapshot.val().phone;
        //            let userCar = snapshot.val().car;
        //            userInfo[userTmp] = {name, phone, userCar}
        //        });
        //    }
        let reqUser;
        if (snapAll.hasOwnProperty() === 0) {     // ЕСЛИ ПРОБЛЕМ НЕТ В ПАПКЕ NEW
            console.log('No problems')}
        else {
            for (var key in snapAll) {
                reqUser = snapAll[key].reqUserUid;
                for (var uids in userInfo) {
                    if (reqUser === uids) {
                        createMarker(snapAll[key].lat, snapAll[key].lng, snapAll[key].description, userInfo[uids].name, userInfo[uids].phone, snapAll[key].problemType);
                        problemaKey = key
                    }
                }
            }
        }
    }

function createMarker(lat1,lng1,description,name,phone,probType) {
    let problemString;

    for (let i = 0; i < userProblemType.length; i++) {
        if (i + 1 === probType) {
            problemString = userProblemType[i];
        }
    }
    markerWithProblem = new MarkerWithLabel({
        position: {lat: lat1, lng: lng1},
        title: description,
        icon: image2,
        optimized: false,
        userName: name,
        userPhone: phone,
        map: map2,
        labelContent: problemString,
        labelAnchor: new google.maps.Point(43, 4),
        labelClass: "label my-custom-class-for-label-user", // your desired CSS class
        labelInBackground: true
    });
   // google.maps.event.addListener(map2,'click',removeInfoBox());

    markersArr.push(markerWithProblem);


let supportUnitsSnapshot;
    var fb = firebase.database();
    fb.ref('Services/' + currentUserUid+'/supportUnits').once('value').then(function(snapshot) { // получаею инфу о своих эвакуаторщиках
       supportUnitsSnapshot = snapshot.val(); //верно
    }).then(function () {
        for(key in supportUnitsSnapshot){ //ПОЛУЧАЮ ИХ UID
            supportUnitsUid.push(key); // верно
        }
        console.log(supportUnitsUid)
    }).then(function () {
        for( let z=0;z<supportUnitsUid.length;z++){
            fb.ref('Users/' + supportUnitsUid[z]).once('value').then(function (snap) {
                employeersNameFirebase.push(snap.val().name + " " + snap.val().surname); //имена эвакуаторщиков
            });
        }
    });
console.log(employeersNameFirebase); // здесь хранятся ИМЕНА SupportUnits
        google.maps.event.addListener(markerWithProblem, 'click', function () {

        if(employeersNameFirebase.length ===1){
            var cont =
                '<div id="contentInfo"> ' +
                '<p><em>Name: </em>' + markerWithProblem.userName + '</p>' +
                '<p><em>Phone: </em>' + markerWithProblem.userPhone + '</p>' +
                '<p><em>Distance: </em>' + distance(lat1, lng1) + 'km' + '</p>'+
                '<div class="employeesDiv"><input class="employee" type="radio" value="'+employeersNameFirebase[0]+'"><h6>'+employeersNameFirebase[0]+'</h6><br></div>' +

                '<div id="employeesButton"><button  class=" btn swing" id="cancelCloseButton" onclick="removeInfoBox()">CANCEL</button>' +
                '<button onclick="connection()" class="btn swing ">HELP</button></div></div>'
        }
        else if(employeersNameFirebase.length ===2){
            var cont =
                '<div id="contentInfo"> ' +
                '<p><em>Name: </em>' + markerWithProblem.userName + '</p>' +
                '<p><em>Phone: </em>' + markerWithProblem.userPhone + '</p>' +
                '<p><em>Distance: </em>' + distance(lat1, lng1) + 'km' + '</p>'+
                '<div class="employeesDiv"><input class="employee" type="radio" value="'+employeersNameFirebase[0]+'"><h6>'+employeersNameFirebase[0]+'</h6><br></div>' +
                '<div class="employeesDiv"><input class="employee" type="radio" value="'+employeersNameFirebase[1]+'"><h6>'+employeersNameFirebase[1]+'</h6><br></div>' +
                '<div id="employeesButton"><button  class=" btn swing" id="cancelCloseButton" onclick="removeInfoBox()">CANCEL</button>' +
                '<button onclick="connection()" class="btn swing ">HELP</button></div></div>'
        }
        else if(employeersNameFirebase.length ===3){
            var cont =
                '<div id="contentInfo"> ' +
                '<p><em>Name: </em>' + markerWithProblem.userName + '</p>' +
                '<p><em>Phone: </em>' + markerWithProblem.userPhone + '</p>' +
                '<p><em>Distance: </em>' + distance(lat1, lng1) + 'km' + '</p>'+
                '<div class="employeesDiv"><input class="employee" type="radio" value="'+employeersNameFirebase[0]+'"><h6>'+employeersNameFirebase[0]+'</h6><br></div>' +
                '<div class="employeesDiv"><input class="employee" type="radio" value="'+employeersNameFirebase[1]+'"><h6>'+employeersNameFirebase[1]+'</h6><br></div>' +
                '<div class="employeesDiv"><input class="employee" type="radio" value="'+employeersNameFirebase[2]+'"><h6>'+employeersNameFirebase[2]+'</h6><br></div>' +
                '<div id="employeesButton"><button  class=" btn swing" id="cancelCloseButton" onclick="removeInfoBox()">CANCEL</button>' +
                '<button onclick="connection()" class="btn swing ">HELP</button></div></div>'
        }
            infoBox = new InfoBox({
                latlng: this.getPosition(),
                map: map2,
                content: cont
        });
        });

    google.maps.event.addListener(markerWithProblem, 'dblclick', function () {
        deleteDirections();
        calculateDisplayRoute(lat1, lng1);
        map2.setCenter(markerWithProblem);
    });
    animateMarker();
}

function connection(){
    var fb = firebase.database();
var transferProblem;

  // var employees =[]= document.getElementsByClassName("employee"), goingEmployee = [];
  //   console.log(employees);
  //   for (let i = 0; i < employees.length; i++) {
  //       let empl = employees[i];
  //       if (empl.checked === true) {
  //           goingEmployee.push(empl.value);
  //       }
  //   }
                        // УЗНАЮ UID СВОЕГО ЭВАКУАТОРЩИКА
        fb.ref('Services/'+currentUserUid +'/supportUnits').child(supportUnitsUid[0]).update({
            'solvingProblem': problemaKey
        });

        console.log(problemaKey);

        fb.ref('Problems/New').child(problemaKey).update({ // ЗАПИСЫВАЮ СВОЕГО ЭВАКУАТОРЩИКА В 'Helper'
        'helper':supportUnitsUid[0]
        });
        fb.ref('Users').child(supportUnitsUid[0]).update({ // ЗАПИСЫВАЮ У ЭВАКУАТОРЩИКА В ПОЛЕ 'SOLVING PROBLEM' ПРОБЛЕМЫ КОТОРУЮ ОН СЕЙЧАС РЕШАЕТ
            "solvingProblem": problemaKey
        });

        fb.ref('Problems/New/'+problemaKey).once('value').then(function (snapshot) { // ПОЛУЧАЮ ВСЮ ИНФУ О ПРОБЛЕМЕ ДЛЯ ПЕРЕНОСА В InProcess
            transferProblem = snapshot.val();
            // console.log('transferProblem');
            // console.log(transferProblem)
            fb.ref('Problems/New/'+problemaKey).remove();
        }).then(function () {
            fb.ref('Problems/In_Process/'+problemaKey).set({
                'description': transferProblem.description,
                'direction': transferProblem.direction,
                'extra':transferProblem.extra,
                'helper':transferProblem.helper,
                'lat':transferProblem.lat,
                'lng':transferProblem.lng,
                'problemType':transferProblem.problemType,
                'requestingUser': transferProblem.requestingUser,
                'status': transferProblem.status,
                'uid':transferProblem.uid
            })});
           // delete // УДАЛЯЮ ИЗ NEW
}
// function zoomAndGo() {
//     map2.setZoom(11);
//     map2.setCenter(marker.getPosition());
//
// }
    function calculateDisplayRoute(lat, lng) {
        let directionsService = new google.maps.DirectionsService;
        directionsDisplay = new google.maps.DirectionsRenderer({
            polylineOptions: {
                strokeColor: "#777afe",
                strokeWeight: 5
            }, suppressMarkers: true
        });
        directionsDisplay.setMap(map2);
        directionsArr.push(directionsDisplay);


        directionsService.route({
            origin: {lat: latitude, lng: longitude},
            destination: {lat: lat, lng: lng},
            travelMode: 'DRIVING',
        }, function (response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }
    function deleteMarkers() {
        for (let y = 0; y < markersArr.length; y++) {
            markersArr[y].setMap(null);
        }
    }
    function deletePoints() {
    for(let y=0;y<markersPoints.length;y++){
        markersPoints[y].setMap(null);
    }
}
    function deleteDirections() {
    removeInfoBox();
    if (directionsDisplay === undefined || directionsDisplay === null) {
        deletePoints();
    } else
        for (let i = 0; i < directionsArr.length; i++) {
            directionsArr[i].setMap(null);
            deletePoints()
        }
}
    function deleteDirectionsAndMarkers() {
    removeInfoBox();
        if (directionsDisplay === undefined || directionsDisplay === null) {
            deleteMarkers();
            deletePoints();
        } else
           deleteDirections();
                deleteMarkers();
    }
    function distance(lat2, lng2) {
        distanceValue = (google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(latitude, longitude),
            new google.maps.LatLng(lat2, lng2)));
        return (distanceValue/1000).toFixed(1);
    }

    function showPlacesOnMap() {
        deleteDirectionsAndMarkers();
        var pointCurrent;
        var pointsFirebase = {};
        var points = [] = document.getElementsByClassName("points");
        for (var i = 0; i < 4; i++) {
            if (points[i].checked === true) {
                pointCurrent = points[i].value;
                console.log(pointCurrent)
                break;
            }
        }
        const ref = firebase.database().ref('PlacesOnMap/' + pointCurrent);
        ref.once('value').then(function (snapshot) {
            pointsFirebase = snapshot.val()
            console.log(pointsFirebase);

            for (key in pointsFirebase) {
                let property = pointsFirebase[key];
                console.log(property);
                if(pointCurrent == "CarWashes"){
                    addPointMarker(+property.lat, +property.lng, property.name, imageCarWashes,property.address,property.email,property.phone)
                }
               else if(pointCurrent == "CarService"){
                    addPointMarker(+property.lat, +property.lng, property.name, imageCarService,property.address,property.email,property.phone)
                }
                else if(pointCurrent == "CarRental")
                {
                    addPointMarker(+property.lat, +property.lng, property.name, imageCarRental,property.address,property.email,property.phone)
                }
            else if(pointCurrent == "CarInsuranceCompany"){
                    addPointMarker(+property.lat, +property.lng, property.name, imageCarInsurance,property.address,property.email,property.phone)
                }}
        });

        function addPointMarker(lat, lng, name, image2,address,email,phone) {
            markerPoint = new google.maps.Marker({// название маркера - это название свойства,т.е название Point
                position: {
                    lng: lng,
                    lat: lat,
                    title: name
                },
                map: map2,
                optimized: false,
                icon: image2
            });
            markersPoints.push(markerPoint);
animateMarker();
           pointsInfoWindowListener(markerPoint,lat,lng,name,phone,email);
            markerPoint.addListener("dblclick", function () {
                calculateDisplayRoute(lat, lng)
            })
        }
        //mapListenerCloseInfoWindow(infoWindowPoints)
    }
    function animateMarker() {
    var myoverlay2 = new google.maps.OverlayView();
    myoverlay2.draw = function () {
        this.getPanes().markerLayer.id = 'markerLayer';
    };
    myoverlay2.setMap(map2)
}
     function pointsInfoWindowListener(marker,lat,lng,name,phone,email) {
    google.maps.event.addListener(marker, 'click', function() {
        infoWindowPoints= new google.maps.InfoWindow({
            content: "",   // document.getElementById("infoWindow")
            position:marker.position
        });
        infoWindowPoints.open(map2, marker);
        infoWindowPoints.setContent("      name : "+name+'\n' +',  phone : '+ phone+', email:  '+email+", distance: "+distance(lat,lng)+" km");
    });
    google.maps.event.addListener(map2,'click',function () {
        if(infoWindowPoints !== undefined) {
             infoWindowPoints.close();
         }
    })
}

function InfoBox(opts) {
    google.maps.OverlayView.call(this);
    this.latlng_ = opts.latlng;
    this.map_ = opts.map;
    this.content = opts.content;
    this.offsetVertical_ = -183;
    this.offsetHorizontal_ = 5;
    this.height_ = 165;
    this.width_ = 215;
    // var me = this;
    // this.boundsChangedListener_ =
    //     google.maps.event.addListener(this.map_, "bounds_changed", function () {
    //         return me.panMap.apply(me);
    //     });
    // Once the properties of this OverlayView are initialized, set its map so
    // that we can display it. This will trigger calls to panes_changed and
    // draw.
    var me = this;
    this.boundsChangedListener_ =
        google.maps.event.addListener(this.map_, "bounds_changed", function () {
            return me.panMap.apply(me);
        });
    this.setMap(this.map_);
}

InfoBox.prototype = new google.maps.OverlayView();

InfoBox.prototype.remove = function () {
    if (this.div_) {
        this.div_.parentNode.removeChild(this.div_);
        this.div_ = null;
    }
};

InfoBox.prototype.draw = function () {
    // Creates the element if it doesn't exist already.
    this.createElement();
    if (!this.div_) return;
    // Calculate the DIV coordinates of two opposite corners of our bounds to
    // get the size and position of our Bar
    var pixPosition = this.getProjection().fromLatLngToDivPixel(this.latlng_);
    if (!pixPosition) return;
    // Now position our DIV based on the DIV coordinates of our bounds
    this.div_.style.width = this.width_ + "px";
    this.div_.style.left = (pixPosition.x + this.offsetHorizontal_) + "px";
    this.div_.style.height = this.height_ + "px";
    this.div_.style.top = (pixPosition.y + this.offsetVertical_) + "px";
    this.div_.style.display = 'block';
};


InfoBox.prototype.createElement = function () {
    var panes = this.getPanes();
    var div = this.div_;
    if (!div) {
        // This does not handle changing panes. You can set the map to be null and
        // then reset the map to move the div.
        div = this.div_ = document.createElement("div");
        div.className = "infobox";
        var contentDiv = document.createElement("div");
        contentDiv.className = "content";
        contentDiv.innerHTML = this.content;

         var closeBox = document.createElement("div");
         closeBox.className = "close";
         closeBox.innerHTML = "x";

        div.appendChild(closeBox);

        function removeInfoBox(ib) {
            return function () {
                ib.setMap(null);
            };
        }

        google.maps.event.addDomListener(closeBox, 'click', removeInfoBox(this));

        div.appendChild(contentDiv);
        div.style.display = 'none';
        panes.floatPane.appendChild(div);
        this.panMap();
    } else if (div.parentNode != panes.floatPane) {
        // The panes have changed. Move the div.
        div.parentNode.removeChild(div);
        panes.floatPane.appendChild(div);
    } else {
        // The panes have not changed, so no need to create or move the div.
    }
}

InfoBox.prototype.panMap = function () {
    // if we go beyond map, pan map
    var map = this.map_;
    var bounds = map.getBounds();
    if (!bounds) return;
    // The position of the infowindow
    var position = this.latlng_;
    // The dimension of the infowindow
    var iwWidth = this.width_;
    var iwHeight = this.height_;
    // The offset position of the infowindow
    var iwOffsetX = this.offsetHorizontal_;
    var iwOffsetY = this.offsetVertical_;
    // Padding on the infowindow
    var padX = 40;
    var padY = 40;
    // The degrees per pixel
    var mapDiv = map.getDiv();
    var mapWidth = mapDiv.offsetWidth;
    var mapHeight = mapDiv.offsetHeight;
    var boundsSpan = bounds.toSpan();
    var longSpan = boundsSpan.lng();
    var latSpan = boundsSpan.lat();
    var degPixelX = longSpan / mapWidth;
    var degPixelY = latSpan / mapHeight;
    // The bounds of the map
    var mapWestLng = bounds.getSouthWest().lng();
    var mapEastLng = bounds.getNorthEast().lng();
    var mapNorthLat = bounds.getNorthEast().lat();
    var mapSouthLat = bounds.getSouthWest().lat();
    // The bounds of the infowindow
    var iwWestLng = position.lng() + (iwOffsetX - padX) * degPixelX;
    var iwEastLng = position.lng() + (iwOffsetX + iwWidth + padX) * degPixelX;
    var iwNorthLat = position.lat() - (iwOffsetY - padY) * degPixelY;
    var iwSouthLat = position.lat() - (iwOffsetY + iwHeight + padY) * degPixelY;
    // calculate center shift
    var shiftLng =
        (iwWestLng < mapWestLng ? mapWestLng - iwWestLng : 0) +
        (iwEastLng > mapEastLng ? mapEastLng - iwEastLng : 0);
    var shiftLat =
        (iwNorthLat > mapNorthLat ? mapNorthLat - iwNorthLat : 0) +
        (iwSouthLat < mapSouthLat ? mapSouthLat - iwSouthLat : 0);
    // The center of the map
    var center = map.getCenter();
    // The new map center
    var centerX = center.lng() - shiftLng;
    var centerY = center.lat() - shiftLat;
    // center the map to the new shifted center
    map.setCenter(new google.maps.LatLng(centerY, centerX));
    this.boundsChangedListener_ = null;
};

function removeInfoBox() {
    if(infoBox != undefined) {
        infoBox.setMap(null);
    }
}



