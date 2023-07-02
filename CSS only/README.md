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
function generateGrid(currentGraphDiv, calculatedData)
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

## Gráfico de burbujas

Lo primero de todo es calcular que tamaño tendrán las burbujas
```
calculateDataInBubbles()
```
Para ello:
    - Primero tomamos el valor máximo:
    ```
     const maxValue = Math.max(...dataToDisplayInGraphs.map(o => o.value));
    ```

    - Y después dependiendo de su tamaño y del máximo calculamos su porcentaje con respecto al máximo. Con este porcentaje calculamos si tendría un valor de 3 (> 75%), 2 (>50%) o 1.
    ```
    calculateBubbleSize(maxValue, currentValue)
    ```

A continuación se genera el grid:
```
generateBubbleGrid(graphDiv, bubbleData);
```

    - Por defecto cada dato estará en una cuadrícula de 3 x 3, por lo que se calcula el numero de columnas y el de filas así:
    ```
    var numberColumns = 3 * calculatedData.length;
    ```

    - Luego dependiendo del número de filas o columnas se calcula el número de px que van a tener para que tengan forma cuadrada

    - Se pone el mismo valor para las grid-template-columns que para las grid-template-rows:
    ```
    'repeat(' + numberColumns + ',' + columnWidth + 'px)';
    ```

Y por último rellenamos el grid:
```
fillBubbleGrid(bubbleData, graphDiv, numberRows);
```
    - Creamos un div y le ponemos o bien una clase de color aleatoria o si son menos de 6 datos entonces cada uno le ponemos un color:
    ```
    const currentRandomColor = getRandomBubbleNumber(4, 0);
    currentDiv.classList.add(availableBubbleColors[currentRandomColor]);
    ```

    - Luego cogemos al azar una fila para situarlo y hacemos que ocupe las filas que correspondan a su valor (1, 2 ó 3):
    ```
    const currentRandomRowStart = getRandomBubbleNumber(numberRows-3, 1);
    currentDiv.style.gridRowStart = currentRandomRowStart;
    currentDiv.style.gridRowEnd = currentRandomRowStart + data.value;
    ```

    - Luego lo situamos en la columna que le toca (cada uno tiene de máximo 3 y se empieza en la 1, el siguiente en la 4 y así) y le ponemos de ancho el valor que le haya correspondido (1, 2 ó 3):
    ```
    currentDiv.style.gridColumnStart = currentDataPosition;
    currentDiv.style.gridColumnEnd = currentDataPosition + data.value;
    ```

    - Dentro le ponemos el nombre de la persona.


Y listo!




