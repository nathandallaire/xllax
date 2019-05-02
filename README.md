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
(pass in ID of element you want to have the parallax)
```
const parallax = new Xllax('parallaxElement');
```

## Attributes
```
<div  
    id="parallaxElement" 
    data-lax-distance="100"
    data-lax-center>
    This will be smooth as shit
</div>
```
**data-lax-distance** determines the amount of pixels you want the element to scroll while it's on the screen. In the above example, the parallax'd element will move 100px while it's in the client viewport.

**data-lax-center** *(optional)* determines that the parallax'd element should be at its default starting point (ie. ```translate(0,0)```) when that starting point is in the center of the client viewport