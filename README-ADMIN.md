# Cómo usar tu panel de administración

Este panel te permite gestionar el inventario de tu web sin tocar código. Aquí encontrarás todo lo que necesitas para añadir, editar, borrar y marcar productos.

---

## 🔑 Cómo entrar

1. Abre la web de tu tienda y añade `/admin` al final de la URL:

   ```
   https://tu-web.vercel.app/admin
   ```

2. Te pedirá **correo y contraseña**. Usa los que te entregó tu desarrollador.

3. Recomendación: añade esta URL a favoritos del navegador.

> Si pierdes tu contraseña, pide a tu desarrollador que te la resetee desde Supabase.

---

## 📋 Pantalla principal

Cuando entras ves la lista de todos los productos con:

- **Foto** del producto (o un icono si todavía no le subiste foto).
- **Nombre** y categoría.
- **Precio** o "Consultar precio" si lo dejaste vacío.
- **Estado**: Disponible, Vendido o Agotado.
- **Botones** para Editar o Borrar.

Arriba puedes:

- **Buscar** por nombre, marca o categoría.
- **Filtrar** por estado (Todos / Disponibles / Vendidos / Agotados).
- **Añadir producto** (botón amarillo arriba a la derecha).

---

## 🆕 Añadir un producto

1. Haz clic en **+ Añadir producto** arriba a la derecha.
2. Aparece un formulario. Rellena los campos:

   | Campo | Qué poner |
   |---|---|
   | **Nombre** | Cómo se llama el producto. Ej: *Lavadora LG carga frontal 9 kg*. **Obligatorio**. |
   | **Categoría** | Lavadora / Secadora / Estufa / Refrigerador / Freezer / Combo / Otro |
   | **Estado** | Disponible (por defecto) / Vendido / Agotado |
   | **Precio (USD)** | Un número, sin símbolo de moneda. Si lo dejas **vacío**, en la web aparece "Consultar precio". |
   | **Orden manual** | Opcional. Número que controla el orden (menor = aparece antes). |
   | **Marca** | LG, Samsung, Mabe, Whirlpool… |
   | **Color** | Blanco, gris, inox… |
   | **Condición** | *Nuevo en caja* / *Seminuevo* / *Usado revisado*. Aparece como pill en la card. |
   | **Descripción corta** | 1–2 líneas con lo importante (capacidad, voltaje, programas). Máx. 280 caracteres. |
   | **Foto** | Sube una imagen (1200×900 px o más, JPG o WebP, menos de 500 KB idealmente). |
   | **Destacado** | Activa para que aparezca primero. |
   | **Entrega disponible** | Activa si haces entrega de este producto. |

3. Botón **Crear producto** (abajo). En 1–2 segundos aparece en la web.

---

## ✏️ Editar un producto

1. En la lista, clic en **Editar** (icono lápiz) del producto.
2. Cambia lo que necesites.
3. Botón **Guardar cambios**.

Los cambios se reflejan al instante.

---

## 📸 Subir o cambiar la foto

Dentro del formulario, sección **Foto del producto**:

- **Subir foto** — clic en el botón y elige el archivo de tu computadora.
- **Reemplazar** — sube una nueva, sustituye la anterior.
- **Quitar** — elimina la foto (el producto queda con un icono de placeholder).

**Recomendaciones**:
- Tamaño 1200×900 px o más.
- Formato JPG o WebP.
- Peso < 500 KB.
- Fondo claro, producto centrado.

---

## 💲 Cambiar precio

1. Edita el producto.
2. Cambia el campo **Precio (USD)** (número, sin símbolos).
3. Guardar cambios.

Para que aparezca **"Consultar precio"** en la web, deja el campo **vacío**.

---

## 🔴 Marcar como Vendido o Agotado

1. Edita el producto.
2. En **Estado**, elige *Vendido* o *Agotado*.
3. Guardar cambios.

En la web verás:

- **Vendido** → badge rojo "Vendido" + foto en blanco y negro.
- **Agotado** → badge ámbar "Agotado" + foto atenuada.
- El botón de WhatsApp cambia a *"Preguntar por modelo similar"*.

> Si el producto regresa al stock, edita y vuélvelo a poner como *Disponible*.

---

## 🌟 Hacer destacado

Edita el producto → activa **Destacado** → Guardar.

En la web aparece antes que los productos no destacados. Si tienes varios destacados, puedes ordenarlos con el campo **Orden manual** (menor = aparece antes).

---

## 🚚 Activar / Desactivar "Entrega disponible"

Edita el producto → toggle **Entrega disponible**.

Si está activo, en la card de la web aparece la pill "Entrega disponible". Si lo desactivas, no aparece.

---

## 🗑 Eliminar un producto

1. En la lista, clic en **Borrar** (icono papelera).
2. Confirma en el aviso.
3. Listo, desaparece de la web.

⚠️ **Es permanente**. Si solo quieres ocultarlo temporalmente, mejor márcalo como **Vendido** o **Agotado**.

---

## 🔄 Orden de productos en la web pública

La web siempre muestra los productos en este orden:

1. **Disponibles primero** (los Vendido y Agotado bajan).
2. Dentro de los disponibles, **los Destacados** primero.
3. Dentro de cada grupo, ordenados por **Orden manual** (menor primero).
4. Si todo lo anterior empata, los más recientes primero.

---

## 🚪 Cerrar sesión

Botón **Salir** arriba a la derecha del panel. Volverás a la pantalla de login.

Tu sesión también se cierra sola si no usas el panel durante un tiempo largo.

---

## ❓ Problemas comunes

**No puedo entrar / la contraseña no funciona**
Contacta a tu desarrollador. Puede resetearte la contraseña desde el panel de Supabase.

**Subí una foto y no se ve**
Espera unos segundos y refresca. Si sigue sin verse, comprueba que el archivo sea una imagen (JPG / PNG / WebP) y pese menos de 5 MB.

**Cambié algo y la web no se actualiza**
Refresca la página de la web con `Ctrl + F5` (o `Cmd + Shift + R` en Mac). El navegador a veces cachea.

**Borré un producto sin querer**
Lamentablemente la eliminación es permanente. Crea uno nuevo con los mismos datos.

---

## 🆘 Soporte

Si algo no funciona como esperas, contacta a tu desarrollador. Antes de hacerlo:

1. Anota qué intentaste hacer y qué pasó.
2. Si hay un mensaje de error, hazle captura de pantalla.
3. Indica si fue desde móvil o computadora.
