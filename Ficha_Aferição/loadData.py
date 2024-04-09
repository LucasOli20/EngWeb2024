import json
import sys
from pymongo import MongoClient

def carrega_Dataset(path):
    with open(path, 'r') as file:
        return json.load(file)
    
def inserir_Dados(data):
    if data:
        client = MongoClient('localhost', 49456)
        db = client["Afericao"]
        collection = db["pessoas"]
        if isinstance(data, list):
            collection.insert_many(data)
        else:
            collection.insert_one(data)
        print("Dados inseridos no MongoDB com sucesso!")
    else:
        print("Documentos está vazia!")


def main(input):
    data = carrega_Dataset(input[1])
    print(data)
    inserir_Dados(data)


if __name__ == "__main__":
    main(sys.argv)