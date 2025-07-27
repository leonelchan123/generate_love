const puppeteer = require('puppeteer-core');
const chrome = require('chrome-aws-lambda');
const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
    // Configurar CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ 
            success: false, 
            error: 'Método no permitido. Usa POST.' 
        });
    }

    try {
        const { 
            senderName, 
            targetName, 
            percentage, 
            senderImage, 
            targetImage, 
            author = 'Bot-Esponja' 
        } = req.body;

        // Validar datos requeridos
        if (!senderName || !targetName || percentage === undefined) {
            return res.status(400).json({
                success: false,
                error: 'Faltan datos requeridos: senderName, targetName, percentage'
            });
        }

        console.log('🚀 Iniciando generación de imagen...');
        console.log('📊 Datos recibidos:', { senderName, targetName, percentage, author });

        // Configuración de Puppeteer para Vercel
        const browser = await puppeteer.launch({
            args: chrome.args,
            defaultViewport: chrome.defaultViewport,
            executablePath: await chrome.executablePath,
            headless: chrome.headless,
            ignoreHTTPSErrors: true,
        });

        const page = await browser.newPage();

        // Leer el archivo HTML template
        const htmlPath = path.join(process.cwd(), 'public', 'background_create.html');
        let htmlContent;
        
        try {
            htmlContent = fs.readFileSync(htmlPath, 'utf8');
        } catch (error) {
            console.error('❌ Error leyendo HTML template:', error);
            await browser.close();
            return res.status(500).json({
                success: false,
                error: 'Template HTML no encontrado'
            });
        }

        // Configurar el viewport para la imagen
        await page.setViewport({ 
            width: 520, 
            height: 310,
            deviceScaleFactor: 2 
        });

        // Cargar el HTML
        await page.setContent(htmlContent, { 
            waitUntil: 'networkidle0',
            timeout: 30000 
        });

        // Ejecutar JavaScript para actualizar los datos
        await page.evaluate((data) => {
            // Función para obtener el mensaje según el porcentaje
            function getPercentageMessage(percentage) {
                if (percentage >= 90) return "💖 ¡AMOR ETERNO!";
                if (percentage >= 80) return "💕 ¡SÚPER COMPATIBLES!";
                if (percentage >= 70) return "💘 ¡MUY BUENA CONEXIÓN!";
                if (percentage >= 60) return "💓 BUENA COMPATIBILIDAD";
                if (percentage >= 50) return "💟 COMPATIBILIDAD PROMEDIO";
                if (percentage >= 40) return "💔 MEJOR COMO AMIGOS";
                if (percentage >= 30) return "😅 SOLO AMIGOS";
                if (percentage >= 20) return "😬 MEJOR COMO CONOCIDOS";
                if (percentage >= 10) return "😐 POCA CONEXIÓN";
                return "😂 ¡CERO QUÍMICA!";
            }

            // Función para truncar nombres largos
            function truncateName(name, maxLength = 15) {
                if (name.length <= maxLength) return name;
                return name.substring(0, maxLength - 3) + '...';
            }

            // Actualizar porcentaje
            document.getElementById('percentage').textContent = data.percentage + '%';
            
            // Actualizar mensaje según porcentaje
            document.getElementById('percentageMessage').textContent = getPercentageMessage(data.percentage);
            
            // Actualizar nombres (truncados si son muy largos)
            document.getElementById('leftText').textContent = truncateName(data.senderName);
            document.getElementById('rightText').textContent = truncateName(data.targetName);
            
            // Actualizar imágenes de perfil
            const leftProfile = document.getElementById('leftProfile');
            const rightProfile = document.getElementById('rightProfile');
            
            if (data.senderImage) {
                leftProfile.style.backgroundImage = `url('${data.senderImage}')`;
                leftProfile.style.backgroundSize = 'cover';
                leftProfile.style.backgroundPosition = 'center';
                leftProfile.style.backgroundRepeat = 'no-repeat';
                leftProfile.style.backgroundColor = 'white';
            } else {
                // Fallback para imagen por defecto
                leftProfile.style.backgroundColor = '#e0e0e0';
                leftProfile.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; font-size: 40px; color: #999;">👤</div>';
            }
            
            if (data.targetImage) {
                rightProfile.style.backgroundImage = `url('${data.targetImage}')`;
                rightProfile.style.backgroundSize = 'cover';
                rightProfile.style.backgroundPosition = 'center';
                rightProfile.style.backgroundRepeat = 'no-repeat';
                rightProfile.style.backgroundColor = 'white';
            } else {
                // Fallback para imagen por defecto
                rightProfile.style.backgroundColor = '#e0e0e0';
                rightProfile.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; font-size: 40px; color: #999;">👤</div>';
            }
            
            // Actualizar autor
            if (data.author) {
                document.getElementById('authorText').textContent = data.author;
            }
        }, { senderName, targetName, percentage, senderImage, targetImage, author });

        // Esperar un momento para que se rendericen los cambios
        await page.waitForTimeout(1000);

        // Tomar screenshot del elemento específico
        const element = await page.$('.love-card');
        const screenshot = await element.screenshot({
            type: 'png',
            encoding: 'base64'
        });

        await browser.close();

        console.log('✅ Imagen generada exitosamente');

        // Retornar la imagen en base64
        return res.status(200).json({
            success: true,
            image: screenshot,
            data: {
                senderName,
                targetName,
                percentage,
                author
            }
        });

    } catch (error) {
        console.error('❌ Error generando imagen:', error);
        
        return res.status(500).json({
            success: false,
            error: 'Error interno del servidor',
            details: error.message
        });
    }
};