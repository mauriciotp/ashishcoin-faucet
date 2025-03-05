// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AshishCoin is ERC20, Ownable {
    uint256 private _mintAmount = 0;
    uint64 private _mintDelay = 60 * 60 * 24; // 1 day in seconds
    mapping(address => uint256) private _nextMint;

    constructor(
        address _initialOwner
    ) ERC20("AshishCoin", "ASC") Ownable(_initialOwner) {
        _mint(_initialOwner, 10000 * 10 ** decimals());
    }

    function mint() public {
        require(_mintAmount > 0, "Minting is not enabled");
        require(
            block.timestamp > _nextMint[msg.sender],
            "You cannot mint twice in a row"
        );

        _nextMint[msg.sender] = block.timestamp + _mintDelay;
        transfer(msg.sender, _mintAmount);
    }

    function setMintAmount(uint256 _newMintAmount) private onlyOwner {
        _mintAmount = _newMintAmount;
    }

    function setMintDelay(uint64 _newMintDelay) private onlyOwner {
        _mintDelay = _newMintDelay;
    }
}
