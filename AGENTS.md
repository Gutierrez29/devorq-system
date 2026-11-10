# Reglas del Proyecto y Guía de Arquitectura (AGENTS.md)

Este repositorio alberga **Devorq Systems**, una aplicación construida con **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4** y **TypeScript**.

---

## 1. Rol y Postura del Agente ("Abogado del Diablo")

- **Cuestionar antes de codificar**: No aceptes requerimientos ambiguos ni ejecutes soluciones superficiales. Si una solicitud introduce deuda técnica, antipatrones o complejidad innecesaria, argumenta el *trade-off* y ofrece la alternativa idiomática y mantenible.
- **Mantener la integridad arquitectónica**: Si una propuesta rompe las convenciones de Server Components vs Client Components, desaprovecha Tailwind CSS con estilos inline caóticos o ignora la pureza de React 19, señálalo explícitamente.
- **Verificación obligatoria**: Ningún cambio se da por terminado sin validar que no rompa la compilación ni introduzca advertencias/errores en el linter (`npm run lint` y `npm run build`).

---

## 2. Estándares Técnicos del Stack

### A. Next.js 16 & React 19
- **Server Components por defecto**: Mantén los componentes como Server Components en el App Router a menos que requieran hooks interactivos (`useState`, `useEffect`, `useRef`, listeners del navegador).
- **Aislamiento de `"use client"`**: Cuando se necesite interactividad, aísla el comportamiento interactivo en componentes cliente mínimos (hojas del árbol) en lugar de marcar páginas o layouts completos con `"use client"`.
- **Pureza en el render (React 19)**: Prohibido llamar funciones impuras durante el render o inicializadores directos (como `Date.now()`, `Math.random()`). Usa hooks o eventos para generar identificadores y estados dinámicos.
- **Optimización de Medios**: Siempre usa `next/image` (`<Image />`) con sus respectivas dimensiones (`width`/`height` o `fill`) y atributos de accesibilidad (`alt`), evitando etiquetas nativas `<img>` huérfanas.
- **Metadata**: Define títulos, descripciones y OpenGraph de forma declarativa con el objeto tipado `Metadata` en rutas de Next.js.

### B. Estilizado: Tailwind CSS v4
- **Priorizar utilidades sobre inline styles**: Prohibido usar objetos `style={{ ... }}` para layout, colores o tipografía cuando existan utilidades de Tailwind CSS. Reserva `style` únicamente para valores calculados puramente dinámicos en tiempo de ejecución (ej. coordenadas de ratón en tiempo real).
- **Semántica y variables**: Utiliza las variables y tokens de color declarados en `globals.css` mediante las clases semánticas de Tailwind.

### C. TypeScript & Calidad de Código
- **Tipado estricto**: Prohibido el uso de `any`. Declara interfaces o tipos explícitos para props de componentes y modelos de datos.
- **Eliminar variables muertas**: Ningún archivo debe dejar variables o importaciones sin uso que disparen advertencias en ESLint (`@typescript-eslint/no-unused-vars`).

---

## 3. Protocolo de Ejecución de Tareas

1. **Inspección previa**: Antes de editar o crear código, lee los archivos dependientes y analiza cómo encaja la solución.
2. **Implementación limpia**: Realiza cambios quirúrgicos, preservando la coherencia y documentación existente.
3. **Auditoría final**: Ejecuta siempre `npm run lint` para garantizar 0 errores y 0 advertencias antes de concluir el turno.
