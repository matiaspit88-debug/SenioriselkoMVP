import type { OrbKind } from '../types'

export interface GuideStep {
  title: string
  body: string
}

export interface Guide {
  id: number
  title: string
  meta: string
  kind: OrbKind
  category: string
  steps: GuideStep[]
}

export const GUIDES: Guide[] = [
  {
    id: 1,
    title: 'WhatsApp-viesti lapselle',
    meta: '5 vaihetta · 3 min',
    kind: 'chat',
    category: 'Viestintä',
    steps: [
      {
        title: 'Avaa WhatsApp',
        body: 'Etsi puhelimesi etusivulta vihreä WhatsApp-kuvake. Napauta sitä kerran, niin sovellus avautuu.',
      },
      {
        title: 'Etsi läheisesi nimi',
        body: 'Näet listan aiemmista viesteistäsi. Etsi sieltä lapsesi tai läheisesi nimi ja napauta sitä.',
      },
      {
        title: 'Avaa viestikenttä',
        body: 'Ruudun alareunassa on pitkä valkoinen kenttä, jossa lukee "Kirjoita viesti". Napauta sitä — näppäimistö ilmestyy ruudulle.',
      },
      {
        title: 'Kirjoita viesti',
        body: 'Kirjoita haluamasi viesti näppäimistöllä. Voit kirjoittaa vaikka: "Hei! Kaikki hyvin täällä."',
      },
      {
        title: 'Lähetä viesti',
        body: 'Kun olet valmis, paina oikealla olevaa sinistä nuolinappia. Viesti lähtee heti perille!',
      },
    ],
  },
  {
    id: 2,
    title: 'Puhelinsoitto läheiselle',
    meta: '4 vaihetta · 2 min',
    kind: 'help',
    category: 'Puhelin',
    steps: [
      {
        title: 'Avaa Puhelin-sovellus',
        body: 'Etsi puhelimesi etusivulta vihreä puhelin-kuvake (näyttää kuulokkeelta). Napauta sitä kerran.',
      },
      {
        title: 'Valitse Yhteystiedot',
        body: 'Ruudun alareunassa näet välilehtiä. Valitse "Yhteystiedot" tai "Kontaktit". Näet kaikki tallentamasi numerot.',
      },
      {
        title: 'Etsi henkilö',
        body: 'Selaa listaa tai kirjoita nimen alku hakukenttään. Löydä soitettavan henkilön nimi ja napauta sitä.',
      },
      {
        title: 'Soita',
        body: 'Napauta isoa vihreää puhelinnappia. Puhelin alkaa soida. Kun läheisesi vastaa, voit puhua normaalisti.',
      },
    ],
  },
  {
    id: 3,
    title: 'Kuinka otat selfien',
    meta: '5 vaihetta · 3 min',
    kind: 'help',
    category: 'Puhelin',
    steps: [
      {
        title: 'Avaa kameraohjelma',
        body: 'Etsi puhelimesi etusivulta kameran kuvake — se näyttää pieneltä kameralta. Napauta sitä kerran.',
      },
      {
        title: 'Käännä kamera',
        body: 'Etsi kaksi pyöreää nuolta muodostavaa kuvaketta (⟲). Napauta sitä — kamera kääntyy katsomaan sinuun päin.',
      },
      {
        title: 'Aseta puhelin sopivalle etäisyydelle',
        body: 'Pidä puhelinta noin käsivarren mitan päässä kasvoistasi. Näet itsesi ruudulta.',
      },
      {
        title: 'Katso kameraan ja hymyile',
        body: 'Katso suoraan puhelimen yläreunassa olevaan pieneen reikään — siinä on kamera. Hymyile!',
      },
      {
        title: 'Ota kuva',
        body: 'Paina isoa pyöreää valkoista nappia ruudun alareunassa. Kuva on otettu! Löydät sen puhelimesi Galleriasta.',
      },
    ],
  },
  {
    id: 4,
    title: 'Videosoitto WhatsAppilla',
    meta: '5 vaihetta · 3 min',
    kind: 'chat',
    category: 'Viestintä',
    steps: [
      {
        title: 'Avaa WhatsApp',
        body: 'Etsi vihreä WhatsApp-kuvake puhelimesi etusivulta ja napauta sitä.',
      },
      {
        title: 'Avaa läheisesi viestikeskustelu',
        body: 'Etsi listasta läheisesi nimi ja napauta sitä. Viestikeskustelu avautuu.',
      },
      {
        title: 'Aloita videosoitto',
        body: 'Katso ruudun oikeaa yläkulmaa. Näet videokameran kuvakkeen. Napauta sitä.',
      },
      {
        title: 'Odota vastausta',
        body: 'Puhelin soi läheisellesi. Odota rauhassa — ruudulle ilmestyy läheisesi kasvot kun hän vastaa.',
      },
      {
        title: 'Lopeta soitto',
        body: 'Kun haluat lopettaa, paina punaista pyöreää nappia (luurin kuva). Soitto päättyy.',
      },
    ],
  },
  {
    id: 5,
    title: 'Valokuvan lähettäminen',
    meta: '5 vaihetta · 4 min',
    kind: 'chat',
    category: 'Viestintä',
    steps: [
      {
        title: 'Avaa WhatsApp',
        body: 'Avaa WhatsApp ja napauta sen henkilön nimeä, jolle haluat lähettää kuvan.',
      },
      {
        title: 'Avaa liitteen valitsin',
        body: 'Napauta viestilaatikon vasemmalla puolella olevaa paperiliittimen kuvaketta (📎). Valikko avautuu.',
      },
      {
        title: 'Valitse Galleria',
        body: 'Valikosta napauta "Galleria" tai "Kuvat". Puhelimesi kuvat avautuvat valittavaksi.',
      },
      {
        title: 'Valitse kuva',
        body: 'Selaa kuvia ja napauta haluamaasi kuvaa. Kuvan reunaan ilmestyy sininen valintamerkki.',
      },
      {
        title: 'Lähetä kuva',
        body: 'Paina sinistä lähetysnappia. Kuva lähtee matkaan! Läheisesi saa sen heti.',
      },
    ],
  },
  {
    id: 6,
    title: 'Lääkemuistutuksen asettaminen',
    meta: '5 vaihetta · 3 min',
    kind: 'help',
    category: 'Terveys',
    steps: [
      {
        title: 'Avaa Kello-sovellus',
        body: 'Etsi puhelimestasi Kello-sovellus — kuvake näyttää kellotaululta tai kellolta. Napauta sitä.',
      },
      {
        title: 'Valitse Hälytykset',
        body: 'Sovelluksen alareunassa tai yläreunassa on välilehtiä. Valitse "Hälytykset" tai "Herätykset".',
      },
      {
        title: 'Lisää uusi hälytys',
        body: 'Paina + -merkkiä tai "Lisää hälytys" -nappia. Kellonaikan valitsin avautuu.',
      },
      {
        title: 'Aseta aika',
        body: 'Pyöritä numeroita tai kirjoita kellonaika. Valitse se hetki kun otat lääkkeesi, esimerkiksi 08:00.',
      },
      {
        title: 'Tallenna hälytys',
        body: 'Paina "Tallenna" tai "Valmis". Hälytys on nyt asetettu — se muistuttaa sinua joka päivä!',
      },
    ],
  },
  {
    id: 7,
    title: 'Tunnista huijausviesti',
    meta: '4 vaihetta · 2 min',
    kind: 'emer',
    category: 'Turvallisuus',
    steps: [
      {
        title: 'Tarkista lähettäjä',
        body: 'Katso keneltä viesti tuli. Onko se tuttu numero tai nimi? Outo numero tai "nimimerkki" on varoitusmerkki.',
      },
      {
        title: 'Tunnista huijauksen merkit',
        body: 'Huijausviestissä usein sanotaan: "Voitit palkinnon!", "Tilisi on lukittu!" tai "Klikkaa tästä pikaisesti!". Nämä ovat valheita.',
      },
      {
        title: 'Älä avaa linkkejä',
        body: 'Jos viestissä on linkki (alkaa usein http:// tai www.), älä koskaan napauta sitä. Oikeat viranomaiset tai pankit eivät pyydä tietoja tekstiviestillä.',
      },
      {
        title: 'Poista ja kysy apua',
        body: 'Poista epäilyttävä viesti. Jos olet epävarma, soita lapsellesi tai läheisellesi ennen kuin teet mitään.',
      },
    ],
  },
  {
    id: 8,
    title: 'Pankin saldon tarkistaminen',
    meta: '4 vaihetta · 3 min',
    kind: 'emer',
    category: 'Turvallisuus',
    steps: [
      {
        title: 'Avaa pankkisovellus',
        body: 'Etsi puhelimesi etusivulta pankkisi sovellus (OP, Nordea, S-Pankki jne.) ja napauta sitä.',
      },
      {
        title: 'Kirjaudu sisään',
        body: 'Syötä pankkisi tunnuslukusi tai käytä sormenjälkeäsi jos olet asettanut sen. Paina "Kirjaudu".',
      },
      {
        title: 'Etsi tilit',
        body: 'Etsi "Tilit", "Omat tilit" tai "Tili" valikosta. Napauta sitä — tilisi ja saldosi näkyvät.',
      },
      {
        title: 'Tarkista saldo',
        body: 'Napauta käyttötiliäsi nähdäksesi tarkan saldon ja viimeisimmät tapahtumat. Kirjaudu ulos lopuksi.',
      },
    ],
  },
  {
    id: 9,
    title: 'WiFi-yhteyden tarkistus',
    meta: '4 vaihetta · 3 min',
    kind: 'ai',
    category: 'Puhelin',
    steps: [
      {
        title: 'Tarkista WiFi-merkki',
        body: 'Katso puhelimesi yläreunaa. Jos näet aaltokaaria muistuttavan merkin (📶), puhelin on yhteydessä WiFiin.',
      },
      {
        title: 'Avaa Asetukset',
        body: 'Jos WiFi-merkki puuttuu tai internet ei toimi, avaa Asetukset. Se löytyy hammaspyörän kuvakkeella.',
      },
      {
        title: 'Valitse WiFi',
        body: 'Napauta "WiFi" tai "Langaton verkko". Tarkista että WiFi on päällä — liukusäätimen tulisi olla sininen tai vihreä.',
      },
      {
        title: 'Yhdistä kotiverkkoon',
        body: 'Näet listan lähistön verkoista. Napauta kotiverkkosi nimeä. Syötä WiFi-salasana jos pyydetään. Olet nyt yhteydessä!',
      },
    ],
  },
  {
    id: 10,
    title: 'Sää-sovelluksen käyttö',
    meta: '3 vaihetta · 2 min',
    kind: 'ai',
    category: 'Puhelin',
    steps: [
      {
        title: 'Avaa Sää-sovellus',
        body: 'Etsi puhelimestasi Sää-sovellus — kuvakkeessa näkyy usein aurinko tai pilvi. Napauta sitä kerran.',
      },
      {
        title: 'Tarkista tämän päivän sää',
        body: 'Sovellus näyttää automaattisesti oman paikkakuntasi sään. Näet lämpötilan, sademäärän ja tuulen.',
      },
      {
        title: 'Katso viikon ennuste',
        body: 'Pyyhkäise ruutua ylöspäin tai katso alaspäin — näet koko viikon sääennusteen päivä kerrallaan.',
      },
    ],
  },
]

export const CATS = ['Kaikki', 'Viestintä', 'Puhelin', 'Turvallisuus', 'Terveys']
