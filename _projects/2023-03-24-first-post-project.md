---
title: energyBrainer
date: 2023-03-09 12:00:00 -500
#categories: [Mobile app]
#tags: [ESP8266, Express, React Native, C]
#image: https://raw.githubusercontent.com/Inf3n0s/energyBrainer/refs/heads/main/assets/images/logo.png
---

# EnergyBrainer | Optimise your energy consume ☼  
## Project Documentation

### Introduction
This project involves setting up an ESP8266 board with a DHT11 sensor to report temperature and humidity data to an Express server. The data can be accessed through a mobile app called EnergyBrainer.

![Electrical Scheme using ESP8266 and DHT11 sensor](https://raw.githubusercontent.com/Inf3n0s/energyBrainer/refs/heads/main/assets/images/electrical-scheme.png "Electrical Scheme ")


### Android App
``` https://expo.dev/artifacts/eas/oDfnAHLe9LbCFfV68hZwbQ.apk ```
![Mobile app](https://camo.githubusercontent.com/0b23cf49c73b61ab5385dc6808ea407df41abe2b92db27bf2c49cc1768fffa46/68747470733a2f2f692e696d6775722e696f2f4935696a3269705f642e776562703f6d617877696474683d3634302673686170653d7468756d6226666964656c6974793d6d656469756d)

### Hardware Required
1. ESP8266 board
2. DHT11 temperature and humidity sensor
3. USB cable for ESP8266 board
4. Breadboard and jumper wires

### Software Required
1. Arduino IDE / VS Code
2. DHT sensor library for Arduino
3. EnergyBrainer app

### Wiring the ESP8266 and DHT11
- Connect the ESP8266 to the breadboard.
- Connect the DHT11 sensor to the breadboard.
- Connect the VCC pin of the DHT11 sensor to the 3.3V pin of the ESP8266.
- Connect the GND pin of the DHT11 sensor to the GND pin of the ESP8266.
- Connect the data pin of the DHT11 sensor to D7 pin of the ESP8266.

### Setting up ESP8266 Board
- Connect the ESP8266 board to your computer using a USB cable.
- Open the Arduino IDE and select the correct board and port in the "Tools" menu.
- Install the DHT sensor library for Arduino.
- Copy and paste the code **/energybrain/src/main.cpp** into the Arduino IDE:
- Replace **your_SSID** and **your_PASSWORD** with your WiFi network credentials.
- Upload the code to the ESP8266 board.

### Setting up your own server
- Install Node.js and NPM on your computer if you haven't already.
- Run ```git clone https://github.com/DoggoDev-0/energybrain.git```
- Open a command prompt or terminal and navigate to the ***express-temperature*** directory.
- Run the following command to install dependencies:```npm install```
- Run the following command to start the Express server:```npm run start```
