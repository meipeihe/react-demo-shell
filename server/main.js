const express = require('express')
const execShPromise = require("exec-sh").promise;
const PORT = 8000

const app = express()

const run = async (cmd) => {
    let out;

    try {
        out = await execShPromise(cmd, true);
        console.log(out)
    } catch (e) {
        return e.stderr;
    }
    return out.stdout
}


app.get('/api/v1/command/:cmd',(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    run(req.params['cmd']).then((result)=>{
        if(result === '') result = 'success'
        res.send(result)
    })
})

app.listen(PORT, ()=>{
    console.log('listen on port 8000')
})
