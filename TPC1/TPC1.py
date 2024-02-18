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

fotosAtuais = "../atual/"

for ficheiro in sorted(ficheiros):
    xml_doc = xml.dom.minidom.parse(ficheiro)
    root = xml_doc.documentElement

    metas = xml_doc.getElementsByTagName('meta')

    for meta in metas:

        meta_nome = meta.getElementsByTagName('nome')[0].childNodes[0].data.strip()

        listaRuas.append(meta_nome)

        ficheiroRua = open(f"../../html/{meta_nome}.html", "w")

        templateRua = template
        templateRua += f'<h1>{meta_nome}</h1>'
        templateRua += '<h5><a href="../indiceRuas.html">Voltar ao Indice</a></h5>'
        templateRua += "</body>"

    corpos = xml_doc.getElementsByTagName('corpo')

    templateRua += '<h3>Imagens</h3>'

    for corpo in corpos:
        NrFigura = 1
        corpo_figuras = corpo.getElementsByTagName('figura')
        for figuras in corpo_figuras:
            
            figura_imagem = figuras.getElementsByTagName('imagem')[0]
            caminho_imagem = figura_imagem.getAttribute("path")

            image_path = caminho_imagem.replace("..", "../MapaRuas-materialBase")

            figura_legenda = figuras.getElementsByTagName('legenda')[0].childNodes[0].data

            templateRua += f'<figure><img src={image_path} alt="Image" width="100%" height="auto"><figcaption><b>Figura {NrFigura}:</b> {figura_legenda}</figcaption></figure>'
            NrFigura = NrFigura + 1

        for imagAtual in sorted(os.listdir(fotosAtuais)):
            if meta_nome.replace(" ", "") in imagAtual:
                image_path_atual = "../MapaRuas-materialBase/atual/" + imagAtual

                if "Vista1" in imagAtual:
                    legenda = f"Atual {meta_nome}: Vista 1"
                    templateRua += f'<figure><img src={image_path_atual} alt="Imagem da Vista 1 da {meta_nome}" width="100%" height="auto"><figcaption><b>Figura {NrFigura}:</b> {legenda}</figcaption></figure>'
                    NrFigura = NrFigura + 1

                if "Vista2" in imagAtual:
                    legenda = f"Atual {meta_nome}: Vista 2"
                    templateRua += f'<figure><img src={image_path_atual} alt="Imagem da Vista 1 da {meta_nome}" width="100%" height="auto"><figcaption><b>Figura {NrFigura}:</b> {legenda}</figcaption></figure>'
                    NrFigura = NrFigura + 1

        templateRua += '<h3>Descrição</h3>'

    corpo_elements = root.getElementsByTagName("corpo")
    if corpo_elements:
        corpo_children = corpo_elements[0].childNodes

        for child in corpo_children:
            if child.nodeName == 'para':
                paragrafo = ""
                for node in child.childNodes:
                    if node.nodeType == node.TEXT_NODE:
                        paragrafo += node.nodeValue
                    elif node.nodeName == 'lugar':
                        paragrafo += f'<b>{node.firstChild.nodeValue}</b>'
                    elif node.nodeName == 'data':
                        paragrafo += f'<b>{node.firstChild.nodeValue}</b>'
                    elif node.nodeName == 'entidade':
                        paragrafo += f'<b>{node.firstChild.nodeValue}</b>'
                        
                templateRua += f'<p>{paragrafo}</p>'

    templateRua += '<h3>Lista das Casas:</h3><dl>'

    Elements_listaCasa = root.getElementsByTagName("lista-casas")
    if Elements_listaCasa:
        for casa in Elements_listaCasa[0].getElementsByTagName("casa"):

            numero_element = casa.getElementsByTagName("número")
            casa_numero = casa.getElementsByTagName("número")[0].firstChild.nodeValue.strip() if numero_element and numero_element[0].firstChild else "Não possui número"

            enfiteuta_element = casa.getElementsByTagName("enfiteuta")
            casa_enfiteuta = casa.getElementsByTagName("enfiteuta")[0].firstChild.nodeValue.strip() if enfiteuta_element and enfiteuta_element[0].firstChild else "Não possui enfiteuta"
            
            foro_element = casa.getElementsByTagName("foro")
            casa_foro = casa.getElementsByTagName("foro")[0].firstChild.nodeValue.strip() if foro_element and foro_element[0].firstChild is not None else "Não possui foro"


            templateRua += f'<dt> <b>Nr. da Casa:</b> {casa_numero}'
            templateRua += f'<dd> <b>Enfiteuta:</b> {casa_enfiteuta}</dd>'
            templateRua += f'<dd> <b>Foro:</b> {casa_foro}</dd>'

            casa_desc = casa.getElementsByTagName("desc")
            if casa_desc:
                templateRua += f'<dd> <b>Descrição:</b> '
                casa_desc_children = casa_desc[0].childNodes

                for child in casa_desc_children:
                    if child.nodeName == 'para':
                        paragraf = ""
                        for node in child.childNodes:
                            if node.nodeType == node.TEXT_NODE:
                                paragraf += node.nodeValue
                            elif node.nodeName == 'lugar':
                                paragraf += f'<b>{node.firstChild.nodeValue}</b>'
                            elif node.nodeName == 'data':
                                paragraf += f'<b>{node.firstChild.nodeValue}</b>'
                            elif node.nodeName == 'entidade':
                                paragraf += f'<b>{node.firstChild.nodeValue}</b>'
                        
                        templateRua += f'{paragraf}'
                
                templateRua += f'</dd>'

    templateRua += '</dl>'

    ficheiroRua.write(templateRua)
    ficheiroRua.close()

# abertura de listas
html += "<ul>"

for elem in sorted(listaRuas):
    html += f'<li><a href="html/{elem}.html">{elem}</a></li>'

#fecho de listas
html += "</ul>"

# fecho do body
html += "</body>"

ficheiroHtml = open("../../indiceRuas.html", "w", encoding="utf-8")
ficheiroHtml.write(html)
ficheiroHtml.close()




