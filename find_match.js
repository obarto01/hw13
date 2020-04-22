// Used for help with async functions: https://blog.risingstack.com/mastering-async-await-in-nodejs/


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://obartok:Seamus12@cluster0-iwn01.mongodb.net/test?retryWrites=true&w=majority";

var http = require('http');
var url = require('url');

async function main()
{
	http.createServer(async function(req, res){
		res.writeHead(200, {'Content-Type':'text/html'});
		var qobj = url.parse(req.url, true).query;
		var name = qobj.user_inpt;
		var my_obj;
		if (qobj.title != null)
		{
			if (qobj.title == "Company")
			{
				query_comp(name,res);
			}
			else
			{
				query_ticker(name,res);
			}
		}
	}).listen(8080);
}
main().catch(console.error);


async function query_comp(company, res){
	MongoClient.connect(uri, { useUnifiedTopology: true }, async function(err, client) {
		if(err) { return console.log(err); }

		let dbo = client.db("hw_13");
		let collection = dbo.collection('companies');

		collection.find({"company" : company}).toArray(function(err, result) {
            if (err) { return console.log(err); }
            var query = result;
            client.close();
            for (index = 0; index < query.length; index++) { 
    			res.write("ID: " + query[index]._id + "<br>");
    			res.write("Company: " + query[index].company + "<br>");
    			res.write("Stock Ticker: " + query[index].ticker + "<br>");
			} 
			if (query.length == 0)
			{
				res.write("THERE ARE NO MATCHES FOR YOUR SEARCH");
			}
            res.end();
        });
	});
}

async function query_ticker(ticker, res){
	MongoClient.connect(uri, { useUnifiedTopology: true }, async function(err, client) {
		if(err) { return console.log(err); }

		let dbo = client.db("hw_13");
		let collection = dbo.collection('companies');

		collection.find({"ticker" : ticker}).toArray(function(err, result) {
            if (err) { return console.log(err); }
            var query = result;
            client.close();
            for (index = 0; index < query.length; index++) { 
    			res.write("ID: " + query[index]._id + "<br>");
    			res.write("Company: " + query[index].company + "<br>");
    			res.write("Stock Ticker: " + query[index].ticker + "<br>");
			} 
			if (query.length == 0)
			{
				res.write("THERE ARE NO MATCHES FOR YOUR SEARCH");
			}
            res.end();
        });
	});
}
