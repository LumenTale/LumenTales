// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title LumenToken
 * @dev ERC20 Token for the Lumen Tales platform
 */
contract LumenToken is ERC20, ERC20Burnable, Pausable, Ownable {
    uint256 private _cap;

    constructor(uint256 cap_) ERC20("Lumen Token", "LUMEN") {
        require(cap_ > 0, "LumenToken: cap is 0");
        _cap = cap_;
        _mint(msg.sender, 10000000 * 10 ** decimals()); // Initial supply: 10 million tokens
    }

    /**
     * @dev Returns the cap on the token's total supply.
     */
    function cap() public view returns (uint256) {
        return _cap;
    }

    /**
     * @dev Pauses all token transfers.
     * Can only be called by the contract owner.
     */
    function pause() public onlyOwner {
        _pause();
    }

    /**
     * @dev Unpauses all token transfers.
     * Can only be called by the contract owner.
     */
    function unpause() public onlyOwner {
        _unpause();
    }

    /**
     * @dev Mints new tokens.
     * Can only be called by the contract owner.
     */
    function mint(address to, uint256 amount) public onlyOwner {
        require(ERC20.totalSupply() + amount <= _cap, "LumenToken: cap exceeded");
        _mint(to, amount);
    }

    /**
     * @dev Hook that is called before any transfer of tokens.
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, amount);
    }
} 