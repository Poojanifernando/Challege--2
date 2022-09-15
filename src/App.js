//import react 
import React from 'react';
import { useEffect, useState } from 'react';
import logo from './images/logo.png';
import logoname from './images/logoname.png';
import dark from './images/dark.png';
//import service file
import {fundraising} from './Data/DonateData';
import './App.css';
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Button,
  Col,
  CardImg,
  CardText,
} from "reactstrap";
//import swal to get succesful message
import Swal from 'sweetalert2';


function App() {

  const [data, setdata] = useState([]);
  const [ShowFundrasingArray, setShowFundrasingArray] = useState([]);
  const [ShowData, setShowData] = useState(false);

  //create an arrow function with async to get donation project data
  const getAllFundaising =async  () =>{
    //using error handling
    try{
      let data = await fundraising();
      console.log("data set",data);
      setdata(data?.data?.data);
      let array = [];
      //set a loop to get each data set
      for (var i = 0; i < data?.data?.data.length; i++) 
      {
          array.push({key:i,status:false});
      }
      //set data set as an array
      setShowFundrasingArray(array);
    }catch(error){
      console.log(error);
    }
  
  }
  
//use useEffect to call function
  useEffect(() =>{
    getAllFundaising()
  },[])

  //set the dark mode
  const myFunction = async () =>{
  let element = document.body;
  element.classList.toggle("dark-mode");
}

  //App body
  return (
    <div className="App">
 
    <header className="App-header">

      <div>
        <table className="logotable">
          <tr>
            <th>

                  <div>
                  <img src={logoname} className="logoname" alt="logoname" />

                  </div>
            </th>

  

            <th>
                <div>
                <label class="switch">
                    <input type="checkbox"/>
                      <span class="slider round"  onClick={(e)=>{myFunction()}}></span>
                </label>
                </div>

            </th>

            <th>
                <div>
                <img src={dark} className="dark" alt="dark" />
                
                </div>

            </th>
          </tr>
        </table>

      </div>
     
      <table className="headertable">
        <thead>
          <tr>
            <th>
              <img src={logo} className="logo" alt="logo" />
            </th>
                
            <th>
                <h2 className="headerText">We want give them a better <br/>tomorrow!</h2>
                <p className="paratext">Lorem Ipsum id simple dummy text of the printing and typesetting </p>
                <p className="paratext">industry.Lorem Ipsum has been the industry's standard dummy text ever</p>
                <p className="paratext"> since the1500s</p>
                  
                <br/>

                <button className="headerbutton">Get Started</button>
            </th>
          </tr>
        </thead>

      </table>

  </header>

      
  <h1>Projects</h1>
      <div className="datatable">
        {data?.map((item , index) => {
          return (
            <div>

              <div>
                <Col style={{ display:ShowFundrasingArray[index].key === index && ShowFundrasingArray[index].status ?  "none": "flex"}}>
                  <Card>
                    <CardHeader>
                      <CardTitle>
                      <b className="cardtitle">{item.title}</b>
                    
                      </CardTitle>
                  
                      <CardImg
                          src={item.urls.regular}
                          alt="User Img"
                          className="images"
                        />
                    
                    </CardHeader>
                    <CardBody>
                      <CardText className="text1"><b>$ {item.target_amount}</b></CardText>
                      <Button
                          className="donatebutton"
                          onClick={(e)=>{
                          console.log("selected",item)
                          ShowFundrasingArray.map((item,i)=>{
                            if(item.key===index)
                            {
                                item.status=true;
                            }
                          }) 
                          setShowData(true);
                        }}
                      >
                        Donate Now
                      </Button>
                    </CardBody>
                  </Card>
                </Col>


             
              
              </div>
             

              <div>
                  <Col style={{display:ShowFundrasingArray[index].key === index && ShowFundrasingArray[index].status ?  "flex": "none"}}>
                    <Card>
                      <CardHeader>
                        <CardTitle>                    
                            <b className="cardtitle">{item.title}</b>
                        </CardTitle>
                        <CardImg
                          src={item.urls.regular}
                          alt="User Img"
                          className="images"
                        />
                      </CardHeader>
                      <CardBody className="payradios">
                        <CardText className="text1"><b>$ {item.target_amount}</b></CardText>
                        <CardText className="text2"><b>Select the amount that <br/>you want to donate</b></CardText>
                        <CardText className="dollartext"><b><input type="radio" value="Male" name="gender"  /> $10</b></CardText>
                        <CardText className="dollartext"><b><input type="radio" value="Male" name="gender" /> $50</b></CardText>
                        <CardText className="dollartext"><b><input type="radio" value="Male" name="gender"/> $100</b></CardText>
                        <CardText className="dollartext"><b><input type="radio" value="Male" name="gender"/> $500</b></CardText>
                        <CardText className="dollartext"><b><input type="radio" value="Male" name="gender"/> $1000</b></CardText>
                        <br/>
                        <Button
                           className="paynowbutton"
                           onClick={(e)=>{
                            Swal.fire({
                              icon: 'success',
                              title: 'Successful!',
                              text: 'You are successfully made the donation!',
                            })
                            ShowFundrasingArray.map((item,i)=>{
                                if(item.key===index)
                                {
                                    item.status=false; 
                                }
                            }) 
                            setShowData(false);
                            }}
                          > Pay Now
                          </Button>
                        
                      </CardBody>
                
                    </Card>
                  </Col>  
                </div>
                <br/><br/>
                </div>
              
              );
            })}

          <br/><br/>
      
        </div>     

       
      <div>

      <br/>
      <button className="projectbutton">More Projects</button></div>
  </div>


  );
}

export default App;