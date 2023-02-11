import { Coin } from "@cosmjs/proto-signing";
import { MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx";
import {
	MsgClearAdmin,
	MsgUpdateAdmin,
} from "cosmjs-types/cosmwasm/wasm/v1/tx";

export interface ExecuteMsgType {
	sender: string;
	contract: string;
	msg: {};
	funds: Coin[];
}

export interface InstantiateMsgType {
	sender: string;
	admin: string;
	codeId: number;
	label: string;
	msg: {};
	funds: Coin[];
}

export interface StoreCodeMsgType {
	sender: string;
	file: string;
}

export interface MigrateMsgType {
	sender: string;
	contract: string;
	codeId: number;
	msg: {};
}

export type MessageValueTypes =
	| ExecuteMsgType
	| InstantiateMsgType
	| StoreCodeMsgType
	| MsgSend
	| MigrateMsgType
	| MsgClearAdmin
	| MsgUpdateAdmin;

export interface Message {
	type_url: string;
	value: MessageValueTypes;
}
