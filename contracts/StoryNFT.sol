// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title StoryNFT
 * @dev ERC721 Token representing stories on the Lumen Tales platform
 */
contract StoryNFT is ERC721, ERC721Enumerable, ERC721URIStorage, Pausable, Ownable, ERC721Burnable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    
    // Mapping from token ID to royalty percentage (in basis points, 1/100 of a percent)
    mapping(uint256 => uint16) private _royaltyBps;
    
    // Mapping from token ID to creator address
    mapping(uint256 => address) private _creators;
    
    // Event emitted when a story NFT is minted
    event StoryCreated(uint256 indexed tokenId, address indexed creator, string uri);

    constructor() ERC721("Lumen Tales Story", "LTALES") {}

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
     * @dev Creates a new story NFT.
     * @param to The address that will own the minted token
     * @param uri The token URI for story metadata
     * @param royaltyBps The royalty percentage in basis points (e.g., 250 = 2.5%)
     */
    function createStory(address to, string memory uri, uint16 royaltyBps) public returns (uint256) {
        require(royaltyBps <= 1000, "StoryNFT: royalty too high"); // Max 10%
        
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        
        _royaltyBps[tokenId] = royaltyBps;
        _creators[tokenId] = to;
        
        emit StoryCreated(tokenId, to, uri);
        
        return tokenId;
    }

    /**
     * @dev Returns the royalty info for a token.
     * @param tokenId The token ID to query
     * @param salePrice The sale price of the token
     */
    function royaltyInfo(uint256 tokenId, uint256 salePrice) external view returns (address, uint256) {
        require(_exists(tokenId), "StoryNFT: query for nonexistent token");
        
        address creator = _creators[tokenId];
        uint256 royaltyAmount = (salePrice * _royaltyBps[tokenId]) / 10000;
        
        return (creator, royaltyAmount);
    }

    /**
     * @dev Gets the creator of a token.
     * @param tokenId The token ID to query
     */
    function creatorOf(uint256 tokenId) external view returns (address) {
        require(_exists(tokenId), "StoryNFT: query for nonexistent token");
        return _creators[tokenId];
    }

    /**
     * @dev Gets the royalty percentage of a token.
     * @param tokenId The token ID to query
     */
    function royaltyBps(uint256 tokenId) external view returns (uint16) {
        require(_exists(tokenId), "StoryNFT: query for nonexistent token");
        return _royaltyBps[tokenId];
    }

    /**
     * @dev Hook that is called before any token transfer.
     */
    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        whenNotPaused
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    /**
     * @dev Hook that is called to update the storage state with token URIs.
     */
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    /**
     * @dev Gets the URI for a given token ID.
     */
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
} 