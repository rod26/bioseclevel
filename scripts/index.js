// DOM elements



const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('#logged-out');
const loggedInLinks = document.querySelectorAll('#logged-in');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');
const p1 = document.querySelector('#p1');
const p2 = document.querySelector('#p2');
const p3 = document.querySelector('#features');
//const p4 = document.querySelector('#p4');
const p5 = document.querySelector('#p5');
const p6 = document.querySelector('#download');
const p7 = document.querySelector('#p7');
const menu = document.querySelector('#menu1');


// modal edit
const editModal = document.querySelector('#exampleModalLong');
const editModalForm = document.querySelector('#exampleModalLong .formedit');

const tableUsers = document.querySelector('.table');






console.log("pumasok1");

let id;

let userT;




// Create element and render users
//solution 1
/*
const renderUser = doc => {

  console.log("pumasok2");
  const tr = `
    <tr data-id='${doc.id}'>
      <td>${doc.data().fName}</td>
      <td>${doc.data().email}</td>
      <td>${doc.data().farmName}</td>
      <td>${doc.data().farmOwner}</td>
      <td>${doc.data().province}</td>
      <td>${doc.data().municipality}</td>
      <td>${doc.data().barangay}</td>
      <td>${doc.data().phone}</td>
      <td>
        <button class="btn btn-edit">Edit</button>
        <button class="btn btn-delete">Delete</button>
      </td>
    </tr>
    
  `;
  console.log("ang laman ay "+doc.data().fName);
  tableUsers.insertAdjacentHTML('beforeend', tr);
  

 
  
}

*/



//solution 2
/*
const booksRef = firebase.firestore().collection("users");
 booksRef.get().then(function (querySnapshot){
        querySnapshot.forEach(function (doc) {
           document.getElementById("tablebo").innerHTML += " <tr> <td>" + doc.data().fName  + "</td> <td>" +  doc.data().email + "</td><td>" +  doc.data().farmName + "</td> <td>" +  doc.data().farmOwner + "</td><td>" +  doc.data().province + "</td><td>" +  doc.data().municipality + "</td><td>" +  doc.data().barangay + "</td><td>" +  doc.data().phone + "</td> </tr> "                
            console.log("laman ay ay "+doc.data().email);
        });
    });
  
    
  

console.log("hii po");
booksRef.get().then((snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("All data in 'books' collection", data);
    // const userdata = document.querySelector("#myTable1");
   
    // [ { id: 'glMeZvPpTN1Ah31sKcnj', title: 'The Great Gatsby' } ] 
  });

  $(document).ready(function() {
    $('#myTable').DataTable();
  } );

*/


//solution 3

