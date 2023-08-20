// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

interface IERC20 {
    function transferFrom(
        address from,
        address to,
        uint256 value
    ) external returns (bool);

    function balanceOf(address account) external view returns (uint256);
}

error ArrayLenMismatch();

contract MultiSendERC20 {
    event _multisend(
        bool transfered,
        uint256 transfersCount,
        address lastAddress
    );

    function multiSend(
        address[] calldata recipients,
        uint256[] calldata amounts,
        address tokenAddress
    ) external {
        if (recipients.length != amounts.length) {
            revert ArrayLenMismatch();
        }
        uint256 transferCount;
        IERC20 token = IERC20(tokenAddress);
        for (uint256 i = 0; i < recipients.length; i++) {
            if (
                token.balanceOf(msg.sender) < amounts[i] ||
                recipients[i] == address(0) ||
                amounts[i] <= 0
            ) {
                transferCount = i == 0 ? i : i - 1;
                break;
            }

            token.transferFrom( msg.sender,recipients[i], amounts[i]);
            if (i == recipients.length) {
                transferCount = i;
            }
        }
        emit _multisend(
            transferCount == recipients.length ? true : false,
            transferCount,
            recipients[transferCount]
        );
    }

    receive() external payable {}
}

// ["0xa6146758E21AAF4a9f8406807a3C74451B06f7BA"]
// ["900000000"]
// 0xB8906491dba9DFc9fC52758d16C1a70d6A8F71ca