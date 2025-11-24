# Escáner Industrial PWA

Aplicación web progresiva (PWA) diseñada para entornos de fábrica y almacén. Permite digitalizar etiquetas físicas mediante la cámara, extraer datos (Referencia, Longitud, Cantidad) y recortes de dibujos técnicos usando IA (Google Gemini), y generar reportes PDF.

## Características

- **Estilo Industrial Oscuro:** Diseño de alto contraste para entornos con poca luz.
- **IA Integrada:** Usa Google Gemini Vision para leer etiquetas y detectar planos técnicos.
- **Edición de Imagen:** Herramienta de recorte manual y rotación.
- **Historial Local:** Guarda los escaneos en el navegador (LocalStorage).
- **Exportación:** Generación de PDFs y copias de seguridad en JSON.

## Requisitos Previos

1. **Node.js:** Debes tener instalado Node.js (v18 o superior). [Descargar aquí](https://nodejs.org/).
2. **API Key:** Necesitas una Clave API de Google Gemini. Consíguela gratis en [Google AI Studio](https://aistudio.google.com/).

## Instalación y Uso (Local en VS Code)

1. **Instalar dependencias**
   Abre la terminal en la carpeta del proyecto y ejecuta:
   ```bash
   npm install
   ```

2. **Configurar Variables de Entorno**
   El archivo `.env` no se incluye en el repositorio por seguridad. Debes crearlo tú mismo:
   
   - Crea un archivo llamado `.env` en la raíz del proyecto (junto al package.json).
   - Ábrelo y escribe lo siguiente (reemplazando el texto por tu clave real):
     ```env
     API_KEY=tu_clave_api_de_google_aqui
     ```

3. **Iniciar el Servidor de Desarrollo**
   ```bash
   npm run dev
   ```
   Abre la URL que aparece en la consola (normalmente `http://localhost:5173`).

## 📱 Cómo acceder desde el móvil (Despliegue)

Para usar la App en tu móvil sin estar conectado al ordenador, necesitas publicarla en Internet. Recomendamos **Vercel** (es gratis y seguro).

### 1. Subir a GitHub
Si aún no lo has hecho:
1. Crea un nuevo repositorio vacío en [GitHub](https://github.com).
2. Sube los archivos de tu proyecto usando la terminal de VS Code:
   ```bash
   git init
   git add .
   git commit -m "Versión inicial"
   git branch -M main
   git remote add origin <URL_DE_TU_REPO_GITHUB>
   git push -u origin main
   ```

### 2. Publicar en Vercel
1. Crea una cuenta en [Vercel](https://vercel.com).
2. Haz clic en **"Add New Project"** e importa tu repositorio de GitHub.
3. **MUY IMPORTANTE:** En la pantalla de configuración ("Configure Project"), busca la sección **"Environment Variables"**:
   - En **Key** escribe: `API_KEY`
   - En **Value** pega tu clave de Google Gemini.
   - Haz clic en **Add**.
4. Haz clic en **Deploy**.

### 3. Instalar en el Móvil
1. Cuando Vercel termine, te dará una URL (ej. `mi-escaner.vercel.app`).
2. Abre esa URL en tu móvil (Chrome en Android o Safari en iPhone).
3. Abre el menú del navegador y selecciona **"Instalar aplicación"** o **"Añadir a pantalla de inicio"**.
4. ¡Listo! Ahora funciona como una App nativa a pantalla completa.

## Estructura del Proyecto

- `/components`: Componentes de la interfaz (Escáner, Historial, Admin).
- `/services`: Lógica de negocio (Gemini AI, PDF, Almacenamiento).
- `/types`: Definiciones de tipos de datos (TypeScript).

## Construir para Producción

Para generar la versión optimizada manualmente:

```bash
npm run build
```# delfin_git_11
# delfin_git_11
