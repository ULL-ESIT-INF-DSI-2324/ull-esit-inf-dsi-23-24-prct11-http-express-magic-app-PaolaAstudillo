# **Práctica 11 - Aplicación Express para coleccionistas de cartas Magic**
Nombre: Paola Astudillo Capote
Gmail: alu010337418@ull.edu.es

[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct11-http-express-magic-app-PaolaAstudillo/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct11-http-express-magic-app-PaolaAstudillo?branch=main)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2324_ull-esit-inf-dsi-23-24-prct11-http-express-magic-app-PaolaAstudillo&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2324_ull-esit-inf-dsi-23-24-prct11-http-express-magic-app-PaolaAstudillo)

[![Tests](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct11-http-express-magic-app-PaolaAstudillo/actions/workflows/node.js.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct11-http-express-magic-app-PaolaAstudillo/actions/workflows/node.js.yml)

## Introducción
En esta práctica haré uso de la aplicación `express` y utilizaré la práctica 10 de base, con algunas mejoras sugeridas por el profesor. Usaré el protocolo `HTTP` mediante `Thunder Client`
Además comentaré la solución propuesta para el ejercicio desarrollado durante la hora de PE.

## Objetivos
* Desarrollo de la aplicación
* Ejercicio del PE 
* Conclusión

## Desarrollo

### Desarrollo de la aplicación

Para cumplir con los requerimientos del enunciado, tuve que hacer ciertos ajustes sobre la práctica base, en primer lugar, eliminé los CommandHandler, FileHandler, Client y Server para simplificar la estructura de la aplicación. Y en su lugar, utilicé los archivos App, Card, CardCollection y CardRoute. A continuación explicaré la función de cada uno de ellos:

`App.ts`: sirve como punto de entrada de nuestra aplicación Express. En este archivo, configuramos el servidor Express, establecemos las rutas de la API y escuchamos las solicitudes entrantes en un puerto específico. Utilizamos el middleware `express.json()` para analizar el cuerpo de las solicitudes entrantes en formato JSON, lo que nos permite trabajar fácilmente con los datos enviados por los clientes. Además, importamos y utilizamos las rutas definidas en `CardRoute.ts`, lo que nos proporciona una estructura organizada para manejar las solicitudes relacionadas con las cartas. Finalmente, iniciamos el servidor para que esté listo para recibir y procesar las solicitudes de los clientes.

`Card.ts`: definimos la clase `MagicCard`, que encapsula los atributos y comportamientos de una carta Magic. Utilizamos enumeraciones para representar los colores, tipos y rarezas posibles de las cartas, lo que nos proporciona una forma estructurada y segura de definir estas propiedades. Además, implementamos un método `toJSON()` en la clase `MagicCard`, que nos permite convertir los datos de una carta a formato JSON, facilitando su serialización y envío a través de la red. Este archivo no sufrió mucho cambio con respecto a la práctica nterior.

`CardCollection.ts`: aqui se intentó gestionar la colección de cartas de un usuario mediante la clase `MagicCardCollection`. Utilizando un mapa para almacenar las cartas, intentando garantizar la unicidad de los IDs y proporcionar un acceso eficiente a las cartas por su ID. Implementé métodos asincrónicos para cargar, escribir, añadir, actualizar y eliminar cartas de la colección, intentando sin éxito que los cambios en la colección se reflejen correctamente en el sistema de archivos. Además, manejé los errores de lectura y escritura del archivo de colección, proporcionando retroalimentación adecuada al usuario en caso de errores.

`CardRoute.ts`: define las rutas de la API de la aplicación Express, que permiten realizar operaciones sobre la colección de cartas de un usuario. Utilizamos los métodos HTTP adecuados (POST, GET, DELETE, PATCH) para asociar cada ruta con una acción específica sobre las cartas. Extraemos los datos de las solicitudes entrantes (como el nombre de usuario, el ID de la carta, etc.) y los pasamos a los métodos correspondientes de `MagicCardCollection` para realizar las operaciones solicitadas. Además, manejamos los errores y devolvemos respuestas adecuadas en formato JSON, proporcionando retroalimentación clara al cliente sobre el resultado de la operación solicitada.


Por último para cada endpoint de la API, proporcionamré ejemplos de uso para ilustrar cómo interactuar con la aplicación:

- **Añadir una carta a la colección:**

```
POST http://localhost:3000/api/cards?username=Paola
```

{
    "id": 123,
    "name": "Nombre de la carta",
    "manaCost": 3,
    "color": "Red",
    "type": "Creature",
    "rarity": "Common",
    "text": "Texto de la carta",
    "marketValue": 10,
    "powerToughness": [2, 2],
    "loyalty": null,
    "username": "Paola"
}

- **Listar las cartas existentes en una colección:**
```
GET http://localhost:3000/api/cards?username=Paola
```
- **Mostrar la información de una carta concreta:**
```
GET http://localhost:3000/api/cards/2?username=Paola
```
- **Eliminar una carta de la colección:**
```
DELETE http://localhost:3000/api/cards/2?username=Paola
```
- **Modificar una carta existente:**
```
PATCH http://localhost:3000/api/cards/2?username=Paola
```
{
    "name": "modi",
    "color": "Blue",
    "text": "Nuevo texto de la carta",
    "marketValue": 15
}

NOTA: El id de la carta se coloca como parte de la ruta (path) de la URL, para asegurarnos de que siempre es introducido, lo que indica que estás solicitando la información de una carta específica con el ID 2. Mientras que el parámetro username se incluye como un parámetro de consulta (query parameter), lo que sugiere que estás filtrando las cartas por usuario. 

### Ejercicio del PE 
Para realizar la modificación sugerida en el PE, he tenido que hacer uso de promesas. En mi caso, ya había entregado esta práctica con async/await, pero durante el ejercicio, modifiqué los dos métodos solicitados utilizando resolve/reject y then/catch. Después de hacer estos pequeños cambios, intenté realizar pruebas, pero no lograron ejecutarse ya que no encontraban los datos.

### Conclusión
Tras realizar esta práctica, he podido familiarizarme con la aplicación de Express. Aunque he logrado hacer peticiones HTTP, siempre han sido erróneas, ya que aún no he conseguido arreglar el error de almacenamiento de las cartas. Por lo tanto, simula que realiza su función, pero a la hora de hacer comprobaciones, nunca encuentra ninguna carta o crea usuarios si no existen al añadir una carta, pero su contenido está vacío. En resumen, considero que he podido entender el funcionamiento general de las peticiones y la configuración de Express, aunque no haya podido solucionar dicho problema. Por último, cabe destacar que, las pruebas nunca funcionarán debido a este error de almacenamiento de cartas no corregido, por ello no hay ningun archivo de pruebas para comprobarlas.

