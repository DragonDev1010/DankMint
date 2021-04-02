// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

contract DankMint is ERC721 {
    string[] public dank_tokens;
    mapping(string => bool) _tokenExists;
    constructor() ERC721('MuDank', 'DANK') public {

    }

    function mint(string memory _hash) public {
        require( !_tokenExists[_hash] );
        dank_tokens.push(_hash);
        uint _id = dank_tokens.length - 1;
        _mint(msg.sender, _id);
        _tokenExists[_hash] = true;
    }

    function totalSupply() public view returns (uint) {
        return dank_tokens.length;
    }
}