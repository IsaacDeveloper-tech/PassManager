# Guia de desarrollo PassManager
## Preparación del entorno

Clonamos el repositorio especificando una ruta, en este ejemplo, especificamos el path relativo en el que estamos:

~~~
git clone https://github.com/IsaacDeveloper-tech/PassManager.git .
~~~

Una vez tenemos el repositorio, toca instalar todas las dependencias npm. Recuerda que debes tener instalado Node.js.

Para instalar las dependencias lo haremos de la siguiente forma:

~~~
npm install
~~~

## Visualización de la app
### Android

Para visualizar la aplicación en android, debemos primero instalar la app Expo de Google Play.

Abrimos la app, conectamos el movil al PC y en el terminal (PC) escribimos el siguiente comando:
~~~
npm run start
~~~

Nos saldrá un QR y lo tenemos que escanear con la app Expo. Y ya se nos abriria nuestra app.

Otra forma de hacerlo sería, habilitando el depurado USB de nuestro movil y ejecutando el siguiente comando:

~~~
npm run android
~~~

Siempre con el movil conectado al PC, este comando nos abrirá automáticamente la app Expo con nuestra aplicación.

### Web

En caso de que no tengamos el movil, podemos visualizarlo en formato web con el siguiente comando:

~~~
npm run web
~~~

Nos abrirá automaticamente el navegador con nuestra app en funcionamiento.