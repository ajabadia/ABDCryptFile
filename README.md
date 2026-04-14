# 🛡️ ABDFN Encryptor Web (v2.0)

**Seguridad de Grado Militar con Alma de 8 Bits.**

ABDFN Encryptor es una herramienta de encriptación de archivos masiva, diseñada para ser **100% privada** y ejecutarse íntegramente en el navegador. Inspirada en la estética minimalista de los terminales de 1980 (C64 / Apple II), esta utilidad garantiza que tus archivos nunca abandonen tu equipo.

![Retro UI Dark](https://via.placeholder.com/800x450/352879/6c5eb5?text=ABDFN+Encryptor+C64+Mode)

## 🚀 Características Principales

- **🔐 Privacidad Total:** Todo el procesamiento ocurre localmente mediante la **Web Crypto API**. Ni tus archivos ni tu contraseña se envían jamás a ningún servidor.
- **⚡ Criptografía AES-256-GCM:** Implementación exacta compatible con la herramienta original en C#.
- **🕰️ Estética Retro-Minimalista:** 
    - **Modo C64:** Tonos azules eléctricos y tipografía monoespaciada de 8 bits.
    - **Modo 1984 PC:** El clásico "Beige" con bordes sólidos y acentos verdes fósforo.
- **🕒 Temas Inteligentes:** Cambio automático de tema basado en el sistema o en la franja horaria (08:00 - 20:00).
- **📦 Procesamiento Batch:** Encripta o desencripta cientos de archivos simultáneamente con descarga automática.
- **📜 Log de Operaciones:** Consola tipo terminal con posibilidad de exportar el registro a disco.

## 🛠️ Especificaciones Técnicas

- **Algoritmo:** AES-GCM (256 bits).
- **Derivación de Clave:** PBKDF2 con SHA-256 y 100,000 iteraciones.
- **Estructura del Archivo (.enc):**
    - `[Salt (16 bytes)]` + `[Nonce (12 bytes)]` + `[Tag (16 bytes)]` + `[Cifrado]`
- **Framework:** Next.js 15 (App Router) + TypeScript.
- **Estilos:** Vanilla CSS (CSS Modules) sin frameworks externos para máxima portabilidad.

## 📦 Ejecución Local

Si prefieres no usar la versión web y ejecutarlo en tu propio entorno:

1. Clona el repositorio: `git clone https://github.com/ajabadia/ABDCryptFile.git`
2. Instala dependencias: `npm install`
3. Lanza el servidor: `npm run dev` (o usa el `start.bat` incluido en Windows).
4. Accede a `http://localhost:4100`.

## 🌐 Despliegue en Vercel

Esta aplicación está optimizada para ser desplegada en Vercel en segundos:

1. Importa este repositorio en tu dashboard de Vercel.
2. Asegúrate de que el despliegue sea por HTTPS (requerido por la Web Crypto API).
3. ¡Listo! Ya tienes tu propia instancia privada de encriptación.

---

**© 2026 ABD-IA Systems** | *Ni sus datos ni sus archivos salen nunca de su navegador.*
