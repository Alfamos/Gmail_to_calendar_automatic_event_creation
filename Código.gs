var calendar_id = "serveistic.cdb@upc.edu";
let month_short= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
let month_long = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var All_OK = true;
var creating = false;
var eliminating =false;
var modifying = false;

//Aquí començem a fer el diccionari per arregar el html al final
var alphabet = "&quot;&amp;&sol;&lt;&gt;&sbquo;&bdquo;&dagger;&Dagger;&permil;&lsaquo;&lsquo;&rsquo;&ldquo;&rdquo;&trade;&rsaquo;&nbsp;&iexcl;&cent;&pound;&curren;&yen;&brvbar;&sect;&uml;&copy;&ordf;&laquo;&not;&shy;&reg;&macr;&deg;&plusmn;&sup2;&sup3;&acute;&micro;&para;&middot;&cedil;&sup1;&ordm;&raquo;&frac14;&frac12;&frac34;&iquest;&Agrave;&Aacute;&Acirc;&Atilde;&Auml;&Aring;&AElig;&Ccedil;&Egrave;&Eacute;&Ecirc;&Euml;&Igrave;&Iacute;&Icirc;&Iuml;&ETH;&Ntilde;&Ograve;&Oacute;&Ocirc;&Otilde;&Ouml;&times;&Oslash;&Ugrave;&Uacute;&Ucirc;&Uuml;&Yacute;&THORN;&szlig;&agrave;&aacute;&acirc;&atilde;&auml;&aring;&aelig;&ccedil;&egrave;&eacute;&ecirc;&euml;&igrave;&iacute;&icirc;&iuml;&eth;&ntilde;&ograve;&oacute;&ocirc;&otilde;&ouml;&divide;&oslash;&ugrave;&uacute;&ucirc;&uuml".split(';');
var encrypted = '";&;/;<;>;‚;„;†;‡;‰;‹;‘;’;“;”;™;›;;¡;¢;£;¤;¥;¦;§;¨;©;ª;«;¬;­;®;¯;°;±;²;³;´;µ;¶;·;¸;¹;º;»;¼;½;¾;¿;À;Á;Â;Ã;Ä;Å;Æ;Ç;È;É;Ê;Ë;Ì;Í;Î;Ï;Ð;Ñ;Ò;Ó;Ô;Õ;Ö;×;Ø;Ù;Ú;Û;Ü;Ý;Þ;ß;à;á;â;ã;ä;å;æ;ç;è;é;ê;ë;ì;í;î;ï;ð;ñ;ò;ó;ô;õ;ö;÷;ø;ù;ú;û;ü'.split(';'); //change this to your key

var dict = {};

for (var i=0;i< alphabet.length;i++){
    dict[alphabet[i]+';']=encrypted[i];
}

function evants_al_calendari (){
  auto_register_ACCEPTAT();
}


