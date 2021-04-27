# RentalX

API de aluguel de carros.

## Cadastro de Carros

**Requisitos Funcionais (RF's):**

- Deve ser possível cadastrar um novo carro.

**Regras de Negócio (RN's):**

- Não deve ser possível cadastrar um carro com placa já existente.
- O carro deve ser cadastrado como disponível por padrão.
- Um usuário não admin não poderá cadastrar um carro.

## Listagem de Carros

**Requisitos Funcionais (RF's):**

- Deve ser possível listar todos os carros disponíveis.
- Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
- Deve ser possível listar todos os carros disponíveis pelo nome da marca.
- Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**Regras de Negócio (RN's):**

- O usuário não precisa estar logado para listagem de carros.

## Cadastro de Especificação no Carro

**Requisitos Funcionais (RF's):**

- Deve ser possível cadastrar uma especificação para um carro.

**Regras de Negócio (RN's):**

- Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- Não deve ser possível cadastrar uma especificação já existente para um mesmo carro.
- Um usuário não admin não poderá cadastrar uma especificação.

## Cadastro de Imagens do Carro

**Requisitos Funcionais (RF's):**

- Deve ser possível cadastrar uma imagem do carro.
- Deve ser possível listar todos os carros.

**Requisitos Não Funcionais (RNF's):**

- Utilizar o multer para upload dos arquivos de imagem.

**Regras de Negócio (RN's):**

- Um usuário não admin não poderá cadastrar uma especificação.
- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.

## Aluguel de Carro

**Requisitos Funcionais (RF's):**

- Deve ser possível cadastrar um aluguel.

**Regras de Negócio (RN's):**

- O aluguel deverá ter uma duração mínima de 24h.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aluguel aberto para o mesmo usuário.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aluguel aberto para o mesmo carro.
- Um usuário não cadastrado não poderá efetuar o aluguel de um carro.
- O usuário deve estar logado para cadastrar um aluguel.
- Ao realizar um aliguel o status do carro deverá ser alterado para indisponível.

## Devolução de carro

**Requisitos Funcionais (RF's):**

- Deve ser possível realizar a devolução de um carro.

**Regras de Negócio (RN's):**

- Se o carro for devolvido com menos de 24h, deverá ser cobrado a diária completa.
- Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
- Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
- Ao realizar a devolução, deverá ser calculado o total do aluguel.
- Caso o horário de devolução seja superior ao previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso.
- Caso haja multa, deverá ser somado ao total do aluguel.
- O usuário deve estar logado para devolução.

## Listagem de Aluguéis para usuário

**Requisitos Funcionais (RF's):**

- Deve ser possível realizar a busca de todos os alugueis para o usuário.

**Regras de Negócio (RN's):**

- O usuário deve estar logado na aplicação.
