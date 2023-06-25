# AtlanticaConf_2023
Repositorio charla sobre css en AtlanticaConf 2023 titulada: "¿Es posible crear gráficas con solo CSS?"

## Proyecto usando framework/libreria css para gráficas

Proyecto web creado con html, css, typescript y webpack

## GET STARTED

* Al descargar proyecto de github o primera vez realizar un `npm install`
* Ejecutar  --> `npm run build` 
* Ejecutar con visualización --> `npm run buildw` 
* Generar ficheros de salida usando webpack: `npm run wp` 
* Generar ficheros de salida usando webpack en tiempo real para desarrollo: `npm run wpw`
* Ejecutar en modo server --> `npx webpack serve`

### Paso 1 (Preparar entorno):

* [Instalar node - npm](https://nodejs.org/es/download/)
* Verificar la instalación y versiones de npm: `npm -v` y node: `node -v` 
* Instalar Typescript de forma global: `npm install -g typescript`
* Comprobar que esta instalado de forma global Typescript y su versión: `tsc -v`

### Paso 2 (Crear y configurar proyecto): 

* Crear una carpeta para el proyecto (`CSS framework`) y ejecutar la orden `npm init` en la terminal para abrir el asistente de inicialización del proyecto. 
Esto genera el archivo `packages.json`; modificar `index.js` por `index.ts`. 

    - Fichero packages.json

        ```javascript
            {
                "name": "css-framework",
                "version": "0.1.0",
                "description": "Generación de gráficas usando CSS",
                "main": "index.ts",
                "scripts": {
                    "test": "echo \"Error: no test specified\" && exit 1"
                },
                "author": "Afaya (Juan Manuel Rodríguez Pérez)",
                "license": "ISC"
            }
        ```

* Añadir en el archivo `packages.json` dentro de la propiedad `"scripts": {}` las siguientes lineas:

    ```javascript
        "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1",
            "build": "tsc",
            "buildw": "tsc --watch",
            "wp": "webpack",
            "wpw": "webpack --watch"
        },
    ```

* Añadir fichero `.gitignore` en la carpeta raíz:

    ```
        .vscode
        node_modules
        dist
        public
    ```

* Creamos la carpeta `src` que contendra el código fuente de la web, dentro he creado la siguiente estructura:

    ```
        assets
        models
        pages
        scripts
        styles
        index.ts
    ```

* Instalar los paquetes `typescript` para el proyecto: `npm i typescript @types/typescript` 

* Crear archivo configuración typescript: `tsconfig.json` para ello ejecutamos en la terminarl: `tsc --init`; esto nos genera el archivo con las opciones básicas y las opcionales comentadas.

* Descomentamos y modificamos las siguientes opciones: `"moduleResolution": "node"`, `"sourceMap" true`, `"outDir": "./"` (este lo indicamos como `"outDir": "./public"`), `"rootDir": "./src"`, `"target": "es2022"`, `"lib": ["es2022","dom"]` .

* Preparar WebPack:

1. Instalar webpack y wepack-cli: `npm i --save-dev webpack webpack-cli`
2. instalar ts-loader y source-map-loader: `npm i --save-dev ts-loader source-map-loader`
3. Instalar css-loader: `npm install --save-dev css-loader` 
4. Instalar css extract plugin: `npm install --save-dev mini-css-extract-plugin`
4. instalar copy-webpack-plugin: `npm install copy-webpack-plugin --save-dev`
5. Generar fichero: `webpack.config.js`  en la raiz del proyecto
6. Introducir el siguiente código en el anterior fichero:

    ```javascript
        const path = require('path');
        const CopyWebpackPlugin = require('copy-webpack-plugin');
        const MiniCssExtractPlugin = require("mini-css-extract-plugin");

        module.exports = {
            entry: {
                main: "./src/index.ts",
            },
            output: {
                path: path.resolve(__dirname, 'public'),
                filename: "[name]-bundle.js",
            },
            mode: 'development', // 'development' 'production' 
            resolve: {
                // Add ".ts" and ".tsx" as resolvable extensions.
                extensions: [".tsx", ".ts", ".js", ".css"],
            },
            module: {
                rules: [
                    // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
                    {
                        test: /\.tsx?$/,
                        loader: 'ts-loader',
                        // exclude: /node_modules/,
                    },
                    {
                        test: /\.css$/i,
                        use: [MiniCssExtractPlugin.loader, "css-loader"],
                    },
                ],
            },
            plugins: [
                new CopyWebpackPlugin(
                    {
                        patterns: [
                            { from: './src/pages', to: './' },
                            { from: './src/styles', to: './styles' },
                            { from: './src/assets', to: './assets' }
                        ]
                    }),
                new MiniCssExtractPlugin(),
            ],
        };
    ```

7. Instalar webpack server (only development mode): `npm install webpack-dev-server --save-dev`


### Paso 3 (Desarrollar Proyecto): 


# Info API ree

## base url: `https://apidatos.ree.es/{lang}/datos/{category}/{widget}?[query]`

### {lang} (Defines the response language.)
* es
* en

### {category} (Defines the general category.)
* balance
* demanda
* generacion
* intercambios
* transporte
* mercados


### {widget} (Defines the particular widget to be retrieved.)
- Correspondientes a la categoria balance:
	* balance-electrico

- Correspondientes a la categoria  demanda
	* evolucion
	* variacion-componentes-movil
	* ire-general
	* ire-general-anual
	* ire-general-movil
	* ire-industria
	* ire-industria-anual
	* ire-industria-movil
	* ire-servicios
	* ire-servicios-anual
	* ire-servicios-movil
	* ire-otras
	* ire-otras-anual
	* ire-otras-movil
	* demanda-maxima-diaria
	* demanda-maxima-horaria
	* perdidas-transporte
	* potencia-maxima-instantanea
	* variacion-demanda
	* potencia-maxima-instantanea-variacion
	* potencia-maxima-instantanea-variacion-historico
	* demanda-tiempo-real
	* variacion-componentes-anual

- Correspondientes a la categoria  generacion:
	* estructura-generacion
	* evolucion-renovable-no-renovable
	* estructura-renovables
	* estructura-generacion-emisiones-asociadas
	* evolucion-estructura-generacion-emisiones-asociadas
	* no-renovables-detalle-emisiones-CO2
	* maxima-renovable
	* potencia-instalada
	* maxima-renovable-historico
	* maxima-sin-emisiones-historico

- Correspondientes a la categoria  intercambios
	* francia-frontera
	* portugal-frontera
	* marruecos-frontera
	* andorra-frontera
	* lineas-francia
	* lineas-portugal
	* lineas-marruecos
	* lineas-andorra
	* francia-frontera-programado
	* portugal-frontera-programado
	* marruecos-frontera-programado
	* andorra-frontera-programado
	* enlace-baleares
	* frontera-fisicos
	* todas-fronteras-fisicos
	* frontera-programados
	* todas-fronteras-programados
	
- Correspondientes a la categoria transporte
	* energia-no-suministrada-ens
	* indice-indisponibilidad
	* tiempo-interrupcion-medio-tim
	* kilometros-lineas
	* indice-disponibilidad
	* numero-cortes
	* ens-tim
	* indice-disponibilidad-total
	
- Correspondientes a la categoria mercados
	* componentes-precio-energia-cierre-desglose
	* componentes-precio
	* energia-gestionada-servicios-ajuste
	* energia-restricciones
	* precios-restricciones
	* reserva-potencia-adicional
	* banda-regulacion-secundaria
	* energia-precios-regulacion-secundaria
	* energia-precios-regulacion-terciaria
	* energia-precios-gestion-desvios
	* coste-servicios-ajuste
	* volumen-energia-servicios-ajuste-variacion
	* precios-mercados-tiempo-real
	* energia-precios-ponderados-gestion-desvios-before
	* energia-precios-ponderados-gestion-desvios
	* energia-precios-ponderados-gestion-desvios

### [query] (Set of parameters used to filter the requested data.)

* start_date (Required) (YYYY-MM-DDTHH:MM)
* end_date (Required) (YYYY-MM-DDTHH:MM)
* time_trunc (Required) (hour, day, month, year)
* geo_trunc (Optional) (electric_system)
* geo_limit (Optional) (peninsular, canarias, baleares, ceuta, melilla, ccaa)
* geo_ids (Optional) Defines the ID of the previously defined autonomous community/electrical system.


	
Region | geo_limit | geo_id
------ | --------- | ------
peninsular | peninsular | 8741
canarias | canarias | 8742
baleares | baleares | 8743
ceuta | ceuta | 8744
melilla | melilla | 8745
Andalucía | ccaa | 4
Aragón | ccaa | 5
Cantabria | ccaa | 6
Castilla la Mancha | ccaa | 7
Castilla y León | ccaa | 8
Cataluña | ccaa | 9
País Vasco | ccaa | 10
Principado de Asturias | ccaa | 11
Comunidad de Ceuta | ccaa | 8744
Comunidad de Melilla | ccaa | 8745
Comunidad de Madrid | ccaa | 13
Comunidad de Navarra | ccaa | 14
Comunidad Valenciana | ccaa | 15
Extremadura | ccaa | 16
Galicia | 	ccaa | 17
Islas Baleares | ccaa | 8743
Islas Canarias | ccaa | 8742
La Rioja | ccaa | 20
Región de Murcia | ccaa | 21

* samples:

https://apidatos.ree.es/en/datos/demanda/ire-general?start_date=2018-01-01T00:00&end_date=2018-12-31T23:59&time_trunc=month&geo_trunc=electric_system&geo_limit=peninsular&geo_ids=8741

https://apidatos.ree.es/en/datos/demanda/ire-general?start_date=2018-01-01T00:00&end_date=2018-12-31T23:59&time_trunc=month

https://apidatos.ree.es/es/datos/demanda/demanda-tiempo-real?start_date=2022-09-07T00:00&end_date=2022-09-07T23:59&time_trunc=hour



## API Response

### succesful

```javascript
{
        "data": {
          "type": "WIDGET TYPE",
          "id": "WIDGET_ID",
          "attributes": {
            "title": "WIDGET NAME",
            "last-update": "2019-02-01T08:26:34.000+01:00",
            "description": "WIDGET DESCRIPTION",
          },
          "meta": {
            "cache-control": {
              "cache": "HIT",
              "expireAt": "2019-03-01T17:18:22"
            }
          }
        },
        "included": [
          {
            "type": "INDICATOR_1 TYPE",
            "id": "INDICADOR_1_ID",
            "groupId": null,
            "attributes": {
              "title": "INDICADOR_1 NAME",
              "description": "INDICADOR_1 DESCRIPTION",
              "color": "#2fa688",
              "type": "INDICADOR_1 TYPE",
              "magnitude": "INDICADOR_1 MAGNITUDE",
              "composite": false,
              "last-update": "2019-02-19T08:26:34.000+01:00",
              "values": [
                {
                  "value": 12345,
                  "percentage": "VALUE BETWEEN 0 AND 1",
                  "datetime": "2019-02-04T20:44:00.000+01:00"
                }
              ]
            },
           {
            "type": "INDICATOR_2 TYPE",
            "id": "INDICADOR_1_ID",
            "groupId": null,
            "attributes": {
      	       …
            }
          }
        ]
       }
      }
```
	  
### Error

```javascript
{
    	"errors":[
    		{
    			"code":XXX,
    			"status":"YYY",
    			"title":"ERROR TITLE",
    			"detail":"DETAILED ERROR"
    		}
    	]
    }
```

### Ejemplo respuesta correcta ree

```javascript
{"data":{"type":"Demanda peninsular en tiempo real","id":"dem15","attributes":{"title":"Demanda peninsular en tiempo real","last-update":"2022-09-12T10:29:00.000+02:00","description":null},"meta":{"cache-control":{"cache":"MISS"}}},"included":[{"type":"Demanda real","id":"1293","groupId":null,"attributes":{"title":"Demanda real","description":null,"color":"#ffea00","type":null,"magnitude":null,"composite":false,"last-update":"2022-09-12T10:29:00.000+02:00","values":[{"value":24858,"percentage":0.33500896214336734,"datetime":"2022-09-12T00:00:00.000+02:00"},{"value":24770,"percentage":0.33465285002094114,"datetime":"2022-09-12T00:05:00.000+02:00"},{"value":24521,"percentage":0.3328808221223681,"datetime":"2022-09-12T00:10:00.000+02:00"},{"value":24608,"percentage":0.33577578560999904,"datetime":"2022-09-12T00:15:00.000+02:00"},{"value":24431,"percentage":0.33470332771635636,"datetime":"2022-09-12T00:20:00.000+02:00"},{"value":24466,"percentage":0.33554138380305837,"datetime":"2022-09-12T10:05:00.000+02:00"},{"value":31603,"percentage":0.3349762571016705,"datetime":"2022-09-12T10:10:00.000+02:00"},{"value":31312,"percentage":0.3319832905701987,"datetime":"2022-09-12T10:15:00.000+02:00"},{"value":31104,"percentage":0.3303488927831767,"datetime":"2022-09-12T10:20:00.000+02:00"}]}},{"type":"Demanda programada","id":"545","groupId":null,"attributes":{"title":"Demanda programada","description":null,"color":"#e90b0b","type":null,"magnitude":null,"composite":false,"last-update":"2022-09-12T10:29:00.000+02:00","values":[{"value":24600,"percentage":0.3315319200549858,"datetime":"2022-09-12T00:00:00.000+02:00"},{"value":24600,"percentage":0.3323560803599173,"datetime":"2022-09-12T00:05:00.000+02:00"},{"value":24600,"percentage":0.3339532736923557,"datetime":"2022-09-12T00:10:00.000+02:00"},{"value":24250,"percentage":0.33089088105666764,"datetime":"2022-09-12T00:15:00.000+02:00"},{"value":24250,"percentage":0.3322236378830847,"datetime":"2022-09-12T10:40:00.000+02:00"},{"value":30578,"percentage":0.48965539328721497,"datetime":"2022-09-12T10:45:00.000+02:00"},{"value":30578,"percentage":0.4891853842708133,"datetime":"2022-09-12T23:40:00.000+02:00"},{"value":27034,"percentage":0.4984971695155907,"datetime":"2022-09-12T23:45:00.000+02:00"},{"value":27034,"percentage":0.49953804649100114,"datetime":"2022-09-12T23:50:00.000+02:00"},{"value":27034,"percentage":0.5005925487000963,"datetime":"2022-09-12T23:55:00.000+02:00"}]}},{"type":"Demanda prevista","id":"544","groupId":null,"attributes":{"title":"Demanda prevista","description":null,"color":"#41d641","type":null,"magnitude":null,"composite":false,"last-update":"2022-09-12T10:09:00.000+02:00","values":[{"value":24743,"percentage":0.3334591178016469,"datetime":"2022-09-12T00:00:00.000+02:00"},{"value":24647,"percentage":0.33299106961914154,"datetime":"2022-09-12T00:05:00.000+02:00"},{"value":24542,"percentage":0.3331659041852762,"datetime":"2022-09-12T00:10:00.000+02:00"},{"value":24429,"percentage":0.3333333333333333,"datetime":"2022-09-12T00:15:00.000+02:00"},{"value":24312,"percentage":0.33307303440055896,"datetime":"2022-09-12T00:20:00.000+02:00"},{"value":24199,"percentage":0.33187958581910443,"datetime":"2022-09-12T00:25:00.000+02:00"},{"value":24090,"percentage":0.33345329715962574,"datetime":"2022-09-12T00:30:00.000+02:00"},{"value":23983,"percentage":0.3334399243667102,"datetime":"2022-09-12T00:35:00.000+02:00"},{"value":23879,"percentage":0.332326662398753,"datetime":"2022-09-12T23:30:00.000+02:00"},{"value":27438,"percentage":0.5037083272139815,"datetime":"2022-09-12T23:35:00.000+02:00"},{"value":27313,"percentage":0.502566839015953,"datetime":"2022-09-12T23:40:00.000+02:00"},{"value":27197,"percentage":0.5015028304844092,"datetime":"2022-09-12T23:45:00.000+02:00"},{"value":27084,"percentage":0.5004619535089988,"datetime":"2022-09-12T23:50:00.000+02:00"},{"value":26970,"percentage":0.4994074512999037,"datetime":"2022-09-12T23:55:00.000+02:00"}]}}]}
```

## Glosario

* [Web Typescript](https://www.typescriptlang.org/)
* [WebPack](https://webpack.js.org/)
* [API ree](https://www.ree.es/es/apidatos)