function getDatainTable() {
  
  //alert("nasa loob ng getDatainTable");
  let db = firebase.firestore();
  var dataSet = new Array();
  var i=1;

 db.collection("users").get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
           
                  dataSet.push([doc.data().fName, doc.data().email, doc.data().farmName, doc.data().farmOwner, doc.data().province, doc.data().municipality, doc.data().barangay, doc.data().phone,'<button class="btn btn-edit ">Edit</button>  <button class="btn btn-delete">Delete</button>' ]);
                  i=i+1;
                  

});




  $('#myTable').DataTable( {
          data: dataSet,
          columns: [
                  { title: "Name" },
                  { title: "Email" },
                  { title: "Farm Name"},
                  { title: "Farm Owner"},
                  { title: "Province"},
                  { title: "Municipality"},
                  { title: "Barangay"},
                  { title: "Phone"},
                  { title: "Action"}

          ],
          retrieve: true
      
  } );


  /*
  
  let table = $("#myTable").DataTable();

  $("#myTable tbody").on("click", "tr", function () {
    var data = table.row().data();
    console.log('data', data);
    alert(data[3] + "'s salary is: " + data[5]);
  });
  */


  $(document).ready(function() {
    var table = $('#myTable').DataTable();
  
    $('#myTable tbody').on( 'click', 'tr', function () {
      if ( $(this).hasClass('selected') ) {

        var data = table.row(".selected").data();

        db.collection("users").where("email", "==", data[1] ).get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            //alert("confirm" +data[1] );
           
           

            
  $("#exampleModalLong").modal("show");

  //editModal.classList.add('modal-show2');
  //alert("edit napidot");
  id = doc.id;
  editModalForm.fName.value = doc.data().fName;
  editModalForm.email.value = doc.data().email;
  editModalForm.farmName.value = doc.data().farmName;
  editModalForm.farmOwner.value = doc.data().farmOwner;
  editModalForm.province.value = doc.data().province;
  editModalForm.municipality.value = doc.data().municipality;
  editModalForm.barangay.value = doc.data().barangay;
  editModalForm.phone.value = doc.data().phone;
  editModalForm.YearRaisingPig.value = doc.data().yearFarm;
  editModalForm.YearsInBusiness.value = doc.data().yearBusiness;
  editModalForm.WorkerNumber.value = doc.data().numberWorkers;
  editModalForm.YearsOldestBuilding.value = doc.data().yearsOldBuilding;
  editModalForm.YearsNewestBuilding.value = doc.data().yearsNewBuilding;
  editModalForm.numberHousingUnits.value = doc.data().numberHousingUnits;
  editModalForm.Lat.value = doc.data().slat;
  editModalForm.Long.value = doc.data().slong;


  if(doc.data().typeFarm =="backyard (<50 sows)"){
    selectTypeOfFarm("optTypeFarm","backyard")
      console.log("Type of farm is backyard (<50 sows) ");
      //editModalForm.typeoffarm.value = "backyard (<50 sows)";
      
  } else if(doc.data().typeFarm =="Large Commercial (501-2500 sows)"){
    selectTypeOfFarm("optTypeFarm","large");
    console.log("Type of farm is Large Commercial(501-2500 sows)");
   
  } else if(doc.data().typeFarm =="Medium Commercial (201-500 sows)"){
    selectTypeOfFarm("optTypeFarm","medium");
    console.log("Type of farm is Medium commercial(201-500 sows)");

  } else if(doc.data().typeFarm =="Small Commercial (50-200 sows)"){
    selectTypeOfFarm("optTypeFarm","small");
    console.log("Type of farm is Small Commercial (50-200 sows)");

  }else{
    console.log("Type of farm is Something Mali 2"+doc.data().typeFarm);

  }




  if(doc.data().typeOperation=="Backyard"){
    selectTypeOfOperation("optOperation","back")
      console.log("Type of operation is backyard ");
      //editModalForm.typeoffarm.value = "backyard (<50 sows)";
      
  } else if(doc.data().typeOperation=="Commercial"){
    selectTypeOfOperation("optOperation","comm");
    console.log("Type of operation is Commercial ");
  }

  else{
    console.log("Type of operation is Something Wrong)");

  }


  //editModalForm.typeofoperation.value = doc.data().typeOperation;
  
  
  if(doc.data().typeHousing=="Tunnel vent"){
    selectTypeOfHousing("optHousing","tunnel")
      console.log("Type of housing is Tunnel Vent ");
      //editModalForm.typeoffarm.value = "backyard (<50 sows)";
      
  } else if(doc.data().typeHousing=="Traditional/Conventional"){
    selectTypeOfHousing("optHousing","traditional");
    console.log("Type of housing is Traditional/Conventional");
  }

  else{
    console.log("Type of housing is Something Wrong "+doc.data().typeHousing);

  }
  
  
  //editModalForm.typeofhousing.value = doc.data().typeHousing;





            //dataSet[x][1] = doc.data().name;
            //dataSet[x][2] = doc.data().useremail;
           // dataSet[x][3] = doc.data().address;
           // x++
          });
        });



        var data = table.row(".selected").data();
        //alert(data[0] + " record " + data[5]);
        $(this).removeClass('selected');
      }
      else {
        table.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
      }
    } );
  
    $('#button').click( function () {
      table.row('.selected').remove().draw( false );
    } );
  } );



