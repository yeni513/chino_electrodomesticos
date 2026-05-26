# Cómo usar tu panel de administración

Este panel te permite gestionar el inventario de tu web sin tocar código. Aquí encontrarás todo lo que necesitas para añadir, editar, borrar, restaurar y exportar productos.

---

## 🔑 Cómo entrar

1. Abre la web y añade `/admin` al final de la URL:

   ```
   https://tu-web.vercel.app/admin
   ```

2. Te pedirá **correo y contraseña**. Usa los que te entregó tu desarrollador.

3. Recomendación: añade esta URL a favoritos del navegador.

**¿Olvidaste tu contraseña?** Haz clic en *"¿Olvidaste tu contraseña?"* en la pantalla de login. Recibirás un correo con un enlace para crear una nueva.

---

## 📋 Pantalla principal

Cuando entras ves:

- **Resumen del día** (si hubo movimiento): productos añadidos, editados o marcados como vendidos hoy.
- **Stats**: total, disponibles, agotados, vendidos.
- **Lista de productos** con foto, nombre, categoría, precio y estado.
- **Búsqueda** rápida (atajo: presiona `/` desde cualquier lado).
- **Filtros** por estado y por categoría.
- **Botón Añadir producto** arriba a la derecha (atajo: `⌘N` o `Ctrl+N`).
- **Botón Exportar CSV** para bajar tu inventario completo.
- **Botón Papelera** para ver y restaurar productos borrados.

---

## 🆕 Añadir un producto

1. Clic en **+ Añadir producto** (o `⌘N`).
2. Aparece un formulario. Rellena los campos:

   | Campo | Qué poner |
   |---|---|
   | **Nombre** | Cómo se llama el producto. Ej: *Lavadora LG carga frontal 9 kg*. **Obligatorio**. |
   | **Categoría** | Lavadora / Secadora / Estufa / Refrigerador / Freezer / Combo / Otro |
   | **Estado** | Disponible / Vendido / Agotado |
   | **Precio (USD)** | Un número, sin símbolo. Si lo dejas vacío, en la web aparece "Consultar precio". |
   | **Orden manual** | Opcional. Número que controla el orden (menor = aparece antes). |
   | **Marca** | LG, Samsung, Mabe, Whirlpool… |
   | **Color** | Blanco, gris, inox… |
   | **Condición** | *Nuevo en caja* / *Seminuevo* / *Usado revisado* |
   | **Descripción corta** | 1–2 líneas con lo importante. Máx. 280 caracteres. |
   | **Foto** | Sube una imagen (JPG/PNG/WebP, máx. 5 MB) |
   | **Destacado** | Aparece primero en la web pública |
   | **Entrega disponible** | Muestra la pill "Entrega disponible" en la card pública |

3. Clic en **Crear producto** (o `⌘+Enter`).
4. Verás un toast verde confirmando la creación.

---

## ⚡ Cambios rápidos sin abrir el formulario

- **Cambiar estado**: clic directo en la pill de estado (Disponible / Vendido / Agotado) en la lista → elige el nuevo estado. Se guarda al instante.
- **Duplicar producto**: clic en el botón **Duplicar** de cualquier fila → abre el formulario prellenado para crear uno similar rápido.
- **Buscar**: presiona `/` desde cualquier parte → enfoca el buscador.

---

## ✅ Acciones en bloque (bulk)

1. Marca el checkbox del o los productos.
2. Aparece una barra amarilla con acciones:
   - Marcar todos como **Disponibles** / **Vendidos** / **Agotados**.
   - **Borrar seleccionados** (van a la papelera).

---

## 📸 Subir o cambiar foto

Dentro del formulario, sección **Foto del producto**:

- **Subir foto** — clic y elige el archivo.
- **Reemplazar** — sube una nueva (la anterior se borra automáticamente del almacenamiento).
- **Quitar** — elimina la foto del producto y del storage.

**Lo que pasa automáticamente al subir:**
- Se valida que sea JPG/PNG/WebP de menos de 5 MB.
- Se comprime y reescala a máximo 1600 px para que tu web cargue rápido.
- Se convierte a WebP (formato más liviano).

> ⚠️ Las fotos HEIC del iPhone no funcionan. Si tu iPhone toma en HEIC, cambia en Ajustes → Cámara → Formatos → "Más compatible" (JPG).

---

## 🗑 Borrar y restaurar

**Borrar un producto** lo mueve a la **Papelera** (no lo elimina del todo).

1. Clic en **Borrar** en cualquier fila.
2. Confirma en el diálogo.
3. Aparece un toast con botón **Deshacer** (válido 6 segundos).

**Recuperar de la papelera:**

1. Clic en **Papelera** arriba.
2. Encuentras los productos borrados.
3. **Restaurar** → vuelve al inventario.
4. **Eliminar para siempre** → borrado permanente (también borra la foto del storage). Esto sí es irreversible.

---

## 📥 Exportar inventario (CSV)

Clic en **Exportar CSV** → descarga un archivo con todos tus productos. Lo puedes abrir en Excel, Google Sheets o Numbers. Útil para:

- Hacer copia de seguridad mensual.
- Análisis de inventario.
- Migración o reportes.

---

## ⌨️ Atajos de teclado

| Atajo | Qué hace |
|---|---|
| `/` | Enfoca el buscador |
| `⌘N` / `Ctrl+N` | Crear nuevo producto |
| `⌘Enter` / `Ctrl+Enter` | Guardar el producto actual (dentro del formulario) |
| `Esc` | Cerrar formulario / diálogo |

---

## 🚪 Cerrar sesión

Botón **Cerrar sesión** arriba a la derecha. Verás un toast confirmando.

Tu sesión también se cierra sola si Supabase invalida el token (raro en uso normal).

---

## 👁 Privacidad: ocultar tu email

En el header del admin, junto a tu email, hay un icono de ojo. Clic para **enmascarar/mostrar** el email. Útil si compartes pantalla con alguien.

---

## ❓ Problemas comunes

**No puedo entrar / contraseña incorrecta**
Usa el enlace *"¿Olvidaste tu contraseña?"* en login. Si no llega el correo, revisa spam.

**La foto se ve gris/rota tras subirla**
Probablemente subiste un HEIC del iPhone. Cambia el formato en Ajustes (ver sección Fotos arriba) y reintenta.

**Cambié algo y la web pública no se actualiza**
Refresca con `Ctrl+F5` (Mac: `Cmd+Shift+R`). El navegador a veces cachea.

**Borré sin querer**
Tranquilo: si fue hace menos de 6 segundos, presiona **Deshacer** en el toast. Si pasó más tiempo, ve a **Papelera** y restaura.

**Acabé borrando para siempre desde la papelera**
Esto sí es definitivo. Crea uno nuevo con los mismos datos.

---

## 🆘 Soporte

Si algo no funciona como esperas, contacta a tu desarrollador. Antes de hacerlo:

1. Anota qué intentaste hacer y qué pasó.
2. Si hay un mensaje de error, hazle captura de pantalla.
3. Indica si fue desde móvil o computadora.
