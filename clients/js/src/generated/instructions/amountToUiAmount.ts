/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/kinobi-so/kinobi
 */

import {
  combineCodec,
  getStructDecoder,
  getStructEncoder,
  getU64Decoder,
  getU64Encoder,
  getU8Decoder,
  getU8Encoder,
  transformEncoder,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
  type IAccountMeta,
  type IInstruction,
  type IInstructionWithAccounts,
  type IInstructionWithData,
  type ReadonlyAccount,
} from '@solana/web3.js';
import { TOKEN_2022_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export type AmountToUiAmountInstruction<
  TProgram extends string = typeof TOKEN_2022_PROGRAM_ADDRESS,
  TAccountMint extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountMint extends string
        ? ReadonlyAccount<TAccountMint>
        : TAccountMint,
      ...TRemainingAccounts,
    ]
  >;

export type AmountToUiAmountInstructionData = {
  discriminator: number;
  /** The amount of tokens to reformat. */
  amount: bigint;
};

export type AmountToUiAmountInstructionDataArgs = {
  /** The amount of tokens to reformat. */
  amount: number | bigint;
};

export function getAmountToUiAmountInstructionDataEncoder(): Encoder<AmountToUiAmountInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', getU8Encoder()],
      ['amount', getU64Encoder()],
    ]),
    (value) => ({ ...value, discriminator: 23 })
  );
}

export function getAmountToUiAmountInstructionDataDecoder(): Decoder<AmountToUiAmountInstructionData> {
  return getStructDecoder([
    ['discriminator', getU8Decoder()],
    ['amount', getU64Decoder()],
  ]);
}

export function getAmountToUiAmountInstructionDataCodec(): Codec<
  AmountToUiAmountInstructionDataArgs,
  AmountToUiAmountInstructionData
> {
  return combineCodec(
    getAmountToUiAmountInstructionDataEncoder(),
    getAmountToUiAmountInstructionDataDecoder()
  );
}

export type AmountToUiAmountInput<TAccountMint extends string = string> = {
  /** The mint to calculate for. */
  mint: Address<TAccountMint>;
  amount: AmountToUiAmountInstructionDataArgs['amount'];
};

export function getAmountToUiAmountInstruction<TAccountMint extends string>(
  input: AmountToUiAmountInput<TAccountMint>
): AmountToUiAmountInstruction<
  typeof TOKEN_2022_PROGRAM_ADDRESS,
  TAccountMint
> {
  // Program address.
  const programAddress = TOKEN_2022_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    mint: { value: input.mint ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [getAccountMeta(accounts.mint)],
    programAddress,
    data: getAmountToUiAmountInstructionDataEncoder().encode(
      args as AmountToUiAmountInstructionDataArgs
    ),
  } as AmountToUiAmountInstruction<
    typeof TOKEN_2022_PROGRAM_ADDRESS,
    TAccountMint
  >;

  return instruction;
}

export type ParsedAmountToUiAmountInstruction<
  TProgram extends string = typeof TOKEN_2022_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** The mint to calculate for. */
    mint: TAccountMetas[0];
  };
  data: AmountToUiAmountInstructionData;
};

export function parseAmountToUiAmountInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedAmountToUiAmountInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 1) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      mint: getNextAccount(),
    },
    data: getAmountToUiAmountInstructionDataDecoder().decode(instruction.data),
  };
}
