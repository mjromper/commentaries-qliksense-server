# Commentaries for Qlik Sense - Server side

This is the server side (backend) Nodejs module that enables a REST API for the ***commentaries extension*** for Qlik Sense available in this repository (https://github.com/mjromper/commentaries-qliksense).

### DEPENDENCIES

* The data (commentaries) is stored in files using NeDB (https://github.com/louischatriot/nedb) which is an embedded persistent or in memory database for NodeJs. Its API is a subset of MongoDB's and it's plenty fast!!

## REST-API endpoints

Commentary object definition:
```
    {
    	_id: "string" 				// Autogenerated by neDB
        created: "date",	 		// Ej: "2017-04-18T10:33:53.506Z"
        text: "string",				// The message to store
        user: "string",				// User who wrote this message
        sheetId: "string",			// The sheet this message belongs to
        anchor: "string",			// Specifify dimension(s) this message is attached to
        appId: "string"				// The AppId this message belongs to
    }
```


Retrieve all commentary attached to a sheet and an anchor
```
    GET - https://HOSTNAME:8200/api/comments?sheetId=SHEET_ID&anchor=ANCHOR_VALUE
```
Add a new commentary
```
    POST - https://HOSTNAME:8200/api/comments
```
Update a specific commentary
```
    POST - https://HOSTNAME:8200/api/comments/:id
```
Delete a specific commentary
```
    DELETE - https://HOSTNAME:8200/api/comments/:id
```

## Installation of this module

* Launch PowerShell in Administrator mode (right-click and select Run As Administrator)
* Create and change directory to an empty directory, i.e. C:\TempCommentaries

```powershell
    mkdir \TempCommentaries; cd \TempCommentaries
```

* Enter the below command exactly as it is (including parentheses):

```powershell
    (Invoke-WebRequest "https://raw.githubusercontent.com/mjromper/commentaries-qliksense-server/master/setup.ps1" -OutFile setup.ps1) | .\setup.ps1
```

This will download and execute the setup script.

When the downloading and installation of the modules including their dependencies are finished you will be prompted for some configuration options.

```
Enter port [8200]:
```

- ***port***: *This is the port where the server will be running on*


When the script is finished you need to restart Qlik ServiceDispacher service.





