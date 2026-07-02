// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract EstateLedger {

    struct Property {
        uint256 id;
        string location;
        uint256 area;
        address owner;
        string documentHash;
        bool exists;
    }

    uint256 public propertyCount;
    mapping(uint256 => Property) public properties;

    event PropertyRegistered(
        uint256 indexed id,
        address indexed owner,
        string location
    );

    event PropertyTransferred(
        uint256 indexed id,
        address indexed from,
        address indexed to
    );

    modifier onlyOwner(uint256 _id) {
        require(properties[_id].owner == msg.sender, "Not property owner");
        _;
    }

    function registerProperty(
        string memory _location,
        uint256 _area,
        string memory _documentHash
    ) external {
        propertyCount++;

        properties[propertyCount] = Property({
            id: propertyCount,
            location: _location,
            area: _area,
            owner: msg.sender,
            documentHash: _documentHash,
            exists: true
        });

        emit PropertyRegistered(propertyCount, msg.sender, _location);
    }

    function transferProperty(
        uint256 _id,
        address _newOwner
    ) external onlyOwner(_id) {
        require(properties[_id].exists, "Property does not exist");

        address oldOwner = properties[_id].owner;
        properties[_id].owner = _newOwner;

        emit PropertyTransferred(_id, oldOwner, _newOwner);
    }

    function getProperty(uint256 _id)
        external
        view
        returns (
            uint256,
            string memory,
            uint256,
            address,
            string memory
        )
    {
        Property memory p = properties[_id];
        require(p.exists, "Property not found");

        return (
            p.id,
            p.location,
            p.area,
            p.owner,
            p.documentHash
        );
    }
}