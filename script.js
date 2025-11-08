let prompt=document.querySelector("#prompt");
let submitbtn=document.querySelector("#submit");
let chatContainer=document.querySelector(".chat-container");
let imagebtn=document.querySelector("#image");
let image=document.querySelector("#image img");
let imageinput=document.querySelector("#image input");

const api_Url="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyBDgBOaHy8mJOx9xPOYB66OaCqEO1V3zz8";
let user={
    message:null,
    file:{
       mime_type:null,
        data:null
    }
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
            "text": user.message
          },(user.file.data?[{"inline_data":user.file}]:[])
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
   image.src=`img.svg`
        image.classList.remove("choose")
        user.file={}
    }
}

 
function createchatbox(html,classes){
    let div=document.createElement("div")
    div.innerHTML=html;
    div.classList.add(classes)
    return div
}



function handlechatResponse(message){
    user.message=message
let html=`<img src="img/boy.png" alt="" id="userimage" width="6.5%">
 <div class="user-chat-area">
${user.message}
${user.file.data?`<img src="data:${user.file.mime_type};base64,${user.file.data}" class="chooseimage"/>`:""}
</div>`
prompt.value=""
let userchatbox=createchatbox(html,"user-chat-box")
chatContainer.appendChild(userchatbox)  
chatContainer.scrollTo({top:chatContainer.scrollHeight,behaviour:"smooth"})

setTimeout(()=>{
let html=`<img src="img/ai.png" alt="" id="aiimage" width="6.5%">
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
submitbtn.addEventListener("click",()=>{
  handlechatResponse(prompt.value)
})

imagebtn.addEventListener("change",()=>{
  const file=imageinput.files[0];
  if(!file) return
  let reader=new FileReader()
  reader.onload=(e)=>{
    let base64string=e.target.result.split(",")[1];
    user.file={
       mime_type:file.type,
        data:base64string
    }
        image.src=`data:${user.file.mime_type};base64,${user.file.data}`
        image.classList.add("choose")
    }
    image.src=`data:${user.file.mime_type};base64,${user.file.data}`
  reader.readAsDataURL(file)
})

imagebtn.addEventListener("click",()=>{
  imagebtn.querySelector("input").click(); 
})