//update the record
  $('#btn-update2').on('click', function (event) {
    //alert("pumasok");
    let sDataFarm=editModalForm.typeoffarm[editModalForm.typeoffarm.selectedIndex].text;
    let sDataOperation=editModalForm.typeofoperation[editModalForm.typeofoperation.selectedIndex].text;
    let sDataHousing=editModalForm.typeofhousing[editModalForm.typeofhousing.selectedIndex].text;
   
    db.collection('users').doc(id).update({
      fName: editModalForm.fName.value,
      barangay: editModalForm.barangay.value,
      phone: editModalForm.phone.value,
      email: editModalForm.email.value,
      farmName: editModalForm.farmName.value,
      farmOwner: editModalForm.farmOwner.value,
      province: editModalForm.province.value,
      municipality: editModalForm.municipality.value,
      numberHousingUnits: editModalForm.numberHousingUnits.value,
      numberWorkers: editModalForm.WorkerNumber.value,
      slat: editModalForm.Lat.value,
      slong: editModalForm.Long.value,
      typeFarm: sDataFarm,
      typeHousing: sDataHousing,
      typeOperation: sDataOperation,
      yearBusiness:  editModalForm.YearsInBusiness.value,
      yearFarm: editModalForm.YearRaisingPig.value,
      yearsNewBuilding: editModalForm.YearsNewestBuilding.value,
      yearsOldBuilding: editModalForm.YearsOldestBuilding.value,
      
    });
    //alert("updated");
    $("#exampleModalLong").modal("hide");

    //$('#myTable').data.reload();
    //$('#myTable').DataTable().ajax.reload()
    //tableUsers.ajax.reload();
    event.preventDefault();
  });


  $('#btn-delete2').on('click', function (event) {

    db.collection('users').doc(id).delete().then(() => {
      

      alert('Document succesfully deleted!');
     
    }).catch(err => {
      alert('Error removing document '+ err);
    });
  });

  //close buttons
  $('#btn-close1').on('click', function (event) {

    $("#exampleModalLong").modal("hide");

  });

  $('#btn-close2').on('click', function (event) {
 
    $("#exampleModalLong").modal("hide");
    
  });


  
  
  



  });




  
}




function selectTypeOfFarm(id, valueToSelect) {   
  //let element = document.getElementById(id);
  //element.value=valueToSelect;
  editModalForm.typeoffarm.value=valueToSelect;
  //console.log("pumasok na "+valueToSelect);
}

function selectTypeOfOperation(id, valueToSelect) {   
//let element = document.getElementById(id);
//element.value=valueToSelect;
editModalForm.typeofoperation.value=valueToSelect;
//console.log("pumasok na "+valueToSelect);
}

function selectTypeOfHousing(id, valueToSelect) {   
//let element = document.getElementById(id);
//element.value=valueToSelect;
editModalForm.typeofhousing.value=valueToSelect;
//console.log("pumasok na "+valueToSelect);
}




//solution 4

/*
const coverTransTableBody = document.getElementById('tablebo');
const CoverTransactionRef = db.collection('users');

CoverTransactionRef.get().then(snapshot => {
  var content = '';

  snapshot.docs.forEach(doc => {

    var coverSummary = doc.data();
    console.log(coverSummary);
    let html = `<tr>
    <td>${doc.data().fName}</td>
    <td>${doc.data().email}</td>
    <td>${doc.data().farmName}</td>
    <td>${doc.data().farmOwner}</td>
    <td>${doc.data().province}</td>
    <td>${doc.data().municipality}</td>
    <td>${doc.data().barangay}</td>
    <td>${doc.data().phone}</td>
    <td>
      <button class="btn btn-edit">Edit</button>
      <button class="btn btn-delete">Delete</button>
    </td>
            </tr>`;
    content += html;
    coverTransTableBody.innerHTML = content;

  }, error => {
    console.log(error.message);
  });
});

*/


