// INCLUSÃO DE BIBLIOTECAS
#include <A2a.h> //Biblioteca criada pelo canal "Brincando com ideias" (https://github.com/canalBrincandoComIdeias/A2a)
#include "config.h"
#include <string.h>
#include <stdlib.h>

// DEFINIÇÕES
#define endereco 0x08
#define tempoAtualizacao 10000


int parsedMode;
int red;
int green;
int blue;
int parsedSpeed;


// INSTANCIANDO OBJETOS
AdafruitIO_Feed *displayLED = io.feed("led-tape");

A2a arduinoSlave;

// DECLARAÇÃO DE FUNÇÕES
void configuraMQTT();
void retornoDisplayLED(AdafruitIO_Data *data);
void parseString (char *str);

//Private functions
char* removeColorFirstCharacter(char* str);
int hexStringToInt (char hexString[]);


void setup() {
  Serial.begin(9600);
  while (! Serial);

  configuraMQTT();

  arduinoSlave.begin(0, 2);

  Serial.println("Atualizando valor do Display de LED");
  
  displayLED->get();
  io.run();
  
  Serial.println("Fim Setup");
}

void loop() {
  io.run();
}

// IMPLEMENTO DE FUNÇÕES
void configuraMQTT() {
  Serial.print("Conectando ao Adafruit IO");
  io.connect();

  displayLED->onMessage(retornoDisplayLED);

  while (io.status() < AIO_CONNECTED) {
    Serial.print(".");
    delay(500);
  }

  Serial.println();
  Serial.println(io.statusText());
}

void retornoDisplayLED(AdafruitIO_Data *data) {
  Serial.print("Controle Recebido <- ");  
  
  parseString(data->value());
  
  arduinoSlave.varWireWrite(endereco, 2, parsedMode);
  Serial.println("");
  Serial.print("parsedMode ");
  Serial.println(parsedMode);
  
  arduinoSlave.varWireWrite(endereco, 3, red);
  Serial.print("red ");
  Serial.println(red, DEC);
  
  arduinoSlave.varWireWrite(endereco, 4, green);
  Serial.print("green ");
  Serial.println(green, DEC);
  
  arduinoSlave.varWireWrite(endereco, 5, blue);
  Serial.print("blue ");
  Serial.println(blue, DEC);
  
  arduinoSlave.varWireWrite(endereco, 6, parsedSpeed);
  Serial.print("parsedSpeed ");
  Serial.println(parsedSpeed, DEC);

}


void parseString (char *str)
{
    char delimiter[] = "|";

    char *charMode = strtok (str, delimiter);
    parsedMode = hexStringToInt(charMode);

    char *color = strtok (NULL, delimiter);
    if(strlen(color) == 4 || strlen(color) == 7 ){
    // Removes the # of the first character, if it is present
      color = removeColorFirstCharacter(color);
    }

    if(strlen(color) == 6){
      Serial.println(color);

      char redStr[] = {color[0], color[1],'\0'};
      red = hexStringToInt(redStr);
      Serial.print("redStr ");
      Serial.println(redStr);
      
      char greenStr[] = {color[2], color[3],'\0'};
      green = hexStringToInt(greenStr);
      Serial.print("greenStr ");
      Serial.println(greenStr);

      char blueStr[] = {color[4], color[5],'\0'};
      blue = hexStringToInt(blueStr);
        Serial.print("blueStr ");
        Serial.println(blueStr);
      
    } else if(strlen(color) == 3){

      char redStr[] = {color[0], color[0],'\0'};
      red = hexStringToInt(redStr);
     Serial.print("redStr ");
      Serial.println(redStr);
      
      char greenStr[] = {color[1], color[1],'\0'};
      green = hexStringToInt(greenStr);
      Serial.print("greenStr ");
      Serial.println(greenStr);


      char blueStr[] = {color[2], color[2],'\0'};
      blue = hexStringToInt(blueStr);
       Serial.print("blueStr ");
        Serial.println(blueStr);
      
    }else{
      Serial.print("Deu erro aqui");
      red = 0;
      green = 0;
      blue = 0;
    }

    char *charSpeed = strtok (NULL, delimiter);
    parsedSpeed = hexStringToInt(charSpeed);
    Serial.println(charSpeed);
}

int hexStringToInt(char hexString[])
{
  int decimal = (int) strtol (hexString, NULL, 16); // number base 16
  return decimal;
}

char* removeColorFirstCharacter(char* str){

  for(int i = 0; i < strlen(str); i++){
    str[i] = str[i+1];
  }
  return str;
}
