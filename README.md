# Sistema de Agendamento - Backend

Este é o backend de um sistema de agendamento (SaaS) desenvolvido com Node.js. Ele fornece funcionalidades para gerenciar agendamentos, serviços e funcionários, e verificar a disponibilidade dos funcionários para novos agendamentos.

## Funcionalidades

### Agendamentos
- **Criar um novo agendamento**: Permite que um novo agendamento seja criado no sistema.
- **Obter agendamentos por usuário**: Permite consultar os agendamentos de um usuário específico.
- **Obter agendamentos por dia**: Permite consultar os agendamentos do dia.
- **Modificar um agendamento**: Permite alterar as informações de um agendamento existente.
- **Remover um agendamento**: Permite excluir um agendamento existente.
- **Verificar disponibilidade**: Verifica se um funcionário está disponível para um agendamento específico.

### Serviços e Funcionários
- **Criar, alterar e remover serviços**: Permite a gestão de serviços disponíveis no sistema.
- **Criar, alterar e remover funcionários**: Permite a gestão de funcionários que realizarão os agendamentos.

## Tecnologias Usadas

- **Node.js**: Ambiente de execução para JavaScript no lado do servidor.
- **Express**: Framework para construção de APIs.
- **SQL Server**: Banco de dados utilizado para armazenar informações dos agendamentos.
- **Jest**: Framework de testes unitários.
- **Supertest**: Biblioteca para testar APIs.

## Como Rodar o Projeto

### Pré-requisitos
Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:
- **Node.js** (versão >= 14.0.0)
- **npm** (gerenciador de pacotes do Node.js)

### Passos para Rodar

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/seu-usuario/backendprojetotheus.git
   ```

2. **Instale as dependências**:
    Navegue até o diretório do projeto e instale as dependências com o comando:
    ```bash
    cd backendprojetotheus
    npm install
   ```

3. **Configure as variáveis de ambiente**:
    Crie um arquivo .env na raiz do projeto e adicione as variáveis de ambiente necessárias, como a string de conexão com o banco de dados SQL Server. Aqui está um exemplo básico de como o arquivo .env deve se parecer:
    ```bash
    DB_HOST=localhost
    DB_USER=seu_usuario
    DB_PASSWORD=sua_senha
    DB_DATABASE=seu_banco_de_dados
    ```

4. **Inicie o servidor**:
    Após a configuração, você pode iniciar o servidor com o comando:
    ```bash
    npm start
    ```
    O servidor estará rodando na porta 3000 por padrão.

5. **Testes**:
    Para rodar os testes, use o comando:
    ```bash
    npm test
    ```
    Isso irá executar os testes definidos no diretório tests usando o Jest.


# Endpoints da API
Aqui estão os principais endpoints da API disponíveis no backend:

## Agendamentos
* POST /Novo_Agendamento: Cria um novo agendamento.
* GET /Obter_Agendamentos: Obtém todos os agendamentos.
* GET /Obter_Agendamentos_do_Dia: Obtém os agendamentos do dia.
* GET /Obter_Agendamentos_do_Usuario: Obtém agendamentos de um usuário específico.
* GET /Obter_Todos_Agendamentos_do_Funcionario: Obtém todos os agendamentos de um funcionário.
* GET /Obter_Agendamentos_do_Funcionario_dia: Obtém os agendamentos de um funcionário em um dia específico.
* PUT /Modificar_Agendamento: Modifica um agendamento existente.
* DELETE /Remover_Agendamento: Remove um agendamento.
* GET /Verificar_Disponibilidade: Verifica a disponibilidade de um funcionário para um novo agendamento.

## Serviços e Funcionários
* POST /Criar_Servico: Cria um novo serviço.
* PUT /Alterar_Servico: Modifica um serviço existente.
* DELETE /Remover_Servico: Remove um serviço.
* POST /Criar_Funcionario: Cria um novo funcionário.
* PUT /Alterar_Funcionario: Modifica um funcionário existente.
* DELETE /Remover_Funcionario: Remove um funcionário.

# Licença
Este projeto está licenciado sob a Licença MIT.

### Explicações sobre o que está incluído no README:

1. **Descrição geral**: Uma breve explicação sobre o projeto e suas funcionalidades principais.
2. **Tecnologias usadas**: Quais tecnologias e ferramentas foram utilizadas no desenvolvimento.
3. **Como rodar o projeto**: Passo a passo de como configurar e rodar o projeto na sua máquina local.
4. **Endpoints da API**: Descrição das rotas principais que estão disponíveis na sua API, com uma breve explicação de cada uma.
5. **Licença**: Um link para a licença do projeto (no caso, MIT, mas você pode modificar conforme necessário).
