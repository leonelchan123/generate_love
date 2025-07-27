# 💕 Love Meter API - Vercel

API serverless para generar imágenes de medidor de amor usando Puppeteer y HTML Canvas.

## 🚀 Deploy en Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/TU_USUARIO/love-meter-api)

## 📋 Características

- ✅ **Serverless**: Optimizado para Vercel
- 🎨 **Personalizable**: Acepta URLs de imágenes de perfil
- 📱 **Responsive**: Imágenes de 400x400px optimizadas
- 🔄 **Fallback**: Imagen por defecto cuando no hay foto de perfil
- ⚡ **Rápido**: Generación de imágenes en menos de 3 segundos

## 🛠️ Instalación Local

```bash
# Clonar repositorio
git clone https://github.com/TU_USUARIO/love-meter-api.git
cd love-meter-api

# Instalar dependencias
npm install

# Ejecutar localmente
vercel dev
```

## 📡 API Endpoint

### POST `/api/generate`

Genera una imagen de medidor de amor.

#### Parámetros:

```json
{
  "senderName": "Juan",
  "targetName": "María",
  "senderImage": "https://ejemplo.com/foto1.jpg",
  "targetImage": "https://ejemplo.com/foto2.jpg"
}
```

#### Respuesta:

```json
{
  "success": true,
  "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
}
```

## 🔧 Configuración

### Variables de Entorno (Opcional)

```env
# No se requieren variables de entorno adicionales
```

### Vercel Configuration

El proyecto incluye `vercel.json` con la configuración optimizada:

- **Memoria**: 1024 MB
- **Timeout**: 30 segundos
- **CORS**: Habilitado para todos los orígenes

## 📱 Uso con WhatsApp Bot

```javascript
// En tu bot de WhatsApp
const response = await fetch('https://tu-proyecto.vercel.app/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    senderName: 'Juan',
    targetName: 'María',
    senderImage: 'https://ejemplo.com/foto1.jpg',
    targetImage: 'https://ejemplo.com/foto2.jpg'
  })
});

const data = await response.json();
// data.image contiene la imagen en base64
```

## 🏗️ Estructura del Proyecto

```
├── api/
│   └── generate.js          # Endpoint principal
├── public/
│   ├── background_create.html  # Template HTML
│   └── profile_icon.png     # Imagen por defecto
├── package.json
├── vercel.json
└── README.md
```

## 🚀 Deploy Automático

1. **Fork este repositorio**
2. **Conecta con Vercel**:
   - Ve a [vercel.com](https://vercel.com)
   - Conecta tu cuenta de GitHub
   - Importa este repositorio
   - Deploy automático ✅

3. **Obtén tu URL**:
   ```
   https://tu-proyecto.vercel.app
   ```

## 🔍 Monitoreo

- **Logs**: Disponibles en Vercel Dashboard
- **Analytics**: Métricas de uso automáticas
- **Errores**: Notificaciones en tiempo real

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -am 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📄 Licencia

MIT License - ve el archivo [LICENSE](LICENSE) para más detalles.

## 🆘 Soporte

- **Issues**: [GitHub Issues](https://github.com/TU_USUARIO/love-meter-api/issues)
- **Documentación**: [Vercel Docs](https://vercel.com/docs)

---

⭐ **¡Dale una estrella si te gusta el proyecto!** ⭐