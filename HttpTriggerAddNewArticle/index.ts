import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { Client } from "pg";

interface Article {
  name: string
  author: string
  body: string
  time: number
  guid: string
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    try {
        context.log(`PGHOST: ${process.env["PGHOST"]}`)

        context.log('body:', typeof req.body, req.body)

        const body = (typeof req.body === 'string' ? JSON.parse(req.body) : req.body) as Article

        context.log(`JsonBody:`, body)

        const client = new Client({ssl: {rejectUnauthorized: false}});

        context.log('Created Client');

        await client.connect()

        context.log('Client connected');

        const sql = `INSERT INTO articles (name, author, body, time, guid) VALUES ('${body.name}', '${body.author}', '${body.body}', ${body.time},'${body.guid}');`
        
        context.log('sql:', sql)

        await client.query(sql)


        context.res = {
            status: 200,
        }

        context.log('HTTP trigger function completed a request.');

    } catch (e) {
        context.log('Encountered error', e)

        context.res = {
            status: 500,
            body: 'Encountered error' + e
        }
    }
};

export default httpTrigger;