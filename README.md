# My-first-google-script
# WORK IN PROGRESS
En aquest repositori trobarem els meus primers programes de google scripts
Seria interessant que el lector entengués que aquest programa és el meu primer programa amb JavaScript, i el primer que interactua amb altres programes. 
## Que cal saber abans de començar
Aquest programa va ser creat dins l'ecosositema de Google scripts, aquest repositori només és una forma de tindre una còpia de seguretat, no fucnionarà si és fa anar fora de del ecosistema. Recomano saber un xic de googleappscrits abans de fer servir el codi que conté aquest repositori, ja que sincerament és un lio.

El programa ve comentat internament pero aquí comantaré algunes consideracions avans de començar i intentaré posar tots els links a pagines d'on m'he documentat.

En el programa  va ser programat amb moltes coses com es coneix en el món de la programació *hardcoded*, serveix per a extreure informació de correus automatics de servei. La millor forma de veure com funciones esa anar descomentatnt diverses parts de manera que el programma vagi dient a la consola de commandos que està fent en cada moment.

## Exemple de us
### Setup previ
Al ecosistema de google scripts cal crear un nou projecte. Accedint a la configuració del projecte activarem la opció *Mostrar el archivo de manifiesto "appsscript.json" en el editor*  dins de aquest configurarem la nostra zona horaria, que serà necessari per evitar confusions al llarg del codi, per defecte ve configurat a nova york, [llista codis zones horaries](http://joda-time.sourceforge.net/timezones.html). Quan haguem fet aquest tramit ja podem tornar a deshabilitar la opció. Aquí el meu cas `appsscript.json`
```
{
  "timeZone": "Europe/Madrid",
  "dependencies": {},
  "exceptionLogging": "STACKDRIVER",
  "runtimeVersion": "V8",
  "webapp": {
    "executeAs": "USER_ACCESSING",
    "access": "MYSELF"
  }
}
```

Al executar per primer cop `Código.gs` et demanarà que auoritzis l'acces tant al correu com al calendar, cosa que es logica. 
En principi el programa ja hauria de funcionar, pero encara cal configurar el gmail, ho detallo a la secció seguent. La primera execuxió, tot i donar error hauria de crear les etiquetes corresponents
* Event registrat
* ERRORS
* Reserva acceptada
* Reserva eliminada

Un cop creades les etiquetes haurien de apareixer, un cop refrescada la pàgina, a la part esquerra, com qualsevol altre etiqueta. Comprvat ja que ha creat les etiquetes toca fer que els correus que arribin es classifiquin a la que toca sense apareixe a la nosra safata de entrada, així deixaran de molestar, que es l'objectiu principal. Per a conseguir aixó farem servir els filtres que venen integrats. 

A continuació posaré com está configurat el meu cas, concretament el de que un event ha estat acceptat.
*Coincideix: (from:(sict-ds.notificador@upc.edu) ("Sala Polivalent" OR "Sala d'Actes" PENDENT) -{ACCEPTAT OR eliminat})*
Aquí el [link de la documantació](https://support.google.com/mail/answer/7190?hl=en). La gracia del filtre ha de estar en que s'eviti la *safata principal* i se li apliqui **només** la etiqueta que toca en cada cas. Si hi ha alguna etiqueta extra donarà error.

I ja estaria, ara només caldria entrar a `Código.gs` i modificar-lo de manera que:
* creei i elimini els events del calendari desitgat modificant la variable. `var calendar_id = "serveistic.cdb@upc.edu";`
* agafi la informació del event que volem o si ha canviat l'estil de correus de servei. Aquí alguns fragments que s'hauran de modificar segurament.
``` 
var Keyword1 = "Motiu de la reserva";//Part que buscarem per trobar la info que volem
var Keyword2 = "<br />";//Part que buscarem per trobar la info que volem
```

```
var motiuReserva = currentmessage.substr(indexclau1, indexclau2-indexclau1);//Pillem la info que volem (inici, llargada)
              //console.log("Brut:"+motiuReserva);
              //Ara netejem el string que hem recuperat

              var Inici=motiuReserva.indexOf("> ");
              motiuReserva=motiuReserva.substr(Inici+2, motiuReserva.length);
              console.log("Net:"+ motiuReserva);

              //str.substr
```
### Esquema del funcionament
La estructura general del programma consta de la seguents parts, esquematitzades així
* Declaració de variables
* S'agafen tots els fls de totes les etiquetes i es posen en un array
* Es mira el primer fil
  * Es mira el primer misstge del fil
  * Es porocessa el missatge creant o eliminant segons toqui
* Es caniva la etiqueta de tot el fil
* Es pasa al seguent fil
### Altres consideracions
Si ja ha fet servir mai google scripts hauria de saber aquets petits detalls pero no està de més fer-ne cinc centims.
* Per activar l'escrip s'ha de anar dins el projecte, un cop estem veient el codi per editar, al deplegable de la esquerra, i clickar sobre l'icone del rellotge/apartat que posa activadorsa, allà es pot configurar un activador segons les nostres preferencies, en el cas del meu projecte cada 15 min s'activa una funció que conté la funció principal, d'aquesta manera si en el futur em cal posar mes funcions no baure de reconfigurar l'activador. 
* Es poden veure els activadors actius al [apartat activadores de la pagina principal](https://script.google.com/home/triggerst).
## Webgrafia
