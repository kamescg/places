//SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import { Place } from "./Place.sol";

/**
@title PlaceFactory
@dev A contract for creating instances of the Place contract.
    PlaceFactory allows users to create new Place contracts with specified parameters,
    such as name, symbol, URI, price, and contract metadata.
*/
contract PlaceFactory {

    /**
    * @dev Event emitted when a new Place contract is created.
    * @param owner The address of the user who created the Place contract.
    * @param place The address of the newly created Place contract.
    */
    event PlaceCreated(address indexed owner, address indexed place);

    /**
    * @dev Creates a new Place contract with the specified parameters.
    * @param name The name of the Place contract.
    * @param symbol The symbol of the Place contract.
    * @param uri The URI of the Place contract.
    * @param price The price of the Place contract.
    * @param contractMetadata The contract metadata of the Place contract.
    * @return place The newly created Place contract instance.
    */
    function createPlace(
        string memory name,
        string memory symbol,
        string memory uri,
        uint256 price,
        Place.ContractMetadata memory contractMetadata
    ) public returns (Place) {
        Place place = new Place(name, symbol, uri, price, msg.sender, contractMetadata);
        emit PlaceCreated(msg.sender, address(place));
        return place;
    }
}