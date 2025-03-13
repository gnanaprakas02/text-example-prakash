import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand } from '@aws-sdk/lib-dynamodb';


const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.TABLE_NAME || '';


export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    
    if (event.httpMethod === 'POST' && event.path === '/user') {
      const body = JSON.parse(event.body || '{}');
      const id = body.id || `${Date.now()}`; 
      const data = { id, ...body }; 

      await ddbDocClient.send(
        new PutCommand({
          TableName: TABLE_NAME,
          Item: data,
        })
      );

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Data stored successfully', id }),
      };
    }

    
    if (event.httpMethod === 'GET' && event.path === '/hello') {
      const id = event.queryStringParameters?.id; 
      if (!id) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'Missing id query parameter' }),
        };
      }

      const result = await ddbDocClient.send(
        new GetCommand({
          TableName: TABLE_NAME,
          Key: { id },
        })
      );

      if (!result.Item) {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: 'Item not found' }),
        };
      }

      return {
        statusCode: 200,
        body: JSON.stringify(result.Item),
      };
    }

    
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid request' }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
};