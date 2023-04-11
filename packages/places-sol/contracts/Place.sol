//SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import { Owned } from "./Owned.sol";
import { Base64 } from "./utils/Base64.sol";
import { LibString } from "./utils/LibString.sol";
import { ERC721 } from "./ERC721/ERC721.sol";

contract Place is ERC721, Owned {
  using LibString for uint256;

  struct ContractMetadata {
    string name;
    string description;
    string image;
    string externalLink;
    string sellerFeeBasisPoints;
    string feeRecipient;
  }

  // Token
  uint256 public price;
  uint64 public nextTokenId;

  // Metadata
  string public imgUri;
  ContractMetadata internal contractMetadata;

  /**
    @dev Constructor function to initialize the Place contract.
    @param _name The name of the ERC721 token.
    @param _symbol The symbol of the ERC721 token.
    @param _imgUri The image URI for token metadata.
    @param _price The price of each NFT token.
    @param _owner The address of the contract owner.
    @param _contractMetadata The metadata for the contract.
  */
  constructor(
    string memory _name,
    string memory _symbol,
    string memory _imgUri,
    uint256 _price,
    address _owner,
    ContractMetadata memory _contractMetadata
  ) ERC721(_name, _symbol) Owned(_owner) {
    nextTokenId++;
    price = _price;
    imgUri = _imgUri;
    contractMetadata = _contractMetadata;
  }

  /// -----------------------------------------------------------------------
  /// External
  /// -----------------------------------------------------------------------

  /**
    @dev Returns the price of each NFT token.
    @return The price of each NFT token.
  */
  function getPrice() public view returns (uint256) {
    return price;
  }

  /**
    @dev Returns the contract metadata in JSON format.
    @return The contract metadata in JSON format.
  */
  function contractURI() external view returns (string memory) {
    return _constructContractURI();
  }

  /**
    @dev Returns the token metadata in JSON format for a given token ID.
    @param id The ID of the token to retrieve metadata for.
    @return The token metadata in JSON format.
  */
  function tokenURI(uint256 id) public view virtual override returns (string memory) {
    return _constructTokenURI(id);
  }

  /**
    @dev Mints a new NFT token to the specified address.
    @param to The address to which the NFT token will be minted.
  */
  function mint(address to) public payable {
    require(msg.value >= price, "Invalid ETH Payment");
    payable(owner).transfer(msg.value);
    _safeMint(to, nextTokenId++);
  }

  /// -----------------------------------------------------------------------
  /// Internal
  /// -----------------------------------------------------------------------
  function _parseDescription(uint256 _tokenId) internal view virtual returns (string memory) {
    return string.concat("Collection item #", _tokenId.toString(), " -- ", name, " (", symbol, ")");
  }

  function _constructTokenURI(
    uint256 tokenId
  ) internal view virtual returns (string memory) {
    return
      string(
        abi.encodePacked(
          "data:application/json;base64,",
          Base64.encode(
            bytes(
              string.concat(
                '{"name":',
                '"',
                name,
                '",',
                '"description":',
                '"',
                _parseDescription(tokenId),
                '",',
                '"image":',
                '"',
                imgUri,
                '"}'
              )
            )
          )
        )
      );
  }

  function _constructContractURI() internal view virtual returns (string memory) {
    return
      string(
        abi.encodePacked(
          "data:application/json;base64,",
          Base64.encode(
            bytes(
              string.concat(
                '{"name":',
                '"',
                contractMetadata.name,
                '",',
                '"description":',
                '"',
                contractMetadata.description,
                '",',
                '"image":',
                '"',
                contractMetadata.image,
                '",',
                '"externalLink":',
                '"',
                contractMetadata.externalLink,
                '",',
                '"sellerFeeBasisPoints":',
                '"',
                contractMetadata.sellerFeeBasisPoints,
                '",',
                '"feeRecipient":',
                '"',
                contractMetadata.feeRecipient,
                '"',
                "}"
              )
            )
          )
        )
      );
  }

}
