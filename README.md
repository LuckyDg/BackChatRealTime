# Aplicación de Chat con Kafka, Node.js y Socket.io

Esta aplicación es un sistema de chat en tiempo real que utiliza Kafka para el manejo de mensajes, Node.js para el backend y Socket.io para la comunicación en tiempo real.

## Requisitos Previos

- Docker y Docker Compose
- Node.js y npm (para desarrollo local)

## Estructura del Proyecto

```bash
📁 backend 
│ ├── Dockerfile
│ └── (otros archivos)
📁 kafka-api
│ ├── Dockerfile
│ └── (otros archivos)
└── README.md
└── docker-compose.yml
```


## Configuración

1. **Clonar el Repositorio**: Clona este repositorio en tu máquina local.

2. **Configurar Variables de Entorno**: Asegúrate de configurar las variables de entorno necesarias en los archivos `.env` dentro de las carpetas `backend` y `kafka-api`.

## Ejecución con Docker

Para ejecutar la aplicación utilizando Docker, sigue estos pasos:

1. **Construir y Ejecutar los Contenedores**:
   - Navega a la carpeta raíz del proyecto donde se encuentra el archivo `docker-compose.yml`.
   - Ejecuta el siguiente comando para construir y ejecutar los contenedores:

     ```
     docker-compose up --build
     ```

2. **Acceso a la Aplicación**:
   - Una vez que los contenedores están en ejecución, la aplicación de chat estará accesible desde un navegador en `http://localhost:7788` (o el puerto configurado para el frontend).

## Desarrollo Local

Para ejecutar la aplicación en un entorno de desarrollo local, sigue estos pasos:

1. **Instalar Dependencias**:
   - Navega a la carpeta `backend` y ejecuta `npm install` para instalar las dependencias de Node.js.
   - Repite el proceso en la carpeta `kafka-api`.

2. **Ejecutar Localmente**:
   - En la carpeta `backend`, ejecuta `npm start` o `nodemon server.js` para iniciar el servidor backend.
   - En la carpeta `kafka-api`, ejecuta `npm start` para iniciar el servidor Kafka.

## Notas Adicionales

- Asegúrate de tener los puertos necesarios disponibles en tu máquina local (por ejemplo, 7788 para el backend y 8000 para Kafka).
- Para ver los logs y monitorear el funcionamiento de los servicios, utiliza los comandos de Docker y Docker Compose.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, envía tus pull requests al repositorio para mejoras y correcciones.
