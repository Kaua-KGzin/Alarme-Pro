# Alarme Pro

Aplicativo web de despertador com foco em personalização e produtividade, com interface em português e recursos extras para reduzir o risco de perder alarmes.

## Funcionalidades
- Criação, edição, ativação/desativação e exclusão de alarmes.
- Repetição por dias da semana.
- Sons padrão e suporte a som personalizado.
- Controle de volume, vibração e fade-in do volume.
- Soneca automática de 5 minutos.
- Desafio matemático opcional para desligar o alarme.
- Frases motivacionais e personalização visual (tema/fundo).
- Notificações quando o navegador permite.

## Como executar localmente
Como o app é estático (HTML + React via CDN), basta servir os arquivos com um servidor HTTP.

Exemplo com Python:

```bash
python3 -m http.server 4173
```

Depois abra:
- `http://localhost:4173`

## Permissões e observações
- **Notificações:** o navegador pode solicitar permissão; sem ela, alertas visuais nativos não aparecem.
- **Vibração:** disponível apenas em dispositivos/navegadores compatíveis.
- **Áudio:** navegadores podem exigir interação prévia do usuário antes de tocar som.

## Testes
Existe um teste automatizado básico para utilitários de lógica de alarme:

```bash
node tests/alarm-utils.test.js
```
