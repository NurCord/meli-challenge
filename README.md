# Proyecto Mutant Detection

Este proyecto es una API para detectar si una secuencia de ADN pertenece a un mutante. La API expone dos endpoints principales: uno para verificar si una secuencia de ADN es mutante y otro para obtener estadísticas sobre las verificaciones realizadas.

## Tabla de Contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [Endpoints](#endpoints)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Pruebas](#pruebas)
- [Variables de Entorno](#variables-de-entorno)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)

## Instalación

1. Clona el repositorio:
   ```sh
   git clone https://github.com/NurCord/meli-challenge.git
   cd meli-challenge
   ```
1. Instala las dependencias:
   ```sh
    npm install
   ```

## Uso

1. Compila el proyecto:

   ```sh
   npm run build
   ```

2. Inicia el servidor:

   ```sh
   npm start
   ```

3. La API estará disponible en http://localhost:3000.

## Endpoints

### POST /api/mutant

Verifica si una secuencia de ADN es mutante.

- URL: /api/mutant
- Método: POST
- Body:

  ```sh
  {
     "dna": ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"]
  }
  ```

- Respuestas:
  - `200 OK`: Si la secuencia de ADN es mutante.
  - `403 Forbidden`: Si la secuencia de ADN no es mutante.
  - `400 Bad Request`: Si la secuencia de ADN es inválida.

### GET /api/stats

Obtiene estadísticas sobre las verificaciones de ADN realizadas.

- URL: /api/stats
- Método: GET
- Respuestas:

  - `200 OK`: Devuelve las estadísticas en formato JSON.

    ```sh
      {
         "count_mutant_dna": 40,
         "count_human_dna": 100,
         "ratio": 0.4
      }
    ```

## Estructura del Proyecto

```sh
   ├── src
   │   ├── controllers
   │   │   ├── index.ts
   │   │   ├── mutant.controller.ts
   │   │   └── stats.controller.ts
   │   ├── models
   │   │   └── DnaSequence.ts
   │   ├── routes
   │   │   ├── index.ts
   │   │   ├── mutant.routes.ts
   │   │   └── stats.routes.ts
   │   ├── services
   │   │   ├── index.ts
   │   │   ├── mutant.services.ts
   │   │   └── stats.services.ts
   │   ├── types
   │   │   └── types.ts
   │   ├── utils
   │   │   ├── constants.ts
   │   │   └── mutant.ts
   │   ├── app.ts
   │   ├── db.ts
   │   └──schemas.ts
   ├── tests
   │   └── src
   │       ├── controllers
   │       │   ├── mutant.controllers.test.ts
   │       │   └── stats.controllers.test.ts
   │       ├── services
   │       │   ├── mutant.services.test.ts
   │       │   └── stats.services.test.ts
   │       └── utils
   │           └── mutant.test.ts
   ├── .env
   ├── package.json
   ├── README.md
   └── tsconfig.json
```

## Pruebas

Para ejecutar las pruebas, utiliza el siguiente comando:

```sh
npm test
```

Para ejecutar un archivo de prueba específico, utiliza:

```sh
npm test path/to/your/test/file.test.ts
```

Por ejemplo:

```sh
npm test tests/src/controllers/mutant.controllers.test.ts
```

## Variables de Entorno

Asegúrate de configurar las siguientes variables de entorno en tu archivo `.env`:

```sh
NODE_ENV=development
PORT=3000
```

## Tecnologías Utilizadas

- [Node.js](https://nodejs.org/en/) (v18.20.4)
- [Express](https://expressjs.com/) (v4.21.1)
- [TypeScript](https://www.typescriptlang.org/) (v4.21.1)
- [Jest](https://jestjs.io/docs/getting-started) (v5.6.3)
- [Zod](https://zod.dev/) (v3.23.8)
