# Proyecto Backend Node.js

Este es un proyecto backend construido con Node.js, Express y TypeScript centrado en el manejo de un árbol de categorías.

## Endpoints Disponibles

La URL base para las rutas es `/api/categories`.

| Método | Endpoint                            | Descripción                                                          |
| ------ | ----------------------------------- | -------------------------------------------------------------------- |
| GET    | `/api/categories/analize`           | Analiza el árbol de categorías.                                      |
| GET    | `/api/categories/active-leaf-paths` | Obtiene todas las rutas de los nodos hoja que se encuentran activos. |
| GET    | `/api/categories/:id`               | Busca y devuelve una categoría específica por su ID.                 |
| POST   | `/api/categories/`                  | Construye o inicializa el árbol de categorías.                       |

## Comandos para levantar el Backend

Asegúrate de haber instalado las dependencias primero con:

```bash
npm install
```

### Entorno de Desarrollo

Para levantar el servidor en modo desarrollo (utilizando `ts-node-dev` para recargas automáticas):

```bash
npm run dev
```

### Entorno de Producción

Para compilar el proyecto TypeScript a JavaScript:

```bash
npm run build
```

Para iniciar el servidor a partir del código compilado:

```bash
npm start
```

Despues es necesario construir el árbol usando POST (http://localhost:3000/api/categories/)
con el body:

```json
{
  "id": 1,
  "name": "Electrónica",
  "active": true,
  "subcategories": [
    {
      "id": 2,
      "name": "Computadoras",
      "active": true,
      "subcategories": [
        { "id": 5, "name": "Laptops", "active": true, "subcategories": [] },
        { "id": 6, "name": "Desktops", "active": false, "subcategories": [] }
      ]
    },
    { "id": 3, "name": "Celulares", "active": true, "subcategories": [] },
    { "id": 4, "name": "Accesorios", "active": true, "subcategories": [] }
  ]
}
```

Luego utilizar el resto de los endpoints

> Nota. Se utilizó **Antigravity** para el desarrollo del proyecto y la revisión de las funciones en la carpeta Shared.
