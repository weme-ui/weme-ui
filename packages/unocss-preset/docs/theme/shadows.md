# Shadows

阴影、模糊与透视相关主题值。

## Shadow

- **shadow：** `DEFAULT`、`xs`、`sm`、`md`、`lg`、`xl`、`inner`、`none`（多层 box-shadow）
- **insetShadow：** `2xs`、`xs`、`sm`、`none`
- **dropShadow：** `xs` … `2xl`
- **textShadow：** `none`、`2xs` … `lg`

```html
<div class="shadow-md">...</div>
<div class="inset-shadow-sm">...</div>
<img class="drop-shadow-lg" />
<span class="text-shadow-md">...</span>
```

## Blur

**blur：** `DEFAULT`/`sm` 8px、`xs` 4px、`md` 12px、`lg` 16px、`xl` 24px、`2xl` 40px、`3xl` 64px

```html
<div class="blur-md backdrop-blur-lg">...</div>
```

## Perspective

**perspective：** `dramatic` 100px、`near` 300px、`normal` 500px、`midrange` 800px、`distant` 1200px

```html
<div class="perspective-dramatic">...</div>
```
