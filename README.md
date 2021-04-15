# RentalX

API de aluguel de carros

## Cadastro de Carros

**Requisitos Funcionais (RF's):**

- Deve ser possível cadastrar um novo carro

**Regras de Negócio (RN's):**

- Não deve ser possível cadastrar um carro com placa já existente
- O carro deve ser cadastrado como disponível por padrão
- Um usuário não admin não poderá cadastrar um carro

## Listagem de Carros

**Requisitos Funcionais (RF's):**

- Deve ser possível listar todos os carros disponíveis
- Deve ser possível listar todos os carros disponíveis pelo nome da categoria
- Deve ser possível listar todos os carros disponíveis pelo nome da marca
- Deve ser possível listar todos os carros disponíveis pelo nome do carro

**Regras de Negócio (RN's):**

- O usuário não precisa estar logado para listagem de carros

## Cadastro de Especificação no Carro

**Requisitos Funcionais (RF's):**

- Deve ser possível cadastrar uma especificação para um carro
- Deve ser possível listar todas as especifações
- Deve ser possível listar todos os carros

**Regras de Negócio (RN's):**

- Não deve ser possível cadastrar uma especificação para um carro não cadastrado
- Não deve ser possível cadastrar uma especificação já existente para um mesmo carro
- Um usuário não admin não poderá cadastrar uma especificação

## Cadastro de Imagens do Carro

**Requisitos Funcionais (RF's):**

- Deve ser possível cadastrar uma imagem do carro
- Deve ser possível listar todos os carros

**Requisitos Não Funcionais (RNF's):**

- Utilizar o multer para upload dos arquivos de imagem

**Regras de Negócio (RN's):**

- Um usuário não admin não poderá cadastrar uma especificação
- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro

## Aluguel de Carro

**Requisitos Funcionais (RF's):**

- Deve ser possível cadastrar um aluguel

**Regras de Negócio (RN's):**

- O aluguel deverá ter uma duração mínima de 24h
- Não deve ser possível cadastrar um novo aluguel caso já exista um aluguel aberto para o mesmo usuário
- Não deve ser possível cadastrar um novo aluguel caso já exista um aluguel aberto para o mesmo carro
- Um usuário não cadastrado não poderá efetuar o aluguel de um carro
