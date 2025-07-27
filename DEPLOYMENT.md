# 🚀 Instrucciones de Despliegue - Love Meter Vercel

## 📋 Pasos para Configurar

### 1. Preparar el Proyecto Vercel

```bash
# Navegar a la carpeta del proyecto Vercel
cd "c:\Users\USER\Documents\Documentos Leo\Bot WhatsApp\LeoBot\generate_image_vercel"

# Instalar dependencias
npm install

# Inicializar Vercel (si no tienes cuenta, créala en vercel.com)
npx vercel login
npx vercel
```

### 2. Configurar el Bot

Una vez que tengas tu URL de Vercel, edita el archivo `plugins/fun-medidor.js`:

```javascript
// ⚙️ CONFIGURACIÓN DEL GENERADOR DE IMÁGENES
const IMAGE_CONFIG = {
    // Cambiar a 'vercel' para usar Vercel API
    method: 'vercel', // 'local' | 'vercel'
    
    // Reemplazar con tu URL real de Vercel
    vercelUrl: 'https://tu-proyecto-real.vercel.app'
}
```

### 3. Comandos Útiles

```bash
# Desplegar a producción
npx vercel --prod

# Ver logs en tiempo real
npx vercel logs

# Ver información del proyecto
npx vercel ls
```

## 🔧 Configuración Actual

### Método Local (Actual)
- ✅ Funciona con Puppeteer local
- ✅ No requiere internet para generar imágenes
- ❌ Consume más recursos del servidor
- ❌ Puede ser más lento

### Método Vercel (Nuevo)
- ✅ Más rápido y eficiente
- ✅ Menor consumo de recursos locales
- ✅ Escalable y confiable
- ❌ Requiere conexión a internet
- ❌ Requiere configuración inicial

## 🎯 Ventajas del Método Vercel

1. **Performance**: Vercel está optimizado para funciones serverless
2. **Escalabilidad**: Maneja múltiples requests simultáneos
3. **Confiabilidad**: Infraestructura robusta de Vercel
4. **Mantenimiento**: Menos carga en tu servidor principal
5. **CDN**: Imágenes servidas desde CDN global

## 🔄 Cambiar Entre Métodos

Para cambiar entre local y Vercel, simplemente modifica la configuración:

```javascript
// Para usar método local
const IMAGE_CONFIG = {
    method: 'local'
}

// Para usar método Vercel
const IMAGE_CONFIG = {
    method: 'vercel',
    vercelUrl: 'https://tu-proyecto.vercel.app'
}
```

## 🐛 Troubleshooting

### Error: "fetch is not defined"
- Asegúrate de tener Node.js 18+ o instala `node-fetch`

### Error: "Vercel API timeout"
- Verifica que tu URL de Vercel sea correcta
- Revisa los logs de Vercel con `npx vercel logs`

### Error: "profile_icon.png not found"
- Asegúrate de que `profile_icon.png` esté en la carpeta `public/`

## 📊 Monitoreo

Puedes monitorear el uso de tu API en:
- Dashboard de Vercel: https://vercel.com/dashboard
- Logs en tiempo real: `npx vercel logs`
- Analytics: Panel de Vercel

## 💡 Próximos Pasos

1. Desplegar en Vercel
2. Actualizar la configuración del bot
3. Probar ambos métodos
4. Elegir el que mejor funcione para tu caso de uso

¡Listo para generar imágenes de amor súper rápidas! 💕