function auto_register_ACCEPTAT (){

  var Keyword1 = "Motiu de la reserva";//Part que buscarem per trobar la info que volem
  var Keyword2 = "<br />";//Part que buscarem per trobar la info que volem
  var Keyword3 = "Descripci";//Key word per trobar el nom de contacte
  var Keyword4 = "</p>";//Key word per trobar el nom de contacte
  var label_creating = GmailApp.getUserLabelByName("Reserva acceptada"); //agafem la etiqueta de veritat, no val amb modificar etiquetes per nom si no que son una cosa espacial
  var label_processing = GmailApp.getUserLabelByName("Event registrat");
  var label_error = GmailApp.getUserLabelByName("ERRORS");
  var label_eliminating = GmailApp.getUserLabelByName("Reserva eliminada");
  
  //Su no existisin les etiquetes les creariem aquí
  if (label_processing==null){
     GmailApp.createLabel('Event registrat');
     console.log("label_processing Created");
  }
  if (label_error==null){
     GmailApp.createLabel('ERRORS');
     console.log("label_error Created");
  }

  if(label_creating == null){ 
    GmailApp.createLabel('Reserva acceptada');
     console.log("label_creating Created");
  }
  if(label_eliminating == null){ 
    GmailApp.createLabel('Reserva eliminada');
     console.log("label_eliminating Created");
  }

  

  //Creem el xurro de fils
  var threads_creating = label_creating.getThreads();
  var threads_eliminating = label_eliminating.getThreads();
          //console.log("Threads:"+ threads);
  var threads = threads_creating.concat(threads_eliminating);
        



  if (threads.length == 0){
         console.log("No thread");
         All_OK = false;
        }
      else{
        console.log("Number of threads:"+ threads.length);

        for (var i = 0; i < threads.length; i++) { //anem seleccinant cada thread per despues anar seleccionant cada missatge
          console.log("Llegint thread:"+ i);
          var thread_label_name = threads[i].getLabels()[0].getName();
          var thread_label_creating_name = label_creating.getName();

          

          if (threads[i].getLabels()[0].getName() == label_creating.getName()){
            creating = true;
            eliminating = false;
            modifying = false;
          }
          else if(threads[i].getLabels()[0].getName() == label_eliminating.getName()){
            creating = false;
            eliminating = true;
            modifying = false;
          }

          console.log("creating:"+creating+" eliminating:"+eliminating+" modifying:"+modifying);

          
          var messages = threads[i].getMessages();

          for (var a = 0; a < messages.length; a++) {
            All_OK = true;
            console.log("Llegint message:"+ a);
              
            var currentmessage = messages[a].getBody();
            var currentsubject = messages[a].getSubject();
            if (currentmessage.search(Keyword1) != -1){//Ens asegurem que no tindrem errors buscant despres
              console.log("Keyword1 found!");
              var indexclau1 = currentmessage.indexOf(Keyword1);

              //console.log(indexclau1);//Busquem l'index de la keyword
              //Busquem la keyword del final de la part que interesa
              var indexclau2 = currentmessage.indexOf(Keyword2, indexclau1);// busquem l'string a partir del final del altre
              //console.log(indexclau2);

              var motiuReserva = currentmessage.substr(indexclau1, indexclau2-indexclau1);//Pillem la info que volem (inici, llargada)
              //console.log("Brut:"+motiuReserva);
              //Ara netejem el string que hem recuperat

              var Inici=motiuReserva.indexOf("> ");
              motiuReserva=motiuReserva.substr(Inici+2, motiuReserva.length);
              console.log("Net:"+ motiuReserva);

              //str.substr

            }

            else {
              console.log("Keyword1 not found");
              All_OK = false;
            }
            
            //Extraiem la descripció per posarla coma nota/detalls en el evento
            if (currentmessage.search(Keyword3) != -1){
              var indexclau1 = currentmessage.indexOf(Keyword3);

              //console.log(indexclau1);//Busquem l'index de la keyword
              //Busquem la keyword del principi correcte de la part que interesa
              var indexclau1 = currentmessage.indexOf(Keyword2, indexclau1);// busquem l'string a partir del final del altre
              //console.log(indexclau2);
              var indexclau2 = currentmessage.indexOf(Keyword4, indexclau1);// busquem l'string a partir del final del altre
              //console.log(indexclau2);

              var descripcio = currentmessage.substr(indexclau1, indexclau2-indexclau1);//Pillem la info que volem (inici, llargada)
              //console.log("Brut:"+descripcio);
              //Ara netejem el string que hem recuperat
              descripcio = currentmessage.substr(indexclau1+6, indexclau2-indexclau1-6);//Pillem la info que volem (inici, llargada)
              var descripcio = netejarhtml(descripcio);
              console.log("Net:"+ descripcio)

            }

            else {
              console.log("Keyword3 not found");
              All_OK = false;
            }
              //extraiem location evento.
            if(currentsubject.search("reserva del recurs") != -1){
              var indexclau1 = currentsubject.indexOf("reserva del recurs");
              var indexclau2 = currentsubject.indexOf(" s");// busquem l'string a partir del final del altre
                  
                
              var ubicacio = currentsubject.substr(indexclau1+20, indexclau2-indexclau1-21);//Pillem la info que volem (inici, llargada)
              console.log("Ubi found!");


            }

            else{
                  console.log("Location not found");
                  All_OK = false;
                }

  //extraiem la data del evento
              if(currentmessage.search("Data de la reserva") != -1){
                console.log("Data found!");
                var index_data = currentmessage.indexOf("Data de la reserva") + 33;
                var string_data = currentmessage.substr(index_data,36);
                
                
                const [dia, mes, any,hora1,hora2] = [string_data.substr(0,2), string_data.substr(3,3), string_data.substr(7,4),string_data.substr(19,5),string_data.substr(31,5)];
                console.log("dia:"+dia + "mes:"+mes+"any:"+any+"hora1:"+hora1+"hora2:"+hora2);

                //Aquí crearé un if de manera que o els introduim o els eliminem
                if (creating==true){
                  introduir_events(dia,mes,any,hora1,hora2,ubicacio,motiuReserva,descripcio);
                }

                else if (eliminating==true){
                  eliminar_events(dia,mes,any,hora1,hora2,ubicacio,motiuReserva);
                }
                
                





              }
              else {
                 console.log("Data not found");
                 All_OK = false;
               }

              



               }
        
        
        console.log("Changing labels");

        if (All_OK==true && creating==true){
          label_creating.removeFromThread(threads[i]);
          label_processing.addToThread(threads[i]);
          console.log("Labels changed! ALL OK");
        }
      //canvi de tag als thereads, mirem en quin cas estem per a no intentar eliminar un thread d'on no hi serà 
        else if (All_OK==true && eliminating==true){
          label_eliminating.removeFromThread(threads[i]);
          label_processing.addToThread(threads[i]);
          console.log("Labels changed! ALL OK");
        }
        else if(creating==true){
          label_creating.removeFromThread(threads[i]);
        label_error.addToThread(threads[i]);
        console.log("ERRORS FOUND");

        }
        else if(eliminating==true){
        label_eliminating.removeFromThread(threads[i]);
        label_error.addToThread(threads[i]);
        console.log("ERRORS FOUND");

        }
        else{
          console.log("FATAL ERROR LEBELS MESSED UP");
          console.log("REMOVING ALL LAVELS LEAVING ERRORS");
          future_dust = threads[i].getLabels();
          for (var b = 0; b < future_dust.length; b++) {
              threads[i].removeLabel(future_dust[b])

          }
         label_error.addToThread(threads[i]);
         
        }
        




        }


        }
  
}


