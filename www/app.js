var express = require('express')
var unirest = require('unirest')
var app = express()

app.set('view engine', 'jade');
app.set('views', './');

app.use(express.static(__dirname + '/'));


app.get('/', function (req, res) {
    console.log('/');
    res.render('index');
});

app.get('/mobileCheck', function (req, res) {
    console.log('/mobileCheck');

    var code = req.query.code;
    var url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxac7b11d60ee735c4&secret=86e14ba953ec74fe13a7b5038735ef14&code="+code+"&grant_type=authorization_code";
    unirest.post(url)
        .end(function (res) {
            if (res.error) {
                console.log('POST error', res.error)
            } else {
                console.log('POST response', res.body)
            }
        });

    console.log(code);
    res.render('index');
});
app.listen(3000);