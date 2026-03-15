# 🦷 HEALTHY DENTI — Landing Page Premium

> **Tagline:** Sonreír es la magia que hay en ti  
> **Sector:** Salud / Clínica Dental  
> **Tipo:** Corporativa  
> **Color principal:** Azul Eléctrico `#3B82F6`

---

## 📁 Estructura del Proyecto

```
HEALTHY_DENTI/
├── index.html          ← Página principal
├── styles.css          ← Estilos completos (Dark Luxury Dental)
├── script.js           ← Interactividad y animaciones
├── README.md           ← Este archivo
└── images/
    ├── logo.png             ← Logo principal (512×512)
    ├── hero_visual.png      ← Visual 3D del hero (1200×1200)
    ├── service_1.png        ← Odontología General
    ├── service_2.png        ← Blanqueamiento Dental
    ├── service_3.png        ← Ortodoncia / Invisalign
    ├── service_4.png        ← Implantes Dentales
    ├── service_5.png        ← Odontopediatría
    ├── service_6.png        ← Diagnóstico Digital 3D
    └── about_image.png      ← Interior / Equipo de la clínica
```

---

## 🎨 Paleta de Colores

| Variable           | Valor HEX  | Uso                        |
|--------------------|------------|----------------------------|
| `--primary-400`    | `#60A5FA`  | Texto de acento, hover     |
| `--primary-500`    | `#3B82F6`  | Color base principal       |
| `--primary-600`    | `#2563EB`  | Botones activos            |
| `--primary-700`    | `#1D4ED8`  | Gradientes profundos       |
| `--bg-primary`     | `#000000`  | Fondo negro puro           |
| `--bg-secondary`   | `#09090B`  | Fondo alternativo          |
| `--bg-tertiary`    | `#18181B`  | Cards                      |
| `--text-primary`   | `#FFFFFF`  | Texto principal            |
| `--text-tertiary`  | `#A1A1AA`  | Texto secundario           |

---

## 🖼️ Imágenes Necesarias

Coloca las imágenes en la carpeta `/images/`. El código tiene fallbacks SVG/SVG premium en caso de que no existan.

| Archivo              | Dimensiones recomendadas | Uso                    |
|----------------------|--------------------------|------------------------|
| `logo.png`           | 512×512 (PNG transparente)| Navbar + Footer       |
| `hero_visual.png`    | 1200×1200                | Sección Hero           |
| `service_1.png`      | 800×600                  | Flip card - General    |
| `service_2.png`      | 800×600                  | Flip card - Blanqueo   |
| `service_3.png`      | 800×600                  | Flip card - Ortodoncia |
| `service_4.png`      | 800×600                  | Flip card - Implantes  |
| `service_5.png`      | 800×600                  | Flip card - Pedodontia |
| `service_6.png`      | 800×600                  | Flip card - Rx 3D      |
| `about_image.png`    | 900×600                  | Sección Nosotros       |

---

## ✨ Características

- **Dark Luxury Dental** – Modo oscuro premium con glassmorphism
- **50 partículas flotantes** animadas en el fondo
- **Flip Cards 3D** para servicios (hover en desktop, tap en móvil)
- **Counters animados** para estadísticas
- **Testimonials carousel** con auto-play y swipe táctil
- **Intersection Observer** para animaciones de scroll
- **Navbar sticky** con blur al hacer scroll
- **Formulario de contacto** con validación y feedback
- **100% Responsive** (Mobile, Tablet, Desktop, XL)
- **Menú hamburguesa** en móvil
- **Tipografía:** Plus Jakarta Sans + Inter (Google Fonts)

---

## 🔧 Personalización

### Cambiar datos de contacto
En `index.html`, busca y reemplaza:
```
+1 (234) 567-890     → Tu teléfono real
info@healthydenti.com → Tu email real
Av. Principal 123    → Tu dirección real
```

### Cambiar color principal
En `styles.css`, línea ~15:
```css
--primary-500: #3B82F6;  /* ← Cambia este HEX */
```

### Agregar imágenes reales
Simplemente coloca los archivos en la carpeta `/images/` con los nombres indicados arriba. Los fallbacks SVG desaparecerán automáticamente.

---

## 🚀 Cómo usar

1. Abre `index.html` directamente en tu navegador
2. O usa un servidor local: `npx serve .`
3. Compatible con todos los navegadores modernos

---

## 📋 Secciones incluidas

1. **Hero** — Título, tagline, CTAs y estadísticas
2. **Credibilidad** — Certificaciones y tecnologías
3. **Servicios** — 6 flip cards interactivas
4. **Nosotros** — Historia, valores e imagen  
5. **Resultados** — Métricas animadas
6. **Testimonios** — Carousel de 4 opiniones
7. **Equipo** — 3 especialistas destacados
8. **CTA Final** — Llamada a la acción
9. **Contacto** — Información + formulario de cita
10. **Footer** — Links, redes sociales y legal

---

*© 2026 HEALTHY DENTI. "Sonreír es la magia que hay en ti."*
