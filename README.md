# Flexibilidades al derecho de autor en América Latina

## Requisitos

- node v14.15.1
- Archivos `*.tsv` exportados de la hoja de Google Drive `BD Sitios DA` (Patricia tiene acceso a estos archivos), para este paso, hacer lo siguiente:

1. seleccionar cada una de las hojas (Estado, Categoria, Excepciones, Paises, Glosario), por ejemplo `Estado`
2. ir a `Archivo` (`File`) en el menu
3. seleccionar `Descargar` (`Download`)
4. seleccionar `Tab-Separated Values (*tsv, current sheet)` (la última opción)
5. copiar el archivo descargado en el directortio `internal/dataToDecode/` de este proyecto

## Instalación


1. Copiar el archivo `.env.sample` y llamarlo `.env`. Actualizar el archivo `.env` con los valores correctos.

2. Ejecutar

```
$> npm install
```

## Test en ambiente local

Para probar si la app está funcionando como se espera, ejecutar:

```
$> npm run import:db
$> npm run dev
```

y abrir en el browser `localhost:5000`

## Publicación

Antes de publicar en el servidor de preferencia, ejecutar:

```
$> npm run publish
```

copiar el archivo `public/` en el directorio usado por el servidor.

Si la base de datos en Google Drive ha sido actualizada, repetir los pasos del segundo item (copiar archivos `*.tsv`) de la sección requisitos.
