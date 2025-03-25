import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PyUSD
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const pyUsdAbi = [
  {
    type: 'error',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'AccessControlUnauthorizedAccount',
  },
  { type: 'error', inputs: [], name: 'AddressFrozen' },
  { type: 'error', inputs: [], name: 'AddressNotFrozen' },
  { type: 'error', inputs: [], name: 'AlreadyPaused' },
  { type: 'error', inputs: [], name: 'AlreadyUnPaused' },
  { type: 'error', inputs: [], name: 'ArgumentLengthMismatch' },
  { type: 'error', inputs: [], name: 'AuthorizationExpired' },
  { type: 'error', inputs: [], name: 'AuthorizationInvalid' },
  { type: 'error', inputs: [], name: 'BlockedAccountAuthorizer' },
  { type: 'error', inputs: [], name: 'CallerMustBePayee' },
  { type: 'error', inputs: [], name: 'ContractPaused' },
  { type: 'error', inputs: [], name: 'InsufficientAllowance' },
  { type: 'error', inputs: [], name: 'InsufficientFunds' },
  { type: 'error', inputs: [], name: 'InvalidECRecoverSignature' },
  { type: 'error', inputs: [], name: 'InvalidPermission' },
  { type: 'error', inputs: [], name: 'InvalidSignature' },
  { type: 'error', inputs: [], name: 'InvalidValueS' },
  { type: 'error', inputs: [], name: 'OnlySupplyController' },
  { type: 'error', inputs: [], name: 'OnlySupplyControllerOrOwner' },
  { type: 'error', inputs: [], name: 'PermitExpired' },
  { type: 'error', inputs: [], name: 'SupplyControllerUnchanged' },
  { type: 'error', inputs: [], name: 'ZeroAddress' },
  { type: 'error', inputs: [], name: 'ZeroValue' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'authorizer',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'nonce',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'AuthorizationAlreadyUsed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'authorizer',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'nonce',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'AuthorizationCanceled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'authorizer',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'nonce',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'AuthorizationUsed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [],
    name: 'DefaultAdminDelayChangeCanceled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newDelay',
        internalType: 'uint48',
        type: 'uint48',
        indexed: false,
      },
      {
        name: 'effectSchedule',
        internalType: 'uint48',
        type: 'uint48',
        indexed: false,
      },
    ],
    name: 'DefaultAdminDelayChangeScheduled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [],
    name: 'DefaultAdminTransferCanceled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newAdmin',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'acceptSchedule',
        internalType: 'uint48',
        type: 'uint48',
        indexed: false,
      },
    ],
    name: 'DefaultAdminTransferScheduled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'addr', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'FreezeAddress',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'addr', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'FrozenAddressWiped',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'version', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'Initialized',
  },
  { type: 'event', anonymous: false, inputs: [], name: 'Pause' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'RoleAdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleGranted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleRevoked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newSanctionedAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'SanctionedAddressListUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'supplyControlAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'SupplyControlSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'SupplyDecreased',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'SupplyIncreased',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'addr', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'UnfreezeAddress',
  },
  { type: 'event', anonymous: false, inputs: [], name: 'Unpause' },
  {
    type: 'function',
    inputs: [],
    name: 'ASSET_PROTECTION_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'CANCEL_AUTHORIZATION_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'EIP712_DOMAIN_HASH_DEPRECATED',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'PAUSE_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'PERMIT_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'RECEIVE_WITH_AUTHORIZATION_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'TRANSFER_WITH_AUTHORIZATION_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'acceptDefaultAdminTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'assetProtectionRoleDeprecated',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'authorizer', internalType: 'address', type: 'address' },
      { name: 'nonce', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'authorizationState',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newAdmin', internalType: 'address', type: 'address' }],
    name: 'beginDefaultAdminTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'betaDelegateWhitelisterDeprecated',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'authorizer', internalType: 'address', type: 'address' },
      { name: 'nonce', internalType: 'bytes32', type: 'bytes32' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'cancelAuthorization',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'cancelDefaultAdminTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newDelay', internalType: 'uint48', type: 'uint48' }],
    name: 'changeDefaultAdminDelay',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'subtractedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseApproval',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'value', internalType: 'uint256', type: 'uint256' }],
    name: 'decreaseSupply',
    outputs: [{ name: 'success', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'burnFromAddress', internalType: 'address', type: 'address' },
    ],
    name: 'decreaseSupplyFromAddress',
    outputs: [{ name: 'success', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'defaultAdmin',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'defaultAdminDelay',
    outputs: [{ name: '', internalType: 'uint48', type: 'uint48' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'defaultAdminDelayIncreaseWait',
    outputs: [{ name: '', internalType: 'uint48', type: 'uint48' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'freeze',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'addresses', internalType: 'address[]', type: 'address[]' },
    ],
    name: 'freezeBatch',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'addedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseApproval',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'value', internalType: 'uint256', type: 'uint256' }],
    name: 'increaseSupply',
    outputs: [{ name: 'success', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'mintToAddress', internalType: 'address', type: 'address' },
    ],
    name: 'increaseSupplyToAddress',
    outputs: [{ name: 'success', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'initialDelay', internalType: 'uint48', type: 'uint48' },
      { name: 'initialOwner', internalType: 'address', type: 'address' },
      { name: 'pauser', internalType: 'address', type: 'address' },
      { name: 'assetProtector', internalType: 'address', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'isFrozen',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'ownerDeprecated',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingDefaultAdmin',
    outputs: [
      { name: 'newAdmin', internalType: 'address', type: 'address' },
      { name: 'schedule', internalType: 'uint48', type: 'uint48' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingDefaultAdminDelay',
    outputs: [
      { name: 'newDelay', internalType: 'uint48', type: 'uint48' },
      { name: 'schedule', internalType: 'uint48', type: 'uint48' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'proposedOwnerDeprecated',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'validAfter', internalType: 'uint256', type: 'uint256' },
      { name: 'validBefore', internalType: 'uint256', type: 'uint256' },
      { name: 'nonce', internalType: 'bytes32', type: 'bytes32' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'receiveWithAuthorization',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'reclaimToken',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'rollbackDefaultAdminDelay',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'supplyControlAddress',
        internalType: 'address',
        type: 'address',
      },
    ],
    name: 'setSupplyControl',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'supplyControl',
    outputs: [
      { name: '', internalType: 'contract SupplyControl', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'supplyControllerDeprecated',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address[]', type: 'address[]' },
      { name: 'to', internalType: 'address[]', type: 'address[]' },
      { name: 'value', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'transferFromBatch',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'validAfter', internalType: 'uint256', type: 'uint256' },
      { name: 'validBefore', internalType: 'uint256', type: 'uint256' },
      { name: 'nonce', internalType: 'bytes32', type: 'bytes32' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'transferWithAuthorization',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address[]', type: 'address[]' },
      { name: 'to', internalType: 'address[]', type: 'address[]' },
      { name: 'value', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'validAfter', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'validBefore', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'nonce', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: 'v', internalType: 'uint8[]', type: 'uint8[]' },
      { name: 'r', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: 's', internalType: 'bytes32[]', type: 'bytes32[]' },
    ],
    name: 'transferWithAuthorizationBatch',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'unfreeze',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'addresses', internalType: 'address[]', type: 'address[]' },
    ],
    name: 'unfreezeBatch',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'wipeFrozenAddress',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const pyUsdAddress = {
  1: '0x6c3ea9036406852006290770BEdFcAbA0e23A0e8',
  11155111: '0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const pyUsdConfig = { address: pyUsdAddress, abi: pyUsdAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// erc20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const erc20Abi = [
  {
    type: 'event',
    inputs: [
      { name: 'owner', type: 'address', indexed: true },
      { name: 'spender', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'sender', type: 'address' },
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const erc20Address = {
  1: '0x6c3ea9036406852006290770BEdFcAbA0e23A0e8',
  17000: '0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9',
  11155111: '0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const erc20Config = { address: erc20Address, abi: erc20Abi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pyUsdAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useReadPyUsd = /*#__PURE__*/ createUseReadContract({
  abi: pyUsdAbi,
  address: pyUsdAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"ASSET_PROTECTION_ROLE"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useReadPyUsdAssetProtectionRole =
  /*#__PURE__*/ createUseReadContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'ASSET_PROTECTION_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"CANCEL_AUTHORIZATION_TYPEHASH"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useReadPyUsdCancelAuthorizationTypehash =
  /*#__PURE__*/ createUseReadContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'CANCEL_AUTHORIZATION_TYPEHASH',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useReadPyUsdDefaultAdminRole = /*#__PURE__*/ createUseReadContract(
  { abi: pyUsdAbi, address: pyUsdAddress, functionName: 'DEFAULT_ADMIN_ROLE' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useReadPyUsdDomainSeparator = /*#__PURE__*/ createUseReadContract({
  abi: pyUsdAbi,
  address: pyUsdAddress,
  functionName: 'DOMAIN_SEPARATOR',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"EIP712_DOMAIN_HASH_DEPRECATED"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useReadPyUsdEip712DomainHashDeprecated =
  /*#__PURE__*/ createUseReadContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'EIP712_DOMAIN_HASH_DEPRECATED',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"PAUSE_ROLE"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useReadPyUsdPauseRole = /*#__PURE__*/ createUseReadContract({
  abi: pyUsdAbi,
  address: pyUsdAddress,
  functionName: 'PAUSE_ROLE',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"PERMIT_TYPEHASH"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useReadPyUsdPermitTypehash = /*#__PURE__*/ createUseReadContract({
  abi: pyUsdAbi,
  address: pyUsdAddress,
  functionName: 'PERMIT_TYPEHASH',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"RECEIVE_WITH_AUTHORIZATION_TYPEHASH"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useReadPyUsdReceiveWithAuthorizationTypehash =
  /*#__PURE__*/ createUseReadContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'RECEIVE_WITH_AUTHORIZATION_TYPEHASH',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"TRANSFER_WITH_AUTHORIZATION_TYPEHASH"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useReadPyUsdTransferWithAuthorizationTypehash =
  /*#__PURE__*/ createUseReadContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'TRANSFER_WITH_AUTHORIZATION_TYPEHASH',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"allowance"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useReadPyUsdAllowance = /*#__PURE__*/ createUseReadContract({
  abi: pyUsdAbi,
  address: pyUsdAddress,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"assetProtectionRoleDeprecated"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useReadPyUsdAssetProtectionRoleDeprecated =
  /*#__PURE__*/ createUseReadContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'assetProtectionRoleDeprecated',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"authorizationState"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useReadPyUsdAuthorizationState =
  /*#__PURE__*/ createUseReadContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'authorizationState',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useReadPyUsdBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: pyUsdAbi,
  address: pyUsdAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"betaDelegateWhitelisterDeprecated"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useReadPyUsdBetaDelegateWhitelisterDeprecated =
  /*#__PURE__*/ createUseReadContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'betaDelegateWhitelisterDeprecated',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"decimals"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useReadPyUsdDecimals = /*#__PURE__*/ createUseReadContract({
  abi: pyUsdAbi,
  address: pyUsdAddress,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"defaultAdmin"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useReadPyUsdDefaultAdmin = /*#__PURE__*/ createUseReadContract({
  abi: pyUsdAbi,
  address: pyUsdAddress,
  functionName: 'defaultAdmin',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"defaultAdminDelay"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useReadPyUsdDefaultAdminDelay =
  /*#__PURE__*/ createUseReadContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'defaultAdminDelay',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"defaultAdminDelayIncreaseWait"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useReadPyUsdDefaultAdminDelayIncreaseWait =
  /*#__PURE__*/ createUseReadContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'defaultAdminDelayIncreaseWait',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"getRoleAdmin"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useReadPyUsdGetRoleAdmin = /*#__PURE__*/ createUseReadContract({
  abi: pyUsdAbi,
  address: pyUsdAddress,
  functionName: 'getRoleAdmin',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"hasRole"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useReadPyUsdHasRole = /*#__PURE__*/ createUseReadContract({
  abi: pyUsdAbi,
  address: pyUsdAddress,
  functionName: 'hasRole',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"isFrozen"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useReadPyUsdIsFrozen = /*#__PURE__*/ createUseReadContract({
  abi: pyUsdAbi,
  address: pyUsdAddress,
  functionName: 'isFrozen',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"name"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useReadPyUsdName = /*#__PURE__*/ createUseReadContract({
  abi: pyUsdAbi,
  address: pyUsdAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"nonces"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useReadPyUsdNonces = /*#__PURE__*/ createUseReadContract({
  abi: pyUsdAbi,
  address: pyUsdAddress,
  functionName: 'nonces',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useReadPyUsdOwner = /*#__PURE__*/ createUseReadContract({
  abi: pyUsdAbi,
  address: pyUsdAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"ownerDeprecated"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useReadPyUsdOwnerDeprecated = /*#__PURE__*/ createUseReadContract({
  abi: pyUsdAbi,
  address: pyUsdAddress,
  functionName: 'ownerDeprecated',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"paused"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useReadPyUsdPaused = /*#__PURE__*/ createUseReadContract({
  abi: pyUsdAbi,
  address: pyUsdAddress,
  functionName: 'paused',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"pendingDefaultAdmin"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useReadPyUsdPendingDefaultAdmin =
  /*#__PURE__*/ createUseReadContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'pendingDefaultAdmin',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"pendingDefaultAdminDelay"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useReadPyUsdPendingDefaultAdminDelay =
  /*#__PURE__*/ createUseReadContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'pendingDefaultAdminDelay',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"proposedOwnerDeprecated"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useReadPyUsdProposedOwnerDeprecated =
  /*#__PURE__*/ createUseReadContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'proposedOwnerDeprecated',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"supplyControl"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useReadPyUsdSupplyControl = /*#__PURE__*/ createUseReadContract({
  abi: pyUsdAbi,
  address: pyUsdAddress,
  functionName: 'supplyControl',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"supplyControllerDeprecated"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useReadPyUsdSupplyControllerDeprecated =
  /*#__PURE__*/ createUseReadContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'supplyControllerDeprecated',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useReadPyUsdSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"symbol"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useReadPyUsdSymbol = /*#__PURE__*/ createUseReadContract({
  abi: pyUsdAbi,
  address: pyUsdAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"totalSupply"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useReadPyUsdTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: pyUsdAbi,
  address: pyUsdAddress,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link pyUsdAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWritePyUsd = /*#__PURE__*/ createUseWriteContract({
  abi: pyUsdAbi,
  address: pyUsdAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"acceptDefaultAdminTransfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWritePyUsdAcceptDefaultAdminTransfer =
  /*#__PURE__*/ createUseWriteContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'acceptDefaultAdminTransfer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWritePyUsdApprove = /*#__PURE__*/ createUseWriteContract({
  abi: pyUsdAbi,
  address: pyUsdAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"beginDefaultAdminTransfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWritePyUsdBeginDefaultAdminTransfer =
  /*#__PURE__*/ createUseWriteContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'beginDefaultAdminTransfer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"burn"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWritePyUsdBurn = /*#__PURE__*/ createUseWriteContract({
  abi: pyUsdAbi,
  address: pyUsdAddress,
  functionName: 'burn',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"cancelAuthorization"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWritePyUsdCancelAuthorization =
  /*#__PURE__*/ createUseWriteContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'cancelAuthorization',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"cancelDefaultAdminTransfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWritePyUsdCancelDefaultAdminTransfer =
  /*#__PURE__*/ createUseWriteContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'cancelDefaultAdminTransfer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"changeDefaultAdminDelay"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWritePyUsdChangeDefaultAdminDelay =
  /*#__PURE__*/ createUseWriteContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'changeDefaultAdminDelay',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"decreaseApproval"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWritePyUsdDecreaseApproval =
  /*#__PURE__*/ createUseWriteContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'decreaseApproval',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"decreaseSupply"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWritePyUsdDecreaseSupply = /*#__PURE__*/ createUseWriteContract(
  { abi: pyUsdAbi, address: pyUsdAddress, functionName: 'decreaseSupply' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"decreaseSupplyFromAddress"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWritePyUsdDecreaseSupplyFromAddress =
  /*#__PURE__*/ createUseWriteContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'decreaseSupplyFromAddress',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"freeze"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWritePyUsdFreeze = /*#__PURE__*/ createUseWriteContract({
  abi: pyUsdAbi,
  address: pyUsdAddress,
  functionName: 'freeze',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"freezeBatch"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWritePyUsdFreezeBatch = /*#__PURE__*/ createUseWriteContract({
  abi: pyUsdAbi,
  address: pyUsdAddress,
  functionName: 'freezeBatch',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"grantRole"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWritePyUsdGrantRole = /*#__PURE__*/ createUseWriteContract({
  abi: pyUsdAbi,
  address: pyUsdAddress,
  functionName: 'grantRole',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"increaseApproval"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWritePyUsdIncreaseApproval =
  /*#__PURE__*/ createUseWriteContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'increaseApproval',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"increaseSupply"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWritePyUsdIncreaseSupply = /*#__PURE__*/ createUseWriteContract(
  { abi: pyUsdAbi, address: pyUsdAddress, functionName: 'increaseSupply' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"increaseSupplyToAddress"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWritePyUsdIncreaseSupplyToAddress =
  /*#__PURE__*/ createUseWriteContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'increaseSupplyToAddress',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWritePyUsdInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: pyUsdAbi,
  address: pyUsdAddress,
  functionName: 'initialize',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWritePyUsdMint = /*#__PURE__*/ createUseWriteContract({
  abi: pyUsdAbi,
  address: pyUsdAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"pause"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWritePyUsdPause = /*#__PURE__*/ createUseWriteContract({
  abi: pyUsdAbi,
  address: pyUsdAddress,
  functionName: 'pause',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"permit"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWritePyUsdPermit = /*#__PURE__*/ createUseWriteContract({
  abi: pyUsdAbi,
  address: pyUsdAddress,
  functionName: 'permit',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"receiveWithAuthorization"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWritePyUsdReceiveWithAuthorization =
  /*#__PURE__*/ createUseWriteContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'receiveWithAuthorization',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"reclaimToken"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWritePyUsdReclaimToken = /*#__PURE__*/ createUseWriteContract({
  abi: pyUsdAbi,
  address: pyUsdAddress,
  functionName: 'reclaimToken',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"renounceRole"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWritePyUsdRenounceRole = /*#__PURE__*/ createUseWriteContract({
  abi: pyUsdAbi,
  address: pyUsdAddress,
  functionName: 'renounceRole',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"revokeRole"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWritePyUsdRevokeRole = /*#__PURE__*/ createUseWriteContract({
  abi: pyUsdAbi,
  address: pyUsdAddress,
  functionName: 'revokeRole',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"rollbackDefaultAdminDelay"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWritePyUsdRollbackDefaultAdminDelay =
  /*#__PURE__*/ createUseWriteContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'rollbackDefaultAdminDelay',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"setSupplyControl"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWritePyUsdSetSupplyControl =
  /*#__PURE__*/ createUseWriteContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'setSupplyControl',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWritePyUsdTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: pyUsdAbi,
  address: pyUsdAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWritePyUsdTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: pyUsdAbi,
  address: pyUsdAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"transferFromBatch"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWritePyUsdTransferFromBatch =
  /*#__PURE__*/ createUseWriteContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'transferFromBatch',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"transferWithAuthorization"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWritePyUsdTransferWithAuthorization =
  /*#__PURE__*/ createUseWriteContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'transferWithAuthorization',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"transferWithAuthorizationBatch"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWritePyUsdTransferWithAuthorizationBatch =
  /*#__PURE__*/ createUseWriteContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'transferWithAuthorizationBatch',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"unfreeze"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWritePyUsdUnfreeze = /*#__PURE__*/ createUseWriteContract({
  abi: pyUsdAbi,
  address: pyUsdAddress,
  functionName: 'unfreeze',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"unfreezeBatch"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWritePyUsdUnfreezeBatch = /*#__PURE__*/ createUseWriteContract({
  abi: pyUsdAbi,
  address: pyUsdAddress,
  functionName: 'unfreezeBatch',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"unpause"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWritePyUsdUnpause = /*#__PURE__*/ createUseWriteContract({
  abi: pyUsdAbi,
  address: pyUsdAddress,
  functionName: 'unpause',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"wipeFrozenAddress"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWritePyUsdWipeFrozenAddress =
  /*#__PURE__*/ createUseWriteContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'wipeFrozenAddress',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link pyUsdAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useSimulatePyUsd = /*#__PURE__*/ createUseSimulateContract({
  abi: pyUsdAbi,
  address: pyUsdAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"acceptDefaultAdminTransfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useSimulatePyUsdAcceptDefaultAdminTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'acceptDefaultAdminTransfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useSimulatePyUsdApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: pyUsdAbi,
  address: pyUsdAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"beginDefaultAdminTransfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useSimulatePyUsdBeginDefaultAdminTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'beginDefaultAdminTransfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"burn"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useSimulatePyUsdBurn = /*#__PURE__*/ createUseSimulateContract({
  abi: pyUsdAbi,
  address: pyUsdAddress,
  functionName: 'burn',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"cancelAuthorization"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useSimulatePyUsdCancelAuthorization =
  /*#__PURE__*/ createUseSimulateContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'cancelAuthorization',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"cancelDefaultAdminTransfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useSimulatePyUsdCancelDefaultAdminTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'cancelDefaultAdminTransfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"changeDefaultAdminDelay"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useSimulatePyUsdChangeDefaultAdminDelay =
  /*#__PURE__*/ createUseSimulateContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'changeDefaultAdminDelay',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"decreaseApproval"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useSimulatePyUsdDecreaseApproval =
  /*#__PURE__*/ createUseSimulateContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'decreaseApproval',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"decreaseSupply"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useSimulatePyUsdDecreaseSupply =
  /*#__PURE__*/ createUseSimulateContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'decreaseSupply',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"decreaseSupplyFromAddress"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useSimulatePyUsdDecreaseSupplyFromAddress =
  /*#__PURE__*/ createUseSimulateContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'decreaseSupplyFromAddress',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"freeze"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useSimulatePyUsdFreeze = /*#__PURE__*/ createUseSimulateContract({
  abi: pyUsdAbi,
  address: pyUsdAddress,
  functionName: 'freeze',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"freezeBatch"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useSimulatePyUsdFreezeBatch =
  /*#__PURE__*/ createUseSimulateContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'freezeBatch',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"grantRole"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useSimulatePyUsdGrantRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'grantRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"increaseApproval"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useSimulatePyUsdIncreaseApproval =
  /*#__PURE__*/ createUseSimulateContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'increaseApproval',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"increaseSupply"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useSimulatePyUsdIncreaseSupply =
  /*#__PURE__*/ createUseSimulateContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'increaseSupply',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"increaseSupplyToAddress"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useSimulatePyUsdIncreaseSupplyToAddress =
  /*#__PURE__*/ createUseSimulateContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'increaseSupplyToAddress',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useSimulatePyUsdInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useSimulatePyUsdMint = /*#__PURE__*/ createUseSimulateContract({
  abi: pyUsdAbi,
  address: pyUsdAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"pause"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useSimulatePyUsdPause = /*#__PURE__*/ createUseSimulateContract({
  abi: pyUsdAbi,
  address: pyUsdAddress,
  functionName: 'pause',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"permit"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useSimulatePyUsdPermit = /*#__PURE__*/ createUseSimulateContract({
  abi: pyUsdAbi,
  address: pyUsdAddress,
  functionName: 'permit',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"receiveWithAuthorization"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useSimulatePyUsdReceiveWithAuthorization =
  /*#__PURE__*/ createUseSimulateContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'receiveWithAuthorization',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"reclaimToken"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useSimulatePyUsdReclaimToken =
  /*#__PURE__*/ createUseSimulateContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'reclaimToken',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"renounceRole"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useSimulatePyUsdRenounceRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"revokeRole"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useSimulatePyUsdRevokeRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"rollbackDefaultAdminDelay"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useSimulatePyUsdRollbackDefaultAdminDelay =
  /*#__PURE__*/ createUseSimulateContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'rollbackDefaultAdminDelay',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"setSupplyControl"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useSimulatePyUsdSetSupplyControl =
  /*#__PURE__*/ createUseSimulateContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'setSupplyControl',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useSimulatePyUsdTransfer = /*#__PURE__*/ createUseSimulateContract(
  { abi: pyUsdAbi, address: pyUsdAddress, functionName: 'transfer' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useSimulatePyUsdTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"transferFromBatch"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useSimulatePyUsdTransferFromBatch =
  /*#__PURE__*/ createUseSimulateContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'transferFromBatch',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"transferWithAuthorization"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useSimulatePyUsdTransferWithAuthorization =
  /*#__PURE__*/ createUseSimulateContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'transferWithAuthorization',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"transferWithAuthorizationBatch"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useSimulatePyUsdTransferWithAuthorizationBatch =
  /*#__PURE__*/ createUseSimulateContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'transferWithAuthorizationBatch',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"unfreeze"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useSimulatePyUsdUnfreeze = /*#__PURE__*/ createUseSimulateContract(
  { abi: pyUsdAbi, address: pyUsdAddress, functionName: 'unfreeze' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"unfreezeBatch"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useSimulatePyUsdUnfreezeBatch =
  /*#__PURE__*/ createUseSimulateContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'unfreezeBatch',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"unpause"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useSimulatePyUsdUnpause = /*#__PURE__*/ createUseSimulateContract({
  abi: pyUsdAbi,
  address: pyUsdAddress,
  functionName: 'unpause',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link pyUsdAbi}__ and `functionName` set to `"wipeFrozenAddress"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useSimulatePyUsdWipeFrozenAddress =
  /*#__PURE__*/ createUseSimulateContract({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    functionName: 'wipeFrozenAddress',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link pyUsdAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWatchPyUsdEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: pyUsdAbi,
  address: pyUsdAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link pyUsdAbi}__ and `eventName` set to `"Approval"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWatchPyUsdApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link pyUsdAbi}__ and `eventName` set to `"AuthorizationAlreadyUsed"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWatchPyUsdAuthorizationAlreadyUsedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    eventName: 'AuthorizationAlreadyUsed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link pyUsdAbi}__ and `eventName` set to `"AuthorizationCanceled"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWatchPyUsdAuthorizationCanceledEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    eventName: 'AuthorizationCanceled',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link pyUsdAbi}__ and `eventName` set to `"AuthorizationUsed"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWatchPyUsdAuthorizationUsedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    eventName: 'AuthorizationUsed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link pyUsdAbi}__ and `eventName` set to `"DefaultAdminDelayChangeCanceled"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWatchPyUsdDefaultAdminDelayChangeCanceledEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    eventName: 'DefaultAdminDelayChangeCanceled',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link pyUsdAbi}__ and `eventName` set to `"DefaultAdminDelayChangeScheduled"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWatchPyUsdDefaultAdminDelayChangeScheduledEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    eventName: 'DefaultAdminDelayChangeScheduled',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link pyUsdAbi}__ and `eventName` set to `"DefaultAdminTransferCanceled"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWatchPyUsdDefaultAdminTransferCanceledEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    eventName: 'DefaultAdminTransferCanceled',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link pyUsdAbi}__ and `eventName` set to `"DefaultAdminTransferScheduled"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWatchPyUsdDefaultAdminTransferScheduledEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    eventName: 'DefaultAdminTransferScheduled',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link pyUsdAbi}__ and `eventName` set to `"FreezeAddress"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWatchPyUsdFreezeAddressEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    eventName: 'FreezeAddress',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link pyUsdAbi}__ and `eventName` set to `"FrozenAddressWiped"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWatchPyUsdFrozenAddressWipedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    eventName: 'FrozenAddressWiped',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link pyUsdAbi}__ and `eventName` set to `"Initialized"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWatchPyUsdInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link pyUsdAbi}__ and `eventName` set to `"Pause"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWatchPyUsdPauseEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    eventName: 'Pause',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link pyUsdAbi}__ and `eventName` set to `"RoleAdminChanged"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWatchPyUsdRoleAdminChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    eventName: 'RoleAdminChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link pyUsdAbi}__ and `eventName` set to `"RoleGranted"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWatchPyUsdRoleGrantedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    eventName: 'RoleGranted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link pyUsdAbi}__ and `eventName` set to `"RoleRevoked"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWatchPyUsdRoleRevokedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    eventName: 'RoleRevoked',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link pyUsdAbi}__ and `eventName` set to `"SanctionedAddressListUpdate"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWatchPyUsdSanctionedAddressListUpdateEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    eventName: 'SanctionedAddressListUpdate',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link pyUsdAbi}__ and `eventName` set to `"SupplyControlSet"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWatchPyUsdSupplyControlSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    eventName: 'SupplyControlSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link pyUsdAbi}__ and `eventName` set to `"SupplyDecreased"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWatchPyUsdSupplyDecreasedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    eventName: 'SupplyDecreased',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link pyUsdAbi}__ and `eventName` set to `"SupplyIncreased"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWatchPyUsdSupplyIncreasedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    eventName: 'SupplyIncreased',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link pyUsdAbi}__ and `eventName` set to `"Transfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWatchPyUsdTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link pyUsdAbi}__ and `eventName` set to `"UnfreezeAddress"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWatchPyUsdUnfreezeAddressEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    eventName: 'UnfreezeAddress',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link pyUsdAbi}__ and `eventName` set to `"Unpause"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWatchPyUsdUnpauseEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: pyUsdAbi,
    address: pyUsdAddress,
    eventName: 'Unpause',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useReadErc20 = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  address: erc20Address,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"allowance"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useReadErc20Allowance = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useReadErc20BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"decimals"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useReadErc20Decimals = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"name"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useReadErc20Name = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"symbol"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useReadErc20Symbol = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"totalSupply"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useReadErc20TotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWriteErc20 = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  address: erc20Address,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWriteErc20Approve = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWriteErc20Transfer = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWriteErc20TransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useSimulateErc20 = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
  address: erc20Address,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useSimulateErc20Approve = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useSimulateErc20Transfer = /*#__PURE__*/ createUseSimulateContract(
  { abi: erc20Abi, address: erc20Address, functionName: 'transfer' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useSimulateErc20TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc20Abi,
    address: erc20Address,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWatchErc20Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc20Abi,
  address: erc20Address,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Approval"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWatchErc20ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    address: erc20Address,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Transfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6c3ea9036406852006290770BEdFcAbA0e23A0e8)
 * - [__View Contract on Holesky Etherscan__](https://holesky.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9)
 */
export const useWatchErc20TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    address: erc20Address,
    eventName: 'Transfer',
  })
