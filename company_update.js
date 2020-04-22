//Used sample code node_mongo_insert for basic set up

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://obartok:Seamus12@cluster0-iwn01.mongodb.net/test?retryWrites=true&w=majority";
var fs = require('fs');
var readline = require('readline');


function main() 
{
	var myFile = readline.createInterface({
		input: fs.createReadStream('companies.csv')
	});

	myFile.on('line', function (line) {
		var array = line.split(",");
		console.log(array[0] + " " + array[1]);
		add_co(array[0], array[1]);
	});
}

async function add_co(company, ticker)
{
	if (company != "Company")
	{
		MongoClient.connect(url, function(err, client) {
			if(err) { return console.log(err); }

			var dbo = client.db("hw_13");
			var collection = dbo.collection('companies');

			var newData = {"company": company, "ticker": ticker};
			collection.insertOne(newData, function(err, res) {
			if (err) throw err;
			console.log("new document inserted");
			}   );

			console.log("Success!");
			client.close();

		});
	}
}

main();
