//service file

//require axios to connect rest apis with frontend
import axios from "axios";


//create the URL and initialize it to a variable
let getFundraising = "https://07fplmn2nd.execute-api.us-west-2.amazonaws.com/dev/fundraising";


//implement the fundraising functions to get funds
export async function fundraising(){
    const config = {
        //set the headers
        headers: {
            'accept': 'application/json',
            'x-api-key': 'RHtTMSSIsm4ecSAfaHq4N7HpaMOJBv5utDDhp1ch',
        }
    }
    
    const FundrasingUrl = getFundraising + "?pagination=1&limit=20";

    //return the  data 
    return axios.get(FundrasingUrl,config)
}