function introduir_events(dia,mes,any,hora1,hora2,ubicacio,motiuReserva,descripcio) {
    // Creates an event for the moon landing and logs the ID.
  //[dia, mes, any,hora1,hora2] =["01","Sep","2021","13:00","14:30"];
  //var motiuReserva = "Energy days Conference"
  mes = month_long[month_short.indexOf(mes)];

  var date1=new Date(mes +" " + dia +", "+ any+" " + hora1 +":00");
  var date2=new Date(mes +" " + dia +", "+ any+" " + hora2 +":00");

  console.log("Introduint event");
  console.log(mes +" " + dia +", "+ any+" " + hora1 +":00");
  //console.log(Utilities.formatDate(date, CalendarApp.getTimeZone(), mes +" " + dia +", "+ any + hora1+ "00"+ " Z"));
  //var date1 = new Date(Utilities.formatDate(date1, CalendarApp.getTimeZone(),'MMMM dd, yyyy HH:mm:ss Z'));
  //var date1 = new Date(Utilities.formatDate(date2, CalendarApp.getTimeZone(),'MMMM dd, yyyy HH:mm:ss Z'));

  //Intentarem fer que miri si ja està creat avans de crear-lo, si es solapen tampoc el deixa crear cal solucionar del 
  
  var events = CalendarApp.getCalendarById(calendar_id).getEvents(date1, date2);
  console.log(events[0]);
  if (events[0] == undefined){
    //Aquí establirem el color de cada sala per a millorar la llegibilitat del calendari
    //documentació a https://developers.google.com/apps-script/reference/calendar/color
    //https://developers.google.com/apps-script/reference/calendar/calendar-app#createEvent(String,  Date,Date)
    if (ubicacio == "Sala de actes"){

    }
    else if (ubicacio == "Sala de actes"){

    }

    else {

    }
     console.log("espai lliure");
    var event = CalendarApp.getCalendarById(calendar_id).createEvent(motiuReserva,
      date1,
      date2,
      {description:descripcio,location: ubicacio,timezone:CalendarApp.getTimeZone()}).removeAllReminders() ;
    console.log('Event ID: ' + event.getId());
    console.log(CalendarApp.getTimeZone());
    
  }

  else if(events[0].getTitle()==motiuReserva){
   console.log("Same event found");
    All_OK=false;

  }
  else if (events[0].getTitle() != motiuReserva){
    
    
    console.log("Space occupied with diferent event, introducing it anyway");
    var event = CalendarApp.getCalendarById(calendar_id).createEvent(motiuReserva,
      date1,
      date2,
      {description:descripcio,location: ubicacio,timezone:CalendarApp.getTimeZone()}).removeAllReminders() ;
    console.log('Event ID: ' + event.getId());
    console.log(CalendarApp.getTimeZone());
    
  }
  else{
    console.log("Smoething strange has happend");
    All_OK=false;
  }

}


function eliminar_events (dia,mes,any,hora1,hora2,ubicacio,motiuReserva){
  mes = month_long[month_short.indexOf(mes)];

  var date1=new Date(mes +" " + dia +", "+ any+" " + hora1 +":00");
  var date2=new Date(mes +" " + dia +", "+ any+" " + hora2 +":00");

  console.log("Eliminating event");
  console.log(mes +" " + dia +", "+ any+" " + hora1 +":00");

  var events = CalendarApp.getCalendarById(calendar_id).getEvents(date1, date2);
  //variable de control per asegurar-nos que està llegint tot bé
  //var prova = events[0].getTitle();
  //Eliminem l'evento asegurant-nos que no hi ha errors
  
  if(events[0] == undefined){
    All_OK= false;
    console.log("The event that we want to elininate does not have title os does not exist")

  }
  else if (events[0].getTitle()==motiuReserva){
    events[0].deleteEvent();
    console.log("Eliminanted")
  }
  else{
    All_OK= false;
    console.log("Not the event that we are looking for")
    
  }
}

//Aquí una funció que fa que per exemple &agrave; sigui à
function netejarhtml(descripcio) {

  for(var key in dict) {
    descripcio = descripcio.replace(key,dict[key],"gi");
  }
  return(descripcio);
}