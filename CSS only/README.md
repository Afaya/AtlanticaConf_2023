# AtlanticaConf_2023
En este repositorio se muestra como con tan solo tres archivos: html, css y javascript se pueden pintar gráficas usando CSS. Para ello se usan los siguientes ejemplos:
- Gráfico de barras
- Gráfico de líneas
- Gráfico de burbujas

## Gráfico de barras
Es el que cargamos por defecto en la primera pestaña. Lo que se hace es lo siguiente:
Se coge el div del gráfico de barras con:
```
var currentGraphDiv = document.getElementById('bar-graph-calculated');
```

A continuación se calculan los datos en porcentaje con el método:
```
calculateDataInPercent()
```
Este método hace lo siguiente
    - Calcula el valor mas alto del array: 
    ``` 
    Math.max(...dataToDisplayInGraphs.map(o => o.value));
    ```
    - Calcula el valor más alto del gráfico (será la siguiente decena al número mas alto del array, por ejemplo si el número más alto es 48 será 50, si es 52 será 60 y así): 
    ```
    Math.ceil(maximumValueInData / 10) * 10;
    ```
    - Calcula el valor de cada objeto en porcentaje, tomando el valor mas alto del gráfico como el 100%:
    ```
    Math.ceil(d.value * maxCeils / maximumValueInGraph);
    ```

Ahora es cuando pintamos el grid que va a contener el gráfico:
```
function generateGrid(currentGraphDiv, calculatedData)
```
Este método hace lo siguiente:
    - Pintamos las filas del grid teniendo en cuenta que nuestro 100% serán las maxCeils que tenemos como constante:
    ```
    currentGraphDiv.style.gridTemplateRows = 'repeat(' + maxCeils + ', 1vh)';
    ```
    - Pintamos las columnas (o bien 100% / num columnas o si son muchas un 5%)
    ```
    currentGraphDiv.style.gridTemplateColumns = 
        'repeat(' + calculatedData.length + ',' + calculatedColumnWidth +'%)';
    ```

Ahora es cuando rellenamos el grid con las columnas:
```
function fillGrid(currentGraphDiv, calculatedData, columnWidth)
```
Este método hace lo siguiente:
    - Crea un div:
    ```
    var currentDiv = document.createElement("div");
    ```
    - Le añadimos su clase
    - Lo posicionamos en la fila mas alta, ya que el grid empieza de la fila 0 arriba del todo hacia abajo.
    ```
    currentDiv.style.gridRowStart = maxCeils + 1;
    ```
    - Calculamos hasta donde debe llegar según su valor en porcentaje
    ```
    currentDiv.style.gridRowEnd = maxCeils + 1 - data.value;
    ```
    - Le ponemos en texto su valor:
    ```
    currentDiv.innerHTML = data.originalValue + 'pts';
    ```
    - Generamos su etiqueta del eje x:
    ```
    var currentSpan = document.createElement("span");
    currentSpan.classList.add('bar-graph-x-axis-span');
    currentSpan.style.width = columnWidth + '%';
    currentSpan.innerHTML = text;
    ```

Y listo!




