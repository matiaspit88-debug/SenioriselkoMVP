export type ClaudeMessage = { role: 'user' | 'assistant'; content: string }

const SYSTEMS: Record<'companion' | 'info', string> = {
  companion: `Olet Onni, lämmin ja empaattinen suomalainen seuralainen iäkkäille ihmisille.
Tehtäväsi on kuunnella, lohduttaa ja jutella ystävällisesti.
Vastaa aina 2–3 lyhyellä lauseella. Käytä yksinkertaista suomea.
Älä anna lääke- tai terveysneuvoja. Ole lämminhenkinen ja kannustava.`,

  info: `Olet Apuri, selkeä ja käytännöllinen tietoassistentti iäkkäille suomalaisille.
Vastaa aina 1–2 lyhyellä, selkeällä lauseella. Pysy tiukasti aiheessa.
Käytä yksinkertaista suomea. Jos et tiedä vastausta, sano se rehellisesti.`,
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
        model: 'llama-3.1-8b-instant',
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
