import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { confirmTransactionFromBackend, confirmTransactionFromFrontend } from './Shyft.js';

export async function connectTheWallet() {
    const { solana } = window;
    let res = { success: false, message: "Could not connect wallet", addr: "" };
    if (!solana) {
        alert("Please Install Phantom");
    }
    try {
        const network = "devnet";
        const phantom = new PhantomWalletAdapter();
        //await phantom.disconnect();
        await phantom.connect();
        const rpcUrl = clusterApiUrl(network);
        const connection = new Connection(rpcUrl, "confirmed");

        const wallet = {
            address: phantom.publicKey.toBase58(),
        };

        if (wallet.address) {
            const accountInfo = await connection.getAccountInfo(new PublicKey(wallet.address), "confirmed");
            //console.log(accountInfo); 
            console.log('Wallet Connected');
            res.success = true;
            res.message = "Wallet connected successfully";
            res.addr = wallet.address;
        }

    }
    catch (err) {
        console.log(err);
    }
    return res;
}

export async function signAndConfirmTransaction(network, transaction, callback, prvKey) {
    const phantom = new PhantomWalletAdapter();
    await phantom.connect();
    const rpcUrl = clusterApiUrl(network);
    const connection = new Connection(rpcUrl, "confirmed");
    const ret = await confirmTransactionFromBackend(network, transaction, prvKey);
    console.log(ret);

    connection.onSignature(ret, callback, 'finalized')
    return ret;
}
export async function signAndConfirmTransactionFe(network, transaction, callback) {
    const phantom = new PhantomWalletAdapter();
    await phantom.connect();
    const rpcUrl = clusterApiUrl(network);
    const connection = new Connection(rpcUrl, "confirmed");
    //console.log(connection.rpcEndpoint);
    const ret = await confirmTransactionFromFrontend(connection, transaction, phantom);
    // const checks = await connection.confirmTransaction({signature:ret},'finalised');
    console.log(ret);
    // console.log(checks);
    // await connection.confirmTransaction({
    //     blockhash: transaction.blockhash,
    //     signature: ret,
    //   });
    connection.onSignature(ret, callback, 'finalized')
    return ret;
}
/* eslint-disable no-unused-vars */
