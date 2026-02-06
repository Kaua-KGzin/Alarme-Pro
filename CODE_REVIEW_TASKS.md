# Revisão rápida da base e tarefas sugeridas

## 1) Tarefa de correção de erro de digitação
- **Problema encontrado:** o nome no `README.md` está como `Alarme-Pro`, enquanto o restante da interface e manifesto usam a marca `Alarme Pro` (sem hífen), o que parece mais um deslize de nomenclatura do que uma decisão de produto.
- **Tarefa sugerida:** padronizar o título no README para `# Alarme Pro` e revisar eventuais outras ocorrências da variação com hífen.
- **Impacto:** melhora consistência textual e reduz confusão em documentação/onboarding.

## 2) Tarefa de correção de bug
- **Problema encontrado:** o áudio padrão usa um `setInterval` que depende de `activeAlarm` no fechamento (`closure`). Quando o alarme dispara, `setActiveAlarm(alarm)` é assíncrono; assim, o `activeAlarm` capturado na função pode estar `null`, fazendo o toque parar cedo.
- **Tarefa sugerida:** alterar a condição de parada para não depender do valor fechado de `activeAlarm` (ex.: usar `useRef` para estado atual do alarme ativo, ou parar explicitamente apenas em `stopAlarm`).
- **Impacto:** evita interrupção prematura do som e melhora a confiabilidade do disparo.

## 3) Tarefa de ajuste de comentário/discrepância de documentação
- **Problema encontrado:** o projeto implementa vários recursos (soneca, desafio matemático, vibração, citação diária, personalização de tema/fundo), mas o `README.md` não documenta funcionalidades, execução local ou limitações.
- **Tarefa sugerida:** expandir README com seção de funcionalidades, como executar localmente, permissões necessárias (notificação/vibração) e observações de PWA.
- **Impacto:** reduz atrito de uso e alinha documentação ao comportamento real do app.

## 4) Tarefa para melhorar testes
- **Problema encontrado:** não há suíte de testes automatizados para o comportamento crítico de alarmes.
- **Tarefa sugerida:** criar testes de integração end-to-end (ex.: Playwright) cobrindo: criação de alarme, disparo no horário esperado, fluxo de soneca e bloqueio por desafio matemático.
- **Impacto:** previne regressões em fluxos críticos e dá segurança para refatorar lógica de tempo/áudio.
