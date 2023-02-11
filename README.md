
# 🐶 Currently supported the following messages 
- /cosmwasm.wasm.v1.MsgExecuteContract
- /cosmwasm.wasm.v1.MsgInstantiateContract
- /cosmwasm.wasm.v1.MsgStoreCode
- /cosmos.bank.v1beta1.MsgSend
- /cosmwasm.wasm.v1.MsgMigrateContract
- /cosmwasm.wasm.v1.MsgClearAdmin
- /cosmwasm.wasm.v1.MsgUpdateAdmin
---
## Usage

**Setting up environment variables are required**
- `MNEMONIC` - mnemonic
- `RPC` - rpc endpoint
- `CHAIN_PREFIX` - chain prefix

---
## Function
#### sendTransaction
**Parameter**
- **messagesFile** `string` - Path of messaage JSON file
- **gasPrice** (Optional) `Coin` - gas price, default is set to `{
		denom: "uosmo",
		amount: "25000"
	}`

---

## Samples
- Sample WASM file: `./src/assets/wasm/test_sc.wasm`
- Sample messages.json file: `./messages.json`
- Sample of test file: `./test.ts`

---
## Message Template in JSON Form

### Execute message
``` JSON
{
    "type_url": "/cosmwasm.wasm.v1.MsgExecuteContract",
    "value": {
        "sender": "string",
        "contract": "string",
        "msg": "object",
        "funds": "array"
    }
}
```

### Instantiate messsage
``` JSON
{
    "type_url": "/cosmwasm.wasm.v1.MsgInstantiateContract",
    "value": {
        "sender": "string",
        "admin": "string",
        "codeId": "number",
        "label": "string",
        "msg": "object",
        "funds": "array"
    }
}
```

### Store Code / Upload message
``` JSON
{
    "type_url": "/cosmwasm.wasm.v1.MsgStoreCode",
    "value": {
        "sender": "string",
        "file": "string" // File path
    }
}
```

### Send message
``` JSON
{
    "type_url": "/cosmos.bank.v1beta1.MsgSend",
    "value": {
    "fromAddress": "string",
    "toAddress": "string",
    "amount": [
        {
            "denom": "string",
            "amount": "string"
        }
    ]
}
}
```

### Migrate messaage
``` JSON
{
    "type_url": "/cosmwasm.wasm.v1.MsgMigrateContract",
    "value": {
        "sender": "string",
        "contract": "string",
        "codeId": "number",
        "msg": "object"
    }
}
```

### Clear Admin message
``` JSON
{
    "type_url": "/cosmwasm.wasm.v1.MsgClearAdmin",
    "value": {
        "sender": "string",
        "contract": "string",
    }
}
```

### Update Admin message
``` JSON
{
    "type_url": "/cosmwasm.wasm.v1.MsgUpdateAdmin",
    "value": {
        "sender": "string",
        "newAdmin": "string",
        "contract": "string"
    }
}
```
