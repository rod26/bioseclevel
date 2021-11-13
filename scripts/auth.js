const btnLogin = document.querySelector('#btn-login');
const btnClose = document.querySelector('#btn-close');
const btnClose2 = document.querySelector('#btn-close2');
// add admin cloud function
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const adminEmail = document.querySelector('#admin-email').value;
  const addAdminRole = functions.httpsCallable('addAdminRole');
  addAdminRole({ email: adminEmail }).then(result => {
    console.log(result);
  });
});

// listen for auth status changes
auth.onAuthStateChanged(user => {
  

  if (user) {
    db.collection('users').doc(user.uid).get().then(doc => {
      //alert(" laman ni user type "+doc.data().userType);
       
       userT=doc.data().userType;
     
     });
    
   
     
     
        user.getIdTokenResult().then(idTokenResult => {
          user.admin = idTokenResult.claims.admin;
          
          setupUI(user);
        });
        db.collection('guides').onSnapshot(snapshot => {
          if(userT=="admin"){
          setupGuides(snapshot.docs);
          }
          else{
           alert("You are not admin");
          }  
        }, err => console.log(err.message));
    
   

  } else {
    setupUI();
    setupGuides([]);
  }
});

// create new guide
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection('guides').add({
    title: createForm.title.value,
    content: createForm.content.value
  }).then(() => {
    // close the create modal & reset form
    const modal = document.querySelector('#modal-create');
    M.Modal.getInstance(modal).close();
    createForm.reset();
  }).catch(err => {
    console.log(err.message);
  });
});

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  // sign up the user & add firestore data
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    return db.collection('users').doc(cred.user.uid).set({
      bio: signupForm['signup-bio'].value
    });
  }).then(() => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
    signupForm.querySelector('.error').innerHTML = ''
  }).catch(err => {
    signupForm.querySelector('.error').innerHTML = err.message;
  });
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
  location.reload();
});

// login
const loginForm = document.querySelector('#login-form2');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  

  // get user info
  const email = loginForm['login-email2'].value;
  const password = loginForm['login-password2'].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-login2');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
    loginForm.querySelector('.error').innerHTML = '';
  }).catch(err => {
    loginForm.querySelector('.error').innerHTML = err.message;
  });

});



btnLogin.addEventListener('click', () => {




  // get user info
  const email = loginForm['login-email2'].value;
  const password = loginForm['login-password2'].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-login2');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
    loginForm.querySelector('.error').innerHTML = '';
  }).catch(err => {
    loginForm.querySelector('.error').innerHTML = err.message;
  });



  $("#modal-login2").modal("hide");
});




btnClose.addEventListener('click', () => {

    const modal = document.querySelector('#modal-login2');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
    loginForm.querySelector('.error').innerHTML = '';
 


  $("#modal-login2").modal("hide");
});


btnClose2.addEventListener('click', () => {

  const modal = document.querySelector('#modal-login2');
  M.Modal.getInstance(modal).close();
  loginForm.reset();
  loginForm.querySelector('.error').innerHTML = '';



$("#modal-login2").modal("hide");
});