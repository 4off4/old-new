const { request } = require('express');
const express = require('express');
const app = express();
const session = require('express-session');

//node restart 없이 자동반영되게끔
const fs = require('fs');   //filesystem으로 directory에 접근할수있게한다

app.use(session({
    secret: 'secret code',      //session에 대한 key
    resave: false,              //request 요청이 왔을 때 session에 수정 사항이 생기지 않더라도 session을 다시 저장할지 여부
    saveUninitialized: false,   //session에 저장 할 내역이 없더라도 session을 항상 재저장할지 여부
    cookie:{
        secure: false,          //false로 해야 session에 값이 넘어가고 뭐 이렇게 되나봄
        maxAge: 1000 * 60 * 60  //쿠키 유효시간 1시간
    }
}));

const server = app.listen(3000, () => {
    console.log('Server started. port 3000.');
});

let sql = require('./sql.js');

fs.watchFile(__dirname + '/sql.js', (curr, prev) => {
    console.log('sql 변경 시 재시작 없이 반영되도록 함');
    delete require.cache[require.resolve('./sql.js')];          //캐시를날림
    sql = require('./sql.js');                                  //변경한 쿼리를 다시 담아줌 
});

//db 접속정보
const db = {
    database: "dev",
    connectionLimit: 10,
    host: "127.0.0.1",
    user: "root",
    password: "mariadb"
};

const dbpool = require('mysql').createPool(db);

app.post('/api/login', async (request, res) => {
    request.session['email'] = '4off4@naver.com';
    res.send('OK');
});

app.post('/api/logout', async (request, res) => {
    request.session.destroy();
    res.send('Ok');
});


//:alias 위에 post로 login, logout 지정해놓은 것이 아닌 다른 key로 들어올 때 다 이걸 타는것이다
app.post('/api/:alias', async (request, res) => {
    if(!request.session.email) {
        return res.status(401).send({
            error:'You need to Login.'
        });
    }

    try {
        res.send(await req.db(request.params.alias));
    } catch(err) {
        res.status(500).send({
            error: err
        });
    }
});

const req = { 
    async db(alias, param = [], where = '' ) {
        return new Promise((resolve, reject) => dbPool.query(sql[alias].query + where , param, (error, rows) => {
             if ( error ) {
                if ( error.code != 'ER_DUP_ENTRY')
                    console.log(error); 
                resolve({
                    error
                });
             } else resolve(rows);
        }));
     } 
};