var fs = require('fs')

exports.isStaticResource = function(req)
{
    return /\/w3.css$/.test(req.url)
}

exports.serverStaticResources = function serverStaticResource(req, res)
{
    var file = req.url.split('/').pop()

    fs.readFile('public/' + file, (error, data) => {
        if(error)
        {
            console.log("Error: File " + file + " not found." + erro)
            res.statusCode = 404
            res.end('Error: File ' + file + " not found.")
        }
        else
        {
            if(file == 'w3.css')
            {
                res.setHeader('Content-Type', 'text/css')
                res.end(data)
            }
        }
    })
}