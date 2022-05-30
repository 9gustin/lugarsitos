# RND APP

## Funcionalidades
Ver el mapa
Leer codigos qr y que se agreguen lugares al mapa
Contador de lugares leidos
Buscador de lugares
Puede haber ademas un baul de cositas aparte, que no son lugares? si
Va a haber un codigo qr que va a ser la key, con ese podes acceder, se guarda en el localstorage
Poder instalar la app con PWA

## Definiciones
Cada lugar:
- fecha: date-iso
- imagen: url
- titulo y pequena descripcion: strings
- lugar(lat y lng): 
- puntaje / estrellitas / corazones algo/

Codigos QR:
Cada codigo qr deberia tener un id que represente un lugar de firebase

Donde almacenar las imagenes? Opciones
- firebase
- repo?

Key:
Se van a generar keys, que van a ser codigos, en un principio se van a poder acceder por codigo qr nomas, una key va a tener:
id
nombre
avatar

## TODO:
Integrar mapa de google maps de javascript
Ingegrar libreria para leer codigo QR
Generar BD con lugares
Generar Codigos QR con ids
Generar key de acceso
Integrar login con key (persistencia en localstorage)
