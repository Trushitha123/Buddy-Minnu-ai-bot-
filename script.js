const API_KEY = "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";

function addMessage(text, className){

    let chatBox = document.getElementById("chat-box");

    let messageDiv = document.createElement("div");

    messageDiv.classList.add("message", className);

    messageDiv.innerText = text;

    chatBox.appendChild(messageDiv);

    chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage(){

    let input = document.getElementById("user-input");

    let userText = input.value;

    if(userText === ""){
        return;
    }

    addMessage(userText, "user");

    input.value = "";

    addMessage("Typing...", "bot");

    try{

        const response = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                method:"POST",
                headers:{
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    model:"openai/gpt-3.5-turbo",
                    messages:[
                        {
                            role:"user",
                            content:userText
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        document.querySelector(".bot:last-child").remove();

        let botReply =
            data.choices[0].message.content;

        addMessage(botReply, "bot");

    }catch(error){

        document.querySelector(".bot:last-child").remove();

        addMessage("Error connecting AI", "bot");
    }
}