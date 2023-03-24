import { subscribeToChat } from '../websocket/websocket.js';
import { chatgpt } from '../api/other/chatgpt.js'
import dotenv from 'dotenv'

const env = dotenv.config().parsed

const ws = subscribeToChat(message => {
    let msg = JSON.parse(message)
    console.log("aaa", msg)
    reply(msg)
}, env.CHATGPT_NAME);

async function reply(message) {
    let content = message.message
    let res = null
    try {
        res = await chatgpt.sendMessage(content, {
            parentMessageId: message.id
        })
    } catch (error) {
        message.message = "网络错误"
        message.type = 2
        message.mode = 0
        ws.send(JSON.stringify(message))
        console.log(error)
        return
    }
    if (res == null) {
        return
    }
    message.id = res.id
    message.message = res.detail.choices[0].message.content
    message.type = 2
    message.mode = 0
    console.log("aaa", message.id)
    console.log("aaa", message.message)
    ws.send(JSON.stringify(message))
}