## Projeto Hora do Pão

#### Colaboradores

Caetano Finisterre Burjack da Silva
Silas Ferraciolli Corrêa

#### Desenvolvido com Ionic 2/3 para a disciplina de Plataformas Híbridas - Faculdade Católica

* 2.0 1a avaliacao
* 1.0 localStorage - FEITO
* 1.5 acelerometro - FEITO
* 1.5 geolocation - FEITO
* 1.5 maps - FEITO
* 1.5 contatos
* 1.0 Media - FEITO
* 2.0 Camera - FEITO
* 2.0 http - FEITO
* 3.0 IndexedDB, SQLite, WebSQL


Explicando o aplicativo Hora do Pão para se compreender o uso de cada recurso.

Na tela inicial o app exibe o maps (MAPS) com a localização (GEOLOCATION) corrente do usuário.

Na tela seguinte aparece um tabController com duas telas, a primeira, Padarias, exibe uma lista de padarias que é trazida a partir de um [webservice](https://maps.googleapis.com/maps/api/place/textsearch/json?query=Padaria+in+Palmas-TO&key=AIzaSyAeJB8MoGIWW2-w6lGd-sLrDyEEKcHMlR8) (HTTP).

Na tab Ajustes é exibido o perfil do usuário, com imagem, nome e email onde é possível capturar uma imagem (CAMERA) ou pegar do aparelho (MEDIA) para ser usada como foto do perfil.

Também é possível acionar a função de trocar foto do usuário chacoalhando o celular (ACELEROMETRO), fazendo com que a actionSheet para escolher imagem seja exibida.

A imagem capturada é armazenada e o nome dela é salvo no armazenamento do aparelho (LOCAL STORAGE).

#### Plugins Utilizados (Comandos)

* ionic cordova plugin add cordova-plugin-camera --save
* ionic cordova plugin add cordova-plugin-file --save
* ionic cordova plugin add cordova-plugin-file-transfer --save
* ionic cordova plugin add cordova-plugin-filepath --save
* ionic cordova plugin add cordova-plugin-device-motion
* ionic cordova plugin add cordova-sqlite-storage --save
* ionic cordova plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="API_KEY" --variable API_KEY_FOR_IOS="API_KEY"
* ionic cordova plugin add cordova-plugin-geolocation
* ionic cordova plugin add cordova-plugin-nativegeocoder
* ionic cordova plugin add cordova-plugin-request-location-accuracy

* npm install --save @ionic-native/camera
* npm install --save @ionic-native/file
* npm install --save @ionic-native/file-path
* npm install --save @ionic-native/transfer
* npm install --save @ionic-native/device-motion
* npm install --save @ionic/storage
* npm install --save @ionic-native/google-maps
* npm install --save @ionic-native/geolocation
* npm install --save @ionic-native/native-geocoder
* npm install --save @ionic-native/location-accuracy

#### Instalação

Para instalar, seguir os passos seguintes:

* Clonar o projeto:
```
git clone https://github.com/silasfc/HoraDoPao.git
```

* Abrir diretório do projeto:
```
cd HoraDoPao
```

* Instalar requisitos:
```
npm install
```

* Adicionar plataformas:
```
ionic cordova platform add android
```

#### Contornando erro ao dar build/run ()

Provavelmente ocorrerá problema ao fazer o build para Android, devido a diferença de versão usada para pelas bibliotecas do cordova.
Isso pode ser corrigido no arquivo que está em: HoraDoPao/platforms/android/project-properties

Onde encontramos:
```
cordova.system.library.4=com.google.android.gms:play-services-maps:9.8.0
cordova.system.library.5=com.google.android.gms:play-services-location:9.8.0
```

Substituimos por:
```
cordova.system.library.4=com.google.android.gms:play-services-maps:+
cordova.system.library.5=com.google.android.gms:play-services-location:+
```
Fonte: [Ionic v2 Google Maps API Android Build Error: cannot access AbstractSafeParcelable options.compassEnabled(controls.getBoolean(“compass”));](https://stackoverflow.com/questions/41030573/ionic-v2-google-maps-api-android-build-error-cannot-access-abstractsafeparcelab/41042556#41042556)

#### Referências Bibliográficas

* [Ionic 2 Mobile App in Under 60 Minutes (Traversy Media)](https://www.youtube.com/watch?v=ilM8YorL_jI)

* [Ionic 2 - Google Maps (Raja Yogan)](https://www.youtube.com/watch?v=jD5yYX1KWXA)

* [Ionic 2 - Geolocation and Geocoding (Raja Yogan)](https://www.youtube.com/watch?v=YeVpQG4D7uo)

* [Ionic 2 Creating a Page and Navigation between the pages (Anish Nirmal)](https://www.youtube.com/watch?v=JKa5lySRPZw)

* [A Simple Guide to Navigation in Ionic 2 (Josh Morony)](https://www.joshmorony.com/a-simple-guide-to-navigation-in-ionic-2/)

* [Ionic Native: Working with the Device Motion Plugin](http://blog.ionic.io/ionic-native-working-with-the-device-motion-plugin/)

* [The Complete Ionic Images Guide (Capture, Store & Upload)](https://devdactic.com/ionic-2-images/)
