import { clusterApiUrl, Connection, Keypair, Transaction } from '@solana/web3.js';
import { NodeWallet } from '@metaplex/js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { decode } from 'bs58';
import { Buffer } from 'buffer';

//import { ShyftWallet } from '../types';

export async function confirmTransactionFromBackend(network, encodedTransaction, privateKey) {
    const connection = new Connection(clusterApiUrl(network), 'confirmed');
    const feePayer = Keypair.fromSecretKey(decode(privateKey));
    const wallet = new NodeWallet(feePayer);
    const recoveredTransaction = Transaction.from(
        Buffer.from(encodedTransaction, 'base64')
    );
    const signedTx = await wallet.signTransaction(recoveredTransaction);
    const confirmTransaction = await connection.sendRawTransaction(
        signedTx.serialize()
    );
    return confirmTransaction;
}

export async function confirmTransactionFromFrontend(connection, encodedTransaction, wallet) {
    console.log(encodedTransaction);
    const recoveredTransaction = Transaction.from(
        Buffer.from(encodedTransaction, 'base64')
    );
    const signedTx = await wallet.signTransaction(recoveredTransaction);
    const confirmTransaction = await connection.sendRawTransaction(
        signedTx.serialize()
    );
    return confirmTransaction;
}
/* eslint-disable no-unused-vars */
