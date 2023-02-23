// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "./access/AccessProtected.sol";

contract Floyx is ERC20, ERC20Burnable, AccessProtected {
    uint256 public maxSupply;

    constructor(uint256 maxSupply_) ERC20("Floyx", "FLOYX") {
        maxSupply = maxSupply_;
    }

    function mint(address to, uint256 amount) external onlyAdmin {
        require(maxSupply>= amount+totalSupply(), "Floyx: Can not exceed max supply" );
        _mint(to, amount);
    }
}
