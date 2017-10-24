/* eslint-env jest */
import { toSwagger, fromSwagger } from '../src/web/utils'

const state = JSON.parse(`{
  "info": {
    "title": "Example API",
    "version": "1.0",
    "description": "Restful API for Example",
    "termsOfService": "https://www.example.com/terms-of-service",
    "host": "api.example.com",
    "basePath": "/",
    "schemes": [
      "https"
    ],
    "produces": [
      "application/json"
    ],
    "consumes": [
      "application/json"
    ],
    "tags": [
      "API Versions",
      "Call Log"
    ]
  },
  "permissions": [
    {
      "createdAt": 1498875025725,
      "name": "EditAccounts",
      "description": "Viewing and updating user account info (including name, business name, address and phone number/account number)"
    },
    {
      "createdAt": 1498875008388,
      "name": "Accounts",
      "description": "Managing accounts: creating new accounts, viewing and updating account information, deleting existing accounts"
    },
    {
      "createdAt": 1498875020815,
      "name": "Contacts",
      "description": "Creating, viewing, editing and deleting user personal contacts"
    },
    {
      "createdAt": 1498875020899,
      "name": "ReadCallLog",
      "description": "Viewing user call logs"
    }
  ],
  "pathParameters": [
    {
      "createdAt": 1498875032646,
      "name": "accountId",
      "description": "Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session",
      "enum": []
    },
    {
      "createdAt": 1498875033792,
      "name": "scaleSize",
      "description": "Dimensions of a profile image which will be returned in response",
      "enum": [
        "90x90",
        "195x195",
        "584x584"
      ]
    },
    {
      "createdAt": 1498875137756,
      "name": "answeringRuleId",
      "description": "Internal identifier of an answering rule. The value can be standard digital ID or specific ID - either business-hours-rule or after-hours-rule",
      "enum": []
    },
    {
      "createdAt": 1498875138459,
      "name": "attachmentId",
      "description": "Internal identifier of a message attachment",
      "enum": []
    }
  ],
  "paths": [
    {
      "createdAt": 1498875254374,
      "name": "Base URL",
      "uri": "/restapi",
      "requests": [
        {
          "createdAt": 1498875254375,
          "name": "Get API Versions",
          "description": "Returns current API version(s) and server info.",
          "since": "1.0.2",
          "apiGroup": "Light",
          "permissions": [],
          "batch": false,
          "beta": false,
          "accessLevel": "Public",
          "status": "Normal",
          "method": "GET",
          "tags": [
            "API Versions"
          ],
          "parameters": [],
          "request": [],
          "response": [],
          "examples": []
        }
      ]
    },
    {
      "createdAt": 1498875254399,
      "name": "Call Log",
      "uri": "/restapi/v1.0/account/{accountId}/extension/{extensionId}/call-log",
      "requests": [
        {
          "createdAt": 1498875254399,
          "name": "Get User Call Log",
          "description": "Returns filtered call log records.",
          "since": "1.0.3 (Release 5.11)",
          "apiGroup": "Heavy",
          "permissions": [
            "ReadCallLog"
          ],
          "batch": false,
          "beta": false,
          "accessLevel": "Basic",
          "status": "Normal",
          "method": "GET",
          "tags": [
            "Call Log"
          ],
          "parameters": [],
          "request": [],
          "response": [],
          "examples": []
        }
      ]
    }
  ],
  "models": [
    {
      "createdAt": 1498875254895,
      "name": "AccountInfo",
      "properties": [
        {
          "createdAt": 1498875254896,
          "name": "id",
          "type": "string",
          "enum": [],
          "isArray": false,
          "required": true,
          "description": "Internal identifier of an account"
        },
        {
          "createdAt": 1498875254897,
          "name": "uri",
          "type": "string",
          "enum": [],
          "isArray": false,
          "required": false,
          "description": "Canonical URI of an account"
        },
        {
          "createdAt": 1498875254898,
          "name": "mainNumber",
          "type": "string",
          "enum": [],
          "isArray": false,
          "required": false,
          "description": "Main phone number of the current account"
        }
      ]
    },
    {
      "createdAt": 1498875255421,
      "name": "AnsweringRuleInfo",
      "properties": [
        {
          "createdAt": 1498875255422,
          "name": "id",
          "type": "string",
          "enum": [],
          "isArray": false,
          "required": true,
          "description": "Internal identifier of an asnwering rule"
        },
        {
          "createdAt": 1498875255423,
          "name": "uri",
          "type": "string",
          "enum": [],
          "isArray": false,
          "required": false,
          "description": "Canonical URI to the answering rule resource"
        },
        {
          "createdAt": 1498875255424,
          "name": "type",
          "type": "string",
          "enum": [
            "BusinessHours",
            "AfterHours",
            "Custom"
          ],
          "isArray": false,
          "required": false,
          "description": "Type of an answering rule"
        }
      ]
    },
    {
      "createdAt": 1498875255943,
      "name": "VersionInfo",
      "properties": [
        {
          "createdAt": 1498875255944,
          "name": "uri",
          "type": "string",
          "enum": [],
          "isArray": false,
          "required": true,
          "description": "Canonical URI of API versions"
        },
        {
          "createdAt": 1498875255945,
          "name": "versionString",
          "type": "string",
          "enum": [],
          "isArray": false,
          "required": false,
          "description": "Version of the RingCentral REST API"
        },
        {
          "createdAt": 1498875255946,
          "name": "releaseDate",
          "type": "date-time",
          "enum": [],
          "isArray": false,
          "required": false,
          "description": "Release date of this version"
        },
        {
          "createdAt": 1498875255947,
          "name": "uriString",
          "type": "string",
          "enum": [],
          "isArray": false,
          "required": false,
          "description": "URI part determining the current version"
        }
      ]
    }
  ]
}`)

