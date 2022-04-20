import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { Client } from 'pg';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    try {

        context.log(`PGHOST: ${process.env["PGHOST"]}`)

        const client = new Client({ssl: {rejectUnauthorized: false}});

        context.log('Created Client');

        await client.connect()

        context.log('Client connected');

        const res = await client.query('SELECT * FROM articles;')
        const json = JSON.stringify(res.rows)

        context.log(`Client recieved response: ${json}`)

        context.res = {
            status: 200,
            body: json
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
