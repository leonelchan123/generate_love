# 🚀 Guía de Deploy: GitHub + Vercel

Esta guía te explica cómo subir el proyecto a GitHub y conectarlo con Vercel para deploy automático.

## 📋 Pasos para Deploy

### 1️⃣ **Preparar el Repositorio Local**

```bash
# Navegar a la carpeta del proyecto
cd "c:\Users\USER\Documents\Documentos Leo\Bot WhatsApp\LeoBot\generate_image_vercel"

# Inicializar Git
git init

# Agregar todos los archivos
git add .

# Primer commit
git commit -m "🎉 Initial commit: Love Meter API"
```

### 2️⃣ **Crear Repositorio en GitHub**

1. Ve a [GitHub.com](https://github.com)
2. Click en **"New repository"**
3. Nombre sugerido: `love-meter-api`
4. Descripción: `API serverless para generar imágenes de medidor de amor`
5. Público o Privado (tu elección)
6. **NO** marcar "Add README" (ya tenemos uno)
7. Click **"Create repository"**

### 3️⃣ **Conectar Local con GitHub**

```bash
# Agregar el remote origin (reemplaza TU_USUARIO)
git remote add origin https://github.com/TU_USUARIO/love-meter-api.git

# Subir el código
git branch -M main
git push -u origin main
```

### 4️⃣ **Deploy en Vercel**

#### Opción A: Deploy Automático
1. Ve a [vercel.com](https://vercel.com)
2. Click **"New Project"**
3. **"Import Git Repository"**
4. Selecciona tu repositorio `love-meter-api`
5. **Framework Preset**: Other
6. **Root Directory**: `./` (raíz)
7. Click **"Deploy"** 🚀

#### Opción B: Deploy con CLI
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login en Vercel
vercel login

# Deploy
vercel --prod
```

### 5️⃣ **Obtener URL y Configurar Bot**

1. **Copia tu URL de Vercel**: `https://tu-proyecto.vercel.app`

2. **Actualiza el bot** en `fun-medidor.js`:
```javascript
const IMAGE_CONFIG = {
    method: 'vercel',  // ✅ Cambiar a vercel
    vercelUrl: 'https://tu-proyecto.vercel.app'  // ✅ Tu URL real
}
```

## 🔄 **Workflow de Desarrollo**

### Deploy Automático
Cada vez que hagas `git push` a la rama `main`, Vercel automáticamente:
1. ✅ Detecta los cambios
2. ✅ Ejecuta el build
3. ✅ Despliega la nueva versión
4. ✅ Te notifica el resultado

### Comandos Útiles
```bash
# Ver status del repositorio
git status

# Agregar cambios
git add .

# Commit con mensaje
git commit -m "✨ Mejora en la generación de imágenes"

# Subir cambios (deploy automático)
git push origin main

# Ver logs de Vercel
vercel logs

# Ver información del proyecto
vercel ls
```

## 🌟 **Ventajas de GitHub + Vercel**

### ✅ **Deploy Automático**
- Push → Deploy automático
- Sin configuración manual
- Rollback fácil

### ✅ **Colaboración**
- Issues y Pull Requests
- Historial de cambios
- Múltiples colaboradores

### ✅ **Monitoreo**
- Analytics automáticos
- Logs en tiempo real
- Métricas de performance

### ✅ **Escalabilidad**
- CDN global automático
- Auto-scaling
- 99.9% uptime

## 🔧 **Configuración Avanzada**

### Variables de Entorno (si necesitas)
```bash
# En Vercel Dashboard
vercel env add VARIABLE_NAME
```

### Custom Domain
```bash
# Agregar dominio personalizado
vercel domains add tu-dominio.com
```

### Preview Deployments
- Cada PR crea un preview automático
- URL temporal para testing
- Merge → Deploy a producción

## 🚨 **Troubleshooting**

### Error: "Repository not found"
```bash
# Verificar remote
git remote -v

# Corregir URL
git remote set-url origin https://github.com/TU_USUARIO/love-meter-api.git
```

### Error: "Build failed"
```bash
# Ver logs detallados
vercel logs --follow

# Verificar package.json
npm install
npm test
```

### Error: "Function timeout"
- Vercel tiene límite de 10s en plan gratuito
- Optimizar imágenes más pequeñas
- Considerar plan Pro si necesario

## 📊 **Monitoreo Post-Deploy**

### Métricas Importantes
- **Response Time**: < 3 segundos
- **Success Rate**: > 99%
- **Memory Usage**: < 512MB
- **Invocations**: Según tu uso

### Alertas Recomendadas
- Errores > 5% en 5 minutos
- Response time > 10 segundos
- Memory usage > 80%

---

## 🎯 **Resultado Final**

Tendrás:
- ✅ Repositorio en GitHub
- ✅ Deploy automático en Vercel
- ✅ URL pública funcionando
- ✅ Bot configurado y funcionando
- ✅ Monitoreo automático

**¡Tu API estará lista para producción!** 🚀