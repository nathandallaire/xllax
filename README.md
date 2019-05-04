# Xllax
###### Parallax that's smooth as literal shit

## To get started:
```
npm i -S xllax
```

## Importing
```
import Xllax from "xllax";
```

## Initialize it 
Pass in ID of element you want to have the parallax
```
const parallax = new Xllax('parallaxElement', options);
```

## Options
```distance```: **(Number, required)** Determines the amount of pixels you want the element to scroll while it's on the screen. In the above example, the parallax'd element will move 100px while it's in the client viewport.

```drag```: (Number, optional) How quickly it should slide to the position. Default is ```0.05```

```center```: (Bool, optional) When the item is in the center of the viewport, its transform values will be ```(0,0)```

```horizontal```: (Bool, optional) This makes the element move horizontally instead of up and down.
