# Modo de uso de layer aws-lambda-utils-layer
Este README contiene las diferentes formas de utilizar la layer Utils

## Objetivos de la layer logger
El objetivo es el de tener un componente que sea reutilizable en diferentes lambdas. Que permita incluir funciones de uso común entre lambdas para reutilizar código

## Modo de uso
Se debe importar utils de la siguiente forma
```
const logger = require("aws-lambda-utils-layer");
```

## Catálago de funciones
Están incluidas las siguientes funciones

- clone: Clona dos objetos
- isEmpty: Devuelve true en el caso de que sea un elemento vacio o no este definido
- isEqual: Compara dos objetos key por key
- isObject: Devuelve true si un objeto es un objeto
- getEnvironmentVariable: Obtiene variable de entorno y valida que esten definidas
- checkEnvVariablesAreDefined: Dada una lista de variables define si estan definidas
- getExpirationTimeInMinutes: Obtiene el tiempo de expiración ttl utilizada en tablas dynamo.

-Ordenados desde el más importante al menos importante

## Dependencias
Esta layer utiliza como dependencia lodash
[link](https://www.npmjs.com/package/lodash)
