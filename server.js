const http = require('http');

const fs = require('fs');

const path = require('path');
const { text } = require('stream/consumers');
const { availableMemory } = require('process');

const server = http.createServer(
     (req , res) => {

        let filePath = path.join( __dirname , 
            'public',
            req.url === '/' ? 'index.html' : req.url
        );
        let extname = path.extname(filePath);
            let contentType = "text/html" ;

        switch(contentType) {
            case ".js":
             contentType = "text/javascript";
             break;
             case ".json" :
                contentType = "application/json";
            break;
            case ".css" :
                contentType = "text/css";
                break ;
        }
        if(contentType === "text/html" && extname === "") {
            filePath += ".html";
        }
        fs.readFile( filePath , 

            (err , data) => {
                if(err) {
                    console.log(err);
                    if(err.code === 'ENOENT') {
                        fs.readFile(path.join( __dirname ,"public","404.html") , (err , data) => {
                            res.writeHead(404 , {"Content-Type" : 'text/html'});
                            res.end(data)
                        } );
                        
                    } else {
                        res.writeHead(500);
                        res.end(`server error => error Code : ${err.code}`);
                    }
                    ;
                    
                }else {
                    res.writeHead( 200 , {'content-Type' : contentType});
                    res.end(data);
                };
            }

        )
        
        console.log(filePath);

     }
    
    
);
server.listen(3000 , () => console.log('server is run')
)
