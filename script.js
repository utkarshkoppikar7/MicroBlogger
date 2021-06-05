var local = "http://localhost:5000/"
var global ="https://tranquil-taiga-26020.herokuapp.com/"
home = global;

function reload(){
  location.reload();
}

window.onload = function (){
  let params = new URLSearchParams(location.search);
var username = params.get('name');
console.log(username);
document.getElementById("xyz").innerHTML = "@"+username;

var btn = document.getElementById("tAdd");
var body = document.getElementById("block");

loadFeed();

btn.addEventListener("click",(event)=>{
    let user = username;
    event.preventDefault();
    text = document.getElementById("tweetCnt").value;
    if(text == ""){
    }
    else{
        
        tweet = createTweet(user,text);
        body.appendChild(tweet);
        loadFeed();
        storeTweet(user,text);
         
    }
    document.getElementById("tweetCnt").value = "";
})


};

function createTweet(username,content)
{
    tweet = document.createElement('div');
    tweet.setAttribute("class","tweet");

    head = document.createElement("h1");
    head.innerHTML = username;

    hr = document.createElement("hr");
    hr.style.size ="1";
    hr.style.width= "90%";
    hr.style.color = "lightskyblue"
    
    br = document.createElement("br");

    p = document.createElement("p");
    p.innerHTML = content;

    tweet.appendChild(head);
    tweet.appendChild(hr);
    tweet.appendChild(br);
    tweet.appendChild(p);

    return tweet;
}

async function storeTweet(username,content)
{
  await axios.post(home+'addPost',  
  JSON.stringify({
     "username" : username,
     "content" : content
 }))
   .then(function (response) {
     console.log(response);
   })
   .catch(err => {
     console.error(err);
   });
}

async function loadFeed()
{
  var body = document.getElementById("block");
  body.innerHTML ="";
  await axios.get(home+'getPosts')
        .then(function (response) {
          var data = response.data;
          for(let i=data.length-1;i>=0;i--)
          {
              tweet = createTweet(data[i].username,data[i].content);
              body.appendChild(tweet);
          }
        })
        .catch(err => {
          console.error(err);
        });
}

async function mine()
{
    var body = document.getElementById("block");
    body.innerHTML ="";
    let params = new URLSearchParams(location.search);
    var username = params.get('name');
    await axios.get(home+'getPosts')
          .then(function (response) {
            var data = response.data;
            for(let i=data.length-1;i>=0;i--)
            {
              if(data[i].username == username){
                  tweet = createTweet(data[i].username,data[i].content);
                }
                body.appendChild(tweet);
              
            }
          })
          .catch(err => {
            console.error(err);
          });
}
