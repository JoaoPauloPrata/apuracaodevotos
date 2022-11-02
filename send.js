// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
this.mySQL = require('mysql2');
// Set the region 
AWS.config.loadFromPath(__dirname + '/config.json');
// Create an SQS service object
var sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function main() {
    console.log("Iniciando apuração");
    var count = 0
    while (count < 2000) {
        var candidato1 = Math.floor(Math.random() * 100)
        var candidato2 = Math.floor(Math.random() * 80)
        var nulos = Math.floor(Math.random() * 15)
        var brancos = Math.floor(Math.random() * 20)
        var params = {
            DelaySeconds: 0,
            MessageAttributes: {
                "Candidato1": {
                    DataType: "Number",
                    StringValue: candidato1.toString()
                },
                "Candidato2": {
                    DataType: "Number",
                    StringValue: candidato2.toString()
                },
                "VotosNulos": {
                    DataType: "Number",
                    StringValue: nulos.toString()
                },
                "Brancos": {
                    DataType: "Number",
                    StringValue: brancos.toString()
                }
            },
            MessageBody: "Apuração dos votos",
            QueueUrl: "https://sqs.us-east-1.amazonaws.com/200416781616/SQS_QUEUE_NAME"
        };

        sqs.sendMessage(params, function (err, data) {
            if (err) {
                console.log("Error", err);
            } else {
                console.log("Success", data.MessageId);
            }
        });
        await sleep(1000)
        count += 1
    }
}
main()