# 🚀 TechMarket Orders: Orquestación e Implementación de CI/CD Multi-Entorno en AWS EKS

Este repositorio contiene la arquitectura de automatización y el pipeline de Integración y Entrega Continua (CI/CD) diseñado bajo metodologías ágiles para el microservicio crítico transaccional **"TechMarket Orders"**.

## 1. Arquitectura y Estrategia de Despliegue Seleccionada
Para responder a las exigencias operativas del motor de pedidos y reservas de inventario, se ha implementado de forma automatizada la estrategia de **Blue-Green Deployment** utilizando **Amazon EKS (Elastic Kubernetes Service)**.

### Justificación de Impacto en el Negocio y Continuidad Operativa:
* **Cumplimiento Estricto del SLA (99.9%):** Al mantener dos entornos idénticos aislados, el enrutamiento del tráfico de usuarios mediante balanceo de carga elimina por completo las ventanas de mantenimiento con caída del sistema. Se garantiza un **uptime continuo** y transacciones ininterrumpidas incluso en horarios comerciales de alta demanda.
* **Tolerancia a Fallos e Integridad de Datos:** De acuerdo con las normas de auditoría interna, bajo ningún escenario técnico se permiten inconsistencias de datos o pérdida de órdenes pendientes. El aislamiento del entorno inactivo (*Green*) faculta al equipo para ejecutar pruebas funcionales y de humo completas antes de conmutar el tráfico productivo.
* **Capacidad de Rollback Inmediato:** Ante cualquier anomalía crítica imprevista detectada post-despliegue en la pasarela de pagos, la infraestructura permite revertir la operación al estado anterior de forma instantánea mediante la redirección atómica del servicio (`kubectl patch`), mitigando impactos financieros y reputacionales.

## 2. Estructura del Pipeline de CI/CD (GitHub Actions)
La automatización se encuentra orquestada modularmente y se divide en las fases requeridas para garantizar la calidad del software:
1. **Fase de Build:** Configuración limpia del entorno Node.js, optimización de tiempos de entrega mediante uso avanzado de caché nativa e instalación inmutable de dependencias base (`npm ci`).
2. **Fase de Validación y Test (Quality Gate):** Ejecución de auditorías automatizadas de vulnerabilidades conocidas (`npm audit`) y pasarela de pruebas unitarias/funcionales mediante Jest para mitigar riesgos antes del empaquetado.
3. **Fase de Despliegue y Contenerización (CD):** Construcción de la imagen inmutable de Docker, almacenamiento seguro en **Amazon ECR** utilizando etiquetas basadas en el SHA del commit para trazabilidad perfecta, conexión al clúster de Kubernetes y ejecución atómica de la estrategia de conmutación Blue-Green.

## 3. Instrucciones de Reproducibilidad Local
Para ejecutar el entorno de microservicios de manera local para desarrollo, siga estos pasos:

```bash
# 1. Clonar el repositorio
git clone [https://github.com/MaryAedo/SDLC2-Ev2.git](https://github.com/MaryAedo/SDLC2-Ev2.git)
cd SDLC2-Ev2

# 2. Instalar dependencias del proyecto
npm install

# 3. Levantar las pruebas unitarias y de integración
npm test
