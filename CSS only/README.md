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
- Lo posicionamos en la fila mas alta, ya que el grid emareaza de la fila 0 arriba del todo hacia abajo.
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

Para ello: - Primero tomamos el valor máximo:
`    const maxValue = Math.max(...dataToDisplayInGraphs.map(o => o.value));
  `

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

    - Luego lo situamos en la columna que le toca (cada uno tiene de máximo 3 y se emareaza en la 1, el siguiente en la 4 y así) y le ponemos de ancho el valor que le haya correspondido (1, 2 ó 3):
    ```
    currentDiv.style.gridColumnStart = currentDataPosition;
    currentDiv.style.gridColumnEnd = currentDataPosition + data.value;
    ```

    - Dentro le ponemos el nombre de la persona.

Y listo!

## Gráfico de área

Lo primero que se hace es coger el div del gráfico y de la leyenda. Luego vamos por pasos, lo primero es calcular el area que le corresponde a cada dato:

```
calculateDataArea
```

Los pasos que realizamos son: - Como el grid va a ser cuadrado calcular cuantas celdas tiene: lado _ lado. - Sumar los puntos totales de todos los usuarios:
`    const valuesSumUp = dataToDisplayInGraphs.reduce(
        function (acc, obj) { return acc + obj.value; }, 0);
   ` - Calcular el valor de area que le corresponde a cada valor. - Para ello tendremos en cuenta cuantas celdas corresponde por punto (dividimos las celdas entre los puntos totales).
```
valueToCalculate _ (maxCells / valuesSumUp)
``` - Con ello lo multiplicamos por el número de puntos y redondeamos con un Math.floor. - Si el valor es mayor de 100, lo que hacemos es si supera en la siguientas decenas de 50 se redondea al 100 siguiente y sino se le resta todo lo que supere del 100 anterior. Es decir 234 sería 200 y 366 sería 400.

Creamos el grid que será cuadrado

```
generateAreaGrid
```

    - Se calcula el ancho de cada fila y cada celda:
    ```
    sideWidth = ((15*30) / sideCells)
    ```
    - Se crea el div del grid y se le añaden las clases necesarias.
    - Se le pone el mismo número de filas y columnas, con el mismo alto y ancho.
    - Añadimos el grid al DOM.

Por último hay que rellenar el grid

```
fillAreaGrid
```

    - Calculamos el color random que le toca a cada área.
    - Generamos tantos divs como valor del area calculado tenga y se rellenan con ese color y se añaden al grid
    - A la vez generamos la leyenda que consistirá de un span con el fondo del color del área y con el texto  nombre - XX pts.

## Intentos fallidos

    - Tratar de hacer el de area en cuadrados en lugar de en líneas, pero me resultaba engorroso el cálculos matemático.
    - Realizar un gráfico de tipo quesito. De nuevo los cálculos matemáticos eran mas complejos porque iba a necesitar algo de trigonometría.
    - Realizar un gráfico de líneas. De base es igual al de barras pero cuando se pone el estilo a la barra se le dice que pinte solo el border superior y se le da un ancho del 1% con un margin-left del 49%, con eso tenemos un punto en cada bloque. El problema era como hacer luego las líneas que lo uniesen, que iba a necesitar un canvas por encima con un svg o similar.
