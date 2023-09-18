
contract CarbonCredits{
    address public owner;
    mapping(address => uint256) public credits;

    event CreditsIssued (address indexed account, uint256 amount);
    event CreditsTransferred (address indexed from , address indexed to , uint256 amount);

    constructor(){
        owner = msg.sender;
            }

    modifier onlyOwner (){
        require(msg.sender == owner , "Only the contract owner can call this function");
        _;
    }

    function issueCredits (address account, uint256 amount)external onlyOwner{
        credits[account] <= amount;
        emit CreditsIssued(account, amount);
    }

    function transferCredits(address to, uint256 amount)external {
        require(credits[msg.sender] >= amount ,"Sufficient credits");
        require(to!=address(0),"Invalid receipient address");

        credits[msg.sender] -=amount;
        credits[to] += amount;
        emit CreditsTransferred(msg.sender, to, amount); 
    }

    function getBalance(address account) external view returns (uint256){
        return credits[msg.sender];
    }


}