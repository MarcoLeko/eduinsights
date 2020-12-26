import React from "react";
import { Box, Container, Link } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2, 0),
  },
}));

export const Imprint = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="md" classes={{ root: classes.root }}>
      <Typography variant="h4" component="h2">
        Imprint (GER)
      </Typography>
      <Box my={2}>
        <Typography variant="body1" component="p">
          Informationspflicht laut § 5 TMG.
        </Typography>
        <Typography variant="body1" component="p">
          <Typography variant="body1" component="p">
            Marco Leko
          </Typography>
          <Typography variant="body1" component="p">
            Putzbrunnerstraße, 130a, <br />
            85521 Ottobrunn, <br />
            Deutschland
          </Typography>
          <Typography variant="body1" component="p">
            <strong>Tel.:</strong> 017642013393
            <br />
            <strong>E-Mail:</strong>{" "}
            <Link href="mailto:leko.marco@outlook.com">
              leko.marco(at)outlook.com
            </Link>
          </Typography>
        </Typography>
      </Box>
      <Box my={2}>
        <Typography variant="h5">EU-Streitschlichtung</Typography>
        <Typography variant="body2" component="p">
          Gemäß Verordnung über Online-Streitbeilegung in
          Verbraucherangelegenheiten (ODR-Verordnung) möchten wir Sie über die
          Online-Streitbeilegungsplattform (OS-Plattform) informieren.
          <br />
          Verbraucher haben die Möglichkeit, Beschwerden an die Online
          Streitbeilegungsplattform der Europäischen Kommission unter{" "}
          <Link
            href="https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&amp;lng=DE"
            target="_blank"
            rel="noopener"
          >
            http://ec.europa.eu/odr?tid=321244534
          </Link>{" "}
          zu richten. Die dafür notwendigen Kontaktdaten finden Sie oberhalb in
        </Typography>
        <br />
        <Typography variant="body2" component="p">
          Wir möchten Sie jedoch darauf hinweisen, dass wir nicht bereit oder
          verpflichtet sind, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </Typography>
      </Box>
      <Box my={2}>
        <Typography variant="h5">Haftung für Inhalte dieser Website</Typography>
        <Typography variant="body2" component="p">
          Wir entwickeln die Inhalte dieser Webseite ständig weiter und bemühen
          uns korrekte und aktuelle Informationen bereitzustellen. Laut
          Telemediengesetz{" "}
          <Link
            href="https://www.gesetze-im-internet.de/tmg/__7.html?tid=321244534"
            rel="noopener"
            target="_blank"
          >
            (TMG) §7 (1)
          </Link>{" "}
          sind wir als Diensteanbieter für eigene Informationen, die wir zur
          Nutzung bereitstellen, nach den allgemeinen Gesetzen verantwortlich.
          Leider können wir keine Haftung für die Korrektheit aller Inhalte auf
          dieser Webseite übernehmen, speziell für jene die seitens Dritter
          bereitgestellt wurden. Als Diensteanbieter im Sinne der §§ 8 bis 10
          sind wir nicht verpflichtet, die von ihnen übermittelten oder
          gespeicherten Informationen zu überwachen oder nach Umständen zu
          forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
        </Typography>
        <p>
          Unsere Verpflichtungen zur Entfernung von Informationen oder zur
          Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen
          aufgrund von gerichtlichen oder behördlichen Anordnungen bleiben auch
          im Falle unserer Nichtverantwortlichkeit nach den §§ 8 bis 10
          unberührt.{" "}
        </p>
        <p>
          Sollten Ihnen problematische oder rechtswidrige Inhalte auffallen,
          bitte wir Sie uns umgehend zu kontaktieren, damit wir die
          rechtswidrigen Inhalte entfernen können. Sie finden die Kontaktdaten
          im Impressum.
        </p>
      </Box>
      <h2 className="adsimple-321244534">
        Haftung für Links auf dieser Website
      </h2>
      <p>
        Unsere Webseite enthält Links zu anderen Webseiten für deren Inhalt wir
        nicht verantwortlich sind. Haftung für verlinkte Websites besteht für
        uns nicht, da wir keine Kenntnis rechtswidriger Tätigkeiten hatten und
        haben, uns solche Rechtswidrigkeiten auch bisher nicht aufgefallen sind
        und wir Links sofort entfernen würden, wenn uns Rechtswidrigkeiten
        bekannt werden.
      </p>
      <p>
        Wenn Ihnen rechtswidrige Links auf unserer Website auffallen, bitte wir
        Sie uns zu kontaktieren. Sie finden die Kontaktdaten im Impressum.
      </p>
      <h2 className="adsimple-321244534">Urheberrechtshinweis</h2>
      <p>
        Alle Inhalte dieser Webseite (Bilder, Fotos, Texte, Videos) unterliegen
        dem Urheberrecht der Bundesrepublik Deutschland. Bitte fragen Sie uns
        bevor Sie die Inhalte dieser Website verbreiten, vervielfältigen oder
        verwerten wie zum Beispiel auf anderen Websites erneut veröffentlichen.
        Falls notwendig, werden wir die unerlaubte Nutzung von Teilen der
        Inhalte unserer Seite rechtlich verfolgen.
      </p>
      <p>
        Sollten Sie auf dieser Webseite Inhalte finden, die das Urheberrecht
        verletzen, bitten wir Sie uns zu kontaktieren.
      </p>
      <h2 className="adsimple-321244534">Bildernachweis</h2>
      <p>
        Die Bilder, Fotos und Grafiken auf dieser Webseite sind urheberrechtlich
        geschützt.
      </p>
      <p>
        Die Bilderrechte liegen bei den folgenden Fotografen und Unternehmen:
      </p>
      <ul className="adsimple-321244534">
        <li className="adsimple-321244534">Fotograf Mustermann</li>
      </ul>
      <h1 className="adsimple-321244534">Datenschutzerklärung</h1>
      <h2 className="adsimple-321244534">Datenschutz</h2>
      <p>
        Wir haben diese Datenschutzerklärung (Fassung 26.12.2020-321244534)
        verfasst, um Ihnen gemäß der Vorgaben der{" "}
        <a
          className="adsimple-321244534"
          href="https://eur-lex.europa.eu/legal-content/DE/ALL/?uri=celex%3A32016R0679&amp;tid=321244534"
          target="_blank"
          rel="noopener"
        >
          Datenschutz-Grundverordnung (EU) 2016/679
        </a>{" "}
        zu erklären, welche Informationen wir sammeln, wie wir Daten verwenden
        und welche Entscheidungsmöglichkeiten Sie als Besucher dieser Webseite
        haben.
      </p>
      <p>
        Leider liegt es in der Natur der Sache, dass diese Erklärungen sehr
        technisch klingen, wir haben uns bei der Erstellung jedoch bemüht die
        wichtigsten Dinge so einfach und klar wie möglich zu beschreiben.
      </p>
      <h2 className="adsimple-321244534">TLS-Verschlüsselung mit https</h2>
      <p>
        Wir verwenden https um Daten abhörsicher im Internet zu übertragen
        (Datenschutz durch Technikgestaltung{" "}
        <a
          className="adsimple-321244534"
          href="https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32016R0679&amp;from=DE&amp;tid=321244534"
          target="_blank"
          rel="noopener"
        >
          Artikel 25 Absatz 1 DSGVO
        </a>
        ). Durch den Einsatz von TLS (Transport Layer Security), einem
        Verschlüsselungsprotokoll zur sicheren Datenübertragung im Internet
        können wir den Schutz vertraulicher Daten sicherstellen. Sie erkennen
        die Benutzung dieser Absicherung der Datenübertragung am kleinen
        Schloßsymbol links oben im Browser und der Verwendung des Schemas https
        (anstatt http) als Teil unserer Internetadresse.
      </p>
      <h2 className="adsimple-321244534">OpenStreetMap Datenschutzerklärung</h2>
      <p>
        Wir haben auf unserer Website Kartenausschnitte des Online-Kartentools
        „OpenStreetMap“ eingebunden. Dabei handelt es sich um ein sogenanntes
        Open-Source-Mapping, welches wir über eine API (Schnittstelle) abrufen
        können. Angeboten wird diese Funktion von OpenStreetMap Foundation, St
        John’s Innovation Centre, Cowley Road, Cambridge, CB4 0WS, United
        Kingdom. Durch die Verwendung dieser Kartenfunktion wird Ihre IP-Adresse
        an OpenStreetMap weitergeleitet. In dieser Datenschutzerklärung erfahren
        Sie warum wir Funktionen des Tools OpenStreetMap verwenden, wo welche
        Daten gespeichert werden und wie Sie diese Datenspeicherung verhindern
        können.
      </p>
      <h3 className="adsimple-321244534">Was ist OpenStreetMap?</h3>
      <p>
        Das Projekt OpenStreetMap wurde 2004 ins Leben gerufen. Ziel des
        Projekts ist und war es, eine freie Weltkarte zu erschaffen. User
        sammeln weltweit Daten etwa über Gebäude, Wälder, Flüsse und Straßen. So
        entstand über die Jahre eine umfangreiche, von Usern selbst erstellte
        digitale Weltkarte. Selbstverständlich ist die Karte, nicht vollständig,
        aber in den meisten Regionen mit sehr vielen Daten ausgestattet.
      </p>
      <h3 className="adsimple-321244534">
        Warum verwenden wir OpenStreetMap auf unserer Website?
      </h3>
      <p>
        Unsere Website soll Ihnen in erster Linie hilfreich sein. Und das ist
        sie aus unserer Sicht immer dann, wenn man Information schnell und
        einfach findet. Da geht es natürlich einerseits um unsere
        Dienstleistungen und Produkte, andererseits sollen Ihnen auch weitere
        hilfreiche Informationen zur Verfügung stehen. Deshalb nutzen wir auch
        den Kartendienst OpenStreetMap. Denn so können wir Ihnen beispielsweise
        genau zeigen, wie Sie unsere Firma finden. Die Karte zeigt Ihnen den
        besten Weg zu uns und Ihre Anfahrt wird zum Kinderspiel.
      </p>
      <h3 className="adsimple-321244534">
        Welche Daten werden von OpenStreetMap gespeichert?
      </h3>
      <p>
        Wenn Sie eine unserer Webseiten besuchen, die OpenStreetMap anbietet,
        werden Nutzerdaten an den Dienst übermittelt und dort gespeichert.
        OpenStreetMap sammelt etwa Informationen über Ihre Interaktionen mit der
        digitalen Karte, Ihre IP-Adresse, Daten zu Ihrem Browser, Gerätetyp,
        Betriebssystem und an welchem Tag und zu welcher Uhrzeit Sie den Dienst
        in Anspruch genommen haben. Dafür wird auch Tracking-Software zur
        Aufzeichnung von Userinteraktionen verwendet. Das Unternehmen gibt hier
        in der eigenen Datenschutzerklärung das Analysetool „Piwik“ an.
      </p>
      <p>
        Die erhobenen Daten sind in Folge den entsprechenden Arbeitsgruppen der
        OpenStreetMap Foundation zugänglich. Laut dem Unternehmen werden
        persönliche Daten nicht an andere Personen oder Firmen weitergegeben,
        außer dies ist rechtlich notwendig. Der Drittanbieter Piwik speichert
        zwar Ihre IP-Adresse, allerdings in gekürzter Form.
      </p>
      <p>
        Folgendes Cookie kann in Ihrem Browser gesetzt werden, wenn Sie mit
        OpenStreetMap auf unserer Website interagieren:
      </p>
      <p>
        <strong className="adsimple-321244534">Name:</strong> _osm_location
        <br />
        <strong className="adsimple-321244534">Wert:</strong>{" "}
        9.63312%7C52.41500%7C17%7CM
        <br />
        <strong className="adsimple-321244534">Verwendungszweck:</strong> Das
        Cookie wird benötigt, um die Inhalte von OpenStreetMap zu entsperren.
        <br />
        <strong className="adsimple-321244534">Ablaufdatum:</strong> nach 10
        Jahren
      </p>
      <p>
        Wenn Sie sich das Vollbild der Karte ansehen wollen, werden Sie auf die
        OpenStreetMap-Website verlinkt. Dort können unter anderem folgende
        Cookies in Ihrem Browser gespeichert werden:
      </p>
      <p>
        <strong className="adsimple-321244534">Name:</strong> _osm_totp_token
        <br />
        <strong className="adsimple-321244534">Wert:</strong> 148253321244534-2
        <br />
        <strong className="adsimple-321244534">Verwendungszweck:</strong> Dieses
        Cookie wird benutzt, um die Bedienung des Kartenausschnitts zu
        gewährleisten.
        <br />
        <strong className="adsimple-321244534">Ablaufdatum:</strong> nach einer
        Stunde
      </p>
      <p>
        <strong className="adsimple-321244534">Name:</strong> _osm_session
        <br />
        <strong className="adsimple-321244534">Wert:</strong>{" "}
        1d9bfa122e0259d5f6db4cb8ef653a1c
        <br />
        <strong className="adsimple-321244534">Verwendungszweck:</strong> Mit
        Hilfe des Cookies können Sitzungsinformationen (also Userverhalten)
        gespeichert werden.
        <br />
        <strong className="adsimple-321244534">Ablaufdatum:</strong> nach
        Sitzungsende
      </p>
      <p>
        <strong className="adsimple-321244534">Name:</strong> _pk_id.1.cf09
        <br />
        <strong className="adsimple-321244534">Wert:</strong>{" "}
        4a5.1593684142.2.1593688396.1593688396321244534-9
        <br />
        <strong className="adsimple-321244534">Verwendungszweck:</strong> Dieses
        Cookie wird von Piwik gesetzt, um Userdaten wie etwa das Klickverhalten
        zu speichern bzw. zu messen.
        <br />
        <strong className="adsimple-321244534">Ablaufdatum:</strong> nach einem
        Jahr
      </p>
      <h3 className="adsimple-321244534">
        Wie lange und wo werden die Daten gespeichert?
      </h3>
      <p>
        Die API-Server, die Datenbanken und die Server von Hilfsdiensten
        befinden sich derzeit im Vereinten Königreich (Großbritannien und
        Nordirland) und in den Niederlanden. Ihre IP-Adresse und
        Userinformationen, die in gekürzter Form durch das Webanalysetool Piwik
        gespeichert werden, werden nach 180 Tagen wieder gelöscht.
      </p>
      <h3 className="adsimple-321244534">
        Wie kann ich meine Daten löschen bzw. die Datenspeicherung verhindern?
      </h3>
      <p>
        Sie haben jederzeit das Recht auf Ihre personenbezogenen Daten
        zuzugreifen und Einspruch gegen die Nutzung und Verarbeitung zu erheben.
        Cookies, die von OpenStreetMap möglicherweise gesetzt werden, können Sie
        in Ihrem Browser jederzeit verwalten, löschen oder deaktivieren. Dadurch
        wird allerdings der Dienst nicht mehr im vollen Ausmaß funktionieren.
        Bei jedem Browser funktioniert die Verwaltung, Löschung oder
        Deaktivierung von Cookies etwas anders. Im Folgenden finden Sie Links zu
        den Anleitungen der bekanntesten Browser:
      </p>
      <p>
        <a
          className="adsimple-321244534"
          href="https://support.google.com/chrome/answer/95647?tid=321244534"
          target="_blank"
          rel="noopener noreferrer"
        >
          Chrome: Cookies in Chrome löschen, aktivieren und verwalten
        </a>
      </p>
      <p>
        <a
          className="adsimple-321244534"
          href="https://support.apple.com/de-at/guide/safari/sfri11471/mac?tid=321244534"
          target="_blank"
          rel="noopener noreferrer"
        >
          Safari: Verwalten von Cookies und Websitedaten mit Safari
        </a>
      </p>
      <p>
        <a
          className="adsimple-321244534"
          href="https://support.mozilla.org/de/kb/cookies-und-website-daten-in-firefox-loschen?tid=321244534"
          target="_blank"
          rel="noopener noreferrer"
        >
          Firefox: Cookies löschen, um Daten zu entfernen, die Websites auf
          Ihrem Computer abgelegt haben
        </a>
      </p>
      <p>
        <a
          className="adsimple-321244534"
          href="https://support.microsoft.com/de-at/help/17442/windows-internet-explorer-delete-manage-cookies?tid=321244534"
          target="_blank"
          rel="noopener noreferrer"
        >
          Internet Explorer: Löschen und Verwalten von Cookies
        </a>
      </p>
      <p>
        <a
          className="adsimple-321244534"
          href="https://support.microsoft.com/de-at/help/4027947/windows-delete-cookies?tid=321244534"
          target="_blank"
          rel="noopener noreferrer"
        >
          Microsoft Edge: Löschen und Verwalten von Cookies
        </a>
      </p>
      <p>
        Wenn Sie mehr über die Datenverarbeitung durch OpenStreetMap erfahren
        wollen, empfehlen wir Ihnen die Datenschutzerklärung des Unternehmens
        unter{" "}
        <a
          className="adsimple-321244534"
          href="https://wiki.osmfoundation.org/wiki/Privacy_Policy?tid=321244534"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://wiki.osmfoundation.org/wiki/Privacy_Policy.
        </a>
      </p>
      <h2 className="adsimple-321244534">Mapbox API Datenschutzerklärung</h2>
      <p>
        Auf unserer Website nutzen wir die Mapbox API des amerikanischen
        Software-Unternehmens Mapbox Inc., 740 15th Street NW, 5th Floor,
        District of Columbia 20005, USA. Mapbox ist ein Online-Kartentool
        (Open-Source-Mapping), das über eine Schnittstelle (API) abgerufen wird.
        Durch die Nutzung dieses Tools wird unter anderem Ihre IP-Adresse an
        Mapbox weitergeleitet und gespeichert. In dieser Datenschutzerklärung
        erfahren Sie mehr über die Funktionen des Tools, warum wir es verwenden
        und vor allem welche Daten gespeichert werden und wie Sie das verhindern
        können.
      </p>
      <h3 className="adsimple-321244534">Was ist Mapbox API?</h3>
      <p>
        Mapbox ist ein amerikanisches Software-Unternehmen, das
        benutzerdefinierte Online-Karten für Websites anbieten. Mit Mapbox kann
        man Inhalte auf unserer Website illustrieren oder beispielsweise
        Anfahrtswege grafisch darstellen. Die Karten können mit kleinen
        Code-Snippets (JavaScript-Code) sehr leicht in unsere Website
        eingebunden werden. Mapbox bietet unter anderem eine mobile-freundliche
        Umgebung, die Routenauskunft erfolgt in Echtzeit und Daten werden
        visualisiert dargestellt.
      </p>
      <h3 className="adsimple-321244534">
        Warum verwenden wir Mapbox API auf unserer Website?
      </h3>
      <p>
        Wir wollen Ihnen auch auf unserer Website einen umfassenden Service
        bieten und dieser soll nicht einfach bei unseren Dienstleistungen oder
        Produkten enden. Nein, auch unsere gesamten Inhalte sollen Ihnen von
        Nutzen sein. Und dazu zählen zum Beispiel auch Anfahrtskarten, die Ihnen
        etwa den Weg zu unserem Unternehmen zeigen.
      </p>
      <h3 className="adsimple-321244534">
        Welche Daten werden von Mapbox API gespeichert?
      </h3>
      <p>
        Wenn Sie eine unserer Unterseiten aufrufen, die eine Online-Karte von
        Mapbox eingebunden hat, können Daten über Ihr Nutzerverhalten gesammelt
        und gespeichert werden. Das muss sein, damit die eingebundenen
        Online-Karten einwandfrei funktionieren. Es kann auch sein, dass
        erhobene Daten durch Mapbox an Dritte weitergegeben werden, allerdings
        keine personenbezogenen Daten. Das geschieht entweder, wenn dies aus
        rechtlichen Gründen nötig ist oder wenn Mapbox ein anderes Unternehmen
        explizit beauftragt. Die Karteninhalte werden direkt an Ihren Browser
        übermittelt und in unsere Website eingebunden.
      </p>
      <p>
        Mapbox erfasst automatisch bestimmte technische Informationen, wenn
        Anfragen an die APIs gestellt werden. Dazu zählen neben Ihrer IP-Adresse
        etwa Browserinformationen, Ihr Betriebssystem, Inhalt der Anfrage,
        eingeschränkte Standorts- und Nutzungsdaten, die URL der besuchten
        Webseite und Datum und Uhrzeit des Websitebesuchs. Laut Mapbox werden
        die Daten nur zur Verbesserung der eigenen Produkte verwendet. Zudem
        sammelt Mapbox auch zufällig generierte IDs, um Nutzerverhalten zu
        analysieren und die Anzahl der aktiven User festzustellen.
      </p>
      <p>
        Wenn Sie eine unserer Unterseiten nutzen und mit einer Online-Karte
        interagieren, setzt Mapbox folgendes Cookie in Ihrem Browser:
      </p>
      <p>
        <strong className="adsimple-321244534">Name:</strong>{" "}
        ppcbb-enable-content-mapbox_js
        <br />
        <strong className="adsimple-321244534">Wert:</strong>{" "}
        1605795587321244534-4
        <br />
        <strong className="adsimple-321244534">Verwendungszweck:</strong>{" "}
        Genauere Informationen über den Verwendungszweck des Cookies konnten wir
        bis dato noch nicht in Erfahrung bringen.
        <br />
        <strong className="adsimple-321244534">Ablaufdatum:</strong> nach einem
        Jahr
      </p>
      <p>
        <strong className="adsimple-321244534">Anmerkung:</strong> Bei unseren
        Tests haben wir im Chrome-Browser kein Cookie gefunden, in anderen
        Browsern allerdings schon.
      </p>
      <h3 className="adsimple-321244534">
        Wo und wie lange werden Daten gespeichert?
      </h3>
      <p>
        Die erhobenen Daten werden auf amerikanischen Servern des Unternehmens
        Mapbox gespeichert und verarbeitet. Ihre IP-Adresse wird aus
        Sicherheitsgründen für 30 Tage aufbewahrt und anschließend gelöscht.
        Zufällig generierte IDs (keine personenbezogenen Daten), die die Nutzung
        der APIs analysieren werden nach 36 Monaten wieder gelöscht.
      </p>
      <h3 className="adsimple-321244534">
        Wie kann ich meine Daten löschen bzw. die Datenspeicherung verhindern?
      </h3>
      <p>
        Wenn Sie nicht wollen, dass Mapbox Daten über Sie bzw. Ihr Userverhalten
        verarbeitet, können Sie in Ihren Browsereinstellungen JavaScript
        deaktivieren. Natürlich können Sie dann allerdings auch die
        entsprechenden Funktionen nicht mehr im vollen Ausmaß nutzen.
      </p>
      <p>
        Sie haben jederzeit das Recht auf Ihre personenbezogenen Daten
        zuzugreifen und Einspruch gegen die Nutzung und Verarbeitung zu erheben.
        Cookies, die von Mapbox API möglicherweise gesetzt werden, können Sie in
        Ihrem Browser jederzeit verwalten, löschen oder deaktivieren. Dadurch
        funktioniert allerdings der Dienst eventuell nicht mehr vollständig. Bei
        jedem Browser funktioniert die Verwaltung, Löschung oder Deaktivierung
        von Cookies etwas anders. Im Folgenden finden Sie Links zu den
        Anleitungen der bekanntesten Browser:
      </p>
      <p>
        <a
          className="adsimple-321244534"
          href="https://support.google.com/chrome/answer/95647?tid=321244534"
          target="_blank"
          rel="noopener noreferrer"
        >
          Chrome: Cookies in Chrome löschen, aktivieren und verwalten
        </a>
      </p>
      <p>
        <a
          className="adsimple-321244534"
          href="https://support.apple.com/de-at/guide/safari/sfri11471/mac?tid=321244534"
          target="_blank"
          rel="noopener noreferrer"
        >
          Safari: Verwalten von Cookies und Websitedaten mit Safari
        </a>
      </p>
      <p>
        <a
          className="adsimple-321244534"
          href="https://support.mozilla.org/de/kb/cookies-und-website-daten-in-firefox-loschen?tid=321244534"
          target="_blank"
          rel="noopener noreferrer"
        >
          Firefox: Cookies löschen, um Daten zu entfernen, die Websites auf
          Ihrem Computer abgelegt haben
        </a>
      </p>
      <p>
        <a
          className="adsimple-321244534"
          href="https://support.microsoft.com/de-at/help/17442/windows-internet-explorer-delete-manage-cookies?tid=321244534"
          target="_blank"
          rel="noopener noreferrer"
        >
          Internet Explorer: Löschen und Verwalten von Cookies
        </a>
      </p>
      <p>
        <a
          className="adsimple-321244534"
          href="https://support.microsoft.com/de-at/help/4027947/windows-delete-cookies?tid=321244534"
          target="_blank"
          rel="noopener noreferrer"
        >
          Microsoft Edge: Löschen und Verwalten von Cookies
        </a>
      </p>
      <p>
        Wenn Sie mehr über die Datenverarbeitung durch Mapbox erfahren wollen,
        empfehlen wir Ihnen die Datenschutzerklärung des Unternehmens unter{" "}
        <a
          className="adsimple-321244534"
          href="https://www.mapbox.com/legal/privacy?tid=321244534"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://www.mapbox.com/legal/privacy
        </a>
        .
      </p>
    </Container>
  );
};
