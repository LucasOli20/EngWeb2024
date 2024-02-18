import xml.dom.minidom
import os

html = """
<!DOCTYPE html>
<html lang="pt-PT">
<head>
    <title>Ruas</title>
    <meta charset="utf-8">
</head>
<body>
"""

template = """<!DOCTYPE html>
<html lang="pt-PT">
<head>
    <title>Rua</title>
    <meta charset="utf-8">
</head>
<body>
"""

os.mkdir("html")

os.chdir('./MapaRuas-materialBase/texto')

ficheiros = os.listdir()

listaRuas = []
imagesRuas = []

for ficheiro in sorted(ficheiros):
    xml_doc = xml.dom.minidom.parse(ficheiro)
    root = xml_doc.documentElement

    metas = xml_doc.getElementsByTagName('meta')

    for meta in metas:

        meta_nome = meta.getElementsByTagName('nome')[0].childNodes[0].data

        listaRuas.append(meta_nome)

        ficheiroRua = open(f"../../html/{meta_nome}.html", "w")

        templateRua = template
        templateRua += f'<h1>{meta_nome}</h1>'
        templateRua += '<h6><a href="../ruas.html">Voltar</a></h6>'
        templateRua += "</body>"

    corpos = xml_doc.getElementsByTagName('corpo')

    for corpo in corpos:
        fignumber = 1
        corpo_figuras = corpo.getElementsByTagName('figura')
        for figuras in corpo_figuras:
            
            figura_imagem = figuras.getElementsByTagName('imagem')[0]
            caminho_imagem = figura_imagem.getAttribute("path")
            # print(caminho_imagem)
            image_path = caminho_imagem.replace("..", "../MapaRuas-materialBase")
            # print(image_path)

            figura_legenda = figuras.getElementsByTagName('legenda')[0].childNodes[0].data
            # print(figura_legenda)

            templateRua += f'<figure><img src={image_path} alt="Image" width="100%" height="auto"><figcaption><b>Figura {fignumber}:</b> {figura_legenda}</figcaption></figure>'
            fignumber = fignumber + 1
            # if meta_nome in imagesRuas.keys():
            #     imagesRuas[meta_nome].append(figuras.getElementsByTagName('imagem'))
            # corpo_figura = figuras.getElementsByTagName('legenda')[0].childNodes[0].data
            # print(corpo_figura)

    ficheiroRua.write(templateRua)
    ficheiroRua.close()


    # print('nome da rua:', meta_nome)

# abertura de listas
html += "<ul>"

for elem in listaRuas:
    html += f'<li><a href="html/{elem}.html">{elem}</a></li>'

#fecho de listas
html += "</ul>"

# fecho do body
html += "</body>"

ficheiroHtml = open("../../ruas.html", "w", encoding="utf-8")
ficheiroHtml.write(html)
ficheiroHtml.close()




