// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract adminApplicationContract {
    
    struct adminApplication {
        address admin;
        uint256 aadharNo;
        string panNo;
        string patientName;
        string patientTag;
        string disease;
        string amount; // in ethers
        string fundRaiserName;
        string adminHashCode;
    }

    mapping(uint256 => adminApplication) public applications;
    uint256[] aadharNoStorage;

    function getLength() public view returns (uint256) {
        return aadharNoStorage.length;
    }

    function createApplication(
        address _admin,
        uint256 _aadharNo,
        string memory _panNo,
        string memory _patientName,
        string memory _patientTag,
        string memory _disease,
        string memory _amount, 
        string memory _fundRaiserName,
        string memory _adminHashCode
    ) public {
        
        //doing required checks
        require(
            applications[_aadharNo].aadharNo == 0,
            "Applicant aadhar No. already exsist."
        );

        // putting admin application data
        adminApplication storage newApplication = applications[_aadharNo];
        newApplication.admin = _admin;
        newApplication.aadharNo = _aadharNo;
        newApplication.panNo = _panNo;
        newApplication.patientName = _patientName;
        newApplication.patientTag = _patientTag;
        newApplication.disease = _disease;
        newApplication.amount = _amount;
        newApplication.fundRaiserName = _fundRaiserName;
        newApplication.adminHashCode = _adminHashCode;
        
        // storing aadhar number for indexing
        aadharNoStorage.push(_aadharNo);
    }

    function getAllApplications()
        public
        view
        returns (adminApplication[] memory)
    {
        adminApplication[] memory allApplications = new adminApplication[](
            aadharNoStorage.length
        );
        for (uint256 i = 0; i < aadharNoStorage.length; i++) {
            allApplications[i] = applications[aadharNoStorage[i]];
        }
        return allApplications;
    }

    function checkValidHashCode(uint256 _aadharNo, string memory _hashCode)
        public
        view
        returns (bool)
    {
        return (keccak256(
            abi.encodePacked(applications[_aadharNo].adminHashCode)
        ) == keccak256(abi.encodePacked(_hashCode)));
    }

    function getApplicationByKey(uint256 _aadharNo) public view returns (adminApplication memory) {
        return applications[_aadharNo];
    }
}
