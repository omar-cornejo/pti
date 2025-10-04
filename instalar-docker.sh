#!/bin/bash
# Script para instalar Docker y Docker Compose en Ubuntu
# Compatible con Ubuntu 20.04, 22.04 y 24.04

set -e

echo "🔹 Actualizando sistema..."
sudo apt update && sudo apt upgrade -y

echo "🔹 Instalando dependencias..."
sudo apt install -y ca-certificates curl gnupg lsb-release

echo "🔹 Agregando clave GPG oficial de Docker..."
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
  sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

echo "🔹 Agregando repositorio de Docker..."
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

echo "🔹 Actualizando lista de paquetes..."
sudo apt update

echo "🔹 Instalando Docker Engine, CLI, containerd y Docker Compose plugin..."
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

echo "🔹 Verificando instalación..."
docker --version
docker compose version

echo "🔹 Añadiendo usuario actual al grupo docker (para usar sin sudo)..."
sudo usermod -aG docker $USER

echo "✅ Instalación completada. Cierra sesión y vuelve a entrar para usar Docker sin sudo."
