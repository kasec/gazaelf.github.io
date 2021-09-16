---
title: Stats del Landing.
meta:
  - name: description
    content: WIP - En este Post hago una comparacion sobre mi propia landing, sobre como fue el rendimiento con siendo una sitio estatico, pero que todo su contenido se renderizaba con js, y ahora que es un SSG que todo el contenido es renderizado a la hora de contruirlo..
date: 2020-02-10
status: WIP
---

# En seguida voy a mostrar algunos stats en cuanto a la version 1 y version 2

Version 1. Era un Stactic Site, donde eran generadas un html por vista, pero todo el contenido era rendereado con js, solo se tenia un esqueleto de html.

Version 2. Todo el contenido es construido en el servidor y cuando el contenido se muestra en el navegador se evita la construccion del mismo con js, aparemente debe de ser mas corta la carga inicial.

> Tenemos de darnos cuenta que la `version 2`, ademas tiene mas cosas/contenido y funcionalidad asi como puede afectar tambien el rendimiento.

Con lo mencionado anteriormente, podemos suponer que la version 2 debe de tener mejor performance, en seguida veremos como se comporta vista por vista.

## Root view

**Version 1**:

19 Requests
184.51 KB
Finish 3.24 S

**Version 2**:

16 Requests
233.23 Kb trasferred
Finish 4.07 s
DomcontentLoaded 810 ms
load 2.72 s

## Projects view

**Version 1**:

13 Requests
5.97 MB trasferred
Finish 37.74
DomcontentLoaded 1.08 s
load 37.74

**Version 2**:

27 Requests
335.12 KB trasferred
Finish 14.17 s
DomcontentLoaded 810 ms
load 2.72 s

## Blog View

**Version 1**:

6 Requests
54.72 KB trasferred
Finish 369 ms
DomcontentLoaded 99 ms
load 260 ms

## Blog/Bienvenidos View

**Version 1**:

7 Requests
72.66 KB trasferred
Finish 1.70 s
DomcontentLoaded 91 ms
load 1.71 s

## About me View

**Version 1**:

6 Requests
635.37 KB trasferred
Finish 1.33 s //cuando carga la imagen 4 sube a 16.78 s
DomcontentLoaded 301 ms
load 1.30 s

# Resumen.

Los stats de la version 2 no se terminaron.

Version 2: Ya que como la pagina no se esta refrescando en cada redireccion, solo carga los scripts faltantes en este caso css y html, lo cual es una ventaja ya que en la version 1 carga todo otra vez.

Nose exatamente como funcionan lo navegadores, ejemplo en version 1 que redirige y "carga" todos los archivos otra vez, nose si el navegador deberia de dejar en cache los datos que ya han sido utilizados, ejemplo en este caso las imagenes del footer son las mismas en las 2 todas las vistas, no creo que deberian de ser cargadas una y otra vez. Abra que investigarlo.

Con los scripts es otro tema ya que la herramienta de bundleo tiene mucho que ver, ejemplo si utilizas una libreria de ui supongo que la libreria es bundleada dentro de un script en especifo. ejemplo en la vista main, tenemos un `main-kjdf213-asd.js`, este archivo tiene depencia a la libreira de ui pero esta esta bundleada dentro. al igual que la vista de projects, tiene un script llamado `projects-sdfd213-asd.js`, si tiene la misma dependencia deberia de estar bundleada adentro.

Mi pensamiento es el siguiente, si hay n-cantidad de vistas que tienen la misma dependencia deberian de tener el script en otro archivo que posiblemente ya se haya cacheado para asi no estar haciendo la request cada vez que sea requerido.

> El code splitting no elimina la nesecidad ya que lo uqe hace en particualr es cargar el script cuando es nesesario, solo que aqui deberia de ser agarrado del cache y no cuando sea nesesario en especifico.

## Overview

Me di la tarea de ver como funcionaba el network de devtools del navegador, no habia percatado bien. En efecto el navegador cachea los archivos que encuentra repetitivos, asi que no nesesariamente importa si es html o lo renderea com script. en este caso si dependeria mas de la herramienta de bundleo que haga code splitting a los archivos que tengan la misma relacion sobre un archivo en especifico.

Actualmente con los nuevos cambios de la version 1.2, hubo una cuestion. la primera vez que cargas la vista aparece una flashaso, el cual pareciera que lo hace porque los estilos los ingresa con js, eso es lo que justamente me parece raro, supuestamente los estilos estan ahi pero no los carga del inicio, o al parecer se tarda un poco en cargarlos, nose si es un comportamiento, voy a ver el ejemplo de vitesse, una pagina que esta en produccion usando la misma libreria haber si le sucede lo mismo.
