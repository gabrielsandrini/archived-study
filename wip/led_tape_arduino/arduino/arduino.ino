#include <A2a.h>
#define endereco 0x08

#define redPin 9
#define greenPin 10
#define bluePin 11

A2a arduinoMaster;

// Modes:
#define fixed 0
#define flashTreeColors 1
#define ramdomFlash 2
#define fade 3
#define blinkMode 4
#define soundMode 5

int dataHasChanged = 0;

//receivedData
int receivedMode = 0;
int receivedRed = 0;
int receivedGreen = 0;
int receivedBlue = 0;
int receivedSpeed = 0;

//lastReceivedData
int lastReceivedMode = 0;
int lastReceivedRed = 0;
int lastReceivedGreen = 0;
int lastReceivedBlue = 0;
int lastReceivedSpeed = 0;

//currentData (used to control the effects)
int currentRed = 0;
int currentGreen = 0;
int currentBlue = 0;

void receberDados();
void enviarDados();
void refreshData();

void setup() {
  arduinoMaster.begin(endereco);
  arduinoMaster.onReceive(receberDados);
  arduinoMaster.onRequest(enviarDados);

  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);

  Serial.begin(9600);
}


void loop() {
  Serial.println(receivedRed, BIN);
  
  refreshData();
  
   delay(1000);
}

void receberDados() {
  arduinoMaster.receiveData(); 
}

void enviarDados() {
  arduinoMaster.sendData(); 
}

void refreshData(){
  receivedMode = arduinoMaster.varWireRead(2);
  receivedRed = arduinoMaster.varWireRead(3);
  receivedGreen = arduinoMaster.varWireRead(4);
  receivedBlue = arduinoMaster.varWireRead(5);
  receivedSpeed = arduinoMaster.varWireRead(6);
}
