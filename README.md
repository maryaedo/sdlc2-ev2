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

---

### Paso 5: Guía de Preparación para la PPT y el Informe Final

Una vez que completes la sincronización de archivos mediante los comandos de Git y subas todo a producción, tu equipo estará listo para afrontar el cierre académico del encargo. Distribuyan el contenido de la siguiente manera:

#### Estructura Sugerida para el Informe Escrito
1. **Introducción:** Contexto de negocio del microservicio "TechMarket Orders" y los objetivos ágiles de la organización.
2. **Análisis Técnico Comparativo:** Sección de conceptos teóricos (All-in-once, Rolling Update, Canary, Blue-Green) junto con la tabla comparativa detallada de ventajas, desventajas, impacto en costos y velocidad de propagación del cambio.
3. **Selección Justificada:** La justificación unificada (SLA del 99.9%, normativas de auditoría de datos transaccionales, microservicios contenerizados y soporte nativo en la nube).
4. **Documentación de la Implementación Práctica:** Explicación de los archivos de flujo (`main.yml`, `deploy-template.yml`), anexando capturas de pantalla de la ejecución exitosa de GitHub Actions (los "checks" en verde) y la creación del repositorio en Amazon ECR.
5. **Conclusiones:** Reflexión sobre cómo la automatización eleva la resiliencia operativa y reduce los tiempos de salida al mercado (*Time-to-Market*).

#### Estructura Sugerida para la Presentación (PPT)
* **Diapositiva 1:** Portada formal con logotipo institucional, identificación del caso de negocio ("TechMarket Orders") e integrantes del equipo de trabajo.
* **Diapositiva 2:** Definición del Problema y Restricciones (Explicar los desafíos del SLA del 99.9% y los riesgos de corrupción de base de datos en pasarelas de pago).
* **Diapositiva 3:** Cuadro Comparativo de Estrategias (Resumen visual de los enfoques teóricos analizados).
* **Diapositiva 4:** Propuesta de Solución y Justificación (Por qué *Blue-Green Deployment* en AWS EKS es el estándar ideal para la protección transaccional).
* **Diapositiva 5:** Arquitectura del Pipeline y Demostración (Diagrama del flujo automatizado desde el push en GitHub Actions, pasando por Jest y `npm audit`, hasta el push a ECR y la conmutación con `kubectl patch`).
* **Diapositiva 6:** Resultados y Conclusiones (Resaltar la eliminación de ventanas de mantenimiento y el impacto directo en la agilidad organizacional).