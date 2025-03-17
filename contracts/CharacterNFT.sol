// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title CharacterNFT
 * @dev ERC1155 Token representing characters on the Lumen Tales platform
 */
contract CharacterNFT is ERC1155, ERC1155Supply, Pausable, Ownable {
    using Strings for uint256;
    
    // Character metadata
    struct Character {
        string name;
        uint256 storyId;
        address creator;
        uint16 royaltyBps;
        uint256 maxSupply;
    }
    
    // Mapping from token ID to character data
    mapping(uint256 => Character) private _characters;
    
    // Next character ID
    uint256 private _nextCharacterId = 1;
    
    // Base URI for metadata
    string private _baseURI;
    
    // Event emitted when a new character type is created
    event CharacterCreated(
        uint256 indexed characterId,
        string name,
        uint256 indexed storyId,
        address indexed creator,
        uint16 royaltyBps,
        uint256 maxSupply
    );

    constructor(string memory baseURI) ERC1155(baseURI) {
        _baseURI = baseURI;
    }
    
    /**
     * @dev Sets a new URI for all token types.
     * Can only be called by the contract owner.
     */
    function setURI(string memory newuri) public onlyOwner {
        _baseURI = newuri;
        _setURI(newuri);
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
     * @dev Creates a new character type.
     * @param name Character name
     * @param storyId Associated story ID
     * @param royaltyBps Royalty percentage in basis points (e.g., 250 = 2.5%)
     * @param maxSupply Maximum supply of this character
     * @return characterId The ID of the created character
     */
    function createCharacter(
        string memory name,
        uint256 storyId,
        uint16 royaltyBps,
        uint256 maxSupply
    ) public returns (uint256) {
        require(royaltyBps <= 1000, "CharacterNFT: royalty too high"); // Max 10%
        require(maxSupply > 0, "CharacterNFT: max supply must be > 0");
        
        uint256 characterId = _nextCharacterId++;
        
        _characters[characterId] = Character({
            name: name,
            storyId: storyId,
            creator: msg.sender,
            royaltyBps: royaltyBps,
            maxSupply: maxSupply
        });
        
        emit CharacterCreated(
            characterId,
            name,
            storyId,
            msg.sender,
            royaltyBps,
            maxSupply
        );
        
        return characterId;
    }
    
    /**
     * @dev Mints a character.
     * @param to The address receiving the minted token
     * @param characterId Character ID to mint
     * @param amount Amount to mint
     */
    function mintCharacter(address to, uint256 characterId, uint256 amount) public {
        require(_characters[characterId].creator != address(0), "CharacterNFT: character doesn't exist");
        require(totalSupply(characterId) + amount <= _characters[characterId].maxSupply, "CharacterNFT: max supply exceeded");
        
        _mint(to, characterId, amount, "");
    }
    
    /**
     * @dev Returns character data.
     * @param characterId The character ID to query
     */
    function getCharacter(uint256 characterId) external view returns (Character memory) {
        require(_characters[characterId].creator != address(0), "CharacterNFT: character doesn't exist");
        return _characters[characterId];
    }
    
    /**
     * @dev Returns the royalty info for a character.
     * @param characterId The character ID to query
     * @param salePrice The sale price of the token
     */
    function royaltyInfo(uint256 characterId, uint256 salePrice) external view returns (address, uint256) {
        require(_characters[characterId].creator != address(0), "CharacterNFT: character doesn't exist");
        
        Character memory character = _characters[characterId];
        uint256 royaltyAmount = (salePrice * character.royaltyBps) / 10000;
        
        return (character.creator, royaltyAmount);
    }
    
    /**
     * @dev Returns the URI for a given token ID.
     */
    function uri(uint256 characterId) public view override returns (string memory) {
        require(_characters[characterId].creator != address(0), "CharacterNFT: character doesn't exist");
        return string(abi.encodePacked(_baseURI, characterId.toString()));
    }

    /**
     * @dev Hook that is called before any token transfer.
     */
    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        whenNotPaused
        override(ERC1155, ERC1155Supply)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
} 