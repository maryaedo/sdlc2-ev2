# 🚀 TechMarket Orders: Resiliencia, Telemetría y Automatización de Mecanismos de Remediación Temprana en AWS EKS

Este repositorio contiene la evolución de la arquitectura de automatización y el pipeline de Integración y Entrega Continua (CI/CD) diseñado bajo metodologías ágiles para el microservicio crítico transaccional "TechMarket Orders", incorporando sistemas avanzados de corrección temprana y respuesta autónoma ante incidentes en producción.
**Integrantes:** Marysabel Aedo, Solange Milla, Nathaly Saavedra.

---

## 1. Identificación de Escenarios de Error por Estrategia de Deployment

Para asegurar la alta disponibilidad de la pasarela de pedidos y reservas de inventario, se analizaron los riesgos inherentes a las actualizaciones de software según la estrategia de despliegue seleccionada:

* **All-In-Once (Todo de una vez):
* **Rolling Update (Actualización Progresiva):
* **Canary (Canario):
* **Blue-Green (Azul-Verde):

---

## 2. Análisis Técnico y Comparativo de Mecanismos de Remediación



---

## 3. Arquitectura de Remediación Temprana y Ciclo DevOps (Detección a Verificación)

El pipeline de entrega continua implementa un ciclo cerrado de remediación automatizada estructurado bajo el paradigma defensivo DevOps:

1.  **Detección (Mecanismo Activo):** Las sondas nativas de Kubernetes (`readinessProbe` y `livenessProbe`) interrogan dinámicamente el endpoint de telemetría `/health` en el puerto `3000` de la aplicación Express.
2.  **Notificación y Aislamiento:** Si el parámetro de construcción corresponde a un escenario inestable (`Fallo-Simulado-Evidencia`), la lógica interna del script intercepta de forma temprana la contingencia antes de comprometer la red pública y la registra en la salida estándar de la consola.
3.  **Acción Correctiva (Rollback Automatizado):** Al detectar la anomalía, el pipeline cancela el switch de tráfico, ejecuta un deshasimiento de cambios en la infraestructura degradada (`kubectl rollout undo`) y amarra firmemente el balanceador de carga de AWS (`AWS LoadBalancer`) hacia el entorno seguro (`version: blue`).
4.  **Verificación Post-Remediación:** Se ejecuta un paso de auditoría final que consulta las especificaciones activas de red (`kubectl get service`) para certificar que el microservicio continúa operativo en zona segura, resguardando el SLA de la compañía.

---

## 4. Estructura del Pipeline de CI/CD (Archivos Modificados)

La automatización de la respuesta ante fallas coordinó las siguientes capas técnicas del repositorio:

* **`.github/workflows/main.yml`:** Orquestador principal encargado de automatizar secuencialmente las etapas de Build, Test (Quality Gate con Jest y npm audit) y paso de parámetros dinámicos de despliegue.
* **`.github/workflows/deploy-template.yml`:** Pipeline de CD modularizado. Contiene las directivas condicionales (`if: env.CONTINGENCIA_DETECTADA`) para ejecutar la detección precoz, el rollback dinámico de infraestructura y el reporte de continuidad en un flujo estable y exitoso (Tick Verde).
* **`index.js`:** Incorpora el endpoint técnico de salud corporativo `/health` y la lógica para la inyección de errores simulados por software.
* **`k8s/green.yml` (y `blue.yml`):** Manifiestos que implementan formalmente las políticas de ciclos de vida de los contenedores mediante umbrales de fallo tolerables (`failureThreshold: 2`) e intervalos periódicos de chequeo.

---

## 5. Instrucciones de Reproducibilidad Local

Para ejecutar y validar el entorno de desarrollo y pruebas de manera local, ejecute los siguientes comandos básicos:

```bash
# 1. Clonar el repositorio
git clone [https://github.com/MaryAedo/SDLC2-Ev2.git](https://github.com/MaryAedo/SDLC2-Ev2.git)
cd SDLC2-Ev2

# 2. Instalar dependencias del proyecto de forma limpia
npm ci

# 3. Levantar la pasarela de pruebas unitarias
npm test

---

## 5. Gestión operativa

Comandos técnicos utilizados por el equipo de DevOps para administrar la resiliencia del clúster de Kubernetes:
# 1. Configurar y actualizar las credenciales de acceso al contexto de AWS EKS
aws eks update-kubeconfig --name duoc-eks-cluster-cli --region us-east-1

# 2. Consultar el estado de salud y prontitud de los pods (Verificación de Sondas)
kubectl get pods -l app=techmarket-orders -o wide

# 3. Interrogar al Balanceador de Carga para verificar el enrutamiento post-remediación
kubectl get service techmarket-bg-service -o jsonpath='{.spec.selector.version}'

# 4. Rollback manual complementario para restaurar el Deployment Green a su estado anterior
kubectl rollout undo deployment/techmarket-app-green

# 5. Forzar la reconfiguración atómica del tráfico hacia el entorno seguro conocido
kubectl patch service techmarket-bg-service -p '{"spec": {"selector": {"version": "blue"}}}'