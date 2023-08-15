// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(address recipient, uint256 amount)
        external
        returns (bool);

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
            if (token.balanceOf(msg.sender) < amounts[i]) {
                transferCount = i == 0 ? i : i - 1;
                break;
            }
            if (recipients[i] == address(0)) {
                transferCount = i == 0 ? i : i - 1;
                break;
            }
            if (amounts[i] <= 0) {
                transferCount = i == 0 ? i : i - 1;
                break;
            }

            token.transfer(recipients[i], amounts[i]);
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
