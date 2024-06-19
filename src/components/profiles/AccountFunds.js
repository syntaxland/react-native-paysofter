// AccountFunds.js
import React from "react";
import { Row, Col } from "react-bootstrap";
import AccountFundCredits from "../FundAccount/AccountFundCredits";
import AccountFundDebits from "../FundAccount/AccountFundDebits";  

import UsdAccountFundCredits from "../FundAccount/UsdAccountFundCredits";
import UsdAccountFundDebits from "../FundAccount/UsdAccountFundDebits"; 

function AccountFunds() {
 
  return (
    <div>
      <Row>
        <Col>
        
          <div>
            <AccountFundCredits />
          </div>

          <div>
            <UsdAccountFundCredits /> 
          </div>

          <div className="text-center">
            <AccountFundDebits />
          </div> 

          <div className="text-center">
            <UsdAccountFundDebits />
          </div> 

          <hr />
        </Col>
      </Row>
    </div>
  );
}

export default AccountFunds;
