const { GoogleGenerativeAI } = require('@google/generative-ai')

const genAI = new GoogleGenerativeAI('AIzaSyDHxo2HUqJHIMv0XjjWHpE7EiTIyrNZyGI')

async function listAndTest() {
    // Flash modelini dene
    const modelNames = ['gemini-2.0-flash', 'gemini-1.5-flash-latest', 'gemini-2.0-flash-lite', 'gemini-1.5-flash-002']

    for (const name of modelNames) {
        try {
            const model = genAI.getGenerativeModel({ model: name })
            const result = await model.generateContent('Say "OK" only.')
            const text = result.response.text()
            console.log(`✅ ${name} — ÇALIŞIYOR: ${text.trim()}`)
            return name
        } catch (e) {
            console.log(`❌ ${name} — ${e.message.split('\n')[0]}`)
        }
    }
}

listAndTest()
