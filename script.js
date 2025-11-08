let prompt=document.querySelector("#prompt");
let chatContainer=document.querySelector(".chat-container");
let imagebtn=document.querySelector("#image");

const api_Url="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyBDgBOaHy8mJOx9xPOYB66OaCqEO1V3zz8";
let user={
    data:null,
}

async function generateResponse(aichatbox){
let text=aichatbox.querySelector(".ai-chat-area")

let requestOption={
    method:"post",
    headers:{'Content-Type': 'application/json'},
    body:JSON.stringify({
    "contents": [
      {
        "parts": [
          {
            "text": user.data,
          }
        ]
      }
    ]
  
    })
}

try{
        let response=await fetch(api_Url,requestOption)
        let data=await response.json()
        let apiResponse=data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim();
        console.log(apiResponse);
        text.innerHTML=apiResponse;
}
catch(error){
    console.log(error);
}
finally{
  chatContainer.scrollTo({top:chatContainer.scrollHeight,behaviour:"smooth"})
}
}
 
function createchatbox(html,classes){
    let div=document.createElement("div")
    div.innerHTML=html;
    div.classList.add(classes)
    return div
}



function handlechatResponse(message){
    user.data=message
let html=`<img src="img/boy.png" alt="" id="userimage" width="35">
 <div class="user-chat-area">
${user.data}
</div>`
prompt.value=""
let userchatbox=createchatbox(html,"user-chat-box")
chatContainer.appendChild(userchatbox)  
chatContainer.scrollTo({top:chatContainer.scrollHeight,behaviour:"smooth"})

setTimeout(()=>{
let html=`<img src="img/ai.png" alt="" id="aiimage" width="35">
            <div class="ai-chat-area">
            <img src="loading-4802.gif" id="load" width="30px">
            </div>`
            let aichatbox=createchatbox(html,"ai-chat-box")
            chatContainer.appendChild(aichatbox)
            generateResponse(aichatbox)
},600)
}


prompt.addEventListener("keydown",(e)=>{
    if(e.key=="Enter"){
        handlechatResponse(prompt.value)
    }

})  

imagebtn.addEventListener("click",()=>{
  imagebtn.querySelector("input").click(); 
})