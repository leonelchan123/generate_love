# 🚀 Love Meter Generator - Vercel API

Este proyecto contiene la API de Vercel para generar imágenes del medidor de amor para tu bot de WhatsApp.

## 📁 Estructura del Proyecto

```
generate-love-vercel/
├── api/
│   └── generate.js          # Función API principal
├── public/
│   └── background_create.html # Template HTML para las imágenes
├── package.json             # Dependencias del proyecto
├── vercel.json             # Configuración de Vercel
└── README.md               # Este archivo
```

## 🔧 Cómo Subir a GitHub y Vercel

### 1. Crear Repositorio en GitHub

1. Ve a [GitHub](https://github.com) y crea un nuevo repositorio
2. Nómbralo: `love-meter-generator` o similar
3. Hazlo público o privado (tu elección)
4. **NO** inicialices con README, .gitignore o licencia

### 2. Subir el Código

Abre PowerShell en esta carpeta y ejecuta:

```bash
# Inicializar git
git init

# Agregar todos los archivos
git add .

# Hacer commit
git commit -m "Initial commit: Love meter generator API"

# Conectar con tu repositorio (reemplaza con tu URL)
git remote add origin https://github.com/TU_USUARIO/love-meter-generator.git

# Subir a GitHub
git push -u origin main
```

### 3. Desplegar en Vercel

1. Ve a [Vercel](https://vercel.com)
2. Haz clic en "New Project"
3. Conecta tu cuenta de GitHub
4. Selecciona el repositorio `love-meter-generator`
5. Haz clic en "Deploy"

### 4. Configurar Variables de Entorno (Opcional)

En el dashboard de Vercel:
- Ve a Settings → Environment Variables
- Agrega cualquier variable que necesites

## 🎯 Endpoint de la API

Una vez desplegado, tu API estará disponible en:
```
https://tu-proyecto.vercel.app/api/generate
```

### Ejemplo de Uso

```javascript
const response = await fetch('https://tu-proyecto.vercel.app/api/generate', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        senderName: 'Juan',
        targetName: 'María',
        percentage: 85,
        senderImage: 'https://ejemplo.com/imagen1.jpg', // Opcional
        targetImage: 'https://ejemplo.com/imagen2.jpg', // Opcional
        author: 'Bot-Esponja' // Opcional
    })
});

const result = await response.json();
if (result.success) {
    // result.image contiene la imagen en base64
    console.log('Imagen generada:', result.image);
}
```

## 🔄 Actualizar el Código

Para actualizar el código después de cambios:

```bash
git add .
git commit -m "Descripción de los cambios"
git push
```

Vercel automáticamente redespliegará tu proyecto.

## 🐛 Debugging

- Ve al dashboard de Vercel → Functions → View Function Logs
- Revisa los logs en tiempo real para detectar errores
- Usa `console.log()` en tu código para debugging

## 📝 Notas Importantes

- El proyecto usa Puppeteer con Chrome AWS Lambda para Vercel
- Las imágenes se generan en formato PNG con base64
- El timeout máximo es de 30 segundos
- La memoria asignada es de 1024MB

## 🎨 Personalización

Para personalizar el diseño:
1. Edita `public/background_create.html`
2. Modifica los estilos CSS
3. Haz commit y push para actualizar

¡Listo! Tu API estará funcionando en Vercel. 🚀