To upload the functions

- Zip up the mg-functions folder without tsconfig, .vscode, 
- Upload zip to azure blob storage
- Generate SAS for uploaded zip
- Copy SAS URL
- Go to the Function app
- Paste SAS into the WEBSITE_RUN_FROM_PACKAGE application setting