//solution 5
/*
db.collection("users")
.get()
.then(querySnapshot=>{
        querySnapshot.forEach(doc=>{
            let data = doc.data();
            let row  = `<tr>
                           <td>${data.fName}</td>
                           <td>${data.email}</td>
                           <td>${data.farmName}</td>
                     </tr>`;
            let table = document.getElementById('myTable')
            table.innerHTML += row
        })
    })
    .catch(err=>{
        console.log(`Error: ${err}`)
    });

    */


 


const setupUI = (user) => {
  

  if (user) {
    if (user.admin) {
      
      adminItems.forEach(item => item.style.display = 'block');
    }

    
          // account info
          db.collection('users').doc(user.uid).get().then(doc => {
                    console.log(" laman ni user type "+doc.data().userType);
                    
                    userT=doc.data().userType;
                    const html = `
                      <div>Logged in as ${user.email}</div>
                      <div>${doc.data().bio}</div>
                      <div class="pink-text">${user.admin ? 'Admin' : ''}</div>
                    `;
                    accountDetails.innerHTML = html;
                    if(userT=="admin"){
                      getDatainTable();
                    }
                    else{
                      alert("This is not an admin account");
                    }
                  });
       
                 
        
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
          
      
  } else {
    
    // clear account info
    accountDetails.innerHTML = '';
    // toggle user elements
    adminItems.forEach(item => item.style.display = 'none');
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
};

// setup guides
const setupGuides = (data) => {
 
  if (data.length) {
   
    let html = '';
    data.forEach(doc => {
    
      const guide = doc.data();
      const li = `
        <li>
          <div class="collapsible-header grey lighten-4"> ${guide.title} </div>
          <div class="collapsible-body white"> ${guide.content} </div>
        </li>
      `;
      html += li;
      
      
    });
   //guideList.innerHTML = html
   guideList.style.display = "none";



     

    document.getElementById("user_div").style.display = "block";
    p1.style.display = "none";
    p2.style.display = "none";
    p3.style.display = "none";
    //p4.style.display = "none";
    p5.style.display = "none";
    p6.style.display = "none";
    p7.style.display = "none";
    guideList.style.display = "none"; 
    menu.style.display = "none"; 
  } else {
    document.getElementById("user_div").style.display = "none";
    p1.style.display = "block";
    p2.style.display = "block";
    p3.style.display = "block";
    //p4.style.display = "block";
    p5.style.display = "block";
    p6.style.display = "block";
    p7.style.display = "block";
    guideList.style.display = "block";
    menu.style.display = "flex";
   
    
   //guideList.innerHTML = '<h5 class="center-align">Login admin account to view the informations</h5>';
  }
  

};



// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});


// Real time listener
db.collection('users').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if(change.type === 'added') {
      //getDatainTable();
      //renderUser(change.doc);
    }else if(change.type === 'removed') {
    
      $('#myTable').DataTable().destroy();
      $("#user_div").load(location.href+" #user_div>*",""); 
      getDatainTable();
      //let tr = document.querySelector(`[data-id='${change.doc.id}']`);
     // let tbody = tr.parentElement;
      //tableUsers.removeChild(tbody);
    }else if(change.type === 'modified') {
      //alert("pasok");
      $('#myTable').DataTable().destroy();
      $("#user_div").load(location.href+" #user_div>*",""); 
      getDatainTable();
     // $('#myTable').DataTable().destroy();
      //getDatainTable();
    
      //$("#user_div").load("user_div > *");


     
      //getDatainTable();
      //document.getElementById("user_div").innerHTML.reload;
      //var myTable = $('#myTable').DataTable(); 
      //myTable.clear().rows.add(myTable.data).draw();
   
     
      //let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      //let tbody = tr.parentElement;
     // tableUsers.removeChild(tbody);
      //renderUser(change.doc);
    }
  })
})





