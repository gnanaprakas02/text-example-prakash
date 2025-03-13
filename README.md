# 🚀 test-example (AWS Serverless API)

This is a **serverless API** built using **AWS Lambda**, **API Gateway**, and **DynamoDB**, deployed with **AWS SAM**. It allows users to store and retrieve data.

## 📌 Features
- AWS Lambda for backend processing
- API Gateway for HTTP requests
- DynamoDB for data storage
- AWS SAM for deployment and local testing

## ⚡ Prerequisites
- **AWS CLI** ([Install](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html))
- **AWS SAM CLI** ([Install](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html))
- **Node.js** (LTS version)
- **Thunder Client (VS Code Extension)** for testing

## 🚀 Setup & Installation
```sh
git clone https://github.com/your-username/test-example.git
cd test-example
cd hello-world && npm install
aws configure  # Set up AWS credentials


🛠️ Local Testing
Test with Thunder Client (VS Code) or cURL:

✅ POST /user (Add User)
https://20eo529buf.execute-api.us-east-1.amazonaws.com/Prod/User
Body of the Thunder Client
{
      "id": "1",
      "name": "Gnanaprakash"
}

✅ Response:

{
  "message": "Data stored successfully",
  "id": "1"
}

✅ GET /hello?id=1 (Retrieve User)

{
  "id": "1",
  "name": "Gnanaprakash"
}

🚀 Deploy to AWS
sam deploy --guided

After deployment, use the API Gateway URL for testing.



