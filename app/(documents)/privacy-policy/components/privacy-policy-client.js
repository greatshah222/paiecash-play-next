"use client";

/* eslint-disable react/no-unescaped-entities */

import classes from "@/app/styles/documents.module.css";
import { Separator } from "@/components/ui/separator";

const PrivacyPolicyClient = () => {
	return (
		<ol className={classes.ol}>
			<div className={classes.container}>
				<div className={classes.title}>SalibandyTV:n tietosuojakäytäntö</div>
				<div className={classes.text}>Voimaantulopäivä: 1. kesäkuuta 2021</div>

				<Separator className="my-2" />
				<div className={classes.text}>
					Suomen Salinbandyliitto ry, tarjoaaSalibandyTV -palvelua ("Palvelu").
				</div>
				<div className={classes.text}>
					SalibandyTV kunnioittaa ja suojelee verkkosivuillaan vierailevien henkilöiden,
					asiakkaidensa sekä sidosryhmätyössä toimivien henkilöiden yksityisyyttä. Tämä sivu kertoo
					sinulle käytännöistämme, jotka koskevat henkilötietojen keräämistä, käyttöä ja
					luovuttamista, kun käytät Palveluamme, ja valintoihin, jotka olet liittänyt näihin
					tietoihin.
				</div>
				<div className={classes.text}>
					Käyttämällä Palvelua hyväksyt tietojen keräämisen ja käytön tämän käytännön mukaisesti.
					Ellei tässä tietosuojakäytännössä ole määritelty toisin, tässä tietosuojakäytännössä
					käytetyillä termeillä on samat merkitykset kuin palveluehdoissamme.
				</div>
			</div>
			<div className={classes.container}>
				<div className={classes.title}>
					<li>Tiedonkeruu ja käyttö </li>
				</div>
				<div className={classes.text}>
					Keräämme useita erityyppisiä tietoja eri tarkoituksiin tarjotaksemme ja parantaaksemme
					Palvelumme sinulle ja hallitaksemme Asiakkaan SalibandyTV -tilin käyttöä. Käytämme
					henkilötietoja myös viestinnässä, asiakaspalvelussa ja palveluiden toimittamisessa.
					Henkilötietoja käytetään myös luvallisen markkinoinnin sekä mainonnan kohdentamiseen.
				</div>
				<div className={classes.text}>
					Henkilötietoja käsitellään keskitetysti Suomen Salibandyliitto ry:n toimistolla
					Helsingissä.
				</div>
			</div>
			<div className={classes.container}>
				<div className={classes.title}>Kerättyjen tietojen tyypit</div>
				<ul className={classes.ul}>
					<div className={classes.subtitle}>Henkilökohtaiset tiedot</div>
					<div className={classes.text}>
						Rekisteröityessäsi palveluun pyydämme sinua toimittamaan meille tiettyjä
						henkilökohtaisia tietoja, joita voidaan käyttää yhteyden ottamiseen tai tunnistamiseen
						("Henkilötiedot"). Henkilökohtaisesti tunnistettavissa oleviin tietoihin voi sisältyä
						muun muassa seuraavat:
					</div>

					<div className={classes.subtext}>
						<li className="list-disc">Sähköpostiosoite</li>

						<li className="list-disc">Etunimi ja sukunimi</li>
						<li className="list-disc">Puhelinnumero</li>
						<li className="list-disc">
							Osoite, osavaltio, maakunta, postinumero, kaupunki / lääni
						</li>
						<li className="list-disc">Keksit</li>
						<li className="list-disc">Käyttötiedot ja loki</li>
					</div>
				</ul>
			</div>

			<div className={classes.container}>
				<div className={classes.subtitle}>Käyttötiedot</div>
				<div className={classes.text}>
					Kun käytät palvelua verkkoselaimella (www.salibandy.tv) voimme kerätä tiettyjä tietoja
					automaattisesti, mukaan lukien muun muassa käyttämäsi mobiililaite, mobiililaitteesi
					yksilöllinen tunnus, mobiililaitteen IP-osoite, mobiilikäyttöjärjestelmäsi, käyttämäsi
					Internet-selaimen tyyppi, yksilölliset laitetunnisteet ja muut diagnostiikkatiedot
					("Käyttötiedot").
				</div>
			</div>

			<div className={classes.container}>
				<div className={classes.subtitle}>Seuranta- ja evästetiedot</div>
				<div className={classes.text}>
					Käytämme evästeitä ja vastaavia seurantatekniikoita palvelumme toiminnan seuraamiseen ja
					tiettyjen tietojen säilyttämiseen.
				</div>
				<div className={classes.text}>
					Evästeet ovat tiedostoja, joissa on pieni määrä tietoja, jotka voivat sisältää nimettömän
					yksilöllisen tunnisteen. Evästeet lähetetään selaimeesi verkkosivustolta ja tallennetaan
					laitteellesi. Eväste voi sisältää tekstiä, numeroita, päivämääriä, paikkatietoja, ja muuta
					dataa mutta evästeisiin ei tallennu mitään henkilökohtaisia tietoja. Eväste ei myöskään
					ole sovellus, eikä sen avulla voi koneeseesi päästä viruksia tai muita haittaohjelmia.
					Evästeistä ei ole koneellesi minkäänlaista haittaa.
				</div>
				<div className={classes.text}>
					Evästeiden avulla voidaan selvittää sivuston kävijämääriä, tallentaa sivustolla tehtyjä
					valintoja (esim. kieliasetukset), seurata kuinka sivustoa käytetään (ns. klikkauspolut)
					sekä kohdentaa ja hallita mainontaa (esim. ei näytetä samoja mainoksia useaan kertaan).
					Emme kuitenkaan seuraa yksittäisen kävijän tietoja, vaan tilastoimme kävijätietoja esim.
					käyttäytymisen ja maantieteellisen sijainnin perusteella.
				</div>
				<div className={classes.text}>
					Evästeiden avulla pyrimme parantamaan käyttökokemusta sivuillamme sekä tuomaan sivuille
					mainontaa joka käyttäjää kiinnostaa. Voit esimerkiksi nähdä muilla sivuilla
					vieraillessasiSalibandyTV:n mainontaa. Tämä on mahdollista evästeiden avulla.
				</div>
				<div className={classes.text}>
					Voit kehottaa selainta kieltäytymään kaikista evästeistä tai ilmoittamaan, kun eväste
					lähetetään. Jos et hyväksy evästeitä, et kuitenkaan välttämättä pysty käyttämään joitain
					Palvelumme osia.
				</div>
				<div className={classes.text}>Esimerkkejä käyttämistä evästeistä:</div>
				<ul className={`${classes.ul} ${classes.subtext} flex flex-col gap-y-2`}>
					<li className="list-disc">
						<strong>Istuntoevästeet.</strong> Käytämme istuntoevästeitä palvelumme hoitamiseen.
					</li>
					<li className="list-disc">
						<strong>Ensisijaiset evästeet.</strong>Käytämme etuevästeitä muistamaan asetuksesi ja
						erilaiset asetukset.
					</li>
					<li className="list-disc">
						<strong>Turvaevästeet.</strong>Käytämme turvaevästeitä turvallisuustarkoituksiin.
					</li>
				</ul>

				<ul className={`${classes.ol} py-6 flex flex-col gap-y-3 ${classes.subtext}`}>
					<li className="font-bold">Rekisterinpitäjä</li>

					<div className={classes.subtext}>
						Suomen Salibandyliitto ry.
						<br />
						Alakiventie 2, 00920 Helsinki
						<br />
						Sähköposti: salibandytv@salibandy.fi
					</div>

					<li className="font-bold">Yhteystiedot henkilötietojen käsittelyä koskevissa asioissa</li>

					<div className={classes.subtext}>
						Suomen Salibandyliitto ry.
						<br />
						Alakiventie 2, 00920 Helsinki
						<br />
						Sähköposti: tietosuoja@salibandy.fi
					</div>

					<li className="font-bold">Rekisterin nimi</li>

					<div className={classes.subtext}>SalibandyTV:n käyttäjä- ja markkinointirekisteri.</div>

					<li className="font-bold">Henkilötietojen käsittelyn laillinen peruste ja tarkoitus</li>

					<div className={classes.subtext}>
						Henkilötietolain 8 §:n ja EU:n tietosuoja-asetuksen 2 luvun mukaiset yleiset
						edellytykset.
					</div>
					<div className={classes.subtext}>
						Henkilötietojen käsittelyn tarkoitus onSalibandyTV palvelun käyttö ja
						viestiäSalibandyTV:n palvelusta ja uusista sisällöistä.
					</div>
					<div className={classes.subtext}>
						Tarvittavien henkilötietojen käsittely on välttämätön edellytys tarkoituksen
						toteuttamiseksi.
					</div>
					<div className={classes.subtext}>
						Henkilötietojen käsittelyn perusteena on suostumus.Salibandy.tv käyttää kerättyjä
						tietoja eri tarkoituksiin:
					</div>

					<ul className={`${classes.subtext} flex flex-col gap-1`}>
						<li className="list-disc">tarjota ja ylläpitää palvelua</li>
						<li className="list-disc">Ilmoittaa sinulle palvelumme muutoksista</li>
						<li className="list-disc">
							Antaa sinun osallistua palvelumme interaktiivisiin ominaisuuksiin, kun päätät tehdä
							niin
						</li>
						<li className="list-disc">tarjota asiakaspalvelua ja tukea</li>
						<li className="list-disc">
							Tarjoamme analyyseja tai arvokasta tietoa palvelun parantamiseksi
						</li>
						<li className="list-disc">Palvelun käytön seuraamiseksi</li>
						<li className="list-disc">Tunnistaa, ehkäistä ja ratkaista teknisiä ongelmia</li>
						<li className="list-disc">
							Käytä kaupallisiin tarkoituksiin, mukaan lukien (myynti) kolmannelle osapuolelle
						</li>
					</ul>

					<li className="font-bold">Rekisterin tietosisältö</li>
					<ul className={`${classes.subtext} flex flex-col gap-1`}>
						Rekisterissä voidaan käsitellä seuraavia tietoja:
						<li className="list-disc">Nimitiedot</li>
						<li className="list-disc">Yhteystiedot (sähköposti)</li>
						<li className="list-disc">Osoitelähde (mitä kautta osoite on tullut rekisteriin)</li>
						<li className="list-disc">Yhteydenottojen historiatiedot</li>
						<li className="list-disc">Muut asiakkaan antamat tiedot</li>
					</ul>

					<li className="font-bold">Säännönmukaiset tietolähteet</li>

					<div className={classes.subtext}>
						Rekisterin henkilötietoja kerätään eri kanavien kautta yhteystietonsaSalibandyTV:lle
						antaneista henkilöistä (esim. uutiskirjeen tilaus, kilpailun/ arvontakortin
						täyttäminen). Välttämättömien tietojen antaminen on edellä mainituissa markkinoinnin
						vastaanottamisen edellytys.
					</div>

					<li className="font-bold">Tietojen siirto</li>

					<div className={classes.subtext}>
						Tietosi, mukaan lukien Henkilötiedot, voidaan siirtää ja ylläpitää tietokoneille, jotka
						sijaitsevat osavaltiosi, maakuntasi, maasi tai muun valtion lainkäyttöalueen
						ulkopuolella, jos tietosuojalait voivat poiketa omasta alueestasi.
					</div>
					<div className={classes.subtext}>
						Suostumuksesi tähän tietosuojakäytäntöön ja sen jälkeen, kun lähetät tällaiset tiedot,
						edustaa suostumustasi kyseiseen siirtoon.
					</div>
					<div className={classes.subtext}>
						SalibandyTV ryhtyy kaikkiin kohtuullisesti tarvittaviin toimiin varmistaakseen, että
						tietojasi käsitellään turvallisesti ja tämän tietosuojakäytännön mukaisesti, eikä
						henkilötietojasi siirretä organisaatioon tai maahan, ellei käytössä ole riittäviä
						valvontatoimia, mukaan lukien turvallisuus tietojasi ja muita henkilökohtaisia
						tietojasi.
					</div>

					<li className="font-bold">Tietojen luovuttaminen</li>

					<div className={classes.subtext}>
						SalibandyTV voi luovuttaa henkilötietosi vilpittömässä mielessä, kun tällainen toiminta
						on tarpeen:
					</div>
					<ul className={`${classes.subtext} flex flex-col gap-1 list-decimal`}>
						<li className="list-disc">Lakisääteisen velvoitteen noudattaminen</li>
						<li className="list-disc">
							Suojata ja puolustaaSalibandyTV:n oikeuksia tai omaisuutta
						</li>
						<li className="list-disc">
							Estää tai tutkia Palveluun liittyviä mahdollisia väärinkäytöksiä
						</li>
						<li className="list-disc">
							Palvelun käyttäjien tai yleisön henkilökohtaisen turvallisuuden suojaamiseksi
						</li>
						<li className="list-disc">Suojautumista oikeudelliselta vastuulta</li>

						<div>
							Rekisteröityjen henkilötietoja voidaan käsitellä myös SalibandyTV:n markkinoinnin ja
							myynnin toteuttamiseen osallistuvilla yhteistyökumppaneilla (esim. postitusfirma) tai
							mahdollista asiakas- tai mielipidetutkimusta varten.SalibandyTV:llä on asianmukaiset
							sopimukset tällaisten kolmansien tahojen kanssa henkilötietojen käsittelyä varten
						</div>
					</ul>

					<li className="font-bold">Tietojen turvallisuus ja rekisterin suojauksen periaatteet</li>

					<div className={classes.subtext}>
						Markkinointirekisteriä ylläpidetään sähköisessä muodossa Icareus Suite -järjestelmässä
						sekä pieniltä osin verkkolevyllä Excel-tiedostoina. Järjestelmien tietokannat ja
						ohjelmistot ovat palveluntuottajan palvelimilla Internetissä, johon työasemilta on
						käyttäjä- ja salasanasuojauksin suojattu käyttöliittymä.
					</div>
					<div className={classes.subtext}>
						Rekisterin käyttö edellyttää henkilökohtaista käyttäjätunnusta ja salasanaa, jonka
						järjestelmä pakottaa vaihtamaan määräajoin. Käyttöoikeus päättyy henkilön siirtyessä
						pois niistä tehtävistä, joita varten hänelle on myönnetty käyttöoikeus. Samalla lukitaan
						käyttäjätunnus.
					</div>
					<div className={classes.subtext}>
						Henkilötietoja käsitellään luottamuksellisesti. Rekisterinpitäjä on järjestänyt
						tiloihinsa kulunvalvonnan.
					</div>
					<div className={classes.subtext}>
						Tietojesi turvallisuus on meille tärkeää, mutta on muistettava, että mikään Internetin
						kautta lähetettävä menetelmä tai sähköinen tallennustapa ei ole 100% turvallista. Vaikka
						pyrimme käyttämään kaupallisesti hyväksyttäviä keinoja henkilötietojesi suojaamiseen,
						emme voi taata niiden absoluuttista turvallisuutta
					</div>

					<li className="font-bold">Tarkastusoikeus ja tietojen korjaaminen</li>

					<div className={classes.subtext}>
						Rekisteröidyllä on oikeus tarkistaaSalibandyTV:n rekisterissä olevat itseään koskevat
						tiedot ja pyytää virheellisten tietojen korjaamista. Rekisteröity voi esittää
						tarkastusoikeutta koskevan pyynnön henkilökohtaisesti tai kirjallisesti. Tarkastusoikeus
						toteutetaan viikon kuluessa pyynnön esittämisestä.
					</div>
					<div className={classes.subtext}>
						Rekisteriin ei sisälly tietoja, joiden osalta tarkastusoikeutta ei voida toteuttaa.
						Rekisteröity voi esittää tiedon korjaamista milloin tahansa rekisteriasioista
						vastaavalle henkilölle.
					</div>
					<div className={classes.subtext}>
						Tietoja voidaan oikaista tai täydentää rekisterinpitäjän toimesta tai rekisteröidyn
						vaatimuksesta.
					</div>
					<div className={classes.subtext}>
						Rekisteröidyllä on oikeus vaatia tietojen käsittelyn rajoittamista ja vastustaa tietojen
						käsittelyä.
					</div>
					<div className={classes.subtext}>
						SalibandyTV:n rekisterissä olevalla henkilöllä on oikeus kieltää antamiensa tietojen
						käytön suoramarkkinointi- tms. tarkoitukseen, muuttaa niiden julkaisemista koskevaa
						suostumustaan sekä muutoinkin turvautua henkilötietolaissa turvattuihin oikeuksiinsa.
						Mikäli henkilö ei toivoSalibandyTV:ltä lainkaan postia tai yhteydenottoja, hän voi
						kieltää sen ottamalla kohdassa 2 mainittuun osoitteeseen.
					</div>
					<div className={classes.subtext}>
						SalibandyTV poistaa tarpeettomat henkilötiedot rekisteristä rekisteröidyn pyynnöstä.
					</div>
					<div className={classes.subtext}>
						Rekisteröidyllä on oikeus tehdä valitus tietosuojaviranomaiselle.
					</div>

					<li className="font-bold">Tietojen säilyttäminen</li>

					<div className={classes.subtext}>
						Tietoja säilytetään toistaiseksi, niin kauan kuin ne ovat tarpeellisia. Tarpeettomaksi
						muuttuneet tiedot ja tiedot, joiden käsittelylle ei enää muutoin ole perustetta,
						hävitetään tietoturvallisesti.
					</div>
				</ul>
			</div>

			<div className={classes.container}>
				<div className={classes.title}>
					<li>Palveluntarjoajat</li>
				</div>
				<div className={classes.text}>
					Voimme palkata kolmannen osapuolen yrityksiä ja yksityishenkilöitä palvelumme
					helpottamiseksi ("Palveluntarjoajat"), palvelun tarjoamiseksi puolestamme, palveluun
					liittyvien palvelujen suorittamiseksi tai auttamiseksi meitä palvelumme käytön
					analysoinnissa.
				</div>
				<div className={classes.text}>
					Näillä kolmansilla osapuolilla on pääsy henkilötietoihisi vain näiden tehtävien
					suorittamiseksi puolestamme ja ne ovat velvollisia olemaan luovuttamatta tai käyttämättä
					niitä mihinkään muuhun käyttötarkoitukseen.
				</div>
			</div>

			<div className={classes.container}>
				<div className={classes.title}>
					<li>Analytiikka</li>
				</div>
				<div className={classes.text}>
					Voimme käyttää ulkopuolisia palveluntarjoajia seuraamaan ja analysoimaan palvelumme
					käyttöä.
				</div>
				<ul className={`${classes.ol} `}>
					<div className={`${classes.subtext} py-6 flex flex-col gap-y-3`}>
						<li className={"list-disc"}>Google Analytics</li>
						<div>
							Google Analytics on Googlen tarjoama verkkoanalyysipalvelu, joka seuraa ja raportoi
							verkkosivustojen liikennettä. Google käyttää kerättyjä tietoja seuraamaan ja
							seuraamaan palvelumme käyttöä. Nämä tiedot jaetaan muiden Google-palveluiden kanssa.
							Google voi käyttää kerättyjä tietoja kontekstualisoida ja mukauttaa oman
							mainosverkoston mainoksia.
						</div>

						<div>
							Voit kieltäytyä tietyistä Google Analytics -ominaisuuksista mobiililaitteiden
							asetusten kautta, kuten laitteen mainosasetukset tai seuraamalla Googlen
							tietosuojakäytännössä annettuja ohjeita: https://policies.google.com/privacy?hl=fi
						</div>

						<div>
							Lisätietoja Googlen tietosuojakäytännöistä on Googlen tietosuoja- ja käyttöehdot
							-sivulla: https://policies.google.com/privacy?hl=fi
						</div>
					</div>
				</ul>
			</div>

			<div className={classes.container}>
				<div className={classes.title}>
					<li>Linkit muille sivustoille</li>
				</div>
				<div className={classes.text}>
					Palvelumme voi sisältää linkkejä muille sivustoille, joita emme hallinnoi. Jos napsautat
					kolmannen osapuolen linkkiä, sinut ohjataan kyseisen kolmannen osapuolen sivustolle.
					Suosittelemme, että luet jokaisen vierailemasi sivuston tietosuojakäytännön.
				</div>
				<div className={classes.text}>
					Meillä ei ole valvontaa emmekä ota vastuuta minkään kolmannen osapuolen sivustojen tai
					palveluiden sisällöstä, tietosuojakäytännöistä tai käytännöistä.
				</div>
			</div>

			<div className={classes.container}>
				<div className={classes.title}>
					<li>Muutokset tähän tietosuojakäytäntöön</li>
				</div>
				<div className={classes.text}>
					Voimme päivittää tietosuojakäytäntömme ajoittain. Ilmoitamme kaikista muutoksista
					julkaisemalla uuden tietosuojakäytännön tälle sivulle.
				</div>
				<div className={classes.text}>
					Ilmoitamme sinulle sähköpostitse ja / tai näkyvässä ilmoituksessa Palvelumme, ennen
					muutoksen voimaantuloa, ja päivitämme "voimaantulopäivän" tämän tietosuojakäytännön
					yläosassa.
				</div>

				<div className={classes.text}>
					Suosittelemme tarkistamaan tämän tietosuojakäytännön säännöllisesti muutosten varalta.
					Tämän tietosuojakäytännön muutokset ovat voimassa, kun ne julkaistaan tälle sivulle.
				</div>
			</div>
			<div className={classes.container}>
				<div className={classes.title}>
					<li>Yhteydenotot</li>
				</div>
				<div className={classes.text}>
					Jos sinulla on kysyttävää tästä tietosuojakäytännöstä, ota meihin yhteyttä:
				</div>
				<ul className={`${classes.ol} `}>
					<div className={`${classes.subtext} py-6 flex flex-col gap-y-3`}>
						<li className={"list-disc"}>sähköpostitse: salibandytv@salibandy.fi</li>
						<li className={"list-disc"}>
							Käymällä tällä sivulla verkkosivustollamme: www.salibandy.tv
						</li>
					</div>
				</ul>
			</div>
		</ol>
	);
};

export default PrivacyPolicyClient;
