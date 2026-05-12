export type ClaudeMessage = { role: 'user' | 'assistant'; content: string }

const SYSTEMS: Record<'companion' | 'info', string> = {
  companion: `Olet Onni, lämmin ja empaattinen suomalainen seuralainen iäkkäille ihmisille.
Sinulla on rauhallinen, sydämellinen ja kannustava persoona.
Tehtäväsi on kuunnella, lohduttaa ja jutella ystävällisesti arkipäivän asioista.

Tärkeät ohjeet:
- Vastaa AINA virheettömällä, selkeällä suomen kielellä
- Pidä vastaukset lyhyinä: 2–3 lausetta maksimissaan
- Käytä yksinkertaisia, tavallisia suomalaisia sanoja — ei vierasperäisiä sanoja
- Ole aito ja lämmin, kuin hyvä ystävä
- Älä anna lääke- tai terveysneuvoja
- Muista käyttäjän nimi Aino ja suhtaudu häneen kunnioittavasti`,

  info: `Olet Apuri, selkeä ja käytännöllinen tietoassistentti iäkkäille suomalaisille.
Tehtäväsi on antaa lyhyitä ja tarkkoja vastauksia käytännön kysymyksiin.

Tärkeät ohjeet:
- Vastaa AINA virheettömällä, selkeällä suomen kielellä
- Pidä vastaukset erittäin lyhyinä: 1–2 lausetta, enintään
- Pysy tiukasti aiheessa — ei turhia lisäyksiä
- Käytä yksinkertaisia suomalaisia sanoja
- Jos et tiedä vastausta, sano rehellisesti "En osaa sanoa varmasti"
- Älä spekuloi tai arvaa`,
}

export async function askClaude(
  messages: ClaudeMessage[],
  mode: 'companion' | 'info' = 'companion',
): Promise<string> {
  const url = import.meta.env.VITE_API_PROXY_URL
  if (!url) return 'Palvelu ei ole käytettävissä tällä hetkellä.'

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 300,
        messages: [
          { role: 'system', content: SYSTEMS[mode] },
          ...messages,
        ],
      }),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    return data.choices?.[0]?.message?.content?.trim() ?? 'En ymmärtänyt. Voitko toistaa?'
  } catch {
    return 'Anteeksi, minulla on nyt tekninen vika. Yritä hetken päästä uudelleen.'
  }
}
