import {
	MsgExecuteContract,
	MsgStoreCode,
	MsgInstantiateContract,
	MsgMigrateContract,
	MsgClearAdmin,
	MsgUpdateAdmin,
} from "cosmjs-types/cosmwasm/wasm/v1/tx";
import { MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx";
import fs from "fs";
import {
	MsgClearAdminEncodeObject,
	MsgExecuteContractEncodeObject,
	MsgInstantiateContractEncodeObject,
	MsgMigrateContractEncodeObject,
	MsgStoreCodeEncodeObject,
	MsgUpdateAdminEncodeObject,
} from "@cosmjs/cosmwasm-stargate";
import { MsgSendEncodeObject } from "@cosmjs/stargate";
import Long from "long";
import type {
	ExecuteMsgType,
	InstantiateMsgType,
	MigrateMsgType,
	StoreCodeMsgType,
} from "./types";
import { b64ToBuffer } from "./utils";

// Execute message
export const executeMsg = (value: ExecuteMsgType) => {
	return {
		typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
		value: {
			...value,
			msg: Buffer.from(JSON.stringify(value.msg)),
		} as MsgExecuteContract,
	} as MsgExecuteContractEncodeObject;
};

// Instantiate message
export const instantiateMsg = (value: InstantiateMsgType) => {
	return {
		typeUrl: "/cosmwasm.wasm.v1.MsgInstantiateContract",
		value: {
			...value,
			msg: Buffer.from(JSON.stringify(value.msg)),
			codeId: new Long(value.codeId),
		} as MsgInstantiateContract,
	} as MsgInstantiateContractEncodeObject;
};

// Store code message
export const storeCodeMsg = (value: StoreCodeMsgType) => {
	const file = fs.readFileSync(value.file);

	return {
		typeUrl: "/cosmwasm.wasm.v1.MsgStoreCode",
		value: {
			...value,
			wasmByteCode: new Uint8Array(file),
		} as MsgStoreCode,
	} as MsgStoreCodeEncodeObject;
};

// Send messsage
export const sendMsg = (value: MsgSend) => {
	return {
		typeUrl: "/cosmos.bank.v1beta1.MsgSend",
		value,
	} as MsgSendEncodeObject;
};

// Migrate message
export const migrateMsg = (value: MigrateMsgType) => {
	return {
		typeUrl: "/cosmwasm.wasm.v1.MsgMigrateContract",
		value: {
			...value,
			codeId: new Long(value.codeId),
			msg: Buffer.from(JSON.stringify(value.msg)),
		} as MsgMigrateContract,
	} as MsgMigrateContractEncodeObject;
};

// Clear Admin message
export const clearAdminMsg = (value: MsgClearAdmin) => {
	return {
		typeUrl: "/cosmwasm.wasm.v1.MsgClearAdmin",
		value,
	} as MsgClearAdminEncodeObject;
};

// Update admin message
export const updateAdminMsg = (value: MsgUpdateAdmin) => {
	return {
		typeUrl: "/cosmwasm.wasm.v1.MsgUpdateAdmin",
		value,
	} as MsgUpdateAdminEncodeObject;
};