const swagger = JSON.parse(`{
  "swagger": "2.0",
  "info": {
    "version": "1.0",
    "title": "Example API",
    "description": "Restful API for Example",
    "termsOfService": "https://www.example.com/terms-of-service"
  },
  "host": "api.example.com",
  "basePath": "/",
  "schemes": [
    "https"
  ],
  "produces": [
    "application/json"
  ],
  "consumes": [
    "application/json"
  ],
  "parameters": {
    "accountId": {
      "name": "accountId",
      "in": "path",
      "required": true,
      "type": "string",
      "description": "Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session"
    },
    "scaleSize": {
      "name": "scaleSize",
      "in": "path",
      "required": true,
      "type": "string",
      "enum": [
        "90x90",
        "195x195",
        "584x584"
      ],
      "description": "Dimensions of a profile image which will be returned in response"
    },
    "answeringRuleId": {
      "name": "answeringRuleId",
      "in": "path",
      "required": true,
      "type": "string",
      "description": "Internal identifier of an answering rule. The value can be standard digital ID or specific ID - either business-hours-rule or after-hours-rule"
    },
    "attachmentId": {
      "name": "attachmentId",
      "in": "path",
      "required": true,
      "type": "string",
      "description": "Internal identifier of a message attachment"
    }
  },
  "definitions": {
    "AccountInfo": {
      "type": "object",
      "properties": {
        "id": {
          "description": "Internal identifier of an account",
          "type": "string"
        },
        "uri": {
          "description": "Canonical URI of an account",
          "type": "string"
        },
        "mainNumber": {
          "description": "Main phone number of the current account",
          "type": "string"
        }
      }
    },
    "AnsweringRuleInfo": {
      "type": "object",
      "properties": {
        "id": {
          "description": "Internal identifier of an asnwering rule",
          "type": "string"
        },
        "uri": {
          "description": "Canonical URI to the answering rule resource",
          "type": "string"
        },
        "type": {
          "description": "Type of an answering rule",
          "type": "string",
          "enum": [
            "BusinessHours",
            "AfterHours",
            "Custom"
          ]
        }
      }
    },
    "VersionInfo": {
      "type": "object",
      "properties": {
        "uri": {
          "description": "Canonical URI of API versions",
          "type": "string"
        },
        "versionString": {
          "description": "Version of the RingCentral REST API",
          "type": "string"
        },
        "releaseDate": {
          "description": "Release date of this version",
          "type": "string",
          "format": "date-time"
        },
        "uriString": {
          "description": "URI part determining the current version",
          "type": "string"
        }
      }
    }
  },
  "paths": {
    "/restapi": {
      "get": {
        "tags": [
          "API Versions"
        ],
        "description": "Get API Versions. Returns current API version(s) and server info.",
        "responses": {
          "default": {
            "description": "OK"
          }
        }
      }
    },
    "/restapi/v1.0/account/{accountId}/extension/{extensionId}/call-log": {
      "get": {
        "tags": [
          "Call Log"
        ],
        "description": "Get User Call Log. Returns filtered call log records.",
        "responses": {
          "default": {
            "description": "OK"
          }
        }
      },
      "parameters": [
        {
          "$ref": "#/parameters/accountId"
        },
        {
          "$ref": "#/parameters/extensionId"
        }
      ]
    }
  }
}`)

describe('swagger 2.0', () => {
  test('export', () => {
    const result = toSwagger(state)
    expect(result).toEqual(swagger)
  })
  test('import', () => {
    const result = fromSwagger(swagger)
    expect(result.info).toEqual(state.info)
  })
})
