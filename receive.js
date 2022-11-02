const DatabaseConnector = require('./DatabaseConnector')
var AWS = require('aws-sdk');
AWS.config.loadFromPath(__dirname + '/config.json');
var sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

var queueURL = "https://sqs.us-east-1.amazonaws.com/200416781616/SQS_QUEUE_NAME";
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

var params = {
    MessageAttributeNames: [
        "All"
    ],
    MaxNumberOfMessages: 10,
    QueueUrl: queueURL,
    VisibilityTimeout: 20,
};
async function main() {
    console.log("Iniciando apuração");
    var brancos = 0
    var nulos = 0
    var candidato1 = 0
    var candidato2 = 0
    var count = 0
    var dbContext = new DatabaseConnector();
    while (true) {
        await sqs.receiveMessage(params, async function (err, data) {
            if (err) {
                console.log("Receive Error", err);
            } else if (data.Messages) {
                data.Messages.forEach(element => {
                    brancos += parseInt(element.MessageAttributes.Brancos.StringValue);
                    nulos += parseInt(element.MessageAttributes.VotosNulos.StringValue);
                    candidato1 += parseInt(element.MessageAttributes.Candidato1.StringValue);
                    candidato2 += parseInt(element.MessageAttributes.Candidato2.StringValue);
                    count += 1;
                });
                console.log(count)
                if (count % 100 == 0) {
                    dbContext.insertInResults(candidato1, candidato2, nulos, brancos);
                }
                // console.log("RESULTADO DAS APURACOES")
                // console.log("CANDIDATO 1", candidato1)
                // console.log("CANDIDATO 2", candidato2)
                // console.log("Nulos", nulos)
                // console.log("Brancos", brancos)
                data.Messages.forEach(element => {
                    var deleteParams = {
                        QueueUrl: queueURL,
                        ReceiptHandle: element.ReceiptHandle
                    };
                    sqs.deleteMessage(deleteParams, function (err, data) {
                        if (err) {
                            console.log("Delete Error", err);
                        }
                    });
                });
            }
        });
        await sleep(200)
        count++;
    }
}
main()