# My-first-google-script
En aquest repositori trobarem els meus primers programes de google scripts
Seria interessant que el lector entengués que aquest programa és el meu primer programa amb JavaScript, i el primer que interactua amb altres programes. 
## Que cal saber abans de començar
Aquest programa va ser creat dins l'ecosositema de Google scripts, aquest repositori només és una forma de tindre una còpia de seguretat, no fucnionarà si és fa anar fora de del ecosistema. Recomano saber un xic de googleappscrits abans de fer servir el codi que conté aquest repositori, ja que sincerament és un lio.

El programa ve comentat internament pero aquí comantaré algunes consideracions avans de començar i intentaré posar tots els links a pagines d'on m'he documentat.

En el programa  va ser programat amb moltes coses com es coneix en el món de la programació *hardcoded*, serveix per a extreure informació de correus automatics de servei. La millor forma de veure com funciones esa anar descomentatnt diverses parts de manera que el programma vagi dient a la consola de commandos que està fent en cada moment.

## Exemple de us
### Setup previ
Al ecosistema de google scripts cal crear un nou projecte. Accedint a la configuració del projecte activarem la opció *Mostrar el archivo de manifiesto "appsscript.json" en el editor*  dins de aquest configurarem la nostra zona horaria, que serà necessari per evitar confusions al llarg del codi, per defecte ve configurat a nova york [llista codis zones horaries](http://joda-time.sourceforge.net/timezones.html). Quan haguem fet aquest tramit ja podem tornar a deshabilitar la opció. Aquí el meu cas [`codi`]
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

Al executar per primer cop et demanarà que auoritzis l'acces tant al correu com al calendar, cosa que es logica. 
En principi el programa ja hauria de funcionar, pero encara cal configurar el gmail, ho detallo a la secció seguent. La primera execuxió, tot i donar error hauria de crear les etiquetes corresponents
* Event registrat
* ERRORS
* Reserva acceptada
* Reserva eliminada

Un cop creades les etiquetes haurien de apareixer, un cop refrescada la pàgina, a la part esquerra, com qualsevol altre etiqueta. Comprvat ja que ha creat les etiquetes toca fer que els correus que arribin es classifiquin a la que toca sense apareixe a la nosra safata de entrada, així deixaran de molestar, que es l'objectiu principal. Per a conseguir aixó farem servir els filtres que venen integrats. 

A continuació posaré com está configurat el meu cas, concretament el de que un event ha estat acceptat.
*Coincideix: (from:(sict-ds.notificador@upc.edu) ("Sala Polivalent" OR "Sala d'Actes" PENDENT) -{ACCEPTAT OR eliminat})*
Aquí el [link de la documantació](https://support.google.com/mail/answer/7190?hl=en). La gracia del filtre ha de estar en que s'eviti la *safata principal* i se li apliqui **només** la etiqueta que toca en cada cas.


## Webrafia
