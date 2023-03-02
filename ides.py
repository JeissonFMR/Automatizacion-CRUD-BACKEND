from pathlib import Path
import pkg_resources
import os
import subprocess


def escrituraENV():
    # Escribe el archivo .env
    env = route+'/'+raiz[1]
    file_contents = f"""
PORT=3000
  """
    with open(env, "w") as f:
        f.write(file_contents)


def escrituraINDEX(listaSinModel, listaRutas):
    ruta = os.getcwd()+'/index.js'
    f = open(ruta, 'a')
    f.writelines(["const express = require('express')",
                 "\nrequire('dotenv').config()", "\nconst cors = require('cors')\n"])
    for tupla in zip(listaSinModel, listaRutas):
        tuplMasAPI = tupla[0]+'API'
        variable = 'const {'+tuplMasAPI + \
            '} = require("./routes/'+tupla[1]+'")\n'
        f.writelines([variable])

    useAPP = 'const app = express()\napp.use(cors())\napp.use(express.static("./storageFiles"))\napp.use(express.json())\n'
    f.writelines([useAPP])
    for api in listaSinModel:
        apis = api+'API(app)\n'
        f.writelines([apis])

    port = 'const port = process.env.PORT\n app.listen(port, ()=> {\nconsole.log(`Servidor corriendo en http: // localhost: ${port}`)})'
    f.writelines([port])

    f.close()


def creacionControladores(sinModel, linea, controladores):
    file_contents = f"""const {sinModel} = require("../models").{linea};
module.exports.{sinModel} = {{
  listar: async (req, res) => {{
    try {{
      const data = await {sinModel}.findAll();
      res.status(200).send({{ data }});
    }} catch (error) {{
      console.log(error);
      res.send("ERROR DATA");
    }}
  }},
  crear: async (req, res) => {{
    try {{
      const {{ body }} = req;
      const data = await {sinModel}.create(body)
      res.status(200).send({{ data }})
    }} catch (error) {{
      console.log(error);
      res.status(403).send('Error al crear {sinModel}')
    }}
  }},
  actualizar: async (req, res) => {{
    try {{
      const {{ params: {{ id }} }} = req
      console.log(id);
      const {{ body }} = req
      const data = await {sinModel}.findOne({{ where: {{ id }} }})
      if (!data) {{
        res.res(404).send('No existe {sinModel} con ese Id')
      }}
      Object.assign(data, body)
      await data.save()
      res.status(200).send('Se actualizo {sinModel}')

    }} catch (error) {{
      console.log(error);
      res.status(403).send('Error al actualizar {sinModel}')
    }}
  }},
  eliminar: async (req, res) => {{
    try {{
      const {{ params: {{ id }} }} = req
      const data = await {sinModel}.findOne({{ where: {{ id }} }})
      if (!data) {{
        res.res(404).send('No existe {sinModel} con ese Id')
      }}

      //eliminar registro de la db
      await {sinModel}.destroy({{ where: {{ id }} }})
      res.status(200).send('Se elimino {sinModel}')
    }} catch (error) {{
      console.log(error);
      res.status(404).send('Error al eliminar {sinModel}')
    }}

  }}
}};"""

    with open(controladores, "w") as f:
        f.write(file_contents)


def creacionRutas(sinModel, controladorNombreJs, rutas):
    file_contents = f"""const {{{ sinModel }}} = require('../controllers/{controladorNombreJs}')
const {{ Router }} = require('express')


const router = Router()

module.exports.{sinModel}API = (app) => {{
  router
    .get('/', {sinModel}.listar)
    .post('/', {sinModel}.crear)
    .put('/:id', {sinModel}.actualizar)
    .delete('/:id', {sinModel}.eliminar)
  app.use('/api/vice/{sinModel}/', router)
}}"""

    with open(rutas, "w") as f:
        f.write(file_contents)


bibliotecas_instaladas = ['sequelize', 'express', 'pg', 'dotenv', 'cors']

# Pide al usuario que ingrese la ruta
# route = input("Ingrese la ruta para crear el Backend: ")
route = os.getcwd()


# Verificar si la biblioteca "mi_biblioteca" está instalada en la carpeta especificada
for bibliotecas in bibliotecas_instaladas:
    if os.path.isdir(os.path.join(route, "node_modules", bibliotecas)):
        print("La biblioteca " + bibliotecas +
              " está instalada en la carpeta especificada.")
    else:
        print("La biblioteca " + bibliotecas +
              " no está instalada en la carpeta especificada.")
        # Instalar la bibliotecas en la carpeta especificada
        subprocess.run(["npm", "install", bibliotecas, "--prefix", route])


# Carpetas a crear
listFolder = ['controllers', 'routes', 'validators']
raiz = ['index.js', '.env']
# creación de archivos raiz
for files_Raiz in raiz:
    file_name = os.path.join(route, str(files_Raiz))
    try:
        open(file_name, 'x')
        print('Archivo ' + files_Raiz + ' creado')
        # METODOS:
        print('\nEscribiendo el arhivo .env')
        escrituraENV()
    except:
        print('Ya existe el archivo --> ' + files_Raiz)


# creación de carpetas
for folders in listFolder:
    existFolder = os.path.isdir(route+'/'+str(folders))
    if existFolder == True:
        print('Ya existe la carpeta con nombre --->'+folders)
    else:
        print('Carpeta '+folders+' creada')
        os.mkdir(route+'/'+folders)


# FIXME: obtener nombres de los archivos de models
listaSinModel = []
listaRutas = []


ubicacion_raiz = os.getcwd()
ruta_Models = Path(ubicacion_raiz+'/models')
for entry in ruta_Models.iterdir():
    rutaArchivoALeer = str(ruta_Models)+'/'+entry.name
    # Abrir el archivo en modo lectura
    if str(entry.name) != 'index.js':
        with open(rutaArchivoALeer, "r") as archivo:
            # Recorrer cada línea del archivo
            for linea in archivo:
                if 'return' in linea:
                    # print(linea)
                    specialChars = ['return', ';', ' ', '\n']
                    for specialChar in specialChars:
                        linea = linea.replace(specialChar, '')
                    # print(linea)
                    sinModel = linea.replace('Model', '')
                    controladorNombreJs = sinModel+'.controller'
                    rutasNombreJs = sinModel+'.routes'

                    # //AGREGAR A LISTA
                    listaSinModel.append(str(sinModel))
                    listaRutas.append(str(rutasNombreJs))

                    controladores = ubicacion_raiz+'/controllers/'+controladorNombreJs+'.js'
                    rutas = ubicacion_raiz+'/routes/'+rutasNombreJs+'.js'
                    if os.path.exists(controladores) and os.path.exists(rutas):
                        pass
                    else:
                        creacionControladores(sinModel, linea, controladores)
                        creacionRutas(sinModel, controladorNombreJs, rutas)

    else:
        print('Index no es un controlador')

print('\nEscribiendo el arhivo index.js')
escrituraINDEX(listaSinModel, listaRutas)

print('\n####CONTROLADORES LISTOS############')
print('\n####RUTAS LISTAS############')
print('\n####index.js############')
# Fin de obtención nombres models


# Crea el archivo para el método GET
# file_name = f"{{route}.js"
# file_contents = f"""
# const express = require('express');
# const app = express();
#
# app.get('{route}', async (req, res) => {{
# const usuarios = await Usuario.findAll();
# res.send(usuarios);
# }});
#
# app.listen(3000, () => {{
# console.log('Servidor Express iniciado en el puerto 3000');
# }});
# """
# with open(file_name, "w") as f:
# f.write(file_contents)
#
