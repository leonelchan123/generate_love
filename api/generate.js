const puppeteer = require('puppeteer-core');
const chromium = require('chrome-aws-lambda');
const { readFileSync } = require('fs');
const { join } = require('path');

// Configuración para desarrollo local vs Vercel
const isDev = process.env.NODE_ENV === 'development';
const isVercel = process.env.VERCEL === '1';

module.exports = async (req, res) => {
    // Configurar CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ 
            success: false, 
            error: 'Method not allowed. Use POST.' 
        });
    }

    const { 
        percentage, 
        senderName, 
        targetName, 
        senderImage, 
        targetImage, 
        author 
    } = req.body;

    // Validar parámetros requeridos
    if (percentage === undefined || !senderName || !targetName) {
        return res.status(400).json({
            success: false,
            error: 'Missing required parameters: percentage, senderName, targetName'
        });
    }

    let browser = null;

    try {
        console.log('🚀 Iniciando generación de imagen...');
        console.log('📊 Datos recibidos:', { percentage, senderName, targetName, author });

        // Configurar Puppeteer para Vercel
        const browserConfig = {
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--disable-gpu',
                '--single-process',
                '--disable-background-timer-throttling',
                '--disable-backgrounding-occluded-windows',
                '--disable-renderer-backgrounding'
            ],
            defaultViewport: {
                width: 500,
                height: 500,
                deviceScaleFactor: 2
            },
            headless: true,
        };

        // Configuración específica para Vercel
        if (isVercel) {
            browserConfig.args = [...browserConfig.args, ...chromium.args];
            browserConfig.executablePath = await chromium.executablePath;
            browserConfig.headless = chromium.headless;
        } else {
            // Para desarrollo local, usar Puppeteer normal
            browserConfig.executablePath = process.env.CHROME_EXECUTABLE_PATH || undefined;
        }

        browser = await puppeteer.launch(browserConfig);

        const page = await browser.newPage();

        // Leer el archivo HTML
        const htmlPath = join(process.cwd(), 'public', 'background_create.html');
        const htmlContent = readFileSync(htmlPath, 'utf8');

        // Inyectar JavaScript para inicializar con los datos
        const initScript = `
            <script>
                window.addEventListener('load', function() {
                    console.log('🎨 Inicializando Love Meter...');
                    const data = {
                        percentage: ${percentage},
                        senderName: "${senderName.replace(/"/g, '\\"')}",
                        targetName: "${targetName.replace(/"/g, '\\"')}",
                        senderImage: ${senderImage ? `"${senderImage}"` : 'null'},
                        targetImage: ${targetImage ? `"${targetImage}"` : 'null'},
                        author: "${(author || 'LeoBot').replace(/"/g, '\\"')}"
                    };
                    console.log('📊 Datos para renderizar:', data);
                    updateLoveMeter(data);
                    console.log('✅ Love Meter inicializado');
                });
            </script>
        `;

        // Insertar el script antes del cierre del body
        const finalHtml = htmlContent.replace('</body>', initScript + '</body>');

        // Cargar el HTML modificado
        await page.setContent(finalHtml, {
            waitUntil: 'networkidle0',
            timeout: 30000
        });

        console.log('📄 HTML cargado correctamente');

        // Esperar a que se cargue todo
        await page.waitForTimeout(3000);

        // Verificar que el elemento existe
        const element = await page.$('.love-card');
        if (!element) {
            throw new Error('No se encontró el elemento .love-card');
        }

        console.log('🎯 Elemento .love-card encontrado, generando screenshot...');

        // Generar screenshot
        const imageBuffer = await element.screenshot({
            type: 'png',
            omitBackground: false,
            clip: {
                x: 0,
                y: 0,
                width: 400,
                height: 400
            }
        });

        console.log('📸 Screenshot generado exitosamente');

        // Retornar imagen como base64
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({
            success: true,
            image: `data:image/png;base64,${imageBuffer.toString('base64')}`,
            message: 'Imagen generada exitosamente'
        });

    } catch (error) {
        console.error('❌ Error generando imagen:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    } finally {
        if (browser) {
            await browser.close();
            console.log('🔒 Browser cerrado');
        }
    }
}