# Proyecto Sprint 12 - Web Project Around

Este proyecto continúa el desarrollo del repositorio **web_project_around** y se centra en **conectar la aplicación al servidor**, permitiendo guardar y recuperar información de usuario y tarjetas de manera dinámica.

## Descripción

La aplicación muestra un perfil de usuario y una galería de tarjetas con imágenes  
En este sprint, el proyecto se conecta a un servidor remoto para **persistir los datos**, lo que permite cargar la información del usuario, mostrar tarjetas iniciales, agregar nuevas tarjetas, dar "me gusta" y eliminar tarjetas de manera segura mediante popups de confirmación

## Funcionalidad principal

- Cargar y actualizar información del usuario desde/hacia el servidor
- Renderizar tarjetas dinámicamente obtenidas desde el servidor
- Agregar nuevas tarjetas y guardarlas en el servidor
- Dar y quitar "me gusta" en las tarjetas con actualización en tiempo real
- Eliminar tarjetas con confirmación mediante un popup
- Abrir imágenes en un popup ampliado
- Gestionar popups con formularios para edición, creación y actualización de avatar
- Cerrar popups con clics externos y tecla Esc
- Indicadores de carga de datos (ej. botones muestran "Guardando..." mientras se procesa la solicitud)

## Tecnologías y técnicas utilizadas

- HTML5 para la estructura
- CSS3 con metodología BEM para el estilo y responsive design
- JavaScript (ES6+) con Programación Orientada a Objetos
- Módulos ES6 para organización del código
- Fetch API para comunicación con el servidor remoto
- Git y GitHub con flujo de trabajo basado en ramas
- GitHub Pages para despliegue

## Estructura de clases

- Api – Gestiona todas las solicitudes al servidor (GET, POST, PATCH, DELETE, PUT)
- Section – Renderiza listas de elementos en la página
- Popup – Controla apertura y cierre de ventanas modales
- PopupWithImage – Muestra imágenes ampliadas
- PopupWithForm – Gestiona formularios dentro de popups
- PopupWithConfirmation – Maneja popups de confirmación para eliminar tarjetas
- UserInfo – Maneja la información del usuario y la mantiene sincronizada con el servidor
- Card – Representa cada tarjeta con imagen, título, like y funcionalidad de eliminación

## Enlace a GitHub Pages

https://claudiajayu.github.io/web_project_around/
