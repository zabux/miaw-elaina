import axios from 'axios'

const OPENAI_APIKEY = "";


async function createRequest(opts) {
    if (typeof opts !== 'object') {
        throw 'Invalid Body'
    }
    const { url, messages } = opts
    if (!url || !messages) {
        throw 'Missing Body'
    }
    const { data } = await axios.request({
        baseURL: 'https://api.itsrose.life',
        url,
        method: 'POST',
        params: {
            apikey: "40145eb78be64cfb9757e61f",
        },
        headers: {
            "Content-Type": "application/json"
        },
        data: {
            model: "gpt-3.5-turbo",
            messages
        }
    }).catch(e => e == null || e == void 0 ? void 0 : e.response)
    return data
}

async function chatAi(messages) {
    if (typeof messages !== 'object' || !(Array.isArray(messages) && messages.length)) {
        throw 'Invalid Body'
    }
    let body = await createRequest({
        url: '/chatGPT/turbo',
        messages
    })
    return body
}

export {
    chatAi
}