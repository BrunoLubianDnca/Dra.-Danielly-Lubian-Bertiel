# 🚀 Próximos Passos para Lançamento do Site

Este documento detalha os passos finais necessários para configurar e publicar o site da Dra. Danielly Lubian Bertiel de forma 100% profissional usando seu domínio próprio.

---

## 📋 1. Apontar o Domínio Próprio na Vercel

Você já comprou o domínio (ex: `dradaniellylubian.com.br`). Agora, siga os passos abaixo para vinculá-lo ao seu projeto Vercel:

1. Acesse o painel da **Vercel** e abra o projeto do site.
2. Vá na aba **Settings (Configurações)** ➔ **Domains (Domínios)**.
3. Insira o seu domínio próprio e clique em **Add (Adicionar)**.
4. A Vercel exibirá os registros DNS que precisam ser criados (geralmente um registro do tipo `A` e outro do tipo `CNAME`).
5. Acesse o painel da empresa onde você comprou o domínio (ex: Registro.br, HostGator, GoDaddy, etc.) e adicione esses registros na tabela DNS correspondente.
6. Aguarde a propagação do DNS (costuma demorar de alguns minutos a poucas horas). A Vercel ativará o certificado de segurança SSL (HTTPS) de forma automática.

---

## 🔒 2. Configurar as Variáveis de Ambiente na Vercel

Para que o banco de dados oficial e o sistema de notificações por e-mail de pré-consulta funcionem em produção:

1. No dashboard do seu projeto na **Vercel**, vá em **Settings (Configurações)** ➔ **Environment Variables (Variáveis de Ambiente)**.
2. Adicione as 3 variáveis abaixo exatamente como descritas:

| Nome da Variável | Valor sugerido / Configuração |
| :--- | :--- |
| **`DATABASE_URL`** | `postgresql://postgres:Y0l3OrgIeuRBWVq5@db.ndlygkqzkoezdmchwmrj.supabase.co:5432/postgres` |
| **`RESEND_API_KEY`** | `re_XD5g6UUJ_LVPHDQdMg8QE3qonH5jUhVRv` |
| **`NOTIFICATION_EMAIL`** | `brunolubianinfo@gmail.com` *(e-mail que receberá as mensagens das pré-consultas)* |

3. Com as variáveis salvas, acesse a aba **Deployments** no painel da Vercel.
4. Clique nos três pontinhos à direita do seu último deploy e selecione **Redeploy**. Isso fará o site atualizar e aplicar as chaves configuradas.

---

## 📧 3. Validar e Verificar o Domínio no Resend

Atualmente, os e-mails de teste usam o remetente genérico `onboarding@resend.dev`. Para garantir que os e-mails cheguem de forma confiável e profissional na caixa de entrada sem ir para a caixa de Spam:

1. Acesse sua conta no painel do [Resend](https://resend.com).
2. Vá em **Domains** ➔ **Add Domain**.
3. Digite o seu domínio próprio (ex: `dradaniellylubian.com.br`).
4. O Resend gerará alguns registros DNS do tipo **MX** e **TXT** (configurações DKIM e SPF essenciais para autenticidade).
5. Adicione esses registros no painel da empresa onde você comprou o domínio (a mesma tabela DNS do Passo 1).
6. Assim que o Resend identificar os registros e mudar o status para **"Verified" (Verificado)**, suas notificações de e-mail funcionarão 100% livres de bloqueios de spam.

---

## ✍️ 4. Como Escrever Novos Posts no Blog

O blog está configurado para ler arquivos de texto Markdown (`.md`) da pasta `/posts` na raiz do projeto de forma 100% gratuita.

Para publicar um novo artigo:
1. Crie um novo arquivo na pasta `/posts` terminado com `.md` (ex: `posts/como-regular-o-sono.md`).
2. Adicione os metadados (cabeçalho) no início do arquivo e depois escreva o texto abaixo dele, seguindo este modelo exato:

```markdown
---
title: "Título do Post Aqui"
date: "2026-07-11"
summary: "Um breve resumo de uma ou duas frases sobre o assunto do artigo."
image: "/perfil01.jpeg"
readTime: "5 min"
---

Aqui você escreve o corpo do seu texto. Pode usar títulos com ## para criar tópicos:

## 1. Primeiro Tópico Importante
Texto do tópico aqui.
```

3. Salve, faça commit das alterações para o GitHub (`git add .`, `git commit` e `git push`) e a Vercel publicará o novo post automaticamente em alguns segundos.
