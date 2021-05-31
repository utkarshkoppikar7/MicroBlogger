function log(){
    var user = document.getElementById("username").value;
    var pass = document.getElementById("password").value;

    axios.post('https://tranquil-taiga-26020.herokuapp.com/users',  
    JSON.stringify({
       "username" : user,
       "password" : pass
   }))
     .then(function (response) {
         let res1 = response.data;
         if(res1 == "OK"){
             alert("Logged in successfully!!");
            window.location.href = "./home.html?name="+user;
         }
         else{
             alert("This account does not exist or else The passsword is incorrect. Please try again!");
         }
     })
     .catch(err => {
       console.error(err);
     });

}

function sign(){
    var user = document.getElementById("username1").value;
    var pass = document.getElementById("password1").value;
    var pass2 = document.getElementById("password2").value;

    if(pass!=pass2){
        alert("Both passwords must be same!");
    }
    else{
    axios.post('https://tranquil-taiga-26020.herokuapp.com/addUser',  
    JSON.stringify({
       "username" : user,
       "password" : pass
   }))
     .then(function (response) {
       console.log(response);
       alert("Account created!")
       window.location.href = "./home.html?name="+user;
     })
     .catch(err => {
       console.error(err);
     });
    }
}