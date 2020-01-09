
January 09
========

Today i have:

1. created a new Lambda function

2. added in the Boto3 library to access the database

3. query the database to return a row of information

4. returned the row in JSON format from the lambda function

I also practiced and learned what would happen if no actual data is given (ex: fake email that doesn't exist in the table)


.. code-block:: python
	:linenos:

   #!/usr/bin/env python3
   
   # Created by: Izza Khalid
   # Created on: January 2020
   # This function returns a row from our challenged_users DynamoDB
   
   import json
   import boto3
   import decimal
   
   def replace_decimals(obj):
           # Helper class to Decimals in an arbitrary object
           #   from: https://github.com/boto/boto3/issues/369
   
       if isinstance(obj, list):
           for i in range(len(obj)):
               obj[i] = replace_decimals(obj[i])
           return obj
       elif isinstance(obj, dict):
           for k, v in obj.items():
               obj[k] = replace_decimals(v)
           return obj
       elif isinstance(obj, set):
           return set(replace_decimals(i) for i in obj)
       elif isinstance(obj, decimal.Decimal):
           if obj % 1 == 0:
               return int(obj)
           else:
               return float(obj)
       else:
           return obj
   
   def lambda_handler(event, context):
       # This function returns a row from our challenged_users DynamoDB
   
       dynamodb = boto3.resource('dynamodb')
       table = dynamodb.Table('challenged_users')
       response = table.get_item(
           Key = {
               'email':event['email_address']
           }
       )
   
       try:
           result = response['Item']
           result = replace_decimals(result)
       except:
           result = {}
   
       print(result)
           
       return_var = {
           'statusCode': 200,
           'body': json.dumps(result)
       }
   
       return return_var
