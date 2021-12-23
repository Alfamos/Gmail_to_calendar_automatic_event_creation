# My-first-google-script
# WORK IN PROGRESS
En aquest repositori trobarem els meus primers programes de Google scripts
Seria interessant que el lector entengués que aquest programa és el meu primer programa amb JavaScript, i el primer que interactua amb altres programes.
## Que cal saber abans de començar
Aquest programa va ser creat dins l'ecosistema de Google scripts, aquest repositori només és una forma de tindre una còpia de seguretat, no funcionarà si es fa anar fora de de l'ecosistema. Recomano saber un xic de googleappscrits abans de fer servir el codi que conté aquest repositori, ja que sincerament és un garbuix.

El programa ve comentat internament, però aquí comentaré algunes consideracions abans de començar i intentaré posar tots els enllaços a pàgines d'on m'he documentat.

En el programa va ser programat amb moltes coses com es coneix en el món de la programació *hardcoded*, serveix per a extreure informació de correus automàtics de servei. La millor forma de veure com funciones és anar descomentant diverses parts de manera que el programa vagi dient a la consola de comandos que està fent en cada moment.

## Exemple de ús
### Setup previ
A l'ecosistema de Google scripts cal crear un nou projecte. Accedint a la configuració del projecte activarem l'opció *Mostrar el archivo de manifesto "appsscript.json" en el editor* dins d'aquest configurarem la nostra zona horària, que serà necessari per evitar confusions al llarg del codi, per defecte ve configurat a nova york, [llista codis zones horàries](http://joda-time.sourceforge.net/timezones.html). Quan hàgem fet aquest tràmit ja podem tornar a deshabilitar l'opció. Aquí el meu cas `appsscript.json`
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

A l'executar per primer cop `Código.gs` et demanarà que autoritzis l'accés tant al correu com al calendari, cosa que és lògica.
En principi el programa ja hauria de funcionar, però encara cal configurar el Gmail, ho detallo a la secció següent. La primera execució, tot i donar error hauria de crear les etiquetes corresponents
* Event registrat
* ERRORS
* Reserva acceptada
* Reserva eliminada

Un cop creades les etiquetes haurien d'aparèixer, un cop refrescada la pàgina, a la part esquerra, com qualsevol altre etiqueta. Comprat ja que ha creat les etiquetes toca fer que els correus que arribin es classifiquin a la que toca sense aparèixer a la nostra safata d'entrada, així deixaran de molestar, que és l'objectiu principal. Per a aconseguir això farem servir els filtres que venen integrats.

A continuació posaré com està configurat el meu cas, concretament el que un event ha estat acceptat.
*Coincideix: (from:(sict-ds.notificador@upc.edu) ("Sala Polivalent" OR "Sala d'Actes" PENDENT) -{ACCEPTAT OR eliminat})*
Aquí el [enllaç de la documentació](https://support.google.com/mail/answer/7190?hl=en). La gràcia del filtre ha d'estar en el fet que s'eviti la *safata principal* i se li apliqui **només** l'etiqueta que toca en cada cas. Si hi ha alguna etiqueta extra donarà error.

I ja estaria, ara només caldria entrar a 'Código.gs' i modificar-lo de manera que:
* creei i elimini els events del calendari desitjat modificant la variable. `var calendar_id = "serveistic.cdb@upc.edu";`
* agafi la informació del esdeveniment que volem o si ha canviat l'estil de correus de servei. Aquí alguns fragments que s'hauran de modificar segurament.
```
var Keyword1 = "Motiu de la reserva";//Part que buscarem per trobar la info que volem
var Keyword2 = "
";//Part que buscarem per trobar la info que volem
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
L'estructura general del programa consta de les següents parts, esquematitzades així
* Declaració de variables
* S'agafen tots els fils de totes les etiquetes i es posen en un array
* Es mira el primer fil
** Es mira el primer missatge del fil
** Es processa el missatge creant o eliminant segons toqui
* Es canvia l'etiqueta de tot el fil
* Es passa al següent fil
### Altres consideracions
Si ja ha fet servir mai Google scripts hauria de saber aquests petits detalls però no està de més fer-ne cinc cèntims.
* Per activar l'script s'ha d'anar dins el projecte, un cop estem veient el codi per editar, al desplegable de l'esquerra, i clicar sobre la icona del rellotge/apartat que posa activadors, allà es pot configurar un activador segons les nostres preferències, en el cas del meu projecte cada 15 min s'activa una funció que conté la funció principal, d'aquesta manera si en el futur em cal posar més funcions no haver de reconfigurar l'activador.
* Es poden veure els activadors actius al [apartat activadors de la pàgina principal](https://script.google.com/home/triggerst).
## Webgrafia
