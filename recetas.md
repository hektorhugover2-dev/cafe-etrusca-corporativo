# Café Etrusca — contexto recetas / imágenes

**Usuario:** Héctor Hugo Rivera González. Hablar en español, tono directo.

**Proyecto:** `C:\laragon\cafe-etrusca-corporativo-main` (Laragon, Windows).
**Máquina:** `ETR-HRIVERA`.

## Qué se está haciendo

Mejorar fotos de bebidas para la web con **grok.com/imagine** (img2img / edit):

1. Subir foto original como referencia
2. Generar versión premium comercial
3. Quitar fondo (blanco → transparencia)
4. Exportar `.webp` e instalar en `public/assets/images/recetas/...`
5. Dejar backup `.original.webp` si se reemplaza un local
6. En calabaza: actualizar `image` / `banner` en `recetas.data.ts` a rutas locales

**Data:** `src/app/domains/catalog/presentation/pages/recipes-page/recetas.data.ts`

## Prompt base Imagine

```
Edit this product photo of [NOMBRE], [descripción corta], in its original glass and garnish. Keep the same recipe presentation, silhouette, vessel shape and overall composition as the reference. Upgrade to premium commercial beverage photography: soft even studio light, natural glass reflections, real ice and liquid texture, true-to-life colors, sharp detail. No CGI look, no plastic materials, no over-sharpening, no heavy glow. Isolated on pure seamless white background with NO drop shadow, NO contact shadow, NO grey halo under the glass. Subject floating cleanly, centered, generous padding, ready for a website card. Photorealistic, 4K, ultra clean, no text, no logo, no watermark, no props, no table.
```

**Config:** Image · 2:3 · Quality 2.0 si aparece (a veces se oculta al adjuntar la referencia).

### Prompt redo anti-CGI / anti-sombra (ej. Orange cream cold brew)

```
Edit this product photo of Orange cream cold brew. Keep the same glass, drink layers, garnish and overall composition as the reference. Make it look like a real commercial café product photo shot in studio — natural glass reflections, real ice and liquid texture, soft even lighting, true-to-life colors. No CGI look, no plastic materials, no over-sharpening, no heavy glow. Isolated on pure seamless white background with NO drop shadow, NO contact shadow, NO grey halo under the glass. Subject floating cleanly, centered, generous padding. Photorealistic food photography, 4K, ultra clean, no text, no logo, no watermark, no props, no table.
```

## Reglas

- Solo procesar fotos nuevas / pendientes. **No tocar** las ya pasadas por Grok.
- Si la descarga pesa igual que la original o es duplicado de otra bebida → descartar y regenerar.
- Si se ve artificial o con sombra abajo → regenerar con el prompt anti-CGI / anti-shadow.
- Preferir español con el usuario.

## Estado

### Temporada (listas)

`margarita`, `diablito-de-fresa`, `miche-cero`, `mi-mero-mole`, `nogada-clasica`, `marchanta`, `cate-de-mi-corazon`, `horchata-mexa`

→ `public/assets/images/recetas/temporada/`

### Verano

**Listas:** `lychee-rose`, `mojito-dragon-fruit`, `dirty-soda`, `matcha-colada`, `strawberry-matcha-lemonade`, `tropical-cold-brew`, `orange-cream-cold-brew`, `soda-tropical-espumosa`, `sparkling-cherry`

→ `public/assets/images/recetas/verano/`

### Calabaza (listas + data local)

Van primero en data: `pumpkin-cold-brew`, `dirty-pumpkin-chai`

También: `calabaza-brulee-latte`, `mokalabaza-latte`, `affogato-de-otono`, `bubble-pumpkin`, `calabaza-brulee`, `calabaza-y-espresso-latte`, `calabaza-y-matcha-latte`, `dulce-de-calabaza-molecular`

→ `public/assets/images/recetas/calabaza/`

`iced-coffee-coconut` está al final de `recetas.data.ts` con `collection: 'otros'`.

## Flujo técnico

- Originales verano (box): `/workspace/recetas-verano/webp/`
- Generadas: `/workspace/recetas-verano/mejoradas/`
- Quitar blanco: `python whitetrans_named.py <nombre> /workspace/recetas-verano/mejoradas`
- Transferencia a Windows vía temp (`AppData\Local\Temp\...`) porque Copy directo a Laragon a veces falla por local-exec root
- Cuenta Imagine: la que tenga créditos (Héctor cambia sesión en el navegador del bot)

## Pedido actual

Verano pendiente: ninguno (orange-cream-cold-brew, soda-tropical-espumosa, sparkling-cherry instalados 2026-09-19).