// Click edit user in datatable
const btnEdit = document.querySelector(`[data-id='${doc.id}'] .btn-edit`);
btnEdit.addEventListener('click', () => {
  
  $("#exampleModalLong").modal("show");

  //editModal.classList.add('modal-show2');
 // alert("edit napidot");
  id = doc.id;
  editModalForm.fName.value = doc.data().fName;
  editModalForm.email.value = doc.data().email;
  editModalForm.farmName.value = doc.data().farmName;
  editModalForm.farmOwner.value = doc.data().farmOwner;
  editModalForm.province.value = doc.data().province;
  editModalForm.municipality.value = doc.data().municipality;
  editModalForm.barangay.value = doc.data().barangay;
  editModalForm.phone.value = doc.data().phone;
  editModalForm.YearRaisingPig.value = doc.data().yearFarm;
  editModalForm.YearsInBusiness.value = doc.data().yearBusiness;
  editModalForm.WorkerNumber.value = doc.data().numberWorkers;
  editModalForm.YearsOldestBuilding.value = doc.data().yearsOldBuilding;
  editModalForm.YearsNewestBuilding.value = doc.data().yearsNewBuilding;
  editModalForm.numberHousingUnits.value = doc.data().numberHousingUnits;
  editModalForm.Lat.value = doc.data().slat;
  editModalForm.Long.value = doc.data().slong;


  if(doc.data().typeFarm =="backyard (<50 sows)"){
    selectTypeOfFarm("optTypeFarm","backyard")
      console.log("Type of farm is backyard (<50 sows) ");
      //editModalForm.typeoffarm.value = "backyard (<50 sows)";
      
  } else if(doc.data().typeFarm =="Large Commercial (501-2500 sows)"){
    selectTypeOfFarm("optTypeFarm","large");
    console.log("Type of farm is Large Commercial(501-2500 sows)");
   
  } else if(doc.data().typeFarm =="Medium Commercial (201-500 sows)"){
    selectTypeOfFarm("optTypeFarm","medium");
    console.log("Type of farm is Medium commercial(201-500 sows)");

  } else if(doc.data().typeFarm =="Small Commercial (50-200 sows)"){
    selectTypeOfFarm("optTypeFarm","small");
    console.log("Type of farm is Small Commercial (50-200 sows)");

  }else{
    console.log("Type of farm is Something Mali"+doc.data().typeFarm);

  }




  if(doc.data().typeOperation=="Backyard"){
    selectTypeOfOperation("optOperation","back")
      console.log("Type of operation is backyard ");
      //editModalForm.typeoffarm.value = "backyard (<50 sows)";
      
  } else if(doc.data().typeOperation=="Commercial"){
    selectTypeOfOperation("optOperation","comm");
    console.log("Type of operation is Commercial ");
  }

  else{
    console.log("Type of operation is Something Wrong)");

  }


  //editModalForm.typeofoperation.value = doc.data().typeOperation;
  
  
  if(doc.data().typeHousing=="Tunnel Vent"){
    selectTypeOfHousing("optHousing","tunnel")
      console.log("Type of housing is Tunnel Vent ");
      //editModalForm.typeoffarm.value = "backyard (<50 sows)";
      
  } else if(doc.data().typeHousing=="Traditional/Conventional"){
    selectTypeOfHousing("optHousing","traditional");
    console.log("Type of housing is Traditional/Conventional");
  }

  else{
    console.log("Type of housing is Something Wrong "+doc.data().typeHousing);

  }
  
  
  //editModalForm.typeofhousing.value = doc.data().typeHousing;

});


/*
const btnClose3 = document.querySelector('#btn-close3');
btnClose3.addEventListener('click', () => {
  console.log("pumasok");
  alert("hi");

});
*/

function CloseModalPopup() {    
  //alert("hii");   
  //$(".modal-backdrop").remove();
  $("#modal-login2").removeClass("in");
  $(".modal-backdrop").remove();
  $('body').removeClass('modal-open');
  $('body').css('padding-right', '');
  $("#modal-login2").hide();
  //$("#modal-login2").close();
  location.reload();
}

