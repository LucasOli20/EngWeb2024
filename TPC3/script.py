import json
import re

def read_json(file_path):
    bd = []
    try:
        with open(file_path, 'r') as json_file:
            for row in json_file:
                linha = json.loads(row)
                # print(linha)
                try:
                    if "cast" not in linha:
                        linha["cast"] = []

                    if "genres" not in linha:
                        linha["genres"] = []
                    #     print("aqui1!")
                    #     linha["cast"].append("Sakuzaki")
                    #     linha["genres"].append("Anime")
                    #     print(linha)
                    #     continue
                    # else:
                        # if linha["_id"]["$oid"] == "5db6af40083ebab38e0cdb31":
                        #     print("eu passei aqui!")
                        #     print(linha)
                        # print(row)
                        # print(json.loads(row))
                    bd.append(linha)
                except KeyError:
                    print("Erro: " + str(linha))
                    continue

    except FileNotFoundError:
        print(f"The file {file_path} could not be found")
    except Exception as e:
        print(f"An error ocurred: {e}")

    return bd

def verificaString(string):
    return bool(re.match(r'^[A-Z][a-z]*(?: \b[A-Z]\.?|\.[ ]?[A-Z]\.)?[a-z]*[ -]?[A-Z][a-z]*(?: \([A-Za-z\s]*\))?$', string))

regex = r'^[A-Z][a-z]*(?: \b[A-Z]\.?|\.[ ]?[A-Z]\.)?[a-z]* [A-Z][a-z]*$'
regex2 = r'^[A-Z][a-z]*(?: \b[A-Z]\.?|\.[ ]?[A-Z]\.)?[a-z]* [A-Z][a-z]*(?: \([A-Za-z\s]*\))?$'


def pertenceGenero(valor, db):
    encontrado = False
    i = 0
    while i < len(db) and not encontrado:
        if db[i]["designacao"] == valor:
            encontrado = True
        i += 1

    return encontrado

def pertenceAtor(valor, db):
    encontrado = False
    i = 0
    while i < len(db) and not encontrado:
        if db[i]["Nome"] == valor:
            encontrado = True
        i += 1

    return encontrado

def getFilmesGenero(genero,db):
    filmes = []

    for reg in db:
        try:
            lista = reg["genres"]
            for gener in lista:
                if gener == genero and reg["title"] not in filmes:
                    filmes.append({
                        "idFilme": reg["_id"]["$oid"],
                        "titulo": reg["title"]
                    })
        except KeyError:
            continue
        
    return filmes


def calc_genero(db):
    contador = 1
    genero = []


    for reg in db:
        try:
            # print(reg["genres"])
            if len(reg["genres"]) >= 1:
                lista = reg["genres"]
                for gener in lista:
                    if not pertenceGenero(gener, genero):
                        genero.append({
                            "id": f"g{contador}",
                            "designacao": gener,
                            "filmes": getFilmesGenero(gener,db)
                        })

                        contador = contador + 1
        except KeyError:
            # print("não existe!")
            continue
    
    # print("acabei")
    return genero


def getFilmesAtor(ator,db):
    filmes = []

    for reg in db:
        try:
            listaAtores = reg["cast"]
            for actor in listaAtores:
                if actor.startswith(ator) and reg["title"] not in filmes:
                    filmes.append({
                        "idFilme" : reg["_id"]["$oid"],
                        "titulo" : reg["title"]
                    })
        except KeyError:
            continue

    return filmes

regex_parenteses = re.compile(r'^\(.*|.*\)$')

def calc_ator(db):
    contador = 1
    ator = []

    ignorar = False
    continua = False

    for reg in db:
        try:
            if len(reg["genres"]) >= 1:
                listaGenres = reg["genres"]
                for genre in listaGenres:
                    if genre == "Documentary":
                        continua = True

            if continua == True:
                continua = False
                continue

            # print(reg["cast"])
            if len(reg["cast"]) >= 1:
                # if reg["_id"]["$oid"] == "5db6af40083ebab38e0cdb31":
                #     print("eu passei aqui")
                #     print(reg)

                #     lista2 = reg["cast"]

                #     for a in lista2:
                #         print("começa aqui")
                #         print(a)
                #         print(verificaString(a))
                lista = reg["cast"]
                for actor in lista:
                    if actor.startswith("(") and actor.endswith(")"):
                        continue

                    if ignorar == False and actor.startswith("("):
                        ignorar = True
                        continue

                    if ignorar == True and actor.endswith(")"):
                        ignorar = False
                        continue

                    # if regex_parenteses.match(actor):
                    #     print("entrei")
                    #     print(actor)
                    #     ignorar = not ignorar
                    #     continue
                    if verificaString(actor):
                        actor_sem_parenteses = re.sub(r"\([^()]*\)", "", actor).strip()
                        if not ignorar and not pertenceAtor(actor_sem_parenteses, ator):
                            ator.append({
                            "id": f"a{contador}",
                            "Nome": actor_sem_parenteses,
                            "filmes": getFilmesAtor(actor_sem_parenteses,db)
                        })
                            
                            contador = contador + 1

                    # if not ignorar and not pertenceAtor(actor, ator) and verificaString(actor):
                    #     ator.append({
                    #         "id": f"g{contador}",
                    #         "Nome": actor
                    #     })

                    #     contador = contador + 1
        except KeyError:
            # print("nao existe")
            continue
    
    # print("acabei2")
    return ator

def idsCast(novaBD,listaAtores):
    cast = []

    lista = novaBD["atores"]

    for ator in listaAtores:
        for actor in lista:
            if ator == actor["Nome"] and ator not in cast:
                cast.append({
                    "idAtor" : actor["id"],
                    "Nome" : actor["Nome"]
                })

    return cast

def idsGenres(novaBD,listaGeneros):
    genres = []

    lista = novaBD["generos"]

    for genre in listaGeneros:
        for genero in lista:
            if genre == genero["designacao"] and genre not in genres:
                genres.append({
                    "idGenero" : genero["id"],
                    "designacao" : genero["designacao"]
                })

    return genres


def filmesFormatado(myBD,novaBD):
    filmes = []

    for reg in myBD:
        try:
            filmes.append({
                "idFilme" : reg["_id"]["$oid"],
                "titulo" : reg["title"],
                "ano" : reg["year"],
                "cast": idsCast(novaBD,reg["cast"]),
                "genres": idsGenres(novaBD,reg["genres"])
            })
        except KeyError:
            print("Erro formatar filmes: " + str(reg))
            continue

    return filmes


file_path = "filmes.json"
myBD = read_json(file_path)

genero = calc_genero(myBD)
ator = calc_ator(myBD)

novaBD = {
    "generos" : genero,
    "atores" : ator,
}

filmes = filmesFormatado(myBD,novaBD)

bdFinal = {
    "filmes" : filmes,
    "generos" : genero,
    "atores" : ator
}

f = open("dataset4.json", 'w')
json.dump(bdFinal, f, indent=1)
f.close