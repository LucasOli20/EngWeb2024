# TPC1 - Página web de uma Escola de Música

## 2024-02-19

## Autor

- **Nome:** Lucas Oliveira
- **Nr.Aluno:** A98695

**Resumo:** Criar uma página web utilizando `Node.js` para exibir informações de um dataset de uma escola de música, contendo dados sobre `alunos`,`cursos` e `instrumentos`, e operando com o `Json-Server`.

A página web deve incluir índices com as <u>listas de alunos, instrumentos e cursos</u>, além de páginas dedicadas aos detalhes de cada <u>aluno, curso e instrumento</u>.

**Páginas Web e Serviço `Node.Js`**

- / : Página inicial com opções de escolher entre <u>`lista de alunos`</u>, <u>`lista de cursos`</u> e <u>`lista de instrumentos`</u>.

- /alunos : Página com a <u>lista de alunos</u> ordenada `alfabeticamente` em cada <u>aluno</u> tem uma `hiperligação` que leva para as suas <u>informações</u>.

- /alunos/AXXXX : Página com os detalhes do <u>aluno AXXXX</u> onde nela podemos ver o seu <u>`id`, `nome`, `data de nascimento`, `curso`</u>(com `hiperligação` que leva para a página do curso),<u> `ano do curso` e `instrumento`</u>(com `hiperligação` que leva para a página do instrumento).

- /cursos : Página com a <u>lista de cursos</u> ordenada `alfabeticamente` em cada <u>curso</u> tem uma `hiperligação` que leva para as suas <u>informações</u>.

- /cursos/CXXXX : Página com os detalhes do <u>curso AXXXX</u> onde nela podemos ver o seu <u>`id`, `designação`, `duração`, `Instrumento`</u>(com `hiperligação` que leva para a página do instrumento).

- /instrumentos : Página com a <u>lista de instrumentos</u> ordenada `alfabeticamente` em cada <u>instrumento</u> tem uma `hiperligação` que leva para as suas <u>informações</u>.

- /instrumento/'NomeDoInstrumento' : Página com os detalhes do <u>instrumento 'NomeDoInstrumento'</u> onde nela podemos ver o seu <u>`id`, `designação`</u>.