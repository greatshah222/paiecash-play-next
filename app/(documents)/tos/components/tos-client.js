"use client";

import classes from "@/app/styles/documents.module.css";
import { Separator } from "@/components/ui/separator";
/* eslint-disable react/no-unescaped-entities */

const TOSClient = () => {
	return (
		<>
			<div className={classes.container}>
				<div className={classes.title}>SalibandyTV:n palveluehdot</div>
				<div className={classes.text}>Toimitusehdot ovat voimassa 1.8.2022 alkaen.</div>
				<div className={classes.text}>Viimeksi päivitetty 29.9.2022</div>

				<Separator className="my-2" />

				<div className={classes.text}>
					Tämä on Suomen Salibandyliitto ry:n videosisällön tilausvideopalvelu ja verkkokauppa
					(SalibandyTV), jonka avulla tilaajat pääsevät käyttämään Suomen Salibandyliitto ry:n
					alaisten sarjojen suoria ja tallennettuja otteluita sekä muita videoita (SalibandyTV:n
					verkkopalvelun sisältö), joita striimataan internetin kautta kytkettyihin selainpohjaisiin
					päätelaitteisiin (SalibandyTV:n verkkopalvelulaitteet).
				</div>
				<div className={classes.text}>
					SalibandyTV-verkkopalvelun palveluntarjoaja on Suomen Salibandyliitto ry (Y-tunnus
					0988019-8). Nämä palveluehdot säätelevät palvelumme käyttöä. Näissä palveluehdoissa
					käytettynä "SalibandyTV", "palvelumme" tai "palvelu" tarkoittaa Suomen Salibandyliitto
					ry:n tarjoamaa SalibandyTV-verkkopalvelua sisältömme löytämiseen ja katseluun, mukaan
					lukien kaikki ominaisuudet ja toiminnot, verkkosivusto ja käyttöliittymät sekä kaikki
					palveluumme liittyvät sisällöt ja ohjelmistot.
				</div>
				<div className={classes.text}>
					Palvelu ja siellä näkyvät live-materiaalit, tilastot, kuvat, tekstit ja logot ovat Suomen
					Salibandyliitto ry:n omaisuutta, ja niitä ei saa ilman edellä mainittujen tahojen
					yksilöityä lupaa tallentaa, jakaa, levittää tai näyttää yksityisesti ja/ tai julkisesti.
				</div>
				<div className={classes.text}>
					<div> Yhteystiedot:</div>
					<div>Sähköposti: salibandytv@salibandy.fi</div>
					<div>Osoite: Alakiventie 2, 00920 Helsinki, Finland</div>
				</div>
			</div>

			<div className={classes.container}>
				<div className={classes.title}>Tilaus sekä tilausvahvistus</div>

				<div className={classes.text}>
					Asiakas rekisteröityy SalibandyTV:n videopalvelujärjestelmään ja luo sinne
					henkilökohtaisen profiilin. Tilattavat sisältöpaketit valitaan kotisivuilla. Tilaus
					lähetetään maksamalla valittu sisältö verkkokaupan maksutoiminnossa. Tehdessäsi tilauksen
					hyväksyt nämä toimitusehdot ja palvelun hinnat. Mikäli tilaushetkellä annetaan
					sähköpostiosoite, tilauksesta lähetetään tilausvahvistus sähköpostitse.
					Tilausvahvistuksesta ilmenevät tilatut tuotteet sekä hinta.
				</div>
				<div className={classes.text}>
					Jos asiakkaalle ei syystä tai toisesta tule tilausvahvistusta, tilaus ei ole välttämättä
					onnistunut. Voit tarkistaa tilauksesi tilanteen SalibandyTV:n Profiilisi -alta, kun olet
					kirjautunut palveluun. Mikäli profiilissasi ei näy tilausta, voit ottaa yhteyttä
					asiakaspalveluumme (salibandytv@salibandy.fi).
				</div>
			</div>

			<div className={classes.container}>
				<div className={classes.title}>Sopimuksen syntyminen sekä maksaminen</div>
				<div className={classes.text}>
					Sopimus syntyy, kun asiakas on kirjautunut järjestelmään ja maksanut valitsemansa paketin.
					Kauppa syntyy verkkokaupan asiakkaan ja SalibandyTV:n palveluntarjoajan välille.
					Verkkokaupan vastuulla ovat kaikki kauppaan liittyvät velvoitteet.
				</div>
				<div className={classes.text}>
					Maksamiseen liittyvistä epäselvyyksistä olet yhteydessä Visma Pay maksupalveluun.
				</div>
				<div className={classes.text}>
					Verkkokaupan maksuvälittäjänä toimii Visma Pay (Visma Payments Oy, y-tunnus 2486559-4),
					joka on rekisteröity Finanssivalvonnan ylläpitämään maksulaitosrekisteriin. Maksamiseen
					siirrytään Visma Payn verkkopalvelun kautta ja tiliotteella ja laskulla maksun saajana
					näkyy Visma Pay tai Visma Payments Oy. Visma Pay välittää maksut verkkokauppiaalle.
					Maksaminen on turvallista, sillä kaikki maksutapahtumaa koskevat tiedot välitetään
					salattua yhteyttä käyttäen niin ettei kukaan ulkopuolinen taho näe maksutapahtuman
					tietoja.
				</div>
				<div className={classes.text}>
					Lue lisää Visma Paysta:{" "}
					<a
						href="https://www.visma.fi/vismapay/"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="visma paywebsite address"
						className="ml-2"
					>
						https://www.visma.fi/vismapay/
					</a>
				</div>
			</div>

			<div className={classes.container}>
				<div className={classes.title}>Maksutavat</div>
				<div className={classes.text}>Maksutapa valitaan tilauksen tekemisen yhteydessä.</div>
				<div className={classes.text}>
					Visma Pay -palvelun kautta voit maksaa verkkopankkitunnuksilla, lompakolla, maksukorteilla
					(credit/debit), laskulla tai osamaksulla. Käytettävissä ovat seuraavat maksutavat:
					Osuuspankki, Nordea, Danske Bank, Oma Säästöpankki, Säästöpankki, Aktia,
					Paikallisosuuspankit, S-Pankki, Handelsbanken, Ålandsbanken, MobilePay, Masterpass, Pivo,
					Visa-, Visa Debit-, Visa Electron-, MasterCard- ja Debit MasterCard -kortit, sekä Jousto,
					Fellow Lasku ja Fellow Yrityslasku.
				</div>
				<div className={classes.text}>
					MobilePay: Voit maksaa MobilePay-lompakollasi mikäli olet sallinut verkkokaupoissa
					maksamisen sovelluksen asetuksista. MobilePay-lompakolla suoritetut maksut veloitetaan
					lompakkoon liitetyltä maksukortilta. Mikäli maksun veloittaminen maksukortilta
					epäonnistuu, MobilePay-lompakolla maksaminen ei ole mahdollista verkkokaupassa.
				</div>
				<div className={classes.text}>
					Pivo: Käyttöehdot ovat tarjolla Pivon sivuilla:
					<a
						href="https://pivo.fi/kayttoehdot/pivon-kayttoehdot"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="pivo paywebsite address"
						className="ml-2"
					>
						https://pivo.fi/kayttoehdot/pivon-kayttoehdot
					</a>
				</div>
				<div className={classes.text}>
					Jousto lasku ja osamaksu on kotimainen palvelu, jolla teet ostoksesi nopeasti ja
					turvallisesti. Jousto on tarkoitettu yksityishenkilöille, jotka ovat hoitaneet
					raha-asiansa moitteettomasti. Joustolla saat 30 vuorokautta korotonta ja kulutonta
					maksuaikaa. Laskun saatuasi voit päättää maksatko sen kokonaan vai osissa. Osamaksulla
					voit maksaa ostoksesi jopa 36:ssa erässä, alkaen 9,90 eur/kk. Jousto osamaksun
					kustannukset ovat 3,90 eur/kk ja 19,90%:n luottokorko. Voit maksaa Joustolla 30–3000 euron
					ostoksia. Luotonmyöntäjänä toimii Aurajoki Nordic Oy. Lue lisää Joustosta osoitteessa
					<a
						href="www.jousto.com"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="justo website address"
						className="ml-2"
					>
						www.jousto.com
					</a>
				</div>
				<div className={classes.text}>
					OP Lasku - Joustava tapa maksaa verkko-ostokset. Kaikkien pankkien asiakkaille. OP
					Laskulla voit tehdä enintään 5 000 euron suuruisia ostoksia ja maksaa ne korottomasti pois
					45 vuorokauden sisällä. Halutessasi voit pilkkoa laskun useampaan maksuerään. Ostoksesi
					näkyvät yhdessä paikassa, joten pysyt helposti perillä rahan käytöstä. Luottorajan avulla
					pidät kulutuksen haluamissasi rajoissa. Saat laskut kätevästi sähköpostiisi.
					Verkkopalvelussamme näet tietoja OP Laskun käytöstäsi ja tekemiesi ostosten summan. Voit
					käyttää OP Laskua, jos olet maksukykyinen yli 20-vuotias, ja sinulla on suomalaisen pankin
					verkkotunnukset. Lisätietoja OP Laskuun liittyen löydät osoitteesta:
					<a
						href="https://www.op.fi/henkiloasiakkaat/paivittaiset/maksaminen/op-lasku"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="op website address"
						className="ml-2"
					>
						https://www.op.fi/henkiloasiakkaat/paivittaiset/maksaminen/op-lasku
					</a>
				</div>
				<div className={classes.text}>
					<div className="flex gap-1 flex-col">
						<div>Visma Pay -maksupalvelun yhteystiedot</div>
						<div>Visma Payments Oy (Y-tunnus 2486559-4)</div>
						<div>Sähköposti: helpdesk@vismapay.com</div>
						<div>Puhelin: 09 315 42 037 (arkisin klo 8-16)</div>
						<div>Postiosoite: Brahenkatu 4, 53100 Lappeenranta</div>
					</div>
				</div>
				<div className={classes.text}>
					Kaikki maksutavat ovat erittäin turvallisia. Verkkomaksut ja luottokorttimaksut maksetaan
					pankkien tai Visma Pay:n sivujen kautta. Suomen Salibandyliitto ry ei tallenna tai saa
					tietoonsa asiakkaiden tilitietoja. Luottokorttimaksujen tiedot tallentavat Visma Pay
					(Paybyway Oy). Luottokorttimaksujen varmentamiseen käytetään Verified by Visa - tai
					MasterCard SecureCode-järjestelmiä. Luottokorttiveloitus hyväksytään ja korttia
					veloitetaan tämän vuoksi tilaushetkellä.
				</div>
				<div className={classes.text}>
					Kestotilauksen yhteydessä asiakasta veloitetaan automaattisesti luottokortilta
					kestotilauksen summa kuukausittain. Kestotilauksen yhteydessä, tilisiirtomahdollisuus ei
					ole käytössä.
				</div>
				<div className={classes.text}>
					Jos yllä mainituista vaihtoehdoista ei löydy mieleistä, voit maksaa laskun ennakkolaskuna
					(voucherien tilaaminen), joka lähetetään sähköpostiisi. Ennakkolaskutettujen tilausten
					toimitusajan laskeminen alkaa siitä, kun asiakas saa hyväksynnän sähköpostitse
					palveluntarjoajalta.
				</div>
				<div className={classes.text}>
					Ennakkolaskulla maksetuista tilauksista veloitamme laskutuslisän 5,00 € per lähetetty
					lasku. Valitessaan maksutavaksi laskun asiakas vakuuttaa, että hänen taloudellinen
					tilanteensa tilaushetkellä on sellainen, että hän kykenee ongelmitta suorittamaan laskun
					summan ja että hänen tiedossaan ei ole sellaista seikkaa, joka saattaisi vaarantaa hänen
					maksukykynsä. Suomen Salibandyliitto ry:llä on oikeus tarkistaa laskulla maksavan
					asiakkaan luottotiedot. Jos sinulla on maksuhäiriömerkintöjä, tulee sinun maksaa
					tilauksesi aina ennakkoon.
				</div>
			</div>

			<div className={classes.container}>
				<div className={classes.title}>Arvosetelit sekä voucherit</div>

				<div className={classes.text}>
					Arvoseteliä voi käyttää palvelussa maksuvälineenä. Arvoseteliä tai voucheria voi käyttää
					kaikille normaaleille tuotteille ja tilauksille. Arvoseteliä ei voi käyttää mahdollisten
					lisämaksullisten palvelujen ostamiseen.
				</div>
			</div>
			<div className={classes.container}>
				<div className={classes.title}>Hinnat</div>

				<div className={classes.text}>Tuotteiden hinnat sisältävät arvonlisäveron.</div>
				<div className={classes.text}>
					Tuote myydään tilaamishetkellä verkkokaupan sivulla ilmoitettavalla hinnalla. SalibandyTV
					pidättää oikeuden muuttaa hintoja sekä olla myymättä tuotetta hinnalla, joka on esim.
					teknisestä tai inhimillisestä syystä päivittynyt verkkokauppaan olennaisesti väärin.
					Tällaisessa tapauksessa sovelletaan yleisiä sopimusoikeudellisia periaatteita. Näissä
					tapauksissa SalibandyTV on yhteydessä asiakkaaseen ja kaupan purkaminen on mahdollista.
				</div>
			</div>
			<div className={classes.container}>
				<div className={classes.title}>Tilauksen peruutus</div>

				<div className={classes.text}>
					Voit peruuttaa SalibandyTV -verkkopalvelun kestotilauksen milloin tahansa, jonka jälkeen
					sinulla on edelleen pääsy SalibandyTV -verkkopalveluun nykyisen laskutusjaksosi loppuun
					asti.
				</div>
				<div className={classes.text}>
					Voit peruuttaa tilauksesi menemällä "profiili" -sivulle ja valitse tilauksesi kohdalla
					”peruuta” tilaus, jolloin tilauksesi päättyy automaattisesti nykyisen laskutusjaksosi
					lopussa. "Profiili" -sivun "Oma tilaus" -kohdassa voit myös nähdä, milloin tilauksesi
					päättyy.
				</div>
				<div className={classes.text}>
					Sovellettavan lain sallimassa laajuudessa maksuja ei palauteta, emmekä tarjoa hyvityksiä
					tai hyvityksiä osittaisten kuukausien tilausjaksoista tai katsomattomasta SalibandyTV
					-palvelun sisällöstä. Myöskään yksittäisillä päivätilauksilla ei ole palautusoikeutta.
				</div>
				<div className={classes.text}>
					Muutokset hinta- ja palvelusuunnitelmiin: Voimme aika ajoin muuttaa sisältöpakettejamme ja
					palvelumme hintaa; Hintamuutokset tai palvelusuunnitelmien muutokset koskevat kuitenkin
					aikaisintaan 30 päivää ilmoituksen jälkeen.
				</div>
			</div>
			<div className={classes.container}>
				<div className={classes.title}>SalibandyTV verkkopalvelu</div>
				<div className={classes.title}>Asiakkaiden oltava täysi-ikäisiä</div>

				<div className={classes.text}>
					Sinun on oltava vähintään 18-vuotias, jotta sinulla on oikeus tilata maksullinen
					SalibandyTV -verkkopalvelu. Alaikäiset voivat käyttää palvelua vain aikuisen valvonnassa
				</div>
			</div>
			<div className={classes.container}>
				<div className={classes.title}>Ei kaupalliseen tai julkiseen esittämiseen</div>

				<div className={classes.text}>
					SalibandyTV -verkkopalvelu ja kaikki palvelun kautta katsottu sisältö on tarkoitettu vain
					henkilökohtaiseen ja ei-kaupalliseen käyttöön. SalibandyTV -verkkopalvelutilauksesi aikana
					myönnämme sinulle rajoitetun, ei-yksinomaisen, ei-siirrettävän lisenssin
					SalibandyTV-verkkopalvelun käyttämiseen ja SalibandyTV-verkkopalvelun sisällön katseluun.
					Edellä mainittua rajoitettua lisenssiä lukuun ottamatta mitään oikeuksia, omistuksia tai
					muita etuja ei siirretä sinulle. Suostut olemaan käyttämättä palvelua julkisiin
					esityksiin.
				</div>
			</div>
			<div className={classes.container}>
				<div className={classes.title}>Maantieteelliset rajoitteet</div>

				<div className={classes.text}>
					Osa SalibandyTV:n sisällöistä eivät ole katsottavissa kaikissa maissa. Ostettavan sisällön
					yhteydessä ilmoitamme, että onko sisältö ostettavissa ja katsottavissa SalibandyTV:n
					kautta maassasi. Sinulla on oikeus ostaa ja katsoa ainoastaan sisältöä johon palvelullamme
					on oikeus siinä maassa jossa asut.
				</div>
			</div>
			<div className={classes.container}>
				<div className={classes.title}>Muutokset palveluun</div>

				<div className={classes.text}>
					SalibandyTV pidättää kaikki oikeudet palvelun muutoksiin. SalibandyTV tekee säännöllisesti
					muutoksia palveluun, mukaan lukien sisältökirjasto, hinnoittelu ja sisältöpaketointi.
					Lisäksi testaamme jatkuvasti palvelumme eri puolia, kuten verkkosivustoamme,
					käyttöliittymiä, myynninedistämistoimintoja ja SalibandyTV:n verkkopalvelusisällön
					saatavuutta.
				</div>
			</div>
			<div className={classes.container}>
				<div className={classes.title}>SalibandyTV:n käyttö</div>

				<div className={classes.text}>
					Suostut käyttämään SalibandyTV -verkkopalvelua, mukaan lukien kaikki siihen liittyvät
					ominaisuudet ja toiminnot, kaikkien sovellettavien lakien, sääntöjen ja määräysten tai
					muiden palvelun tai sen sisällön käyttöä koskevien rajoitusten mukaisesti. Sitoudut
					olemaan arkistoimatta, jäljentämättä, jakamatta, muuntamatta, näyttämättä, esittelemättä,
					julkaisematta, lisensoimatta, tarjoamatta myyntiin tai käyttämättä (paitsi näissä
					käyttöehdoissa nimenomaisesti sallittua) sisältöä ja tietoja, jotka ovat tai ovat peräisin
					tai SalibandyTV-verkkopalvelun kautta. Suostut myös olemaan: kiertämättä, poistamatta,
					muuttamatta, deaktivoimatta, heikentämättä tai estämättä mitään SalibandyTV
					-verkkopalvelun sisältösuojauksia käyttäen mitä tahansa robottia, työkalua tai muuta
					automaattista tapaa päästäksesi SalibandyTV-verkkopalveluun; takaisinmallintamatta tai
					purkamatta ohjelmistoja tai muita tuotteita tai prosesseja, joihin pääsee
					SalibandyTV-verkkopalvelun kautta; lisäämättä mitä tahansa koodia tai tuotetta tai
					manipuloimatta SalibandyTV-verkkopalvelun sisältöä millään tavalla; tai käyttämättä mitä
					tahansa tiedonlouhinta-, tiedonkeruu- tai poimintamenetelmää. Lisäksi suostut olemaan
					lataamatta tai lähettämättä mitään materiaalia, joka on suunniteltu
					SalibandyTV-verkkopalveluun liittyvän tietokoneohjelmiston tai laitteiston tai
					tietoliikennelaitteiston toiminnan keskeyttämiseksi, tuhoamiseksi tai rajoittamiseksi,
					mukaan lukien ohjelmistovirukset tai muut tietokoneet, tiedostot tai ohjelmat. Voimme
					lopettaa tai rajoittaa palvelumme käyttöä, jos rikot näitä käyttöehtoja tai käytät
					palvelua laittomasti tai vilpillisesti.
				</div>
			</div>
			<div className={classes.container}>
				<div className={classes.title}>SalibandyTV:n videosisällönlaatu ja Internet-yhteys</div>

				<div className={classes.text}>
					SalibandyTV-verkkopalvelun sisällön näytön laatu voi vaihdella laitteittain, ja siihen
					voivat vaikuttaa monet tekijät, kuten päätelaitteet, Internet -modeemi, sijainti,
					Internet-yhteyden kautta käytettävissä oleva kaistanleveys ja / tai nopeus. Olet vastuussa
					kaikista internet-yhteysmaksuista. Kysy internet-palveluntarjoajalta tietoja mahdollisista
					internet-tiedonsiirtomaksuista. internet-datakapasiteetti joka kuluu
					SalibandyTV-verkkopalvelun sisällön katseluun, vaihtelee useiden tekijöiden mukaan, mukaan
					lukien sijaintisi, käytettävissä oleva kaistanleveys, valitsemasi sisältö ja
					SalibandyTV-verkkopalveluun käyttämäsi päätelaite.
				</div>
			</div>
			<div className={classes.container}>
				<div className={classes.title}>Force majeure</div>

				<div className={classes.text}>
					Suomen Salibandyliitto ry ei ole vastuussa palvelun toimimattomuudesta, viivästyksestä tai
					estymisestä, mikäli syy tähän on Suomen Salibandyliitto ry:n vaikutusmahdollisuuksien
					ulkopuolella oleva seikka, kuten tavarantoimitusten katkokset, estävät sääolosuhteet,
					luonnonmullistus, sota, onnettomuus, epidemia, tuonti- tai vientikielto, viranomaisten
					päätös, liikenteen tai energian jakelun häiriintyminen tai estyminen,
					työtaistelutoimenpide tai muu vastaava Suomen Salibandyliitto ry:n tai aiemman
					myyntiportaan toimintaa estävä seikka.
				</div>
			</div>
			<div className={classes.container}>
				<div className={classes.title}>Salasanat ja tilin käyttö</div>

				<div className={classes.text}>
					Tilaajalla tai hallintakäyttäjällä, joka on luonut SalibandyTV-verkkopalvelutilin ja jonka
					maksutapaa veloitetaan (tilin omistaja), on pääsy SalibandyTV-verkkopalvelutiliin. Tilin
					haltijan pitää hallita tiliä ja estää ketään pääsemästä tiliin (joka sisältää tietoja
					tilin katseluhistoriasta), tilinomistajan tulee ylläpitää hallintaa
					SalibandyTV-verkkopalveluun käytettävistä laitteista, joita käytetään palvelun
					käyttämiseen. Älä ikinä paljasta tiliin liittyvän maksutavan salasanaa tai yksityiskohtia
					kenellekään. Olet vastuussa meille antamiesi tiliäsi koskevien tietojen päivittämisestä ja
					ylläpitämisestä. Voimme lopettaa tilisi tai keskeyttää tilisi toiminta suojellaksemme
					sinua, Suomen Salibandyliittoa tai kumppaneitamme henkilöllisyysvarkauksilta tai muulta
					vilpilliseltä toiminnalta.
				</div>
			</div>
			<div className={classes.container}>
				<div className={classes.title}>Sovellettava lainsäädäntö</div>

				<div className={classes.text}>
					Näihin käyttöehtoihin sovelletaan ja niitä tulkitaan Suomen lakien mukaisesti. Nämä ehdot
					eivät rajoita kuluttajansuojaoikeuksia, joihin sinulla saattaa olla oikeus asuinmaasi
					pakollisten lakien nojalla. Asiakkaan ja SalibandyTV:n väliset riitatapaukset ratkaistaan
					ensisijaisesti neuvottelemalla ja jos sopimukseen ei päästä, niin Helsingin
					käräjäoikeudessa.
				</div>
			</div>
			<div className={classes.container}>
				<div className={classes.title}>Ei-toivotut materiaalit</div>

				<div className={classes.text}>
					SalibandyTV ei hyväksy ei-toivottuja materiaaleja tai ideoita
					SalibandyTV-verkkopalvelusisällölle, eikä ole vastuussa sisältönsä tai ohjelmiensa
					samankaltaisuudesta missään mediassa SalibandyTV -verkkopalveluun välitettyihin
					materiaaleihin tai ideoihin.
				</div>
			</div>
			<div className={classes.container}>
				<div className={classes.title}>Sopimusehdot</div>

				<div className={classes.text}>
					Jos jokin näiden palveluehtojen kohta tai kohdat katsotaan pätemättömiksi, laittomiksi tai
					täytäntöönpanokelvottomiksi, jäljellä olevienehtojen pätevyys, laillisuus ja
					täytäntöönpanokelpoisuus ovat edelleen voimassa.
				</div>
			</div>
			<div className={classes.container}>
				<div className={classes.title}>Palveluehtojen muutokset</div>

				<div className={classes.text}>
					SalibandyTV voi ajoittain muuttaa näitä palveluehtoja. SalibandyTV ja Suomen
					Salibandyliitto ry. pidättää oikeuden muuttaa palvelu- ja sopimusehtojaan ilmoituksetta.
					Pyrimme kuitenkin ilmoittamaan sinulle vähintään 30 päivää ennen kuin uudet käyttöehdot
					koskevat sinua.
				</div>
			</div>
			<div className={classes.container}>
				<div className={classes.title}>Yrityksen vastuu ja vastuun rajoitukset</div>

				<div className={classes.text}>
					SalibandyTV ja Suomen Salibandyliitto ry ei vastaa yrityksen vaikutusmahdollisuuksien
					ulkopuolella ilmenevistä ongelmista (esim. yksittäisen kuluttajan internetoperaattorista
					johtuvista internetyhteyden pätkimisistä tai laitteiston yhteensopivuusongelmista).
				</div>
				<div className={classes.text}>
					SalibandyTV ja Suomen Salibandyliitto ry pidättää oikeuden toimitusehtojen ja hintojen
					sekä aikataulujen muutoksiin.
				</div>
			</div>
			<div className={classes.container}>
				<div className={classes.title}>Sähköinen viestintä</div>

				<div className={classes.text}>
					Lähetämme sinulle tiliäsi koskevia tietoja (esim. maksuvaltuudet, laskut, salasanan tai
					maksutavan muutokset, vahvistusviestit, ilmoitukset) vain sähköisessä muodossa,
					esimerkiksi sähköpostitse rekisteröinnin yhteydessä annettuun sähköpostiosoitteeseesi.
				</div>
			</div>
			<div className={classes.container}>
				<div className={classes.title}>Asiakaspalvelu</div>

				<div className={classes.text}>
					Jos haluat lisätietoja palvelustamme ja sen ominaisuuksista tai jos tarvitset apua, ota
					yhteyttä asiakaspalveluumme osoitteessa salibandytv@salibandy.fi. Jos näiden käyttöehtojen
					ja asiakastuen tai verkkosivustomme muiden osien välisten tietojen välillä on
					ristiriitoja, nämä käyttöehdot hallitsevat.
				</div>
			</div>
		</>
	);
};

export default TOSClient;
