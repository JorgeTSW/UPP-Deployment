# ☁️ Cloud Gallery — Demo CI/CD con GitHub Actions

> Proyecto demo para **Cómputo en la Nube** · Ingeniería en Desarrollo de Software · UPP 8vo semestre

Una galería de imágenes web desplegada automáticamente en **GitHub Pages** cada vez que se hace un `push` a `main`, usando un pipeline **CI/CD** con GitHub Actions.

---

## 🚀 ¿Cómo funciona el pipeline?

```
git push → GitHub Actions → Validación → Build → Deploy a GitHub Pages
```

El archivo `.github/workflows/deploy.yml` define 3 jobs encadenados:

| Job | Qué hace |
|-----|----------|
| `lint-and-test` | Verifica que `index.html` existe y tiene estructura válida |
| `build` | Prepara los archivos estáticos y los empaqueta |
| `deploy` | Publica en GitHub Pages automáticamente |

---

## 📦 Cómo usar esta demo (fork & deploy en 5 minutos)

### 1. Haz fork del repositorio
Botón **Fork** arriba a la derecha en GitHub.

### 2. Habilita GitHub Pages con Actions
- Ve a tu repo → **Settings** → **Pages**
- En *Source* selecciona **GitHub Actions**
- Guarda

### 3. Haz cualquier cambio y push
```bash
git clone https://github.com/TU-USUARIO/cloud-gallery
cd cloud-gallery

# Edita index.html como quieras
echo "<!-- mi cambio -->" >> index.html

git add .
git commit -m "feat: mi primera contribución"
git push origin main
```

### 4. Observa el pipeline en Actions
- Ve a la pestaña **Actions** en tu repo
- Verás los 3 jobs ejecutándose en tiempo real
- En ~1 minuto tu app estará en: `https://TU-USUARIO.github.io/cloud-gallery`

---

## 🧩 Estructura del proyecto

```
cloud-gallery/
├── index.html                    # La webapp completa (HTML + CSS + JS)
├── README.md                     # Este archivo
└── .github/
    └── workflows/
        └── deploy.yml            # Pipeline CI/CD
```

---

## ✨ Funcionalidades de la galería

- 📤 **Upload por clic o drag & drop** — múltiples imágenes a la vez
- 🔖 **Filtrado por tipo** (PNG, JPEG, GIF, WebP)
- ⊞ **Vista cuadrícula / lista** intercambiable
- 🔍 **Lightbox** al hacer clic en una imagen
- 🗑 **Eliminar imágenes** individualmente
- 💾 **Persistencia** con localStorage (las imágenes se mantienen al recargar)
- 📱 **Responsive** — funciona en móvil y escritorio

---

## 🔧 Cómo extender este proyecto

### Agregar variables de entorno
```yaml
# En deploy.yml, dentro de un step:
env:
  MI_VARIABLE: ${{ secrets.MI_SECRET }}
```

### Agregar un step de tests
```yaml
- name: Ejecutar tests
  run: npm test
```

### Desplegar a otro servicio (Netlify, Vercel, etc.)
Reemplaza el job `deploy` con el action correspondiente del proveedor.

---

## 📚 Conceptos de Cloud aplicados

| Concepto | Dónde se aplica |
|----------|----------------|
| **CI/CD** | GitHub Actions pipeline automático |
| **IaC** | El `deploy.yml` es infraestructura como código |
| **SaaS** | GitHub Pages como plataforma de hosting |
| **PaaS** | GitHub Actions como plataforma de ejecución |
| **Despliegue continuo** | Cada `push` a `main` dispara el deploy |

---

## 👥 Equipo

| Nombre | Rol |
|--------|-----|
| — | Agrega tu nombre aquí |

---

*Materia: Cómputo en la Nube · UPP · Enero–Junio 2025*
