# Fire

Fire an event to a specified element on click on the element.

## Markup

```html
<span data-fire="slider-next" data-target=".js-portfolio" data-attrs="1,2,3">Next</span>
```

This is the same as:

```javascript
triggerEvent($$('.js-portfolio', 'slider-next', [1, 2, 3]);
```

## HTML attributes

### data-fire

Event name.

### data-target

Target element selector. Required if `data-closest` is not specified.

### data-closest

Target element selector: search only through element ancestors. Required if `data-target` is not specified.

### data-attrs

Comma separated attributes list: any data you want to pass to an event handler.
