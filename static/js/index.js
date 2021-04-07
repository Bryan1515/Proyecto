//https://www.eclipse.org/paho/clients/js/

// Create a client instance
  //client = new Paho.MQTT.Client("postman.cloudmqtt.com", 14970);
  
  client = new Paho.MQTT.Client("maqiatto.com", 8883, "web_" + parseInt(Math.random() * 100, 10));

  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  var options = {
   useSSL: false,
    userName: "bryan.loaiza@unach.edu.ec",
    password: "123",
    onSuccess:onConnect,
    onFailure:doFail
  }

  // connect the client
  client.connect(options);
   
  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("Conectado...");
	
    client.subscribe("bryan.loaiza@unach.edu.ec/tema1");
    client.subscribe("bryan.loaiza@unach.edu.ec/tema3");
    message = new Paho.MQTT.Message("hola desde la web");
    message.destinationName = "bryan.loaiza@unach.edu.ec/tema2";
    client.send(message);
	
  }

  function doFail(e){
    console.log(e);
	
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }



function LED1_On() {
	alert("led on");
	//console.log("led on");
	message = new Paho.MQTT.Message("sensor1");
	message.destinationName = "bryan.loaiza@unach.edu.ec/tema2";
	client.send(message);
  
}



function LED1_Off(){	
	alert("led off");
	//console.log("led off");
	message = new Paho.MQTT.Message("sensor2");
	message.destinationName = "bryan.loaiza@unach.edu.ec/tema2";
	client.send(message);

}



  // called when a message arrives
  function onMessageArrived(message) {
	  console.log("onMessageArrived:"+message.payloadString);
	  if (message.destinationName="bryan.loaiza@unach.edu.ec/tema1"){
		  document.getElementById("sensor1").innerHTML=message.payloadString;
	  
	  }
	  
	  if (message.destinationName="bryan.loaiza@unach.edu.ec/tema3"){
		  document.getElementById("sensor2").innerHTML=message.payloadString;
	  
	  }


  }
