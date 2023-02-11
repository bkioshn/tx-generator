import { MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx";
import {
	MsgClearAdmin,
	MsgUpdateAdmin,
} from "cosmjs-types/cosmwasm/wasm/v1/tx";
import {
	ExecuteMsgType,
	InstantiateMsgType,
	Message,
	MessageValueTypes,
	MigrateMsgType,
	StoreCodeMsgType,
} from "./types";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import {
	Coin,
	DirectSecp256k1HdWallet,
	EncodeObject,
} from "@cosmjs/proto-signing";
import {
	clearAdminMsg,
	executeMsg,
	instantiateMsg,
	migrateMsg,
	sendMsg,
	storeCodeMsg,
	updateAdminMsg,
} from "./messageGenerate";

const MNEMONIC = process.env.MNEMONIC;
const RPC = process.env.RPC;
const PREFIX = process.env.CHAIN_PREFIX;
import fs from "fs";
import { StdFee } from "@cosmjs/stargate";

const createClient = async () => {
	if (!MNEMONIC) throw new Error("Please provie Mnemonic");
	if (!RPC) throw new Error("Please provie rpc endpoint");
	const wallet = await DirectSecp256k1HdWallet.fromMnemonic(MNEMONIC, {
		prefix: PREFIX,
	});
	const address = (await wallet.getAccounts())[0].address;
	const client = await SigningCosmWasmClient.connectWithSigner(RPC, wallet);
	return { address, client };
};

const selectMessageType = (message: {
	type_url: string;
	value: MessageValueTypes;
}) => {
	switch (message.type_url) {
		case "/cosmwasm.wasm.v1.MsgExecuteContract":
			return executeMsg(message.value as ExecuteMsgType);
		case "/cosmwasm.wasm.v1.MsgInstantiateContract":
			return instantiateMsg(message.value as InstantiateMsgType);
		case "/cosmwasm.wasm.v1.MsgStoreCode":
			return storeCodeMsg(message.value as StoreCodeMsgType);
		case "/cosmos.bank.v1beta1.MsgSend":
			return sendMsg(message.value as MsgSend);
		case "/cosmwasm.wasm.v1.MsgMigrateContract":
			return migrateMsg(message.value as MigrateMsgType);
		case "/cosmwasm.wasm.v1.MsgClearAdmin":
			return clearAdminMsg(message.value as MsgClearAdmin);
		case "/cosmwasm.wasm.v1.MsgUpdateAdmin":
			return updateAdminMsg(message.value as MsgUpdateAdmin);
		default:
			return {} as EncodeObject;
	}
};

const simulateFee = async (
	client: SigningCosmWasmClient,
	address: string,
	messages: EncodeObject[]
) => {
	const fee = await client.simulate(address, messages, "");
	return fee;
};

interface SendTransaction {
	messagesFile: string;
	gasPrice?: Coin;
}

export const sendTransaction = async ({
	messagesFile,
	gasPrice = {
		denom: "uosmo",
		amount: "25000",
	},
}: SendTransaction) => {
	const { address, client } = await createClient();
	const data = JSON.parse(fs.readFileSync(messagesFile, "utf8"));
	const messages = data.messages.map((msg: Message) => selectMessageType(msg));
	const estimatedGasUsed = await simulateFee(client, address, messages);
	const fee = {
		amount: [gasPrice],
		gas: (estimatedGasUsed * 2).toString(),
	} as StdFee;
	client.signAndBroadcast(address, messages, fee).then((res) => {
		fs.writeFile("txResult.json", JSON.stringify(res), (err) => {
			if (err) throw err;
			console.log("Completed ja");
		});
	});
};
