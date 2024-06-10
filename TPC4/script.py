import json


def read_json(file_path):
    bd = []

    try:
        with open(file_path, 'r') as file:
            bd = json.load(file)

    except FileNotFoundError:
        print(f"The file {file_path} could not be found")
    except Exception as e:
        print(f"An error ocurred: {e}")

    return bd

def pertencePeriodo(valor, db):
    encontrado = False
    i = 0
    while i < len(db) and not encontrado:
        if db[i]["designacao"] == valor:
            encontrado = True
        i += 1

    return encontrado


def calc_periodo(db):
    contador = 1
    periodo = []

    for row in db:
        try:
            if not pertencePeriodo(row["periodo"],periodo):
                periodo.append({
                    "id": f"p{contador}",
                    "designacao": row["periodo"]
                })

                contador = contador + 1
        except KeyError:
            print("Key não existe!")
            continue

    return periodo




file_path = 'dataset.json'
myBD = read_json(file_path)

periodos = calc_periodo(myBD["compositores"])

novaBD = {
    "compositores" : myBD["compositores"],
    "periodos" : periodos
}

f = open("Dataset-Final.json", 'w')
json.dump(novaBD,f,indent=4)
f.close
