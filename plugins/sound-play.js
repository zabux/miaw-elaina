import { youtube } from '@xct007/frieren-scraper'
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'

let handler = async (m, { conn, args, usedPrefix, command, isPrems }) => {
    conn.youtube = conn.youtube ? conn.youtube : {}
    let text = (args.length > 1 ? args.slice(1).join(' ') : '') || ''
    if (!text) return m.reply(`Masukan Query!\n\nContoh:\n${usedPrefix + command} audio Grand Escape\n${usedPrefix + command} video Grand Escape Amv`)
    if (!/audio|video/i.test(args[0])) return m.reply(`Masukan Query!\n\nContoh:\n${usedPrefix + command} audio Grand Escape\n${usedPrefix + command} video Grand Escape Amv`)
    try {
        conn.youtube[m.sender] = true
        let { title, uploaded, duration, views, url, thumbnail } = (await youtube.search(text))[0]
        let caption = `
*––––––『 Y T - P L A Y 』––––––*

🎧 *Title:* ${title}
📤 *Published:* ${uploaded}
⏰ *Duration:* ${duration}
👁️ *Views:* ${views}

🔗 *Url:* ${url}

*L O A D I N G. . .*
`.trim()
        let { audio, video } = await youtubedl(url).catch(async _=> await youtubedlv2(url)) 
        if (isPrems ? (audio['128kbps'].fileSize > 100000 || video['360p'].fileSize > 100000) : (audio['128kbps'].fileSize > 50000 || video['360p'].fileSize > 50000)) 
            return m.reply(`Maximal download is ${isPrems ? '100MB' : '50MB'}, This ${args[0] == 'audio' ? `Audio size is ${audio['128kbps'].fileSizeH}` : `Video size is ${video['360p'].fileSizeH}`}`)
        let msg = await conn.adReply(m.chat, caption, title, 'Playing 🔊', thumbnail, url, m)
        if (/audio/i.test(args[0])) {
            conn.sendFile(m.chat, await audio['128kbps'].download(), title + '.mp3', '', msg, false, { mimetype: 'audio/mpeg' })
        } else {
            conn.sendFile(m.chat, await video['360p'].download(), title + '.mp4', title, msg)
        }
    } catch (e) {
        return m.reply('Failed :(')
    } finally {
        delete conn.youtube[m.sender]
    }
}
handler.help = ['play']
handler.tags = ['sound']
handler.command = /^play$/i
handler.limit = true
handler.onlyprem = true
export default handler